(()=>{"use strict";var e={165:(e,t)=>{function n(e){return!(e.classList.contains("dropdown-option-default-symbol")||e.classList.contains("dropdown-option-symbols")||e.classList.contains("dropdown-arrow-symbol"))}function o(e){let t=Array.from(e.children);return t.slice(0,t.findIndex((e=>"SELECT"===e.tagName)))}function s(e){var t;if(null===(t=document.getElementById("dropdown-debug"))||void 0===t?void 0:t.checked)return;let n=document.getElementsByClassName("selected"),o=document.getElementsByClassName("options"),s=-1;for(let t=0;t<n.length;t++)e===n[t]?s=t:n[t].childNodes[1].classList.remove("arrow-active");for(let e=0;e<o.length;e++)e!==s&&o[e].classList.add("dropdown-display-none")}function i(e){var t;e.stopPropagation(),(null===(t=this.parentElement)||void 0===t?void 0:t.classList.contains("dropdown-disabled"))||(s(this),this.nextSibling&&this.nextSibling.classList.toggle("dropdown-display-none"),this.childNodes[1].classList.toggle("arrow-active"))}function l(e,t){e.classList.remove("placeholder");let n=Array.from(e.childNodes).find((e=>e.classList.contains("text")));n&&(n.innerHTML=this.innerText),t.selectedIndex=this.selectIndex,this.parentNode&&this.parentNode.previousSibling&&this.parentNode.previousSibling.click()}function d(e,t){let s=document.createElement("div");s.setAttribute("class","selected placeholder");let i=document.createElement("div");i.setAttribute("class","text"),i.innerHTML=t.options[t.selectedIndex].innerHTML,s.appendChild(i);let l=document.createElement("div");l.setAttribute("class","arrow-container");let d=function(e){if(n(e)||e.classList.contains("dropdown-arrow-symbol"))return o(e)[0]}(e);return d||(d=document.createElement("div"),d.classList.add("default-symbol")),l.appendChild(d),s.appendChild(l),s}function r(e,t,s){let i=document.createElement("div");i.setAttribute("class","options dropdown-display-none");let d=function(e,t){let s=o(e);if(s){if(0==s.length)return s;if(n(e)||e.classList.contains("dropdown-option-default-symbol")){let e=s[0];s=s.splice(1);for(let n=s.length;n<t;n++)s.push(e.cloneNode(!0));return console.log(s),s}return e.classList.contains("dropdown-option-symbols")?s:void 0}}(e,t.options.length);Array.from(t.options).slice(1).forEach(((e,n)=>{let o;o=function(e,t){let n=document.createElement("div");return n.setAttribute("class","option"),t?t.classList.add("custom-symbol"):(t=document.createElement("div")).setAttribute("class","default-symbol"),n.appendChild(t),n.innerHTML+=e.innerHTML,n}(e,d?d[n]:void 0),o.selectIndex=n+1,o.addEventListener("click",l.bind(o,s,t)),i.appendChild(o)}));let r=Array.from(e.children);return Array.from(e.children).slice(0,r.findIndex((e=>"SELECT"===e.tagName))).forEach((e=>e.classList.add("dropdown-display-none"))),i}!function(){for(let e of document.querySelectorAll(".dropdown-custom, .dropdown-general, .dropdown-general-symbol")){let t=e.getElementsByTagName("SELECT")[0];if(void 0===t)continue;let n=d(e,t),o=r(e,t,n);e.appendChild(n),e.appendChild(o),n.addEventListener("click",i)}document.addEventListener("click",s)}()}},t={};!function n(o){if(t[o])return t[o].exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}(165)})();