/* Чтобы максимально обезопасить себя от конфликтов,
 можно перевести JQuery в «неконфликтный» режим
 и использовать другой шорткод.
 Применяем «$j» вместо дефолтного «$».
 Стандартный шорткод «$», например, может конфликтовать
 с Prototype. */
/*var $j = jQuery.noConflict();*/


/* Owl Carousel */
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    navigation:true,
    navigationText : ["&#xe079;","&#xe080;"],    
    loop:true,
    margin:20,
    dots:false,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:1800,
    smartSpeed:900,
    responsiveClass:true,
    navText:["<i class='fa fa-angle-left fa-2x'></i>","<i class='fa fa-angle-right fa-2x'></i>"],
    responsive:{
        0:{
            items:1,
            nav:true,
            loop: true
        },
        480:{
            items:2,
            nav:true,
            loop: true
        },
        767:{
            items:3,
            nav:true,
            loop: true
        },
        992:{
            items:4,
            nav:true,
            loop:true
        },
        1200:{
            items:4,
            nav:true,
            loop:true
        }
    }
  });


/** 
 * Создаём зависимые списки "Выберите ваш город" с помощью jQuery и AJAX.
 * При выборе области, сработает функция loadCity, которая подгрузит список городов.
 */
function loadCity (select) 
{
    var citySelect = $('select[name="city"]');
 
    // послыаем AJAX запрос, который вернёт список городов для выбранной области
    $.getJSON('header.php', {action:'getCity', region:select.value}, function(cityList){
        citySelect.html(''); // очищаем список городов
 
        // заполняем список городов новыми пришедшими данными
        $.each(cityList, function(i){
            citySelect.append('<option value="' + i + '">' + this + '</option>');
        });
    });
}




});

