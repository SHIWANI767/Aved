import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { appWithTranslation, useTranslation } from "next-i18next";
import { ThemeProvider } from "@mui/material/styles";
import { createCustomTheme } from "/src/Themes/index";
import ContextWrapper from "@/context/ContextWrapper";
import PageLoader from "@/components/PageLoader";
import { isAuthenticated, withoutAuthRoutes } from "@/AuthGuard";
import CustomHead from "@/components/CustomHead";
import { Toaster } from "react-hot-toast";
import "@/Scss/main.css";
import AppContext from "@/context/AppContext";
import { store, persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  const auth = useContext(AppContext);
  const { i18n } = useTranslation(); // Access i18n for language handling
  const theme = createCustomTheme();
  const router = useRouter();
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLayout = Component.getLayout || ((page) => page);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("language") || "en";
    setLocale(savedLocale);
  }, []);

  // useEffect(() => {
  //   console.log(locale);
  //   document.documentElement.lang = locale;
  //   document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  // }, [locale]);

  // Ensuring the i18n language change only happens once it's initialized
  useEffect(() => {
    if (i18n && i18n.changeLanguage) {
      const savedLocale = window.localStorage.getItem("language") || "en";
      i18n.changeLanguage(savedLocale); // Sync with i18n
      console.log(i18n.language);
      document.documentElement.lang = savedLocale;
      document.documentElement.dir = savedLocale === "ar" ? "rtl" : "ltr";
    } else {
      console.error("i18n is not initialized properly");
    }
  }, [i18n.language]);

  useEffect(() => {
    const notRequiresAuth = withoutAuthRoutes.includes(router.pathname);
    console.log("notrequersauth", isAuthenticated());
    console.log(notRequiresAuth, "withoutauth");
    console.log(
      isAuthenticated() === (false || "false") && router.pathname !== "/",
      "withoutauth"
    );
    if (isAuthenticated() === (false || "false") && router.pathname !== "/") {
      !notRequiresAuth && router.push("/"); // Redirect if authenticated
    }
  }, [router.pathname]);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  useEffect(() => {
    const startLoading = (url) => {
      if (url.includes("/dashboard/")) {
        setIsDashboardLoading(true);
      } else {
        setLoading(true);
      }
    };

    const stopLoading = () => {
      console.log(loading);
      setLoading(false);
      setIsDashboardLoading(false);
    };

    // Use router.events instead of Router.events
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);
    router.events.on("routeChangeError", stopLoading);
    console.log(loading);
    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
      router.events.off("routeChangeError", stopLoading);
    };
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<PageLoader />} persistor={persistor}>
          <ContextWrapper isDashboardLoading={isDashboardLoading}>
            <CustomHead title="Aved" image="/images/favicon.svg" />
            <Toaster
              autoClose={2000}
              position="top-right"
              reverseOrder={false}
            />

            {/* Keep the layout persistent */}
            {getLayout(
              loading || isDashboardLoading ? (
                <PageLoader />
              ) : (
                <Component {...pageProps} />
              )
            )}
          </ContextWrapper>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
