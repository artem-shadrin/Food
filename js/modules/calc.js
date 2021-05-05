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
export default calc;