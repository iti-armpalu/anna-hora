export type LogoutState = {
    ok: boolean;
    error?: string;
  };
  
  export const initialLogoutState: LogoutState = { ok: false };
  