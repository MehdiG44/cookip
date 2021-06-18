(() => {
  const TEXT = {
    acceptAll: {
      fr: "Accepter tout",
      en: "Accept all",
    },
    refuseAll: {
      fr: "Refuser tout",
      en: "Refuse all",
    },
    accept: {
      fr: "Accepter & fermer",
      en: "Accept & close",
    },
    refuse: {
      fr: "Refuser",
      en: "Refuse",
    },
    save: {
      fr: "Enregister",
      en: "Save",
    },
    browsingExperience: {
      fr: "Experience de navigation",
      en: "Browsing experience",
    },
    options: {
      fr: "Options",
      en: "Options",
    },
    link: {
      fr: "politique en matière de cookies.",
      en: "cookie consent policy.",
    },
    text: {
      fr: "et ses partenaires déposent des cookies et utilisent des informations non sensibles provenant de votre appareil pour améliorer ses produits, afficher des publicités et proposer des contenus personnalisés. Vous pouvez accepter ou refuser ces services. Vos choix sont conservés pendant 12 mois. Pour en savoir plus sur les cookies, les données utilisées et leur traitement, vous pouvez consulter notre",
      en: " and its partners save cookies and use non sensitive information from your device to improve its products, display advertisement and present personalized content. You can accept or refuse those services. Your choices are saved for 12 months. To know more about cookies, information used and its usage, you can refer to our",
    },
    technicalCookie: {
      title: {
        fr: "Cookies techniques",
        en: "Technical cookies",
      },
      detail: {
        fr: "Ces cookies sont nécessaires au bon fonctionnement du site ainsi qu’à la conservation de votre consentement en matière de cookies. Ils sont requis et ne peuvent être désactivés.",
        en: "Those cookies are needed for the website to work properly and to save your consent. They are required and can not be disabled.",
      },
    },
    statisticCookie: {
      title: {
        fr: "Mesure d'audience",
        en: "Audience measurement",
      },
      detail: {
        fr: "Ces cookies nous permettent de comprendre comment vous naviguez sur notre site et d'en suivre la fréquentation. Vous nous aidez ainsi à mesurer la performance du site et à améliorer la qualité de nos services.",
        en: "Those cookies allow us to understand how you navigate on our website and to monitor visits. They enable us to improve it by measuring its performance.",
      },
    },
    adCookie: {
      title: {
        fr: "Publicité personnalisée",
        en: "Personalized advertisement",
      },
      detail: {
        fr: "Ces cookies permettent à nos partenaires de vous proposer des publicités plus pertinentes sur Internet. Ils permettent la collecte et le traitement de données d'utilisation du site afin de vous proposer des publicités sur des sites ou applications tierces. Ce choix n'impactera pas le nombre de publicités que vous verrez sur Internet.",
        en: "Those cookies allow our partners to present you more relevant advertisement on the Internet. They allow the gathering and processing of website usage data to present you advertisement on third party websites. This choice will not impact the number of advertisement you will see on the Internet.",
      },
    },
    adStatisticCookie: {
      title: {
        fr: "Mesure de performance publicitaire",
        en: "Advertisement performance measurement",
      },
      detail: {
        fr: "Ces cookies permettent la collecte et le traitement de données d'utilisation du site afin de mesurer la performance de nos campagnes publicitaires et de partager ces données avec nos partenaires. Ce choix n'impactera pas le nombre de publicités que vous verrez sur Internet.",
        en: "Those cookies allow the gathering and processing of website usage data to measure the performance of our advertisement campaigns, and to share this information with our partners. This choice will not impact the number of advertisement you will see on the Internet.",
      },
    },
  };

  const script = document.getElementById("cookie-consent-script");
  const color = script.dataset.color;
  const language = script.dataset.language;
  let activeCategory;
  const setActiveCategory = (newState) => (activeCategory = newState);

  let cookieOptions = {
    statistics: null,
    marketing: null,
    personnalization: null,
  };
  let cookieOptionSet = false;

  const cookieConsentAlreadySet = () => {
    const isSet = document.cookie.split("; ").some((cookie) => {
      return cookie.startsWith(`cookie_consent_${document.location.hostname}=`);
    });

    return isSet;
  };

  const setCookies = (cookie) => {
    document.body.removeChild(container);

    if (script.dataset.preview == "true") return;

    const value = {
      statistics: cookie.statistics,
      marketing: cookie.marketing,
      personnalization: cookie.personnalization,
      necessary: true,
    };

    document.cookie = `cookie_consent_${
      document.location.hostname
    }=${JSON.stringify(value)};max-age=31560000`;

    window.dispatchEvent(new Event("cookie_consent_set"));
  };

  const openOptions = () => {
    bannerContent.style.cssText =
      bannerContent.style.cssText + "flex-direction:column;";
    text.appendChild(optionsContainer);
    acceptButton.textContent = TEXT.acceptAll[language];
    refuseButton.textContent = TEXT.refuseAll[language];

    if (cookieOptionSet) {
      buttonContainer.removeChild(acceptButtonContainer);
      buttonContainer.removeChild(refuseButtonContainer);
      buttonContainer.appendChild(saveButtonContainer);
    }
  };

  const closeOptions = () => {
    text.removeChild(optionsContainer);

    if (window.screen.width >= 1024) {
      bannerContent.style.cssText =
        bannerContent.style.cssText + "flex-direction:row;";
    }

    acceptButton.textContent = TEXT.accept[language];
    refuseButton.textContent = TEXT.refuse[language];
    if (cookieOptionSet) buttonContainer.removeChild(saveButtonContainer);
    buttonContainer.append(refuseButtonContainer, acceptButtonContainer);
  };

  const setCookieOption = (name, value) => {
    if (!cookieOptionSet) {
      buttonContainer.removeChild(acceptButtonContainer);
      buttonContainer.removeChild(refuseButtonContainer);
      buttonContainer.appendChild(saveButtonContainer);
    }

    cookieOptionSet = true;
    cookieOptions[name] = value;
    currentCrossButton = document.querySelector(`[name="${name}"]:first-child`);
    currentCheckButton = document.querySelector(`[name="${name}"]:last-child`);

    if (value) {
      currentCheckButton.style.cssText =
        currentCheckButton.style.cssText + "opacity:1";
      currentCrossButton.style.cssText =
        currentCrossButton.style.cssText + "opacity:0.2";
    } else {
      currentCheckButton.style.cssText =
        currentCheckButton.style.cssText + "opacity:0.2";
      currentCrossButton.style.cssText =
        currentCrossButton.style.cssText + "opacity:1";
    }

    if (Object.values(cookieOptions).every((option) => option !== null)) {
      saveButton.disabled = false;
      saveButton.style.cursor = "pointer";
      saveButton.style.cssText = saveButton.style.cssText + "opacity:1";
    } else {
      saveButton.disabled = true;
      saveButton.style.cursor = "default";
      saveButton.style.cssText = saveButton.style.cssText + "opacity:0.3";
    }
  };

  const optionSelector = (name) => {
    const selectorContainer = document.createElement("div");
    selectorContainer.style.cssText = "display:flex;";

    const checkButton = document.createElement("button");
    checkButton.textContent = "✓";
    checkButton.style.cssText =
      "background:0;border:0;color:green;font-size:30px;margin:0 0 0 1em;line-height:unset;padding:0;";
    checkButton.name = name;
    if (name === "technical") {
      checkButton.disabled = true;
      checkButton.style.cursor = "default";
    } else {
      checkButton.onclick = () => setCookieOption(name, true);
    }

    const crossButton = document.createElement("button");
    crossButton.textContent = "✕";
    crossButton.style.cssText =
      "background:0;border:0;color:red;font-size:30px;margin:0;line-height:unset;padding:0;";
    crossButton.name = name;
    if (name === "technical") {
      crossButton.disabled = true;
      crossButton.style.cursor = "default";
      crossButton.style.cssText = crossButton.style.cssText + "opacity:0.2";
    } else {
      crossButton.onclick = () => setCookieOption(name, false);
    }

    selectorContainer.append(crossButton, checkButton);
    return selectorContainer;
  };

  const handleCategoryDetail = (category, detail, carret) => {
    if (activeCategory) {
      activeCategory.carret.style.cssText =
        activeCategory.carret.style.cssText + "transform: rotate(90deg);";
      activeCategory.detail.style.cssText =
        activeCategory.detail.style.cssText + "max-height:0;";

      if (activeCategory.category === category) {
        setActiveCategory();
        return;
      }
    }

    carret.style.cssText = carret.style.cssText + "transform: rotate(180deg);";
    detail.style.cssText = detail.style.cssText + "max-height:300px;";
    setActiveCategory({ category: category, detail: detail, carret: carret });
  };

  const container = document.createElement("div");
  const containerWithoutOverlay =
    script.dataset.overlay == "true"
      ? "top:0;background-color:rgba(0, 0, 0, 0.7)"
      : "";
  container.style.cssText = `position:fixed;bottom:0;width:100%;display:flex;align-items:flex-end;z-index:999999;${containerWithoutOverlay};`;

  const banner = document.createElement("div");
  const bannerPadding =
    window.screen.width < 1024 ? "padding:1em;" : "padding:2em 3em;";
  const bannerWithoutOverlay =
    script.dataset.overlay == "true"
      ? ""
      : "box-shadow:0px 0px 24px 12px lightgrey";
  banner.style.cssText = `${bannerPadding};${bannerWithoutOverlay};background-color:white;border-top-left-radius:8px;border-top-right-radius:8px;max-height:100%;overflow:auto;width:100vw;`;

  const header = document.createElement("div");
  header.style.cssText =
    "margin-bottom: 16px;display:flex;justify-content:space-between";

  const title = document.createElement("h1");
  title.textContent = TEXT.browsingExperience[language];
  title.style.cssText = "font-size: 20px;font-weight: bold";

  const technicalCookieDetail = document.createElement("div");
  technicalCookieDetail.style.cssText =
    "flex-basis: 100%;font-weight:normal;margin-top:8px;overflow:hidden;max-height:0;transition:max-height 300ms ease-out 0s;";
  technicalCookieDetail.textContent = TEXT.technicalCookie.detail[language];

  const technicalCookieCarret = document.createElement("span");
  technicalCookieCarret.textContent = "^";
  technicalCookieCarret.style.cssText = `transform: rotate(90deg);font-size: 30px;font-family: monospace;color: ${color};height:20px;line-height:30px;transition:transform 100ms linear 0s;`;

  const technicalCookieTextContent = document.createElement("span");
  technicalCookieTextContent.textContent = TEXT.technicalCookie.title[language];
  technicalCookieTextContent.style.cssText = "margin-left: 12px;";

  const technicalCookieHeader = document.createElement("div");
  technicalCookieHeader.style.cssText =
    "display:flex;align-items:center;font-size:14px;";
  technicalCookieHeader.append(
    technicalCookieCarret,
    technicalCookieTextContent
  );

  const technicalCookieText = document.createElement("a");
  technicalCookieText.style.cssText =
    "width:70%;display:flex;cursor:pointer;flex-direction:column;";
  technicalCookieText.append(technicalCookieHeader, technicalCookieDetail);

  const technicalCookie = document.createElement("div");
  technicalCookie.style.cssText =
    "margin:16px 0;display:flex;align-items:baseline;justify-content:space-around;font-weight:bold;flex-wrap:wrap;";
  technicalCookie.append(technicalCookieText, optionSelector("technical"));
  technicalCookieText.onclick = () =>
    handleCategoryDetail(
      technicalCookie,
      technicalCookieDetail,
      technicalCookieCarret
    );

  const statisticCookieDetail = document.createElement("div");
  statisticCookieDetail.style.cssText =
    "flex-basis: 100%;font-weight:normal;margin-top:8px;overflow:hidden;max-height:0;transition:max-height 300ms ease-out 0s;";
  statisticCookieDetail.textContent = TEXT.statisticCookie.detail[language];

  const statisticCookieCarret = document.createElement("span");
  statisticCookieCarret.textContent = "^";
  statisticCookieCarret.style.cssText = `transform: rotate(90deg);font-size: 30px;font-family: monospace;color: ${color};height:20px;line-height:30px;transition:transform 100ms linear 0s;`;

  const statisticCookieTextContent = document.createElement("span");
  statisticCookieTextContent.textContent = TEXT.statisticCookie.title[language];
  statisticCookieTextContent.style.cssText = "margin-left: 12px;";

  const statisticCookieHeader = document.createElement("div");
  statisticCookieHeader.style.cssText =
    "display:flex;align-items:center;font-size:14px;";
  statisticCookieHeader.append(
    statisticCookieCarret,
    statisticCookieTextContent
  );

  const statisticCookieText = document.createElement("a");
  statisticCookieText.style.cssText =
    "width:70%;display:flex;cursor:pointer;flex-direction:column;";
  statisticCookieText.append(statisticCookieHeader, statisticCookieDetail);

  const statisticCookie = document.createElement("div");
  statisticCookie.style.cssText =
    "margin:16px 0;display:flex;align-items:baseline;justify-content:space-around;font-weight:bold;flex-wrap:wrap;";
  statisticCookie.append(statisticCookieText, optionSelector("statistics"));
  statisticCookieText.onclick = () =>
    handleCategoryDetail(
      statisticCookie,
      statisticCookieDetail,
      statisticCookieCarret
    );

  const adCookieDetail = document.createElement("div");
  adCookieDetail.style.cssText =
    "flex-basis: 100%;font-weight:normal;margin-top:8px;overflow:hidden;max-height:0;transition:max-height 300ms ease-out 0s;";
  adCookieDetail.textContent = TEXT.adCookie.detail[language];

  const adCookieCarret = document.createElement("span");
  adCookieCarret.textContent = "^";
  adCookieCarret.style.cssText = `transform: rotate(90deg);font-size: 30px;font-family: monospace;color: ${color};height:20px;line-height:30px;transition:transform 100ms linear 0s;`;

  const adCookieTextContent = document.createElement("span");
  adCookieTextContent.textContent = TEXT.adCookie.title[language];
  adCookieTextContent.style.cssText = "margin-left: 12px;";

  const adCookieHeader = document.createElement("div");
  adCookieHeader.style.cssText =
    "display:flex;align-items:center;font-size:14px;";
  adCookieHeader.append(adCookieCarret, adCookieTextContent);

  const adCookieText = document.createElement("a");
  adCookieText.style.cssText =
    "width:70%;display:flex;cursor:pointer;flex-direction:column;";
  adCookieText.append(adCookieHeader, adCookieDetail);

  const adCookie = document.createElement("div");
  adCookie.style.cssText =
    "margin:16px 0;display:flex;align-items:baseline;justify-content:space-around;font-weight:bold;flex-wrap:wrap;";
  adCookie.append(adCookieText, optionSelector("personnalization"));
  adCookieText.onclick = () =>
    handleCategoryDetail(adCookie, adCookieDetail, adCookieCarret);

  const adStatisticCookieDetail = document.createElement("div");
  adStatisticCookieDetail.style.cssText =
    "flex-basis: 100%;font-weight:normal;margin-top:8px;overflow:hidden;max-height:0;transition:max-height 300ms ease-out 0s;";
  adStatisticCookieDetail.textContent = TEXT.adStatisticCookie.detail[language];

  const adStatisticCarret = document.createElement("span");
  adStatisticCarret.textContent = "^";
  adStatisticCarret.style.cssText = `transform: rotate(90deg);font-size: 30px;font-family: monospace;color: ${color};height:20px;line-height:30px;transition:transform 100ms linear 0s;`;

  const adStatisticTextContent = document.createElement("span");
  adStatisticTextContent.textContent = TEXT.adStatisticCookie.title[language];
  adStatisticTextContent.style.cssText = "margin-left: 12px;";

  const adStatisticCookieHeader = document.createElement("div");
  adStatisticCookieHeader.style.cssText =
    "display:flex;align-items:center;font-size:14px;";
  adStatisticCookieHeader.append(adStatisticCarret, adStatisticTextContent);

  const adStatisticCookieText = document.createElement("a");
  adStatisticCookieText.style.cssText =
    "width:70%;display:flex;cursor:pointer;flex-direction:column;";
  adStatisticCookieText.append(
    adStatisticCookieHeader,
    adStatisticCookieDetail
  );

  const adStatisticCookie = document.createElement("div");
  adStatisticCookie.style.cssText =
    "margin:16px 0;display:flex;align-items:baseline;justify-content:space-around;font-weight:bold;flex-wrap:wrap;";
  adStatisticCookie.append(adStatisticCookieText, optionSelector("marketing"));
  adStatisticCookieText.onclick = () =>
    handleCategoryDetail(
      adStatisticCookie,
      adStatisticCookieDetail,
      adStatisticCarret
    );

  const optionsContainer = document.createElement("div");
  optionsContainer.append(
    technicalCookie,
    statisticCookie,
    adCookie,
    adStatisticCookie
  );

  const optionsButton = document.createElement("button");
  optionsButton.textContent = TEXT.options[language];
  optionsButton.style.cssText = `color:${color};font-weight:bold;font-size:14px;background:0;border:0;padding:0;line-height:unset;`;
  optionsButton.onclick = () =>
    text.contains(optionsContainer) ? closeOptions() : openOptions();

  const bannerContent = document.createElement("div");
  const bannerContentMobileCss =
    window.screen.width < 1024 ? "flex-direction:column" : "";
  bannerContent.style.cssText = `display:flex;align-items:center;${bannerContentMobileCss};`;

  const text = document.createElement("div");
  text.textContent = `${script.dataset.companyName} ${TEXT.text[language]} `;
  text.style.cssText = "font-size:13px;margin:0 12px 12px 0;";

  const link = document.createElement("a");
  link.textContent = TEXT.link[language];
  link.href = script.dataset.privacyPolicyLink;
  link.target = "_blank";
  link.style.cssText = `color:${color};`;

  const buttonContainer = document.createElement("div");
  const buttonContainerMobileCss =
    window.screen.width < 1024
      ? "flex-direction:column;align-items:center"
      : "";
  buttonContainer.style.cssText = `display:flex;${buttonContainerMobileCss};`;

  const refuseButtonContainer = document.createElement("div");
  const refuseButton = document.createElement("button");
  refuseButton.textContent = TEXT.refuse[language];
  refuseButton.style.cssText = `width:max-content;min-width:8em;color:white;background-color:${color};border-width:1px;border-color:${color};border-radius:8px;margin:12px;padding:8px 18px;line-height:unset;`;
  refuseButton.onclick = () =>
    setCookies({
      statistics: false,
      marketing: false,
      personnalization: false,
    });

  const acceptButtonContainer = document.createElement("div");
  const acceptButton = document.createElement("button");
  acceptButton.textContent = TEXT.accept[language];
  acceptButton.style.cssText = `width:max-content;min-width:8em;color:white;background-color:${color};border-width:1px;border-color:${color};border-radius:8px;margin:12px;padding:8px 18px;line-height:unset;`;
  acceptButton.onclick = () =>
    setCookies({ statistics: true, marketing: true, personnalization: true });

  const saveButtonContainer = document.createElement("div");
  const saveButton = document.createElement("button");
  saveButton.textContent = TEXT.save[language];
  saveButton.style.cssText = `width:max-content;min-width:8em;color:white;background-color:${color};border-width:1px;border-color:${color};border-radius:8px;margin:12px;padding:8px 18px;opacity:0.3;line-height:unset;`;
  saveButton.disabled = true;
  saveButton.style.cursor = "default";
  saveButton.onclick = () => setCookies(cookieOptions);

  container.appendChild(banner);
  banner.append(header, bannerContent);
  header.append(title, optionsButton);
  bannerContent.append(text, buttonContainer);
  buttonContainer.append(refuseButtonContainer, acceptButtonContainer);
  text.appendChild(link);
  refuseButtonContainer.appendChild(refuseButton);
  acceptButtonContainer.appendChild(acceptButton);
  saveButtonContainer.appendChild(saveButton);

  const displayBanner = () => {
    if (cookieConsentAlreadySet()) return;
    document.body.appendChild(container);
  };

  if (["interactive", "complete"].includes(document.readyState)) {
    displayBanner();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      displayBanner();
    });
  }
})();