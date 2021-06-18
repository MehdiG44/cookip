import React, { useEffect } from "react";
import Form from "./Form";

const App = () => {
  useEffect(() => {
    window.addEventListener("cookie_consent_set", () => {
      const consentCookie = JSON.parse(
        document.cookie
          .split("; ")
          .find((cookie) =>
            cookie.startsWith(`cookie_consent_${document.location.hostname}=`)
          )
          .split("=")[1]
      );

      if (!consentCookie.statistics) return;

      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-9QE6XNSX60";
      script.async = true;

      const dataLayerScript = document.createElement("script");
      dataLayerScript.textContent =
        "window.dataLayer = window.dataLayer || [];window.gtag = function(){dataLayer.push(arguments);};window.gtag('js', new Date());window.gtag('config', 'G-9QE6XNSX60');";

      document.head.append(script, dataLayerScript);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-title font-bold w-11/12 text-center mt-8">
        Cookie banner generator
      </h1>
      <Form />
    </div>
  );
};

export default App;
