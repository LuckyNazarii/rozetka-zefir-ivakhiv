// Home banner slider
$(document).ready(function(){
	var slideOptions = {
		prevArrow:'<div class="prev-button"><svg><use href="#shevron-right"></use></svg></div>',
		nextArrow:'<div class="next-button"><svg><use href="#shevron-right"></use></svg></div>'
	};

	$('.home__banner-slider').slick(slideOptions);
});	

// Search
$(document).on('click','.header__search form button',function(){
	var searchTerm = $('.header__search form input').val();
	alert(searchTerm);
});

// Menu
$(document).on('click','.header__menu-togle',function(){
	//$(this) == $('.header__menu-togle');
	// переключатель між станами кнопки
	// if($(this).hasClass('opened')){
	// 	$(this).removeClass('opened');
	// } else{
	// 	$(this).addClass('opened');
	// }
	// альтернатива до коду вище toggleClass - перемикач, інвертор
	$(this).toggleClass('opened');
});