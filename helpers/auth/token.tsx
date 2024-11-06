import { AuthApi } from "@fizno/api-client/src/apis/AuthApi";
import { AccessTokensResponseDto } from "@fizno/api-client/src/models/AccessTokensResponseDto";
import {
  accessTokenKey,
  REFRESH_TIME_REMAINING,
  refreshTokenKey,
  tokenStillValid,
} from "@fizno/ui-core/src/helpers/token";

/**
 * Updates the access token using the refresh token.
 */
export const refreshAccessToken = async (
  timeRemaining = REFRESH_TIME_REMAINING,
  forceRefresh = false,
  { access, refresh }: { access?: string | null; refresh?: string | null } = {},
): Promise<AccessTokensResponseDto | undefined> => {
  const accessToken = access
    ? JSON.stringify(access)
    : window.localStorage.getItem(accessTokenKey);
  const refreshToken = refresh
    ? JSON.stringify(refresh)
    : window.localStorage.getItem(refreshTokenKey);

  if (!refreshToken || !tokenStillValid(refreshToken)) {
    return undefined;
  }

  if (
    accessToken &&
    !forceRefresh &&
    tokenStillValid(accessToken, timeRemaining)
  ) {
    return undefined;
  }

  const response = await AuthApi.refreshAccessToken(refreshToken);
  if (response.remote === "success") {
    return response.data.data;
  }
};
