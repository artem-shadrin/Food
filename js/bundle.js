/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = () => {
    let data = {
        ratio: 1.35,
        gender: 'female',
    };

    const resElement = document.querySelector('.calculating__result span');
    const isFullData = () => (data.height && data.weight && data.age && data.ratio && data.gender) ? true : false;
    const getStaticInformation = (parent) => {
        document.querySelector(parent).addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('calculating__choose-item')) {
                document.querySelectorAll(`${parent} div`).forEach(elem => {
                    elem.classList.remove('calculating__choose-item_active');
                });
                target.classList.add('calculating__choose-item_active');
                if (target.closest('#gender')) {
                    data.gender = target.id;
                } else {
                    data.ratio = +target.getAttribute('data-ratio');
                }
            }
            if (isFullData()) {
                getResult(data);
            }
        });
    };
    const getDinamicIngormation = (selector) => {
        document.querySelector(`${selector}`).addEventListener('input', event => {
            data[event.target.id] = +event.target.value;
            if (isFullData()) {
                getResult(data);
            }
        });

    };
    const getResult = ({
        height,
        weight,
        age,
        ratio,
        gender
    }) => {
        const BMR = (9.99 * +weight) + (6.25 * +height) - (4.92 * +age) + (gender == 'male' ? 5 : -161);
        resElement.textContent = Math.floor(BMR * +ratio);
        localStorage.setItem('data', JSON.stringify(data));
    };
    if (!localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify(data));
    } else {
        data = JSON.parse(localStorage.getItem('data'));
        document.querySelectorAll('#gender div').forEach(item => {
            item.classList.remove('calculating__choose-item_active');
            if (item.id == data.gender) {
                item.classList.add('calculating__choose-item_active');
            }
        });
        document.querySelectorAll('.calculating__choose_big div').forEach(item => {
            item.classList.remove('calculating__choose-item_active');
            if (item.getAttribute('data-ratio') == data.ratio) {
                item.classList.add('calculating__choose-item_active');
            }
        });
        document.querySelector('#age').value = data.age;
        document.querySelector('#height').value = data.height;
        document.querySelector('#weight').value = data.weight;
        getResult(data);
    }
    getStaticInformation('#gender');
    getStaticInformation('.calculating__choose_big');
    getDinamicIngormation('#age');
    getDinamicIngormation('#height');
    getDinamicIngormation('#weight');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");


