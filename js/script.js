window.addEventListener('DOMContentLoaded', () => {
    /*Tabs*////////////
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    /*Варик 1(без классов) */
    // function hideTabContent() {
    //     tabContent.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     tabs.forEach(item => {
    //         item.classList.remove('tabheader__item_active');
    //     });
    // }

    // function showTabContent(i = 0) {
    //     tabContent[i].style.display = 'block';
    //     tabs[i].classList.add('tabheader__item_active');
    // }
    // //я лох забыл вызвать функцию и думал почему она не работает(щас точно запомнил)
    // hideTabContent();
    // showTabContent(); //так как в аргументе i = 0, то по умолчанию выберется 1й слайд


    // tabsParent.addEventListener('click', (event) => {
    //     const target = event.target;

    //     if (target && target.classList.contains('tabheader__item')) {
    //         tabs.forEach((item, i) => {
    //             if (target == item) {
    //                 hideTabContent();
    //                 showTabContent(i); 
    //             }
    //         });
    //     }
    // });




    /*Варик 2(нормальный) */
    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    //я лох забыл вызвать функцию и думал почему она не работает(щас точно запомнил)
    hideTabContent();
    showTabContent(); //так как в аргументе i = 0, то по умолчанию выберется 1й слайд


    tabsParent.addEventListener('click', (event) => {
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



    /*Timer*////////////
    const deadline = '2021-04-18';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };      
    }
    
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours= timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);//обновляет часы каждую секунду

        updateClock();//фикс бага с миганием таймера(он начинал работать только спустя секунду)       

        function updateClock() {
            const t = getTimeRemaining(endtime);//таким образом получаем все значения, которые выведем на странице

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {//если время таймера вышло, то часы останавливаются 
                clearInterval(timeInterval);
            }

        }      
    }
    setClock('.timer', deadline); //вызвали функцию и назначили селекторы




    /*Modal*////////////
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');
    //МЫ НЕ МОЖЕМ НА МАССИВ НАВЕСИТЬ ОБРАБОТЧИК СОБЫТИЯ!!!ЗАПОМНИТЬ!!!
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    function openModal() {
        //Вариант 1//
        modal.classList.add('show');
        modal.classList.remove('hide');

        //Вариант 2//
        // modal.classList.toggle('show');

        document.body.style.overflow = 'hidden';

        clearInterval(modalTimerId);//Если пользователь до таймера уже открывал модальное окно, чтобы не бесить его мы отчищаем функцию и она больше самостоятельно не появится
    }


    function closeModal() {
         //Вариант 1//
         modal.classList.add('hide');
         modal.classList.remove('show');
 
         //Вариант 2//
         // modal.classList.toggle('show');
 
         document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    
    
    //Закрытие модального окна по подложке
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });


    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    /**Использую классы */

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;//не нужно забывать, что это рест оператор(массив)
            this.parent = document.querySelector(parentSelector);
            this.transfer = 79;
            this.changeToRub();
        }

        changeToRub() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);//поместили короче
        }
    }

    //////Тоже правильный варик///
    //const div = new MenuCard();/
    //div.render();           //// 
    //////////////////////////////

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        10,
        '.menu .container'
    ).render();//можно не создавать константу, если в будущем объект вызван не будет, он просто потеряется


    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню “Премиум”",
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        15,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        ">Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        25,
        '.menu .container',
        'menu__item'
    ).render();


    /*Forms*////////////
    
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загружается',
        success: 'Спасибо, скоро свяжемся',
        failure: 'Что-то пошло не так'
    };

    //Подвязываем формы к функции postData
    forms.forEach(item => {
        postData(item);
    });


    function postData(form) {
        form.addEventListener('submit', (e) => {//submit работает тогда, когда мы пытаемся отправить какую-то форму
            e.preventDefault(); //Отменяю стандартное поведение браузера, так как после нажатия на кнопку с классом сабмит, страница перезагружается(стандартное поведение браузера)

            //Создам новую константу, чтобы выводить сообщение статуса
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;  
            form.append(statusMessage);



            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');//сначала всегда вызывается метод open, чтобы настроить этот запрос. во внутрь помещаем нужные данные

            /**Заголовки, которые будут говорить серверу что именно приходит */
            // request.setRequestHeader('Content-type', 'multipart/form-data'); /*Если посмотреть на документацию FormData, там требуется эта multipart/form-data */
            /*КОГДА МЫ ИСПОЛЬЗУЕМ СВЯЗКУ XMLHTTPREQUEST С FORMDATA НАМ ЗАГОЛОВОК УСТАНАВЛИВАТЬ НЕ НУЖНО, ОН УСТАНАВЛИВАЕТСЯ АВТОМАТИЧЕСКИ!!!!!! ЗАПОМНИТЬ, ИНАЧЕ БУДЕТ МНОГО ОШИБОК */


            /**Собираем данные из формы */
            const formData = new FormData(form);//во внутрь помещаем ту форму, из которой нужно собрать данные
            /**ВСЕГДА НУЖНО ПРОВЕРЯТЬ АТРИБУТ NAME У ИНПУТОВ, ИНАЧЕ ВСЕ ПОЙДЕТ ПО ПИЗДЕ!!!! */


            /*Отправляем на сервер */
            request.send(formData);
            //отслеживаем лоад
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success; 
                    form.reset();//очищаем форму после успешной отправки
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure; 
                }
            });
        });
    }
});