export type SigninState = {
    ok: boolean;
    fieldErrors?: Record<string, string[]>;
    formError?: string;
  };
  
  export const initialSigninState: SigninState = { ok: false };
  