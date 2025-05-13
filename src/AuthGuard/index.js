export const isAuthenticated = () => {
  console.log(sessionStorage.getItem("isLoggedIn"));
  const token = sessionStorage.getItem("isLoggedIn");
  return token;
};
export const withoutAuthRoutes = [
  "/about",
  "/admin",
  "/contactus/ContactEnquiry",
  "/contactus",
  "/admin/auth/signup",
  "/admin/auth/forgot",
  "/admin/auth/forgot-password",
  "/admin/auth/forgot-verify",
  "/admin/auth/verify-otp",
  "/admin/auth/reset-password",
  "/static",
  "/static/faq",
  "/blog",
  "/blog-details",
  "/privacy-policy",
  "/cookies-policy",
  "/terms-conditions",
  "/eligibility",
  "/auth/login",
  "/auth/signup",
  "/auth/forgotpassword",
  "/auth/forgotpassword/optverification",
  "/auth/signup/optverification",
  "/auth/signup/phone-input",
  "/auth/signup/set-password",
  "/auth/signup/phone-otp-verify",
  "/auth/forgotpassword/reset-password",
];
