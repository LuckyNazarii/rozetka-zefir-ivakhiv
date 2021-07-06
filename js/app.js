// масив обраних продуктів, при кожному оновленні сторінки все онуляється
var favouriteProducts = [];
if (window.localStorage.getItem('product')){
	favouriteProducts = window.localStorage.getItem('product');
	// localStorage робить стрічку, а сплітом ми робимо масив
	favouriteProducts = favouriteProducts.split(',');
}



// Запускаєм ф-цію для кожної кнопки при завантаженні сторінки
$('button.add-to-favourites').each(function(){
	var product_id = $(this).attr('data-id');
	if (favouriteProducts.includes(product_id) == true) {
		$(this).addClass('in-favourites');
	}
}); 

updateFavouritesCounter();
// local storage дозволяє зберігати дані незалежно від оновлень 



function updateFavouritesCounter(){



	$('#favourites span').html(favouriteProducts.length) ;

	if (favouriteProducts.length == 0){
		// сховати лічильник
		$('#favourites span').removeClass('empty');
	}

}

$(document).on('click', 'button.add-to-favourites', function(){
	// поточна к-сть обраних сердечок
	var product_id = $(this).attr('data-id');

	


	// отримуємо ID продукту, який додаєм в обрані
	// var product_id = $('button.add-to-favourites').attr('data-id');



	if (favouriteProducts.includes(product_id) == true) {
	
	// визначаємо позицію елемента 
	var index = favouriteProducts.indexOf(product_id);
	// splice(index,1) - видаляє 1 елемент з позиції index
	// приховуєм залите серце
	$(this).removeClass('in-favourites');


	favouriteProducts.splice(index,1);

	// currentCount--;
	} else {
		// додаєм ID товару в масив обраних
	favouriteProducts.push(product_id);

	// показуєм залите серце
	$(this).addClass('in-favourites');

	// console.log(favouriteProducts);
	
	// var currentCount = Number($('#favourites span').html());

	// currentCount++;
	}
	

	// зберігаємо дані в вбраузері local storage
	window.localStorage.setItem('product', favouriteProducts);

	// оновити дані в HTML лічильнику
	// jQuery синтаксис

	// $('#favourites span').html(currentCount);



	// показати лічильник
	$('#favourites span').removeClass('empty');

	console.log(favouriteProducts);
	// alert(currentCount);

});

// Home banner slider
$(document).ready(function(){
	var slideOptions = {
		prevArrow:'<div class="prev-button"><svg><use href="#shevron-right"></use></svg></div>',
		nextArrow:'<div class="next-button"><svg><use href="#shevron-right"></use></svg></div>'
	};

	// $('.home__banner-slider').slick(slideOptions);
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

// функція яка авт заповнює дані
function createProductHtml(product){
	// інтерполяція - вставлення елемента в стрічку за $ і косі лапки
	var html = `<li class="product-card home__product-list-card">
						<div class="thumb">
							<button data-id="${product.id}" class="add-to-favourites">
								<svg>
									<use href="#heart"></use>
								</svg>	
								<svg class="filled">
									<use href="#like"></use>
								</svg>
							</button>
							<a href="#">
								<img src="${product.image}" alt ="">
								</img>
							</a> 
						</div>
						<a href="#" class="title">
							${product.title}
						</a>
						<!-- .клас Tab -->
						<div class="old-price">
							${product.price * 1.2} ₴
						</div>	
						<div class="price">
							${product.price} ₴
						</div>
						<div class="availability">
							Немає в наявності
						</div> 
					</li>`;
	return html;

}

function getProducts(){
	// fetch - запит на віддалений сервер
	fetch('https://fakestoreapi.com/products')
	// => - стрілочна функція
 	.then((response)=>{
 		return response.json();
 	})
	.then((products)=>{
		var allHtml = '';
		var count = 0;
		products.forEach((product)=>{
			if(count < 4){
			var html = createProductHtml(product);
			allHtml = allHtml + html;
			count++;
			}
		});
		// $('.home__product-list ul').html(allHtml) - перезаписує дані
		// append(allHtml) - додає в хвіст, prepend - в голову
		$('.home__product-list ul').html(allHtml)

	})
	// catch - опрацьовує помилки і не дає коду, що нижче впасти 
	.catch((error)=>{
		console.log(error)
	})
}

getProducts()