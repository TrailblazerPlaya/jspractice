import tabs  from './modules/tabs';
import timer  from './modules/timer';
import forms  from './modules/forms';
import card  from './modules/card';
import calc  from './modules/calc';
import slider  from './modules/slider';
import modal  from './modules/modal';
import {openModal} from './modules/modal';
window.addEventListener('DOMContentLoaded', () => {
    
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 500000);

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   timer('.timer', '2021-05-03');
   forms('form', modalTimerId);
   card();
   calc();
   slider({
       container: '.offer__slider',
       nextArrow: '.offer__slider-next',
       prevArrow: '.offer__slider-prev',
       totalCounter: '#total',
       currentCounter: '#current',
       wrapper: '.offer__slider-wrapper',
       field: '.offer__slider-inner',
       slide: '.offer__slide'
   });
   modal('[data-modal]', '.modal', modalTimerId);
});
//npx json-server --watch db.json