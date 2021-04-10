window.addEventListener('DOMContentLoaded', () => {
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
});