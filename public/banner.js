(() => {
  const script = document.getElementById("cookie-consent-script");

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

    if (window.screen.width > 768) {
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

  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;top:0;height;100%;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.7);display:flex;align-items:flex-end";

  const banner = document.createElement("div");
  banner.style.cssText =
    "background-color:white;padding:24px;border-top-left-radius:8px;border-top-right-radius:8px";

  const header = document.createElement("div");
  header.style.cssText =
    "margin-bottom: 16px;display:flex;justify-content:space-between";

  const title = document.createElement("h1");
  title.textContent = "Experience de navigation";
  title.style.cssText = "font-size: 20px;font-weight: bold";

  const technicalCookieText = document.createElement("h5");
  technicalCookieText.textContent = "Cookies techniques";
  technicalCookieText.style.cssText = "width:200px;font-size:14px;";

  const technicalCookie = document.createElement("div");
  technicalCookie.style.cssText =
    "margin:16px 0;display:flex;align-items:center;justify-content:space-around;font-weight:bold;";
  technicalCookie.append(technicalCookieText, optionSelector("technical"));

  const statisticCookieText = document.createElement("h5");
  statisticCookieText.textContent = "Mesure d'audience";
  statisticCookieText.style.cssText = "width:200px;font-size:14px;";

  const statisticCookie = document.createElement("div");
  statisticCookie.style.cssText =
    "margin:16px 0;display:flex;align-items:center;justify-content:space-around;font-weight:bold;";
  statisticCookie.append(statisticCookieText, optionSelector("statistics"));

  const adCookieText = document.createElement("h5");
  adCookieText.textContent = "Publicité personnalisée";
  adCookieText.style.cssText = "width:200px;font-size:14px;";

  const adCookie = document.createElement("div");
  adCookie.style.cssText =
    "margin:16px 0;display:flex;align-items:center;justify-content:space-around;font-weight:bold;";
  adCookie.append(adCookieText, optionSelector("personnalization"));

  const adStatisticCookieText = document.createElement("h5");
  adStatisticCookieText.textContent = "Mesure de performance publicitaire";
  adStatisticCookieText.style.cssText = "width:200px;font-size:14px;";

  const adStatisticCookie = document.createElement("div");
  adStatisticCookie.style.cssText =
    "margin:16px 0;display:flex;align-items:center;justify-content:space-around;font-weight:bold;";
  adStatisticCookie.append(adStatisticCookieText, optionSelector("marketing"));

  const optionsContainer = document.createElement("div");
  optionsContainer.append(
    technicalCookie,
    statisticCookie,
    adCookie,
    adStatisticCookie
  );

  const optionsButton = document.createElement("button");
  optionsButton.textContent = "Options";
  optionsButton.style.cssText =
    "color:#d97706;font-weight:bold;font-size:14px;background:0;border:0;padding:0;line-height:unset;";
  optionsButton.onclick = () =>
    text.contains(optionsContainer) ? closeOptions() : openOptions();

  const bannerContent = document.createElement("div");
  const bannerContentMobileCss =
    window.screen.width < 700 ? "flex-direction:column" : "";
  bannerContent.style.cssText = `display:flex;align-items:center;${bannerContentMobileCss};`;

  const text = document.createElement("div");
  text.textContent = `${script.getAttribute(
    "data-company-name"
  )} et ses partenaires déposent des cookies et utilisent des informations non sensibles provenant de votre appareil pour améliorer ses produits, afficher des publicités et proposer des contenus personnalisés. Vous pouvez accepter ou refuser ces services. Vos choix sont conservés pendant 12 mois. Vous pouvez les modifier à tout moment en cliquant sur le lien dédié en bas de page. Pour en savoir plus sur les cookies, les données utilisées et leur traitement, vous pouvez consulter notre `;
  text.style.cssText = "font-size:12px;margin:0 12px 12px 0;";

  const link = document.createElement("a");
  link.textContent = "politique en matière de cookies.";
  link.href = script.getAttribute("data-privacy-policy-link");
  link.target = "_blank";
  link.style.cssText = "color:#d97706;";

  const buttonContainer = document.createElement("div");
  buttonContainer.style.cssText = "display:flex;";

  const refuseButtonContainer = document.createElement("div");
  const refuseButton = document.createElement("button");
  refuseButton.textContent = "Refuser";
  refuseButton.style.cssText =
    "width:max-content;min-width:8em;color:white;background-color:#d97706;border-width:1px;border-color:#d97706;border-radius:8px;margin:12px;padding:8px 18px;line-height:unset;";
  refuseButton.onclick = () =>
    setCookies({
      statistics: false,
      marketing: false,
      personnalization: false,
    });

  const acceptButtonContainer = document.createElement("div");
  const acceptButton = document.createElement("button");
  acceptButton.textContent = "Accepter & Fermer";
  acceptButton.style.cssText =
    "width:max-content;min-width:8em;color:white;background-color:#d97706;border-width:1px;border-color:#d97706;border-radius:8px;margin:12px;padding:8px 18px;line-height:unset;";
  acceptButton.onclick = () =>
    setCookies({ statistics: true, marketing: true, personnalization: true });

  const saveButtonContainer = document.createElement("div");
  const saveButton = document.createElement("button");
  saveButton.textContent = "Enregistrer";
  saveButton.style.cssText =
    "width:max-content;min-width:8em;color:white;background-color:#d97706;border-width:1px;border-color:#d97706;border-radius:8px;margin:12px;padding:8px 18px;opacity:0.3;line-height:unset;";
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
