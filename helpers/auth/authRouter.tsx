// Auth states and corresponding routes in the auth state machine

import { getRedirectParam } from "@/helpers/route/redirect";
import { UserType } from "@fizno/api-client/src/models/CreateUserResponseDto";
import {
  JWTUserClaims,
  decodeJwt,
  tokenStillValid,
} from "@fizno/ui-core/src/helpers/token";

// JWT state must be checked in this order for correct behavior
export enum AuthStates {
  LOGIN = "/login",
  SIGNUP = "/signup",
  AUTHED = "/home",
}

export function authStateMachine(jwt?: JWTUserClaims | null): AuthStates {
  if (!jwt || !tokenStillValid(jwt)) {
    return AuthStates.LOGIN;
  } else {
    return AuthStates.AUTHED;
  }
}

export function authRouter(
  route: (path: string, replace: boolean) => boolean,
  jwt?: JWTUserClaims | string | null,
  skipRouteOnStates: AuthStates[] | undefined = undefined,
  searchParams: string[][] | null = null,
): boolean {
  if (typeof jwt === "string") {
    jwt = jwt === "" ? undefined : decodeJwt(jwt);
  }

  const state = authStateMachine(jwt);
  if (skipRouteOnStates && skipRouteOnStates.includes(state)) {
    return false;
  }

  let url: string = state;
  if (state === AuthStates.AUTHED) {
    // !TODO set url to the page from where user is came from using cookies
  }
  if (url === window.location.pathname) {
    return false;
  }

  if (searchParams) {
    url += "?" + new URLSearchParams(searchParams).toString();
  }
  if (url === (AuthStates.LOGIN as string)) {
    url += (searchParams ? "&" : "?") + getRedirectParam();
  }
  return route(url, true);
}

export function redirectUnauthedToLogin(
  user: UserType | undefined | null,
  route: (path: string) => boolean,
) {
  if (!user) {
    route(AuthStates.LOGIN + "?" + getRedirectParam());
    return true;
  }
  return false;
}
