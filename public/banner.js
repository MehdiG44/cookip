"use strict";

(function () {
  var TEXT = {
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
    text: {
      fr: "et ses partenaires déposent des cookies et utilisent des informations non sensibles provenant de votre appareil pour améliorer ses produits, afficher des publicités et proposer des contenus personnalisés. Vous pouvez accepter ou refuser ces services. Vos choix sont conservés pendant 12 mois.",
      en: " and its partners save cookies and use non sensitive information from your device to improve its products, display advertisement and present personalized content. You can accept or refuse those services. Your choices are saved for 12 months.",
    },
    linkSentence: {
      fr: " Pour en savoir plus sur les cookies, les données utilisées et leur traitement, vous pouvez consulter notre ",
      en: " To know more about cookies, information used and its usage, you can refer to our ",
    },
    link: {
      fr: "politique en matière de cookies.",
      en: "cookie consent policy.",
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

  var script = document.getElementById("cookip-script");
  var color = script.dataset.color;
  var language = script.dataset.language;

  var activeCategory;
  function setActiveCategory(newState) {
    activeCategory = newState;
  }

  var cookieOptions = {
    statistics: null,
    marketing: null,
    personnalization: null,
  };

  var cookieOptionSet = false;

  function cookieConsentAlreadySet() {
    if (script.dataset.preview == "true") return false;

    var isSet = document.cookie.split("; ").some(function (cookie) {
      return cookie.substring(0, 7) === "cookip_";
    });

    return isSet;
  }

  function setCookies(cookie) {
    document.body.removeChild(container);

    if (!script.dataset.preview) {
      var value = {
        statistics: cookie.statistics,
        marketing: cookie.marketing,
        personnalization: cookie.personnalization,
        necessary: true,
      };

      document.cookie =
        "cookip_" +
        document.location.hostname +
        "=" +
        JSON.stringify(value) +
        ";max-age=31560000";

      window.dispatchEvent(new Event("cookip_set"));
    }

    document.head.removeChild(script);
  }

  function openOptions() {
    bannerContent.style.cssText =
      bannerContent.style.cssText +
      "-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;";
    text.appendChild(optionsContainer);
    acceptButton.textContent = TEXT.acceptAll[language];
    refuseButton.textContent = TEXT.refuseAll[language];

    if (cookieOptionSet) {
      buttonContainer.removeChild(acceptButtonContainer);
      buttonContainer.removeChild(refuseButtonContainer);
      buttonContainer.appendChild(saveButtonContainer);
    }
  }

  function closeOptions() {
    text.removeChild(optionsContainer);

    if (window.screen.width >= 1024) {
      bannerContent.style.cssText =
        bannerContent.style.cssText +
        "-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;";
    }

    acceptButton.textContent = TEXT.accept[language];
    refuseButton.textContent = TEXT.refuse[language];
    if (cookieOptionSet) buttonContainer.removeChild(saveButtonContainer);
    buttonContainer.appendChild(refuseButtonContainer);
    buttonContainer.appendChild(acceptButtonContainer);
  }

  function setCookieOption(name, value) {
    if (!cookieOptionSet) {
      buttonContainer.removeChild(acceptButtonContainer);
      buttonContainer.removeChild(refuseButtonContainer);
      buttonContainer.appendChild(saveButtonContainer);
    }

    cookieOptionSet = true;
    cookieOptions[name] = value;
    var currentCrossButton = document.querySelector(
      '[name="' + name + '"]:first-child'
    );
    var currentCheckButton = document.querySelector(
      '[name="' + name + '"]:last-child'
    );

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

    if (
      Object.values(cookieOptions).every(function (option) {
        return option !== null;
      })
    ) {
      saveButton.disabled = false;
      saveButton.style.cursor = "pointer";
      saveButton.style.cssText = saveButton.style.cssText + "opacity:1";
    } else {
      saveButton.disabled = true;
      saveButton.style.cursor = "default";
      saveButton.style.cssText = saveButton.style.cssText + "opacity:0.3";
    }
  }

  function optionSelector(name) {
    var selectorContainer = document.createElement("div");
    selectorContainer.style.cssText =
      "display: -webkit-box;display: -ms-flexbox;display: flex;";

    var checkButton = document.createElement("button");
    checkButton.textContent = "✓";
    checkButton.style.cssText =
      'background:0;border:0;color:green;font-size:30px;margin:0 0 0 1em;line-height:unset;padding:0;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;cursor:pointer;';
    checkButton.name = name;
    if (name === "technical") {
      checkButton.disabled = true;
      checkButton.style.cursor = "default";
    } else {
      checkButton.onclick = function () {
        setCookieOption(name, true);
      };
    }

    var crossButton = document.createElement("button");
    crossButton.textContent = "✕";
    crossButton.style.cssText =
      'background:0;border:0;color:red;font-size:30px;margin:0;line-height:unset;padding:0;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;cursor:pointer';
    crossButton.name = name;
    if (name === "technical") {
      crossButton.disabled = true;
      crossButton.style.cursor = "default";
      crossButton.style.cssText = crossButton.style.cssText + "opacity:0.2";
    } else {
      crossButton.onclick = function () {
        setCookieOption(name, false);
      };
    }

    selectorContainer.appendChild(crossButton);
    selectorContainer.appendChild(checkButton);
    return selectorContainer;
  }

  function handleCategoryDetail(category, detail, carret) {
    if (activeCategory) {
      activeCategory.carret.style.cssText =
        activeCategory.carret.style.cssText +
        "-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);";
      activeCategory.detail.style.cssText =
        activeCategory.detail.style.cssText + "max-height:0;";

      if (activeCategory.category === category) {
        setActiveCategory();
        return;
      }
    }

    carret.style.cssText =
      carret.style.cssText +
      "-webkit-transform: rotate(180deg);-ms-transform: rotate(180deg);transform: rotate(180deg);";
    detail.style.cssText = detail.style.cssText + "max-height:300px;";
    setActiveCategory({ category: category, detail: detail, carret: carret });
  }

  var container = document.createElement("div");
  var containerWithoutOverlay =
    script.dataset.overlay == "true"
      ? "top:0;background-color:rgba(0, 0, 0, 0.7)"
      : "";
  container.style.cssText =
    'display: -webkit-box;display: -ms-flexbox;-webkit-box-align: end;-ms-flex-align: end;position:fixed;bottom:0;width:100%;display:flex;align-items:flex-end;z-index:999999;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;' +
    containerWithoutOverlay +
    ";";

  var banner = document.createElement("div");
  var bannerPadding =
    window.screen.width < 1024 ? "padding:1em;" : "padding:2em 3em;";
  var bannerWithoutOverlay =
    script.dataset.overlay == "true"
      ? ""
      : "box-shadow:0px 0px 24px 12px lightgrey";
  banner.style.cssText =
    bannerPadding +
    ";" +
    bannerWithoutOverlay +
    ";background-color:white;border-top-left-radius:8px;border-top-right-radius:8px;max-height:100%;overflow:auto;width:100vw;";

  var header = document.createElement("div");
  header.style.cssText =
    "display: -webkit-box;display: -ms-flexbox;-webkit-box-pack: justify;-ms-flex-pack: justify;margin-bottom: 16px;display:flex;justify-content:space-between";

  var title = document.createElement("h1");
  title.textContent = TEXT.browsingExperience[language];
  title.style.cssText =
    "font-size: 20px;font-weight: bold;margin:unset;line-height:unset;";

  var technicalCookieDetail = document.createElement("div");
  technicalCookieDetail.style.cssText =
    "-ms-flex-preferred-size: 100%;flex-basis: 100%;font-weight: normal;margin-top: 8px;overflow: hidden;-webkit-transition: max-height 300ms ease-out 0s;-o-transition: max-height 300ms ease-out 0s;transition: max-height 300ms ease-out 0s;max-height: 0px;";
  technicalCookieDetail.textContent = TEXT.technicalCookie.detail[language];

  var technicalCookieCarret = document.createElement("span");
  technicalCookieCarret.textContent = "^";
  technicalCookieCarret.style.cssText =
    "font-size: 30px;font-family: monospace;color: " +
    color +
    ";height:20px;line-height:30px;-webkit-transition: -webkit-transform 100ms linear 0s;transition: -webkit-transform 100ms linear 0s;-o-transition: transform 100ms linear 0s;transition: transform 100ms linear 0s;transition: transform 100ms linear 0s, -webkit-transform 100ms linear 0s;-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);";

  var technicalCookieTextContent = document.createElement("span");
  technicalCookieTextContent.textContent = TEXT.technicalCookie.title[language];
  technicalCookieTextContent.style.cssText = "margin-left: 12px;";

  var technicalCookieHeader = document.createElement("div");
  technicalCookieHeader.style.cssText =
    "font-size:14px;display: -webkit-box;display: -ms-flexbox;display:flex;-webkit-box-align: center;-ms-flex-align: center;align-items:center;";
  technicalCookieHeader.appendChild(technicalCookieCarret);
  technicalCookieHeader.appendChild(technicalCookieTextContent);

  var technicalCookieText = document.createElement("a");
  technicalCookieText.style.cssText =
    "width:70%;display: -webkit-box;display: -ms-flexbox;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;display:flex;cursor:pointer;flex-direction:column;color:inherit;text-decoration:none;";
  technicalCookieText.appendChild(technicalCookieHeader);
  technicalCookieText.appendChild(technicalCookieDetail);

  var technicalCookie = document.createElement("div");
  technicalCookie.style.cssText =
    "margin:16px 0;display: -webkit-box;display: -ms-flexbox;-webkit-box-align: baseline;-ms-flex-align: baseline;-ms-flex-pack: distribute;-ms-flex-wrap: wrap;display:flex;align-items:baseline;justify-content:space-around;font-weight:bold;flex-wrap:wrap;";
  technicalCookie.appendChild(technicalCookieText);
  technicalCookie.appendChild(optionSelector("technical"));
  technicalCookieText.onclick = function () {
    handleCategoryDetail(
      technicalCookie,
      technicalCookieDetail,
      technicalCookieCarret
    );
  };

  var statisticCookieDetail = document.createElement("div");
  statisticCookieDetail.style.cssText =
    "-ms-flex-preferred-size: 100%;flex-basis: 100%;font-weight: normal;margin-top: 8px;overflow: hidden;-webkit-transition: max-height 300ms ease-out 0s;-o-transition: max-height 300ms ease-out 0s;transition: max-height 300ms ease-out 0s;max-height: 0px;";
  statisticCookieDetail.textContent = TEXT.statisticCookie.detail[language];

  var statisticCookieCarret = document.createElement("span");
  statisticCookieCarret.textContent = "^";
  statisticCookieCarret.style.cssText =
    "font-size: 30px;font-family: monospace;color: " +
    color +
    ";height:20px;line-height:30px;-webkit-transition: -webkit-transform 100ms linear 0s;transition: -webkit-transform 100ms linear 0s;-o-transition: transform 100ms linear 0s;transition: transform 100ms linear 0s;transition: transform 100ms linear 0s, -webkit-transform 100ms linear 0s;-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);";

  var statisticCookieTextContent = document.createElement("span");
  statisticCookieTextContent.textContent = TEXT.statisticCookie.title[language];
  statisticCookieTextContent.style.cssText = "margin-left: 12px;";

  var statisticCookieHeader = document.createElement("div");
  statisticCookieHeader.style.cssText =
    "font-size:14px;display: -webkit-box;display: -ms-flexbox;display:flex;-webkit-box-align: center;-ms-flex-align: center;align-items:center;";
  statisticCookieHeader.appendChild(statisticCookieCarret);
  statisticCookieHeader.appendChild(statisticCookieTextContent);

  var statisticCookieText = document.createElement("a");
  statisticCookieText.style.cssText =
    "width:70%;display: -webkit-box;display: -ms-flexbox;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;display:flex;cursor:pointer;flex-direction:column;color:inherit;text-decoration:none;";
  statisticCookieText.appendChild(statisticCookieHeader);
  statisticCookieText.appendChild(statisticCookieDetail);

  var statisticCookie = document.createElement("div");
  statisticCookie.style.cssText =
    "margin:16px 0;display: -webkit-box;display: -ms-flexbox;-webkit-box-align: baseline;-ms-flex-align: baseline;-ms-flex-pack: distribute;-ms-flex-wrap: wrap;display:flex;align-items:baseline;justify-content:space-around;font-weight:bold;flex-wrap:wrap;";
  statisticCookie.appendChild(statisticCookieText);
  statisticCookie.appendChild(optionSelector("statistics"));
  statisticCookieText.onclick = function () {
    handleCategoryDetail(
      statisticCookie,
      statisticCookieDetail,
      statisticCookieCarret
    );
  };

  var adCookieDetail = document.createElement("div");
  adCookieDetail.style.cssText =
    "-ms-flex-preferred-size: 100%;flex-basis: 100%;font-weight: normal;margin-top: 8px;overflow: hidden;-webkit-transition: max-height 300ms ease-out 0s;-o-transition: max-height 300ms ease-out 0s;transition: max-height 300ms ease-out 0s;max-height: 0px;";
  adCookieDetail.textContent = TEXT.adCookie.detail[language];

  var adCookieCarret = document.createElement("span");
  adCookieCarret.textContent = "^";
  adCookieCarret.style.cssText =
    "font-size: 30px;font-family: monospace;color: " +
    color +
    ";height:20px;line-height:30px;-webkit-transition: -webkit-transform 100ms linear 0s;transition: -webkit-transform 100ms linear 0s;-o-transition: transform 100ms linear 0s;transition: transform 100ms linear 0s;transition: transform 100ms linear 0s, -webkit-transform 100ms linear 0s;-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);";

  var adCookieTextContent = document.createElement("span");
  adCookieTextContent.textContent = TEXT.adCookie.title[language];
  adCookieTextContent.style.cssText = "margin-left: 12px;";

  var adCookieHeader = document.createElement("div");
  adCookieHeader.style.cssText =
    "font-size:14px;display: -webkit-box;display: -ms-flexbox;display:flex;-webkit-box-align: center;-ms-flex-align: center;align-items:center;";
  adCookieHeader.appendChild(adCookieCarret);
  adCookieHeader.appendChild(adCookieTextContent);

  var adCookieText = document.createElement("a");
  adCookieText.style.cssText =
    "width:70%;display: -webkit-box;display: -ms-flexbox;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;display:flex;cursor:pointer;flex-direction:column;color:inherit;text-decoration:none;";
  adCookieText.appendChild(adCookieHeader);
  adCookieText.appendChild(adCookieDetail);

  var adCookie = document.createElement("div");
  adCookie.style.cssText =
    "margin:16px 0;display: -webkit-box;display: -ms-flexbox;-webkit-box-align: baseline;-ms-flex-align: baseline;-ms-flex-pack: distribute;-ms-flex-wrap: wrap;display:flex;align-items:baseline;justify-content:space-around;font-weight:bold;flex-wrap:wrap;";
  adCookie.appendChild(adCookieText);
  adCookie.appendChild(optionSelector("personnalization"));
  adCookieText.onclick = function () {
    handleCategoryDetail(adCookie, adCookieDetail, adCookieCarret);
  };

  var adStatisticCookieDetail = document.createElement("div");
  adStatisticCookieDetail.style.cssText =
    "-ms-flex-preferred-size: 100%;flex-basis: 100%;font-weight: normal;margin-top: 8px;overflow: hidden;-webkit-transition: max-height 300ms ease-out 0s;-o-transition: max-height 300ms ease-out 0s;transition: max-height 300ms ease-out 0s;max-height: 0px;";
  adStatisticCookieDetail.textContent = TEXT.adStatisticCookie.detail[language];

  var adStatisticCarret = document.createElement("span");
  adStatisticCarret.textContent = "^";
  adStatisticCarret.style.cssText =
    "font-size: 30px;font-family: monospace;color: " +
    color +
    ";height:20px;line-height:30px;-webkit-transition: -webkit-transform 100ms linear 0s;transition: -webkit-transform 100ms linear 0s;-o-transition: transform 100ms linear 0s;transition: transform 100ms linear 0s;transition: transform 100ms linear 0s, -webkit-transform 100ms linear 0s;-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);";

  var adStatisticTextContent = document.createElement("span");
  adStatisticTextContent.textContent = TEXT.adStatisticCookie.title[language];
  adStatisticTextContent.style.cssText = "margin-left: 12px;";

  var adStatisticCookieHeader = document.createElement("div");
  adStatisticCookieHeader.style.cssText =
    "font-size:14px;display: -webkit-box;display: -ms-flexbox;display:flex;-webkit-box-align: center;-ms-flex-align: center;align-items:center;";
  adStatisticCookieHeader.appendChild(adStatisticCarret);
  adStatisticCookieHeader.appendChild(adStatisticTextContent);

  var adStatisticCookieText = document.createElement("a");
  adStatisticCookieText.style.cssText =
    "width:70%;display: -webkit-box;display: -ms-flexbox;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;display:flex;cursor:pointer;flex-direction:column;color:inherit;text-decoration:none;";
  adStatisticCookieText.appendChild(adStatisticCookieHeader);
  adStatisticCookieText.appendChild(adStatisticCookieDetail);

  var adStatisticCookie = document.createElement("div");
  adStatisticCookie.style.cssText =
    "margin:16px 0;display: -webkit-box;display: -ms-flexbox;-webkit-box-align: baseline;-ms-flex-align: baseline;-ms-flex-pack: distribute;-ms-flex-wrap: wrap;display:flex;align-items:baseline;justify-content:space-around;font-weight:bold;flex-wrap:wrap;";
  adStatisticCookie.appendChild(adStatisticCookieText);
  adStatisticCookie.appendChild(optionSelector("marketing"));
  adStatisticCookieText.onclick = function () {
    handleCategoryDetail(
      adStatisticCookie,
      adStatisticCookieDetail,
      adStatisticCarret
    );
  };

  var optionsContainer = document.createElement("div");
  optionsContainer.appendChild(technicalCookie);
  optionsContainer.appendChild(statisticCookie);
  optionsContainer.appendChild(adCookie);
  optionsContainer.appendChild(adStatisticCookie);

  var optionsButton = document.createElement("button");
  optionsButton.textContent = TEXT.options[language];
  optionsButton.style.cssText =
    "color:" +
    color +
    ';font-weight:bold;font-size:14px;background:0;border:0;padding:0;line-height:unset;cursor:pointer;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;font-size:16px;';
  optionsButton.onclick = function () {
    text.contains(optionsContainer) ? closeOptions() : openOptions();
  };

  var bannerContent = document.createElement("div");
  var bannerContentMobileCss =
    window.screen.width < 1024 ? "flex-direction:column" : "";
  bannerContent.style.cssText =
    "display: -webkit-box;display: -ms-flexbox;-webkit-box-align: center;-ms-flex-align: center;display:flex;align-items:center;" +
    bannerContentMobileCss +
    ";";

  var text = document.createElement("div");
  text.textContent =
    script.dataset.companyName + " " + TEXT.text[language] + " ";
  text.style.cssText = "font-size:13px;margin:0 12px 12px 0;";

  var link = document.createElement("a");
  link.textContent = TEXT.link[language];
  link.href = script.dataset.privacyPolicyLink;
  link.target = "_blank";
  link.style.cssText = "color:" + color + ";text-decoration:none;";

  var linkSentence = document.createElement("span");
  linkSentence.textContent = TEXT.linkSentence[language];
  linkSentence.appendChild(link);

  var buttonContainer = document.createElement("div");
  var buttonContainerMobileCss =
    window.screen.width < 1024
      ? "flex-direction:column;align-items:center"
      : "";
  buttonContainer.style.cssText =
    "display: -webkit-box;display: -ms-flexbox;display:flex;" +
    buttonContainerMobileCss +
    ";";

  var refuseButtonContainer = document.createElement("div");
  var refuseButton = document.createElement("button");
  refuseButton.textContent = TEXT.refuse[language];
  refuseButton.style.cssText =
    "cursor:pointer;width:max-content;min-width:8em;color:white;background-color:" +
    color +
    ";border-width:1px;border-color:" +
    color +
    ';border-radius:8px;margin:12px;padding:8px 18px;line-height:unset;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;font-size:16px;';
  refuseButton.onclick = function () {
    setCookies({
      statistics: false,
      marketing: false,
      personnalization: false,
    });
  };

  var acceptButtonContainer = document.createElement("div");
  var acceptButton = document.createElement("button");
  acceptButton.textContent = TEXT.accept[language];
  acceptButton.style.cssText =
    "cursor:pointer;width:max-content;min-width:8em;color:white;background-color:" +
    color +
    ";border-width:1px;border-color:" +
    color +
    ';border-radius:8px;margin:12px;padding:8px 18px;line-height:unset;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;font-size:16px;';
  acceptButton.onclick = function () {
    setCookies({ statistics: true, marketing: true, personnalization: true });
  };

  var saveButtonContainer = document.createElement("div");
  var saveButton = document.createElement("button");
  saveButton.textContent = TEXT.save[language];
  saveButton.style.cssText =
    "cursor:pointer;width:max-content;min-width:8em;color:white;background-color:" +
    color +
    ";border-width:1px;border-color:" +
    color +
    ';border-radius:8px;margin:12px;padding:8px 18px;opacity:0.3;line-height:unset;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;font-size:16px;';
  saveButton.disabled = true;
  saveButton.style.cursor = "default";
  saveButton.onclick = function () {
    setCookies(cookieOptions);
  };

  container.appendChild(banner);
  banner.appendChild(header);
  banner.appendChild(bannerContent);
  header.appendChild(title);
  header.appendChild(optionsButton);
  bannerContent.appendChild(text);
  bannerContent.appendChild(buttonContainer);
  buttonContainer.appendChild(refuseButtonContainer);
  buttonContainer.appendChild(acceptButtonContainer);
  if (script.dataset.privacyPolicyLink) text.appendChild(linkSentence);
  refuseButtonContainer.appendChild(refuseButton);
  acceptButtonContainer.appendChild(acceptButton);
  saveButtonContainer.appendChild(saveButton);

  function displayBanner() {
    if (cookieConsentAlreadySet()) return document.head.removeChild(script);
    document.body.appendChild(container);
  }

  if (["interactive", "complete"].indexOf(document.readyState) > -1) {
    displayBanner();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      displayBanner();
    });
  }
})();
