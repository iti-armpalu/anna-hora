// Pure helper – NOT a server action
export type SignupState = {
    ok: boolean;
    fieldErrors?: Record<string, string[]>;
    formError?: string;
  };
  
  export const initialSignupState: SignupState = { ok: false };
  