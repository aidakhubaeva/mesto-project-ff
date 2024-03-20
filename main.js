(()=>{"use strict";var t="https://around.nomoreparties.co/v1/wff-cohort-8",e={authorization:"cb8b3077-1336-4493-90d8-81527940728d","Content-Type":"application/json"};function n(t,e,n,o,r,c){var a=t.name,i=t.link,u=t.likes,l=t._id,s=document.querySelector("#card-template").content.cloneNode(!0),d=s.querySelector(".card__image");d.src=i,d.alt=a;var p=s.querySelector(".card__like-count");p.textContent=u.length;var f=s.querySelector(".card__like-button"),m=u.some((function(t){return t._id===n}));m&&f.classList.add("card__like-button_is-active");var _=s.querySelector(".card__delete-button");return e===n?(_.addEventListener("click",(function(t){return o(t,l)})),_.classList.add("card__delete-button_visible")):_.style.display="none",s.querySelector(".card__title").textContent=a,f.addEventListener("click",(function(){return r(f,p,l)})),d.addEventListener("click",(function(){return c(a,i)})),s}function o(n,o,r){var c;(n.classList.contains("card__like-button_is-active")?(c=r,fetch("".concat(t,"/cards/likes/").concat(c),{method:"DELETE",headers:e}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))):function(n){return fetch("".concat(t,"/cards/likes/").concat(n),{method:"PUT",headers:e}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(r)).then((function(t){n.classList.toggle("card__like-button_is-active"),o.textContent=t.likes.length})).catch((function(t){console.error("Ошибка при изменении статуса лайка:",t)}))}function r(n,o){var r=n.target.closest(".places__item");o?function(n){return localStorage.getItem("token"),fetch("".concat(t,"/cards/").concat(n),{method:"DELETE",headers:e}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(o).then((function(){r.remove()})).catch((function(t){console.error("Ошибка при удалении карточки:",t)})):console.error("Не найден ID карточки.")}function c(t,e,n){t.classList.remove(n.inputErrorClass),e.classList.remove(n.errorClass),e.textContent=""}function a(t,e){t.classList.add(e.inactiveButtonClass),t.disabled=!0}function i(t,e){t.classList.remove(e.inactiveButtonClass),t.disabled=!1}function u(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(n){c(n,t.querySelector("#".concat(n.name,"-error")),e)})),a(o,e)}function l(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",d)}function s(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d)}function d(t){"Escape"===t.key&&s(document.querySelector(".popup_is-opened"))}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var f,m=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),h=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),b=document.querySelectorAll(".popup__close"),C=document.querySelector(".places__list"),k=m.querySelector("form"),q=_.querySelector('.popup__form[name="new-place"]'),g=document.querySelector(".popup_type_image"),E=g.querySelector(".popup__image"),L=document.querySelector(".profile__image"),j=g.querySelector(".popup__caption"),x=document.querySelector(".popup_type_edit_avatar"),A=x.querySelector('.popup__form[name="edit_avatar"]'),P=A.querySelector(".popup__button"),w=document.querySelectorAll(".popup"),T={},I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function O(t){s(t.currentTarget.closest(".popup"))}function B(t,e){E.src=e,E.alt=t,j.textContent=t,l(g)}f=I,Array.from(document.querySelectorAll(f.formSelector)).forEach((function(t){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(t,e,n){var o=n.querySelector("#".concat(t.name,"-error"));t.setCustomValidity(""),t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage||"Некорректный ввод."):t.validity.typeMismatch?t.setCustomValidity("Введите адрес сайта."):t.validity.valueMissing?t.setCustomValidity("Вы пропустили это поле."):t.setCustomValidity(""),t.validity.valid?c(t,o,e):function(t,e,n,o){t.classList.add(o.inputErrorClass),e.textContent=n,e.classList.add(o.errorClass)}(t,o,t.validationMessage,e)}(r,e,t);var u=n.some((function(t){return!t.validity.valid}));u?a(o,e):i(o,e)}))})),n.some((function(t){return!t.validity.valid}))?a(o,e):i(o,e)}(t,f)})),A.addEventListener("submit",(function(n){n.preventDefault();var o,r=P.textContent;P.textContent="Сохранение...",(o=A.elements.link.value,fetch("".concat(t,"/users/me/avatar"),{method:"PATCH",headers:e,body:JSON.stringify({avatar:o})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){L.style.backgroundImage="url('".concat(t.avatar,"')"),s(x)})).catch((function(t){console.error("Ошибка при обновлении аватара:",t)})).finally((function(){P.textContent=r}))})),document.querySelector(".avatar__edit-button").addEventListener("click",(function(){l(x)})),q.addEventListener("submit",(function(c){c.preventDefault();var a,i,u=c.target,l=u.querySelector(".popup__button"),d=l.textContent;l.textContent="Добавление...",(a=u.elements["place-name"].value,i=u.elements.link.value,localStorage.getItem("token"),fetch("".concat(t,"/cards"),{method:"POST",headers:e,body:JSON.stringify({name:a,link:i})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){var e=n(t,T.id,t.owner._id,r,o,B);C.prepend(e),u.reset(),s(_)})).catch((function(t){console.error("Ошибка при добавлении карточки:",t)})).finally((function(){l.textContent=d}))})),y.addEventListener("click",(function(){var t=k.elements,e=t.name,n=t.description;e.value=h.textContent,n.value=S.textContent,u(k,I),l(m)})),w.forEach((function(t){t.addEventListener("click",(function(e){e.target===e.currentTarget&&s(t)}))})),k.addEventListener("submit",(function(n){n.preventDefault();var o,r,c=n.target,a=c.elements,i=a.name,u=a.description,l=c.querySelector(".popup__button"),d=l.textContent;l.textContent="Сохранение...",(o=i.value,r=u.value,fetch("".concat(t,"/users/me"),{method:"PATCH",headers:e,body:JSON.stringify({name:o,about:r})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){h.textContent=t.name,S.textContent=t.about,s(m)})).catch((function(t){console.error("Ошибка обновления профиля:",t)})).finally((function(){l.textContent=d}))})),v.addEventListener("click",(function(){u(q,I),l(_)})),b.forEach((function(t){t.addEventListener("click",O)})),Promise.all([fetch("".concat(t,"/users/me"),{headers:e}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})),fetch("".concat(t,"/cards"),{headers:e}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))]).then((function(t){var e,c,a=(c=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==e);u=!0);}catch(t){l=!0,r=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(e,c)||function(t,e){if(t){if("string"==typeof t)return p(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(t,e):void 0}}(e,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];T.id=i._id,h.textContent=i.name,S.textContent=i.about,document.querySelector(".profile__image").style.backgroundImage="url('".concat(i.avatar,"')");var l=i._id;u.forEach((function(t){var e=n(t,t.owner._id,l,r,o,B);C.appendChild(e)}))})).catch((function(t){console.error("Ошибка при получении данных:",t)}))})();