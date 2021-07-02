(this.webpackJsonpcookip=this.webpackJsonpcookip||[]).push([[0],{11:function(e,t,c){},14:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),r=c(5),s=c.n(r),o=(c(11),c(4)),i=c.n(o),l=c(6),d=c(2),b=c(0),u=function(e){var t=e.children,c=e.onClick;return Object(b.jsx)("button",{className:"bg-blue-600 text-white px-6 py-3 rounded-md transform hover:scale-110 transition duration-300 mt-14 self-center w-52 font-bold",onClick:function(e){return c&&c(e)},children:t})},j=function(e){var t=e.children,c=e.onClick;return Object(b.jsx)("div",{className:"fixed w-full h-full flex justify-center items-center bg-opacity-70 bg-black",children:Object(b.jsxs)("div",{className:"bg-white p-8 rounded-xl sm:w-4/5",children:[Object(b.jsx)("div",{className:"bg-black text-white p-8 rounded-xl break-all",children:Object(b.jsx)("code",{className:"text-xs sm:text-base",children:t})}),Object(b.jsx)("div",{className:"text-right",children:Object(b.jsx)(u,{onClick:c,children:"Copy & Preview"})})]})})},m=function(){var e=Object(n.useState)("#2563eb"),t=Object(d.a)(e,2),c=t[0],a=t[1],r=Object(n.useState)(!0),s=Object(d.a)(r,2),o=s[0],m=s[1],p=Object(n.useState)(),x=Object(d.a)(p,2),h=x[0],g=x[1],O=Object(n.useState)(),f=Object(d.a)(O,2),w=f[0],v=f[1],y=Object(n.useState)(""),N=Object(d.a)(y,2),k=N[0],C=N[1],E=Object(n.useState)(),S=Object(d.a)(E,2),G=S[0],L=S[1],J=document.getElementsByTagName("html")[0].lang.substring(0,2),P=function(){var e=Object(l.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),w){e.next=3;break}return e.abrupt("return");case 3:n="".concat(window.location.href,"/banner.js"),C('<script>\n        var s = document.createElement("script");\n        s.id = "cookip-script";\n        s.type = "text/javascript";\n        s.dataset.color = "'.concat(c,'";\n        s.dataset.language = "').concat(J,'";\n        s.dataset.overlay = "').concat(o,'";\n        ').concat(h?'s.dataset.privacyPolicyLink = "'.concat(h,'";'):";",'\n        s.dataset.companyName = "').concat(w,'";s.src = "').concat(n,'";\n        document.head.appendChild(s);\n      <\/script>')),L(n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("form",{className:"flex flex-col w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 mb-14",onSubmit:P,children:[Object(b.jsx)("label",{className:"mt-14 mb-6 text-xl",children:Object(b.jsx)("span",{className:"border-b border-blue-600 pb-2",children:"Color"})}),Object(b.jsx)("div",{className:"self-center w-min rounded-full",style:{backgroundColor:c},children:Object(b.jsx)("input",{type:"color",onChange:function(e){return a(e.target.value)},value:c,className:"w-20 h-20 rounded-full cursor-pointer opacity-0"})}),Object(b.jsx)("label",{className:"mt-14 mb-6 text-xl",children:Object(b.jsx)("span",{className:"border-b border-blue-600 pb-2",children:"Dark background"})}),Object(b.jsxs)("div",{className:"self-center",children:[Object(b.jsxs)("label",{children:[Object(b.jsx)("input",{type:"radio",id:"yes",checked:o,onChange:function(){return m(!0)},className:"mr-2"}),"Yes"]}),Object(b.jsxs)("label",{children:[Object(b.jsx)("input",{type:"radio",id:"no",checked:!o,onChange:function(){return m(!1)},className:"ml-12 mr-2"}),"No"]})]}),Object(b.jsx)("label",{className:"mt-14 mb-6 text-xl",children:Object(b.jsx)("span",{className:"border-b border-blue-600 pb-2",children:"Privacy policy link"})}),Object(b.jsx)("input",{type:"url",placeholder:"https://www.example.com/cookies",onChange:function(e){return g(e.target.value)},className:"border p-2 rounded-md"}),Object(b.jsx)("label",{className:"mt-14 mb-6 text-xl",children:Object(b.jsx)("span",{className:"border-b border-blue-600 pb-2",children:"Company name"})}),Object(b.jsx)("input",{type:"text",placeholder:"My Company",onChange:function(e){return v(e.target.value)},className:"border p-2 rounded-md",required:"required"}),Object(b.jsx)(u,{children:"Generate"})]}),k&&Object(b.jsx)(j,{onClick:function(){navigator.clipboard.writeText(k),window.gtag&&window.gtag("event","copy_script");var e=document.createElement("script");e.id="cookip-script",e.type="text/javascript",e.src=G,e.dataset.color=c,e.dataset.language=J,e.dataset.overlay=o,h&&(e.dataset.privacyPolicyLink=h),e.dataset.companyName=w,e.dataset.preview=!0,C(""),document.head.appendChild(e)},children:k})]})},p=function(){return Object(n.useEffect)((function(){window.addEventListener("cookip_set",(function(){if(JSON.parse(document.cookie.split("; ").find((function(e){return e.startsWith("cookip_".concat(document.location.hostname,"="))})).split("=")[1]).statistics){var e=document.createElement("script");e.src="https://www.googletagmanager.com/gtag/js?id=G-BJY35G7VTC",e.async=!0;var t=document.createElement("script");t.textContent="window.dataLayer = window.dataLayer || [];window.gtag = function(){dataLayer.push(arguments);};window.gtag('js', new Date());window.gtag('config', 'G-BJY35G7VTC');",document.head.append(e,t)}}))}),[]),Object(b.jsxs)("div",{className:"flex flex-col items-center",children:[Object(b.jsx)("h1",{className:"text-blue-600 text-6xl font-title font-bold w-11/12 text-center my-8",children:"COOKIP"}),Object(b.jsx)("div",{className:"text-lg text-center mb-2",children:"Free cookie consent banner script generator."}),Object(b.jsx)("div",{className:"text-lg text-center mb-2",children:"Can be used on its own or via Google Tag Manager."}),Object(b.jsx)("div",{className:"text-lg text-center",children:"Available in English and French."}),Object(b.jsx)(m,{})]})};s.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(p,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.03e1b68c.chunk.js.map