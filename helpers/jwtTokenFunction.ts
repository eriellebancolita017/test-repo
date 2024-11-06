import Cookies from "js-cookie";

export const tokens = {
  getAccessToken: () => localStorage.getItem("access-token"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  getAccessTokenCookies: () => Cookies.get("accessToken"),
  getRefreshTokenCookies: () => Cookies.get("refreshToken"),
};
