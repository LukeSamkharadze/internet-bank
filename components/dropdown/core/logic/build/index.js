(()=>{"use strict";var e={786:function(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return l(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.createCustomOptionDiv=t.createCustomOptionsDiv=t.createCustomSelectedDiv=t.createOptionDiv=t.createOptionsDiv=t.createSelectedDiv=void 0;const r=o(n(533)),d=o(n(411));function c(e,t,n){let i=document.createElement("div");return i.setAttribute("class","option"),n?(n.classList.add("custom-symbol"),i.appendChild(n)):e.classList.contains("dropdown-general-symbol")&&((n=document.createElement("div")).setAttribute("class","default-symbol"),i.appendChild(n)),i.innerHTML+=t.innerHTML,i}function s(e,t){let n=document.createElement("div");return n.setAttribute("class","option"),n.innerHTML=t.innerHTML,n}t.createSelectedDiv=function(e,t){let n=document.createElement("div");n.setAttribute("class","selected placeholder");let i=document.createElement("div");i.setAttribute("class","text"),i.innerHTML=t.options[t.selectedIndex].innerHTML,n.appendChild(i);let l=document.createElement("div");l.setAttribute("class","arrow-container");let o=r.getCustomSymbol(e,"arrow-symbol");return o||(o=document.createElement("div"),o.classList.add("default-symbol")),l.appendChild(o),n.appendChild(l),n},t.createOptionsDiv=function(e,t,n){let i=document.createElement("div");i.setAttribute("class","options dropdown-hidden");let l=r.getCustomSymbol(e,"option-default-symbol");null==l||l.remove();let o=r.getOptionSymbols(e,l,t.options.length);return Array.from(t.options).slice(1).forEach(((l,r)=>{let s=c(e,l,o[r]);s.selectIndex=r+1,s.addEventListener("click",d.optionClicked.bind(s,n,t,!1)),i.appendChild(s)})),i},t.createOptionDiv=c,t.createCustomSelectedDiv=function(e){let t=document.createElement("div");t.setAttribute("class","selected placeholder");let n=document.createElement("div");n.setAttribute("class","text"),n.appendChild(e.children[0]),t.appendChild(n);let i=document.createElement("div");i.setAttribute("class","arrow-container");let l=r.getCustomSymbol(e,"arrow-symbol");return l||(l=document.createElement("div"),l.classList.add("default-symbol")),i.appendChild(l),t.appendChild(i),t},t.createCustomOptionsDiv=function(e,t,n){let i=document.createElement("div");return i.setAttribute("class","options dropdown-hidden"),Array.from(e.children).filter((e=>e.classList.contains("option"))).slice(1).forEach(((e,l)=>{let o=s(0,e);o.selectIndex=l+1,o.addEventListener("click",d.optionClicked.bind(o,n,t,!0)),i.appendChild(o)})),i},t.createCustomOptionDiv=s},411:(e,t)=>{function n(e){var t,n;if(null===(t=document.getElementById("dropdown-debug"))||void 0===t?void 0:t.checked)return;let i=document.getElementsByClassName("selected"),l=document.querySelectorAll(".options, .dropdown-full-custom .select .options"),o=-1;for(let t=0;t<i.length;t++)e===i[t]?o=t:null===(n=i[t].children[1])||void 0===n||n.classList.remove("arrow-active");for(let e=0;e<l.length;e++)e!==o&&l[e].classList.add("dropdown-hidden")}Object.defineProperty(t,"__esModule",{value:!0}),t.optionClicked=t.selectedClicked=t.closeAllSelect=void 0,t.closeAllSelect=n,t.selectedClicked=function(e){var t,i,l;e.stopPropagation(),(null===(t=this.parentElement)||void 0===t?void 0:t.classList.contains("dropdown-disabled"))||(n(this),this.nextSibling&&(null===(i=this.nextSibling)||void 0===i||i.classList.toggle("dropdown-hidden")),null===(l=this.children[1])||void 0===l||l.classList.toggle("arrow-active"))},t.optionClicked=function(e,t,n){e.classList.remove("placeholder");let i=[...e.children].find((e=>e.classList.contains("text")));i&&(i.innerHTML=n?this.innerHTML:this.innerText),t&&(t.selectedIndex=this.selectIndex),e.click()}},165:function(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return l(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const r=o(n(411)),d=o(n(786));!function(){for(let e of document.querySelectorAll(".dropdown-custom, .dropdown-general, .dropdown-general-symbol, .dropdown-full-custom")){let t,n=e.getElementsByTagName("select")[0];if(e.classList.contains("dropdown-full-custom")){t=d.createCustomSelectedDiv(e);let i=d.createCustomOptionsDiv(e,n,t);e.appendChild(t),e.appendChild(i)}else{if(void 0===n)continue;t=d.createSelectedDiv(e,n);let i=d.createOptionsDiv(e,n,t);e.appendChild(t),e.appendChild(i)}t.addEventListener("click",r.selectedClicked)}document.addEventListener("click",r.closeAllSelect)}()},533:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getOptionSymbols=t.getCustomSymbol=void 0,t.getCustomSymbol=function(e,t){return Array.from(e.children).find((e=>e.classList.contains(t)))},t.getOptionSymbols=function(e,t,n){let i=Array(n).fill(void 0);return Array.from(e.children).filter((e=>"SELECT"!==e.tagName)).forEach((e=>{null!=e.getAttribute("index")&&(i[e.getAttribute("index")]=e)})),Array.from(e.children).filter((e=>"SELECT"!==e.tagName)).forEach((e=>{null==e.getAttribute("index")&&(i[i.findIndex((e=>void 0===e))]=e)})),i=i.map((e=>void 0===e?null==t?void 0:t.cloneNode(!0):e)),i.forEach((e=>e&&"style"in e?e.style.flexShrink="0":void 0)),i}}},t={};!function n(i){if(t[i])return t[i].exports;var l=t[i]={exports:{}};return e[i].call(l.exports,l,l.exports,n),l.exports}(165)})();