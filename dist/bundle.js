!function(e){var n={};function t(r){if(n[r])return n[r].exports;var c=n[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,t),c.l=!0,c.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)t.d(r,c,function(n){return e[n]}.bind(null,c));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);var r={googleUrl:"https://maps.googleapis.com/maps/api/geocode/json",googlePlacesURL:"https://maps.googleapis.com/maps/api/place/autocomplete/json?",googleApiKey:"AIzaSyD9CTAjqEvVVgogf-dvLyFwTpV_mn4QjTM",darkskyUrl:"https://api.darksky.net/forecast/",darkskyApiKey:"e8785063f67a8ecafb09ba1655b6cb25"};function c(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o=document.querySelector(".overview-wrapper"),a=c(document.querySelectorAll(".temp-button")),i=document.querySelector(".default-temp"),l=document.querySelector(".temp-f"),u=document.querySelector(".temp-c"),s=c(document.querySelectorAll(".current-value")),d=c(document.querySelectorAll(".high-value")),y=document.querySelector(".high-value-f"),p=document.querySelector(".high-value-c"),m=c(document.querySelectorAll(".low-value")),g=document.querySelector(".low-value-f"),h=document.querySelector(".low-value-c"),f=document.querySelector(".city"),w=document.querySelector(".menu-container"),v=document.querySelector(".menu"),M=document.querySelector(".highlighter"),L=c(document.querySelectorAll(".weather-icon"));function S(){var e=this;!this.className.includes("active")&&(d.map(function(e){e.className.includes("active")?e.classList.remove("active"):e.classList.add("active")}),m.map(function(e){e.className.includes("active")?e.classList.remove("active"):e.classList.add("active")}),s.map(function(e){e.className.includes("active")?e.classList.remove("active"):e.classList.add("active")})),!this.className.includes("active")&&(M.style.left="".concat(e.getBoundingClientRect().left+window.scrollY,"px")),!this.className.includes("active")&&a.map(function(e){e.className.includes("active")?e.classList.remove("active"):e.classList.add("active")})}function T(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}M.style.width="".concat(i.getBoundingClientRect().width,"px"),M.style.left="".concat(i.getBoundingClientRect().left,"px"),M.style.height="".concat(i.getBoundingClientRect().height,"px"),M.style.top="".concat(i.getBoundingClientRect().top+window.scrollY,"px");T(document.querySelectorAll(".daily-update")),T(document.querySelectorAll(".hour-update"));var _=T(document.querySelectorAll(".hour-title")),H=T(document.querySelectorAll(".hour-update img")),b=T(document.querySelectorAll(".temp-title")),A=T(document.querySelectorAll(".day-of-week")),q=T(document.querySelectorAll(".daily-update img")),j=T(document.querySelectorAll(".low-temp")),k=T(document.querySelectorAll(".high-temp")),x=(document.querySelector(".forecast-wrapper"),document.querySelector(".today-summary")),E=document.querySelector(".week-summary"),O=document.querySelector(".wind-speed-result"),P=document.querySelector(".humidity-result"),C=document.querySelector(".visibility-result"),N=document.querySelector(".uv-index-result"),I=document.querySelector(".precipitation-result"),D=document.querySelector(".dew-point"),R=document.querySelector(".welcome-wrapper"),B=document.querySelector(".enter-city"),U=document.querySelector(".find-location"),z=document.querySelector("form"),K=document.querySelector(".search-button");function W(e){e.preventDefault();var n=B.value.trim(),t="?address=".concat(n,"&key=").concat(r.googleApiKey),c=0;fetch(r.googleUrl+t).then(function(e){return e.json()}).then(function(e){console.log(e);var n="".concat(e.results[0].geometry.location.lat,",").concat(e.results[0].geometry.location.lng);return e.results[0].address_components.map(function(e){e.types.includes("locality")&&(f.innerHTML=e.long_name)}),fetchJsonp(r.darkskyUrl+r.darkskyApiKey+n)}).then(function(e){return e.json()}).then(function(e){console.log(e),l.innerHTML=Math.round(e.currently.temperature),y.innerHTML=Math.round(e.daily.data[0].temperatureMax),g.innerHTML=Math.round(e.daily.data[0].temperatureLow),u.innerHTML=Math.round((l.innerHTML-32)*(5/9)),p.innerHTML=Math.round((y.innerHTML-32)*(5/9)),h.innerHTML=Math.round((g.innerHTML-32)*(5/9)),"clear-day"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/clear-day.png"}),"clear-night"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/clear-night.png"}),"partly-cloudy-day"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/partly-cloudy-day.png"}),"partly-cloudy-night"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/partly-cloudy-night.png"}),"cloudy"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/cloudy.png"}),"rain"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/rain.png"}),"fog"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/fog.png"}),"wind"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/wind.png"}),e.hourly.data.map(function(e){if(!(c>23)){var n=new Date(1e3*e.time).getHours();_[c].innerHTML=n>12?"".concat(n-12," PM"):"".concat(n," AM"),0==n&&(_[c].innerHTML="12 AM"),12==n&&(_[c].innerHTML="12 PM"),b[c].innerHTML="".concat(Math.round(e.temperature),"°"),"clear-day"===e.icon&&(H[c].src="./weather_icons/clear-day.png"),"clear-night"===e.icon&&(H[c].src="./weather_icons/clear-night.png"),"partly-cloudy-day"===e.icon&&(H[c].src="./weather_icons/partly-cloudy-day.png"),"partly-cloudy-night"===e.icon&&(H[c].src="./weather_icons/partly-cloudy-night.png"),"cloudy"===e.icon&&(H[c].src="./weather_icons/cloudy.png"),"rain"===e.icon&&(H[c].src="./weather_icons/rain.png"),"fog"===e.icon&&(H[c].src="./weather_icons/fog.png"),"wind"===e.icon&&(H[c].src="./weather_icons/wind.png"),c+=1}}),c=0,e.daily.data.map(function(e){if(!(c>7)){var n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],t=(new Date).getDay()+c;A[c].innerHTML=t>6?n[t-7]:n[t],j[c].innerHTML="".concat(Math.round(e.temperatureLow),"°"),k[c].innerHTML="".concat(Math.round(e.temperatureHigh),"°"),"clear-day"===e.icon&&(q[c].src="./weather_icons/clear-day.png"),"clear-night"===e.icon&&(q[c].src="./weather_icons/clear-night.png"),"partly-cloudy-day"===e.icon&&(q[c].src="./weather_icons/partly-cloudy-day.png"),"partly-cloudy-night"===e.icon&&(q[c].src="./weather_icons/partly-cloudy-night.png"),"cloudy"===e.icon&&(q[c].src="./weather_icons/cloudy.png"),"rain"===e.icon&&(q[c].src="./weather_icons/rain.png"),"fog"===e.icon&&(q[c].src="./weather_icons/fog.png"),"wind"===e.icon&&(q[c].src="./weather_icons/wind.png"),c+=1}}),x.innerHTML="Today: ".concat(e.daily.data[0].summary),E.innerHTML="Week: ".concat(e.daily.summary),O.innerHTML="".concat(Math.round(e.currently.windSpeed)," mph"),P.innerHTML="".concat(Math.round(100*e.currently.humidity),"%"),C.innerHTML="".concat(e.currently.visibility),N.innerHTML=e.currently.uvIndex,I.innerHTML=e.currently.precipProbability,D.innerHTML=Math.round(e.currently.dewPoint)}),z.reset(),o.className.includes("slide-out")&&o.classList.remove("slide-out"),R.classList.add("slide-out"),v.style.zIndex="7",w.style.zIndex="7"}function F(e){var n=e.coords.latitude,t=e.coords.longitude,c="?latlng=".concat(n,",").concat(t,"&key=").concat(r.googleApiKey),a="".concat(r.darkskyApiKey).concat(n,",").concat(t),i=0;fetch(r.googleUrl+c).then(function(e){return e.json()}).then(function(e){console.log(e),e.results[0].address_components.map(function(e){e.types.includes("locality")&&(f.innerHTML=e.long_name)})}),fetchJsonp("".concat(r.darkskyUrl).concat(a)).then(function(e){return e.json()}).then(function(e){console.log(e),l.innerHTML=Math.round(e.currently.temperature),y.innerHTML=Math.round(e.daily.data[0].temperatureMax),g.innerHTML=Math.round(e.daily.data[0].temperatureLow),u.innerHTML=Math.round((l.innerHTML-32)*(5/9)),p.innerHTML=Math.round((y.innerHTML-32)*(5/9)),h.innerHTML=Math.round((g.innerHTML-32)*(5/9)),"clear-day"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/clear-day.png"}),"clear-night"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/clear-night.png"}),"partly-cloudy-day"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/partly-cloudy-day.png"}),"partly-cloudy-night"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/partly-cloudy-night.png"}),"cloudy"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/cloudy.png"}),"rain"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/rain.png"}),"fog"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/fog.png"}),"wind"===e.currently.icon&&L.map(function(e){return e.src="./weather_icons/wind.png"}),e.hourly.data.map(function(e){if(!(i>23)){var n=new Date(1e3*e.time).getHours();_[i].innerHTML=n>12?"".concat(n-12," PM"):"".concat(n," AM"),0==n&&(_[i].innerHTML="12 AM"),12==n&&(_[i].innerHTML="12 PM"),b[i].innerHTML="".concat(Math.round(e.temperature),"°"),"clear-day"===e.icon&&(H[i].src="./weather_icons/clear-day.png"),"clear-night"===e.icon&&(H[i].src="./weather_icons/clear-night.png"),"partly-cloudy-day"===e.icon&&(H[i].src="./weather_icons/partly-cloudy-day.png"),"partly-cloudy-night"===e.icon&&(H[i].src="./weather_icons/partly-cloudy-night.png"),"cloudy"===e.icon&&(H[i].src="./weather_icons/cloudy.png"),"rain"===e.icon&&(H[i].src="./weather_icons/rain.png"),"fog"===e.icon&&(H[i].src="./weather_icons/fog.png"),"wind"===e.icon&&(H[i].src="./weather_icons/wind.png"),i+=1}}),i=0,e.daily.data.map(function(e){if(!(i>7)){var n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],t=(new Date).getDay()+i;A[i].innerHTML=t>6?n[t-7]:n[t],j[i].innerHTML="".concat(Math.round(e.temperatureLow),"°"),k[i].innerHTML="".concat(Math.round(e.temperatureHigh),"°"),"clear-day"===e.icon&&(q[i].src="./weather_icons/clear-day.png"),"clear-night"===e.icon&&(q[i].src="./weather_icons/clear-night.png"),"partly-cloudy-day"===e.icon&&(q[i].src="./weather_icons/partly-cloudy-day.png"),"partly-cloudy-night"===e.icon&&(q[i].src="./weather_icons/partly-cloudy-night.png"),"cloudy"===e.icon&&(q[i].src="./weather_icons/cloudy.png"),"rain"===e.icon&&(q[i].src="./weather_icons/rain.png"),"fog"===e.icon&&(q[i].src="./weather_icons/fog.png"),"wind"===e.icon&&(q[i].src="./weather_icons/wind.png"),i+=1}}),x.innerHTML="Today: ".concat(e.daily.data[0].summary),E.innerHTML="Week: ".concat(e.daily.summary),O.innerHTML="".concat(Math.round(e.currently.windSpeed)," mph"),P.innerHTML="".concat(Math.round(100*e.currently.humidity),"%"),C.innerHTML="".concat(e.currently.visibility),N.innerHTML=e.currently.uvIndex,I.innerHTML=e.currently.precipProbability,D.innerHTML=Math.round(e.currently.dewPoint)}),o.className.includes("slide-out")&&o.classList.remove("slide-out"),R.classList.add("slide-out"),v.style.zIndex="7",w.style.zIndex="7"}function V(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var J=V(document.querySelectorAll("ul a")),Y=(V(document.querySelectorAll("ul a li")),document.querySelector(".sidebar-nav"));t(1);var G=function(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(document.querySelectorAll("section"));U.addEventListener("click",function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(F):alert("Geolocation isn't supported by this browser")}),z.addEventListener("submit",W),K.addEventListener("click",W),a.map(function(e){return e.addEventListener("click",S)}),w.addEventListener("click",function(){v.classList.toggle("active"),document.querySelector(".sidebar-nav").classList.toggle("active")}),window.addEventListener("resize",function(){var e=a.filter(function(e){return e.className.includes("active")});M.style.width="".concat(i.getBoundingClientRect().width,"px"),M.style.left="".concat(e[0].getBoundingClientRect().left,"px")}),J.map(function(e){return e.addEventListener("mouseover",function(){var n=e.firstElementChild;window.innerWidth>800&&n.classList.add("active")})}),J.map(function(e){return e.addEventListener("mouseout",function(){var n=e.firstElementChild;window.innerWidth>800&&n.classList.remove("active")})}),J.map(function(e){return e.addEventListener("click",function(){var n=e.firstElementChild;Y.classList.remove("active"),v.classList.remove("active"),G.map(function(e){e.className.includes(n.dataset.pseudoClass)&&e.className.includes("slide-out")&&e.classList.remove("slide-out"),!e.className.includes(n.dataset.pseudoClass)&&e.classList.add("slide-out")})})})},function(e,n){}]);
//# sourceMappingURL=bundle.js.map