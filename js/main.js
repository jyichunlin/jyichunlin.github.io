jQuery(function($) {'use strict';

	//Responsive Nav
	$('li.dropdown').find('.fa-angle-down').each(function(){
		$(this).on('click', function(){
			if( $(window).width() < 768 ) {
				$(this).parent().next().slideToggle();
			}
			return false;
		});
	});

	//Fit Vids
	if( $('#video-container').length ) {
		$("#video-container").fitVids();
	}

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){

		$('.main-slider').addClass('animate-in');
		$('.preloader').remove();
		//End Preloader

		if( $('.masonery_area').length ) {
			$('.masonery_area').masonry();//Masonry
		}

		var $portfolio_selectors = $('.portfolio-filter >li>a');

		if($portfolio_selectors.length) {

			var $portfolio = $('.portfolio-items');
			$portfolio.isotope({
				itemSelector : '.portfolio-item',
				layoutMode : 'fitRows'
			});

			$portfolio_selectors.on('click', function(){
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
		}

	});


	$('.timer').each(count);
	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}

	// Search
	$('.fa-search').on('click', function() {
		$('.field-toggle').fadeToggle(200);
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	// Progress Bar
	$.each($('div.progress-bar'),function(){
		$(this).css('width', $(this).attr('data-transition')+'%');
	});

	if( $('#gmap').length ) {
		var map;

		map = new GMaps({
			el: '#gmap',
			lat: 43.7000,
			lng: -79.4000,
			scrollwheel:false,
			zoom: 9,
			zoomControl : true,
			panControl : false,
			streetViewControl : false,
			mapTypeControl: false,
			overviewMapControl: false,
			clickable: false
		});

		map.addMarker({
			lat: 43.7000,
			lng: -79.4000,
			animation: google.maps.Animation.DROP,
			verticalAlign: 'bottom',
			horizontalAlign: 'center',
			backgroundColor: '#3e8bff',
		});
	}

});

//close contact button
$('#close-contact').on('click', function(){
	$("#contact-collapse").click();

});
$("#contact-collapse").on('click', function(){
	 $(".navbar-collapse").collapse('hide');
});
$('#contact-btn').on('click', function(){
	$("#contact-collapse").click();

});

/////////portfolio////////////////
$(document).ready(function () {
	$.ajax({
				type: 'GET',
				url: 'js/portfolio.json',
				dataType: 'json',
				success: jsonParser
		});
	$('#videoBtn').css("display", "none");
	$('#projectUrl').css("display", "none");

	$('.popup-youtube').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,

				fixedContentPos: false
	});
});

function jsonParser(json) {
		//$('#preloader').fadeOut();

	$.getJSON('js/portfolio.json', function(data){
		//console.log(data.portfolio);
		$.each(data.portfolio.artwork, function(k,v){
			if(v.src==window.location.search.substring(1)){
				var arrayLength = data.portfolio.artwork.length;
				var title = v.title;
				var imgSrc = v.src;
				var type = v.type;
				var subtitle = v.subtitle;
				var medium = v.medium;
				var audience = v.audience;
				var description = v.description;
				var linkUrl = v.url;
				var prevUrl;
				var nextUrl;
				console.log(k);
				if (type == "video") {
					$('#videoBtn').css('display', 'block');
					$('#videoBtn a').attr('href',linkUrl);
				}
				if (type == "interactive") {
					$('#projectUrl').css('display', 'block');
					$('#projectUrl a').attr('href',linkUrl);
				}

				if (k>0){
					prevUrl = data.portfolio.artwork[k-1].src;
				}
				else{
					prevUrl = data.portfolio.artwork[arrayLength-1].src;
				}

				if(k<arrayLength-1){
					nextUrl = data.portfolio.artwork[k+1].src;
				}
				else {
					nextUrl = data.portfolio.artwork[0].src;
				}

				description = description.replace(/\n/g,"<p></p>");


				$('#portfolio-mainImg').attr('src',"images/portfolio-details/"+imgSrc+".jpg");
				$('#portfolio-sideimg').attr('src',"images/portfolio-details/"+imgSrc+"-d01.jpg");
				$('#artwork-title').html(title);
				$('#artwork-subtitle').html(subtitle);
				$('#artwork-medium').html(medium);
				$('#artwork-audience').html(audience);
				$('#artwork-description').html("<p>" + description + "</p>");
				$('#artwork-prev').attr('href','portfolio-details.html?'+prevUrl);
				$('#artwork-next').attr('href','portfolio-details.html?'+nextUrl);
			}
		});
	});
}
