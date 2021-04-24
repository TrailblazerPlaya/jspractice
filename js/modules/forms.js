import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро свяжемся',
        failure: 'Что-то пошло не так'
    };

    //Подвязываем формы к функции bindPostData
    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => { //submit работает тогда, когда мы пытаемся отправить какую-то форму
            e.preventDefault(); //Отменяю стандартное поведение браузера, так как после нажатия на кнопку с классом сабмит, страница перезагружается(стандартное поведение браузера)

            //Создам новую константу, чтобы выводить сообщение статуса
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;

            `;
            form.insertAdjacentElement('afterend', statusMessage);

            /**Заголовки, которые будут говорить серверу что именно приходит */
            // request.setRequestHeader('Content-type', 'application/json'); /*Если посмотреть на документацию FormData, там требуется эта multipart/form-data */
            /*КОГДА МЫ ИСПОЛЬЗУЕМ СВЯЗКУ XMLHTTPREQUEST С FORMDATA НАМ ЗАГОЛОВОК УСТАНАВЛИВАТЬ НЕ НУЖНО, ОН УСТАНАВЛИВАЕТСЯ АВТОМАТИЧЕСКИ!!!!!! ЗАПОМНИТЬ, ИНАЧЕ БУДЕТ МНОГО ОШИБОК */
            /*С JSON ЗАГОЛОВОК НУЖЕН */


            /**Собираем данные из формы */
            const formData = new FormData(form); //во внутрь помещаем ту форму, из которой нужно собрать данные
            /**ВСЕГДА НУЖНО ПРОВЕРЯТЬ АТРИБУТ NAME У ИНПУТОВ, ИНАЧЕ ВСЕ ПОЙДЕТ ПО ПИЗДЕ!!!! */

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //в общем это метод, который появился недавно, первым делом он превращает данные из формы в массив, а дальше превращает его опять в объект с помощью fromEntries

            /*Отправляем на сервер */
            //использую fetch

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

            //отслеживаем лоад
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success); //вызвал функцию вызова модального окна с благодарностью
            //         form.reset();//очищаем форму после успешной отправки
            //         statusMessage.remove();     
            //     } else {
            //         showThanksModal(message.failure); 
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        openModal('.modal', modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog'); //добавил новое модальное окно
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); //добавил короче эллемент на страницу, все должно быть нормально(сука я уже путаюсь, слишком много всего. нужна практика)

        /*Надо сделать так, чтобы если вдруг пользователь захочет открыть первое модальное окно, удалялось окно с благодарностью и возвращалось первое */
        setTimeout(() => {
            thanksModal.remove(); //то есть через 4 секунды мы будем удалять окно благодарности
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}
export default forms;