import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { storefrontFetch } from "@/lib/shopify/storefront";
import { z } from "zod";

// -----------------------------
// 1. Zod schema for input
// -----------------------------
const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type SignupInput = z.infer<typeof SignupSchema>;

// -----------------------------
// 2. Typed GraphQL responses
// -----------------------------
interface ShopifyUserError {
  field: string[] | null;
  message: string;
}

interface CustomerCreateResponse {
  data: {
    customerCreate: {
      customer: {
        id: string;
        email: string;
      } | null;
      customerUserErrors: ShopifyUserError[];
    };
  };
}

interface TokenResponse {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken:
      | {
        accessToken: string;
        expiresAt: string;
      }
      | null;
      customerUserErrors: ShopifyUserError[];
    };
  };
}

// -----------------------------
// 3. GraphQL documents
// -----------------------------
const CREATE_CUSTOMER = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

const CREATE_TOKEN = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
      }
    }
  }
`;

// -----------------------------
// 4. API Route (POST)
// -----------------------------
export async function POST(req: Request) {
  // Validate input strictly
  const json = await req.json();
  const parseResult = SignupSchema.safeParse(json);

  if (!parseResult.success) {
    return NextResponse.json(
      { errors: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, firstName, lastName } = parseResult.data;

  // 1. Create Customer
  const createResult = await storefrontFetch<CustomerCreateResponse>(
    CREATE_CUSTOMER,
    { input: { email, password, firstName, lastName } }
  );

  const userErrors = createResult.data.customerCreate.customerUserErrors;

  if (userErrors.length > 0) {
    return NextResponse.json({ errors: userErrors }, { status: 400 });
  }

  // 2. Auto-login: Create token
  const tokenResult = await storefrontFetch<TokenResponse>(CREATE_TOKEN, {
    input: { email, password },
  });

  const token =
    tokenResult.data.customerAccessTokenCreate.customerAccessToken;

  if (!token) {
    return NextResponse.json(
      {
        error:
          tokenResult.data.customerAccessTokenCreate.customerUserErrors[0]
            ?.message ?? "Token creation failed",
      },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  // 3. Cookies are synchronous — no await
  cookieStore.set("customerAccessToken", token.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(token.expiresAt),
    path: "/",
  });

  return NextResponse.json({ success: true });
}
