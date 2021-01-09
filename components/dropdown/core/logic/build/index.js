(()=>{"use strict";var e={786:function(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.createOptionDiv=t.createOptionsDiv=t.createSelectedDiv=void 0;const r=l(n(533)),c=l(n(411));function d(e,t,n,i){let o=document.createElement("div");return o.setAttribute("class","option"),i||(n?(n.classList.add("custom-symbol"),o.appendChild(n)):e.classList.contains("dropdown-general-symbol")&&((n=document.createElement("div")).setAttribute("class","default-symbol"),o.appendChild(n))),o.innerHTML+=t.innerHTML,o}t.createSelectedDiv=function(e,t){let n=document.createElement("div");n.setAttribute("class","selected placeholder");let i=document.createElement("div");i.setAttribute("class","content"),i.innerHTML=r.getPlaceholder(e,t).innerHTML,n.appendChild(i);let o=document.createElement("div");o.setAttribute("class","arrow-container");let l=r.getCustomSymbol(e,"arrow-symbol");return l||(l=document.createElement("div"),l.classList.add("default-symbol")),o.appendChild(l),n.appendChild(o),n},t.createOptionsDiv=function(e,t,n){let i=document.createElement("div");i.setAttribute("class","options dropdown-hidden");let o=r.getCustomSymbol(e,"option-default-symbol");null==o||o.remove();let l=Math.max([...e.children].filter((e=>e.classList.contains("option"))).length,t?t.options.length-1:0),s=r.getOptionSymbols(e,o,l);return r.getOptions(e,t,l).forEach(((o,l)=>{let r=!o.classList.contains("text"),a=d(e,o,s[l],r);a.selectIndex=l+1,a.addEventListener("click",c.optionClicked.bind(a,n,t,r)),i.appendChild(a)})),i},t.createOptionDiv=d},411:(e,t)=>{function n(e){var t,n;if(null===(t=document.getElementById("dropdown-debug"))||void 0===t?void 0:t.checked)return;let i=document.getElementsByClassName("selected"),o=document.querySelectorAll(".options"),l=-1;for(let t=0;t<i.length;t++)e===i[t]?l=t:null===(n=i[t].children[1])||void 0===n||n.classList.remove("arrow-active");for(let e=0;e<o.length;e++)e!==l&&o[e].classList.add("dropdown-hidden")}Object.defineProperty(t,"__esModule",{value:!0}),t.optionClicked=t.selectedClicked=t.closeAllDropdowns=void 0,t.closeAllDropdowns=n,t.selectedClicked=function(e){var t,i,o;e.stopPropagation(),(null===(t=this.parentElement)||void 0===t?void 0:t.classList.contains("dropdown-disabled"))||(n(this),this.nextSibling&&(null===(i=this.nextSibling)||void 0===i||i.classList.toggle("dropdown-hidden")),null===(o=this.children[1])||void 0===o||o.classList.toggle("arrow-active"))},t.optionClicked=function(e,t,n){e.classList.remove("placeholder");let i=[...e.children].find((e=>e.classList.contains("content")));i&&(i.innerHTML=n?this.innerHTML:this.innerText),t&&(t.selectedIndex=this.selectIndex),e.click()}},165:function(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const r=l(n(411)),c=l(n(786));!function(){for(let e of document.querySelectorAll(".dropdown-custom, .dropdown-general, .dropdown-general-symbol")){let t=e.getElementsByTagName("select")[0],n=c.createSelectedDiv(e,t),i=c.createOptionsDiv(e,t,n);e.appendChild(n),e.appendChild(i),n.addEventListener("click",r.selectedClicked)}document.addEventListener("click",r.closeAllDropdowns)}()},533:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getOptions=t.getPlaceholder=t.getOptionSymbols=t.getCustomSymbol=void 0,t.getCustomSymbol=function(e,t){return Array.from(e.children).find((e=>e.classList.contains(t)))},t.getOptionSymbols=function(e,t,n){let i=Array(n).fill(void 0);return Array.from(e.children).filter((e=>"SELECT"!==e.tagName)).forEach((e=>{let t=Number(e.getAttribute("index"));t&&(i[t]=e)})),Array.from(e.children).filter((e=>"SELECT"!==e.tagName)).forEach((e=>{null==e.getAttribute("index")&&(i[i.findIndex((e=>void 0===e))]=e)})),i=i.map((e=>void 0===e?null==t?void 0:t.cloneNode(!0):e)),i.forEach((e=>e&&"style"in e?e.style.flexShrink="0":void 0)),i},t.getPlaceholder=function(e,t){let n=[...e.children].find((e=>e.classList.contains("option")));if(n)return n;let i=document.createElement("div");return t&&(i.innerHTML=t.options[t.selectedIndex].innerHTML),i},t.getOptions=function(e,t,n){let i=Array(n).fill(void 0);return[...e.children].filter((e=>e.classList.contains("option"))).forEach((e=>{let t=Number(e.getAttribute("index"));isNaN(t)||(i[t]=e)})),[...e.children].filter((e=>e.classList.contains("option"))).forEach((e=>{null==e.getAttribute("index")&&(i[i.findIndex((e=>void 0===e))]=e)})),i.forEach(((e,n)=>{if(!e){let e=document.createElement("div");e.setAttribute("class","text"),e.innerHTML=t.options[n+1].innerHTML,i[n]=e}})),i}}},t={};!function n(i){if(t[i])return t[i].exports;var o=t[i]={exports:{}};return e[i].call(o.exports,o,o.exports,n),o.exports}(165)})();