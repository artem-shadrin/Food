document.addEventListener('DOMContentLoaded', () => {
    /* TABS MODULE */
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items')
    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_MODULE')
        })
    }
    const showTabContent = (item = 0) => {
        tabsContent[item].classList.add('show', 'fade')
        tabsContent[item].classList.remove('hide')
        tabs[item].classList.add('tabheader__item_MODULE')
    }
    hideTabContent()
    showTabContent()
    tabsParent.addEventListener('click', event => {
        const target = event.target
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
    /* /TABS MODULE  */

    /* TIMER MODULE */
    const timerElement = document.querySelector('.timer')
    let endDate = new Date('2021', '3', '16')
    const remainingDate = (endDate) => {
        const total = endDate - (new Date())
        return {
            total,
            seconds: Math.floor((total / 1000) % 60),
            minutes: Math.floor((total / 1000 / 60) % 60),
            hours: Math.floor((total / 1000 / 60 / 60) % 24),
            days: Math.floor(total / 1000 / 60 / 60 / 24)
        }
    }
    const setClock = (timerNode, endDate) => {
        const changeDate = (container) => {
            const date = remainingDate(endDate)
            const addZero = number => number < 10 ? `0${number}` : number
            if (date.total > 0) {
                container.querySelector('#days').textContent = addZero(date.days)
                container.querySelector('#hours').textContent = addZero(date.hours)
                container.querySelector('#minutes').textContent = addZero(date.minutes)
                container.querySelector('#seconds').textContent = addZero(date.seconds)
            } else {
                clearInterval(timer)
            }
        }
        const timer = setInterval(changeDate, 1000, timerNode);
    }
    setClock(timerElement, endDate);
    /* /TIMER MODULE */
    /* MODAL MODULE */
    const modalElement = document.querySelector('.modal')
    const modalBtn = document.querySelectorAll('[data-modal]')
    let isOpening = false
    const openModal = () => {
        isOpening = true
        modalElement.classList.add('show', 'fade')
        document.body.style.overflow = 'hidden'
        clearTimeout(modalTimerId)
        document.removeEventListener('scroll', openModalByScroll)
        setTimeout(() => {
            isOpening = false
        }, 500);
    }
    const closeModal = () => {
        if (!isOpening) {
            modalElement.classList.remove('show', 'fade')
            document.body.style.overflow = 'visible'
            isOpening = false
        }
    }
    const openModalByScroll = () => {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
            openModal();
            document.removeEventListener('scroll', openModalByScroll)
        }
    }
    modalBtn.forEach(item => item.addEventListener('click', openModal))
    modalElement.addEventListener('click', item => {
        const target = item.target
        if (target.classList.contains('modal__close') ||
            target.classList.contains('modal')) {
            closeModal()
        }
    })
    document.addEventListener('keydown', item => item.key == 'Escape' && closeModal())
    document.addEventListener('scroll', openModalByScroll)
    const modalTimerId = setTimeout(openModal, 5000);
    /* /MODAL MODULE */

    /* CARD MODULE */
    class MenuCard {
        constructor(src = 'img/tabs/vegy.jpg',
            alt = 'image',
            title = 'title',
            descr = 'description',
            price = 0,
            parentSelector = '.menu .container',
            ...classes) {
            this.src = src,
                this.alt = alt,
                this.title = title,
                this.descr = descr,
                this.price = price,
                this.transfer = 27,
                this.parent = document.querySelector(parentSelector),
                this.element = classes
        }
        changeToUAH() {
            this.price = +this.price * this.transfer
        }
        render() {
            const cardElement = document.createElement('div')
            this.element.length === 0 && this.element.push('menu__item')
            this.element.forEach(className => cardElement.classList.add(className))
            cardElement.insertAdjacentHTML('afterbegin', `
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `)
            this.parent.append(cardElement)
        }

    }
    const renderCard = () => {
        new MenuCard('img/tabs/vegy.jpg',
            'vegy',
            'Меню "Фитнес"',
            `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
                    свежих овощей и фруктов. Продукт активных и здоровых людей. Это
                    абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
            '229',
            '.menu .container').render()
        new MenuCard('img/tabs/elite.jpg',
            'elite',
            'Меню “Премиум”',
            `В меню “Премиум” мы используем не только красивый дизайн упаковки,
            но и качественное исполнение блюд. Красная рыба, морепродукты,
            фрукты - ресторанное меню без похода в ресторан!`,
            '550',
            '.menu .container').render()
        new MenuCard('img/tabs/post.jpg',
            'post',
            'Меню "Постное"',
            `Меню “Постное” - это тщательный подбор ингредиентов: полное
            отсутствие продуктов животного происхождения, молоко из миндаля,
            овса, кокоса или гречки, правильное количество белков за счет тофу
            и импортных вегетарианских стейков.`,
            '430',
            '.menu .container').render()
    }
    renderCard()
    /* /CARD MODULE */

    /* FORM MODULE */
    const formElements = document.querySelectorAll('form')
    const message = {
        loading: 'img/spinner/spinner.svg',
        success: 'Спасибо! Скоро мы с ними свяжемся',
        failure: 'Что-то пошло не так...'
    }

    const showThanksModal = (message) => {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            closeModal()
        }, 2000)
    }

    const postData = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            form.querySelector('.btn').textContent = ''
            form.querySelector('.btn').innerHTML = `<img style="display: block, margin: 0 auto" src=${message.loading} alt='spinner'>`
            const data = new FormData(form)
            const object = {}
            data.forEach(function (value, key) {
                object[key] = value
            })
            fetch('server.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                .then(data => {
                    console.log(data)
                    showThanksModal(message.success)
                })
                .catch(() => {
                    showThanksModal(message.failure)
                })
                .finally(() => {
                    form.reset()
                })
        })
    }
    formElements.forEach(item => postData(item))
    /* /FORM MODULE */








})