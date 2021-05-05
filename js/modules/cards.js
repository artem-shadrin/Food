import {
    getResources
} from '../services/service';

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

        getResources('http://localhost:3000/menu')
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
export default cards;