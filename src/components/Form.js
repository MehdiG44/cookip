import React, { useState } from "react";
import Button from "./Button";
import ScriptModal from "./ScriptModal";

const Form = () => {
  const [overlay, setOverlay] = useState(false);
  const [privacyPolicyLink, setPrivacyPolicyLink] = useState();
  const [companyName, setCompanyName] = useState();
  const [script, setScript] = useState("");
  const [src, setSrc] = useState();

  const submitForm = async (event) => {
    event.preventDefault();
    if (!companyName || !privacyPolicyLink) return;

    const url = `${window.location.href}banner.js`;
    const attributes = `data-overlay=${overlay} data-privacy-policy-link=${privacyPolicyLink} data-company-name=${companyName}`;
    setScript(
      `<script id="cookie-consent-script" type="text/javascript" src=${url} ${attributes}></script>`
    );
    setSrc(url);
  };

  const copyScriptAndPreview = () => {
    navigator.clipboard.writeText(script);
    const scriptElement = document.createElement("script");
    scriptElement.id = "cookie-consent-script";
    scriptElement.type = "text/javascript";
    scriptElement.src = src;
    scriptElement.setAttribute("data-overlay", overlay);
    scriptElement.setAttribute("data-privacy-policy-link", privacyPolicyLink);
    scriptElement.setAttribute("data-company-name", companyName);
    setScript("");
    document.head.appendChild(scriptElement);
  };

  return (
    <>
      <form
        className="flex flex-col w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 my-14"
        onSubmit={submitForm}
      >
        <label className="mt-14 mb-6 text-xl">
          <span className="border-b border-yellow-600 pb-2">
            Dark background
          </span>
        </label>
        <div className="self-center">
          <label>
            <input
              type="radio"
              id="yes"
              checked={overlay}
              onChange={() => setOverlay(true)}
              className="mr-2"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              id="no"
              checked={!overlay}
              onChange={() => setOverlay(false)}
              className="ml-12 mr-2"
            />
            No
          </label>
        </div>
        <label className="mt-14 mb-6 text-xl">
          <span className="border-b border-yellow-600 pb-2">
            Privacy policy link
          </span>
        </label>
        <input
          type="url"
          placeholder="https://www.example.com/cookies"
          onChange={(event) => setPrivacyPolicyLink(event.target.value)}
          className="border p-2 rounded-md"
          required="required"
        />
        <label className="mt-14 mb-6 text-xl">
          <span className="border-b border-yellow-600 pb-2">Company name</span>
        </label>
        <input
          type="text"
          placeholder="My Company"
          onChange={(event) => setCompanyName(event.target.value)}
          className="border p-2 rounded-md"
          required="required"
        />
        <Button>Generate</Button>
      </form>
      {script && (
        <ScriptModal onClick={copyScriptAndPreview}>{script}</ScriptModal>
      )}
    </>
  );
};

export default Form;
