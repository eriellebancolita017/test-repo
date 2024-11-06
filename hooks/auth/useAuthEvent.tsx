import { useUserWeb } from "@/hooks/user/useUserWeb";
import { AccessTokensResponseDto } from "@fizno/api-client/src/models/AccessTokensResponseDto";
import { useEffect } from "react";

/**
 * Structures any event that modifies access tokens. Input functions:
 *   1) Makes API call and must return access tokens
 *   2) Callback before access tokens are set
 *   3) Callback after access tokens are set
 */
export function useAuthEvent(mutateOnTokenChange = true): {
  auth: (
    apiCall: () => Promise<AccessTokensResponseDto>,
    callbackBeforeSet?: ((token: string) => Promise<void> | void) | undefined,
    callbackAfterSet?: ((token: string) => Promise<void> | void) | undefined,
  ) => Promise<void>;
} {
  const { accessToken, setAccessToken, setRefreshToken, mutate } = useUserWeb();

  useEffect(() => {
    if (mutateOnTokenChange) {
      mutate();
    }
  }, [accessToken, mutateOnTokenChange, mutate]);

  const auth = async (
    apiCall: () => Promise<AccessTokensResponseDto>,
    callbackBeforeSet?: (token: string) => Promise<void> | void,
    callbackAfterSet?: (token: string) => Promise<void> | void,
  ) => {
    const tokens = await apiCall();
    if (!tokens.accessToken) {
      console.error("Unexpected missing access token");
      return;
    }
    await callbackBeforeSet?.(tokens.accessToken);
    setAccessToken(tokens.accessToken);
    if (tokens.refreshToken) {
      setRefreshToken(tokens.refreshToken);
    }
    await callbackAfterSet?.(tokens.accessToken);
  };
  return { auth };
}
