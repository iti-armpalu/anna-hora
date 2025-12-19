export type AuthActionState = {
    ok: boolean;
    fieldErrors?: Record<string, string[]>;
    formError?: string;
  };
  
  export const initialAuthState: AuthActionState = {
    ok: false,
  };
  