const cards = () => {
    class MenuCard {
        constructor(src,
            alt,
            title,
            descr,
            price,
            ...classes) {
            this.src = src,
                this.alt = alt,
                this.title = title,
                this.descr = descr,
                this.price = price,
                this.parent = document.querySelector('.menu .container'),
                this.element = classes,
                this.transfer = 27,
                this.changeToUAH();
        }
        changeToUAH() {
            this.price = +this.price * this.transfer;
        }
        render() {
            const cardElement = document.createElement('div');
            if (this.element.length === 0) {
                this.element.push('menu__item');
            }
            this.element.forEach(className => cardElement.classList.add(className));
            cardElement.insertAdjacentHTML('afterbegin', `
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `);
            this.parent.append(cardElement);
        }
    }
    const renderCard = () => {

        (0,_services_service__WEBPACK_IMPORTED_MODULE_0__.getResources)('http://localhost:3000/menu')
            .then(data => {
                data.forEach(({
                    img,
                    altimg,
                    title,
                    descr,
                    price
                }) => {
                    new MenuCard(img, altimg, title, descr, price).render();
                });
            });
    };
    renderCard();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");



const forms = (formSelector, modalSelector) => {
    const formElements = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner/spinner.svg',
        success: 'Спасибо! Скоро мы с ними свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const showThanksModal = (message) => {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector(modalSelector).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
        }, 2000);
    };

    const bindpostData = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.querySelector('.btn').textContent = '';
            form.querySelector('.btn')
                .innerHTML = `<img style="display: block, margin: 0 auto" src=${message.loading} alt='spinner'>`;
            const data = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(data.entries()));
            (0,_services_service__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(() => showThanksModal(message.success))
                .catch(() => showThanksModal(message.failure))
                .finally(() => form.reset());
        });
    };
    formElements.forEach(item => bindpostData(item));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const openModal = (modalSelector, modalTimerId) => {
    const modalElement = document.querySelector(`${modalSelector}`);
    modalElement.classList.add('show', 'fade');
    document.body.style.overflow = 'hidden';
    if(modalTimerId){
        clearTimeout(modalTimerId);
    }
    modalElement.classList.remove('fade');
};
const closeModal = (modalSelector) => {
    const modalElement = document.querySelector(modalSelector);
    modalElement.classList.remove('show', 'fade');
    document.body.style.overflow = 'visible';
};
const modal = (modalSelector, modalTimerId) => {
    const modalElement = document.querySelector(modalSelector);
    const modalBtn = document.querySelectorAll('[data-modal]');

    const openModalByScroll = () => {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            document.removeEventListener('scroll', openModalByScroll);
        }
    };
    modalBtn.forEach(item => item.addEventListener('click', () => openModal(modalSelector, modalTimerId)));
    modalElement.addEventListener('click', item => {
        const target = item.target;
        if (target.classList.contains('modal__close') ||
            target.classList.contains(modalSelector.slice(1))) {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', item => {
        if (item.key == 'Escape') {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('scroll', openModalByScroll);

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const slider = () => {

    const slider = document.querySelector('.offer__slider'),
        slides = slider.querySelectorAll('.offer__slide'),
        sliderCounter = slider.querySelector('.offer__slider-counter'),
        total = slider.querySelector('#total'),
        current = slider.querySelector('#current'),
        slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
        slidesField = slider.querySelector('.offer__slider-inner'),
        slideWidth = window.getComputedStyle(slidesWrapper).width;
    const addZero = number => number < 10 ? `0${number}` : number;
    let sliderIndex = 1;
    total.textContent = addZero(slides.length);
    current.textContent = addZero(sliderIndex);

    slidesField.style.width = 100 * (slides.length + 1) + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflowX = 'hidden';
    slides.forEach(slide => slide.style.width = slideWidth);

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];
    const showDots = (n) => {
        dots.forEach(dot => {
            dot.style.opacity = '0.7';
        });
        dots[n - 1].style.opacity = '1';
    };
    const showSlide = (n) => {
        const offset = +slideWidth.slice(0, slideWidth.length - 2) * (n - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        showDots(n);
        current.textContent = addZero(n);
    };
    indicators.classList.add('carousel-indicators');

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slider-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        if (i == 0) {
            dot.style.opacity = '1';
        }
        dots.push(dot);
    }
    slider.append(indicators);
    indicators.addEventListener('click', event => {

        const target = event.target;
        if (target.classList.contains('dot')) {
            sliderIndex = +target.getAttribute('data-slider-to');
            showSlide(sliderIndex);
        }
    });
    sliderCounter.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('offer__slider-prev')) {
            if (sliderIndex == 1) {
                sliderIndex = slides.length;
            } else {
                sliderIndex--;
            }
        }
        if (target.classList.contains('offer__slider-next')) {
            if (sliderIndex == slides.length) {
                sliderIndex = 1;
            } else {
                sliderIndex++;
            }
        }
        showSlide(sliderIndex);

    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabs = () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };
    const showTabContent = (item = 0) => {
        tabsContent[item].classList.add('show', 'fade');
        tabsContent[item].classList.remove('hide');
        tabs[item].classList.add('tabheader__item_active');
    };
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timer = (timerSelector, deadLine) => {
    const addZero = number => number < 10 ? `0${number}` : number;
    const timerElement = document.querySelector(timerSelector);
    
    const remainingDate = (endDate) => {
        const total = endDate - (new Date());
        return {
            total,
            seconds: Math.floor((total / 1000) % 60),
            minutes: Math.floor((total / 1000 / 60) % 60),
            hours: Math.floor((total / 1000 / 60 / 60) % 24),
            days: Math.floor(total / 1000 / 60 / 60 / 24)
        };
    };
    const setClock = (timerNode, endDate) => {
        const changeDate = (container) => {
            const date = remainingDate(endDate);

            if (date.total > 0) {
                container.querySelector('#days').textContent = addZero(date.days);
                container.querySelector('#hours').textContent = addZero(date.hours);
                container.querySelector('#minutes').textContent = addZero(date.minutes);
                container.querySelector('#seconds').textContent = addZero(date.seconds);
            } else {
                clearInterval(timer);
            }
        };
        const timer = setInterval(changeDate, 1000, timerNode);
    };
    setClock(timerElement, deadLine);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/service.js":
/*!********************************!*\
  !*** ./js/services/service.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResources": () => (/* binding */ getResources),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const getResources = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await response.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");










document.addEventListener('DOMContentLoaded', () => {
    const deadLine = new Date('2021', '5', '16');
    const modalTimerId = setTimeout(()=>{(0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId);}, 5000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer', deadLine);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)(".modal",modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', '.modal');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map