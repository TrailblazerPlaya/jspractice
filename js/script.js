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
    const deadline = '2021-04-15';

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

        clearInterval(modalTimerId);//Если пользователь то таймера уже открывал модальное окно, чтобы не бесить его мы отчищаем функцию и она больше самостоятельно не появится
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
});