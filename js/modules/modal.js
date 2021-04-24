function openModal(modalSelector, modalTimerId) {
    //Вариант 1//
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');

    //Вариант 2//
    // modal.classList.toggle('show');

    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); //Если пользователь до таймера уже открывал модальное окно, чтобы не бесить его мы отчищаем функцию и она больше самостоятельно не появится
    }  
}


function closeModal(modalSelector) {
    //Вариант 1//
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');

    //Вариант 2//
    // modal.classList.toggle('show');

    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    /*Modal*/ ///////////
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    //удалил константу крестика, хуй знает зачем, но вроде как она не работала на новом появившемся модальном окне благодарности
    //МЫ НЕ МОЖЕМ НА МАССИВ НАВЕСИТЬ ОБРАБОТЧИК СОБЫТИЯ!!!ЗАПОМНИТЬ!!!
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    
    //Закрытие модального окна по подложке
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //теперь когда мы кликаем на подложку или на крестик у нас закрывается модальное окно
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}
export default modal;
export {closeModal};
export {openModal};