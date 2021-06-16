(() => {
  const script = document.getElementById("cookie-consent-script");
  const color = script.dataset.color;
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
    const value = {
      statistics: cookie.statistics,
      marketing: cookie.marketing,
      personnalization: cookie.personnalization,
      necessary: true,
    };

    document.cookie = `cookie_consent_${
      document.location.hostname
    }=${JSON.stringify(value)};max-age=31560000`;
    document.body.removeChild(container);
  };

  const openOptions = () => {
    bannerContent.style.cssText =
      bannerContent.style.cssText + "flex-direction:column;";
    text.appendChild(optionsContainer);
    acceptButton.textContent = "Accepter tout";
    refuseButton.textContent = "Refuser tout";

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

    acceptButton.textContent = "Accepter et Fermer";
    refuseButton.textContent = "Refuser";
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
    detail.style.cssText = detail.style.cssText + "max-height:150px;";
    setActiveCategory({ category: category, detail: detail, carret: carret });
  };

  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;top:0;height;100%;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.7);display:flex;align-items:flex-end;z-index:999999;";

  const banner = document.createElement("div");
  const bannerPadding =
    window.screen.width < 1024 ? "padding:1em;" : "padding:2em 3em;";
  banner.style.cssText = `${bannerPadding};background-color:white;border-top-left-radius:8px;border-top-right-radius:8px;max-height:100%;overflow:auto;`;

  const header = document.createElement("div");
  header.style.cssText =
    "margin-bottom: 16px;display:flex;justify-content:space-between";

  const title = document.createElement("h1");
  title.textContent = "Experience de navigation";
  title.style.cssText = "font-size: 20px;font-weight: bold";

  const technicalCookieDetail = document.createElement("div");
  technicalCookieDetail.style.cssText =
    "flex-basis: 100%;font-weight:normal;margin-top:8px;overflow:hidden;max-height:0;transition:max-height 300ms ease-out 0s;";
  technicalCookieDetail.textContent =
    "Ces cookies sont nécessaires au bon fonctionnement du site ainsi qu’à la conservation de votre consentement en matière de cookies. Ils sont requis et ne peuvent être désactivés.";

  const technicalCookieCarret = document.createElement("span");
  technicalCookieCarret.textContent = "^";
  technicalCookieCarret.style.cssText = `transform: rotate(90deg);font-size: 30px;font-family: monospace;color: ${color};height:20px;line-height:30px;transition:transform 300ms linear 0s;`;

  const technicalCookieTextContent = document.createElement("span");
  technicalCookieTextContent.textContent = "Cookies techniques";
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
  statisticCookieDetail.textContent =
    "Ces cookies nous permettent de comprendre comment vous naviguez sur notre site et d'en suivre la fréquentation. Vous nous aidez ainsi à mesurer la performance du site et à améliorer la qualité de nos services.";

  const statisticCookieCarret = document.createElement("span");
  statisticCookieCarret.textContent = "^";
  statisticCookieCarret.style.cssText = `transform: rotate(90deg);font-size: 30px;font-family: monospace;color: ${color};height:20px;line-height:30px;transition:transform 300ms linear 0s;`;

  const statisticCookieTextContent = document.createElement("span");
  statisticCookieTextContent.textContent = "Mesure d'audience";
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
  adCookieDetail.textContent =
    "Ces cookies permettent à nos partenaires de vous proposer des publicités plus pertinentes sur Internet. Ils permettent la collecte et le traitement de données d'utilisation du site afin de vous proposer des publicités sur des sites ou applications tierces. Ce choix n'impactera pas le nombre de publicités que vous verrez sur Internet.";

  const adCookieCarret = document.createElement("span");
  adCookieCarret.textContent = "^";
  adCookieCarret.style.cssText = `transform: rotate(90deg);font-size: 30px;font-family: monospace;color: ${color};height:20px;line-height:30px;transition:transform 300ms linear 0s;`;

  const adCookieTextContent = document.createElement("span");
  adCookieTextContent.textContent = "Publicité personnalisée";
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
  adStatisticCookieDetail.textContent =
    "Ces cookies permettent la collecte et le traitement de données d'utilisation du site afin de mesurer la performance de nos campagnes publicitaires et de partager ces données avec nos partenaires. Ce choix n'impactera pas le nombre de publicités que vous verrez sur Internet.";

  const adStatisticCarret = document.createElement("span");
  adStatisticCarret.textContent = "^";
  adStatisticCarret.style.cssText = `transform: rotate(90deg);font-size: 30px;font-family: monospace;color: ${color};height:20px;line-height:30px;transition:transform 300ms linear 0s;`;

  const adStatisticTextContent = document.createElement("span");
  adStatisticTextContent.textContent = "Mesure de performance publicitaire";
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
  optionsButton.textContent = "Options";
  optionsButton.style.cssText = `color:${color};font-weight:bold;font-size:14px;background:0;border:0;padding:0;line-height:unset;`;
  optionsButton.onclick = () =>
    text.contains(optionsContainer) ? closeOptions() : openOptions();

  const bannerContent = document.createElement("div");
  const bannerContentMobileCss =
    window.screen.width < 1024 ? "flex-direction:column" : "";
  bannerContent.style.cssText = `display:flex;align-items:center;${bannerContentMobileCss};`;

  const text = document.createElement("div");
  text.textContent = `${script.dataset.companyName} et ses partenaires déposent des cookies et utilisent des informations non sensibles provenant de votre appareil pour améliorer ses produits, afficher des publicités et proposer des contenus personnalisés. Vous pouvez accepter ou refuser ces services. Vos choix sont conservés pendant 12 mois. Vous pouvez les modifier à tout moment en cliquant sur le lien dédié en bas de page. Pour en savoir plus sur les cookies, les données utilisées et leur traitement, vous pouvez consulter notre `;
  text.style.cssText = "font-size:13px;margin:0 12px 12px 0;";

  const link = document.createElement("a");
  link.textContent = "politique en matière de cookies.";
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
  refuseButton.textContent = "Refuser";
  refuseButton.style.cssText = `width:max-content;min-width:8em;color:white;background-color:${color};border-width:1px;border-color:${color};border-radius:8px;margin:12px;padding:8px 18px;line-height:unset;`;
  refuseButton.onclick = () =>
    setCookies({
      statistics: false,
      marketing: false,
      personnalization: false,
    });

  const acceptButtonContainer = document.createElement("div");
  const acceptButton = document.createElement("button");
  acceptButton.textContent = "Accepter & Fermer";
  acceptButton.style.cssText = `width:max-content;min-width:8em;color:white;background-color:${color};border-width:1px;border-color:${color};border-radius:8px;margin:12px;padding:8px 18px;line-height:unset;`;
  acceptButton.onclick = () =>
    setCookies({ statistics: true, marketing: true, personnalization: true });

  const saveButtonContainer = document.createElement("div");
  const saveButton = document.createElement("button");
  saveButton.textContent = "Enregistrer";
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
