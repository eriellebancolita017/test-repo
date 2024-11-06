export const getRedirectParam = () =>
  window.location.pathname !== "/login"
    ? `redirect=${encodeURIComponent(window.location.pathname)}`
    : "";
