import React, { useEffect } from "react";
import Form from "./Form";

const App = () => {
  useEffect(() => {
    window.addEventListener("cookip_set", () => {
      const consentCookie = JSON.parse(
        document.cookie
          .split("; ")
          .find((cookie) =>
            cookie.startsWith(`cookip_${document.location.hostname}=`)
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
      <h1 className="text-blue-600 text-6xl font-title font-bold w-11/12 text-center my-8">
        COOKIP
      </h1>
      <div className="text-lg text-center mb-2">
        Free cookie consent banner script generator.
      </div>
      <div className="text-lg text-center mb-2">
        Can be used on its own or via Google Tag Manager.
      </div>
      <div className="text-lg text-center">
        Available in English and French.
      </div>
      <Form />
    </div>
  );
};

export default App;
