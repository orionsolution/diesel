// JavaScript Document

$( document ).ready(function() {
	var allElements = document.getElementsByClassName('refinement-header');
/*--------------------- Filter Drop Downs ---------------------*/
	for ( var i = 0; i<allElements.length; i++ ) {
			$(allElements[i]).on('click', function(e) {
			  //$(".refinement-header-item").removeClass("active");
			  var currentli = this.parentNode;
			  $(currentli).toggleClass("active"); //you can list several class names
			  $(".refinement-header-item").not(currentli).removeClass("active");
			  e.preventDefault();
			});
	}
	
	$.fn.clickOff = function(callback, selfDestroy) {
		var clicked = false;
		var parent = this;
		var destroy = selfDestroy || true;
		
		parent.click(function() {
			clicked = true;
		});
		
		$(document).click(function(event) { 
			if (!clicked) {
				callback(parent, event);
			}
			if (destroy) {
				//parent.clickOff = function() {};
				//parent.off("click");
				//$(document).off("click");
				//parent.off("clickOff");
			};
			clicked = false;
		});
	};
	
	$(".refinement-list").clickOff(function() {
		$(".refinement-header-item").removeClass("active");
	});
	
/*--------------------- For adding filters ---------------------*/
	$('.refinement-item li').on('click', function(e) {
      $(this).toggleClass("selected");
	  //$('.refinements .filter-bxSlider-plp').toggle();
	  if ($('.refinement-item li').hasClass("selected")) {
		$('.refinements .filter-bxSlider-plp').css('display', 'block');
		$(".remove-trans").append("<span class='breadcrumb-refinement-value' value='"+$(this).find('a').text()+"'>"+$(this).find('a').text()+"<a class='breadcrumb-relax' href='#'><img class='plp-filter-cross' src='http://dharmesh-pc/diesel/images/refine_filter.svg' alt='REMOVE'></a></span>");
		$(".breadcrumb-refinement-value").on("click", function(){
			$(this).remove();
		});
	  } else {
		$('.refinements .filter-bxSlider-plp').css('display', 'none');  
	  }
      e.preventDefault();
    });
	
/*--------------------- Reset filters ---------------------*/
	$('.filter-global-reset').on('click', function(e) {
      $('.refinement-item li').removeClass("selected");
	  $(".breadcrumb-refinement-value").remove();
	  $('.refinements .filter-bxSlider-plp').css('display', 'none');
    });


/*--------------------- Loading More Products through ajax ---------------------*/

$('a.load-more').on('click',function(event){
	//console.log("button clicked");
	event.preventDefault();
	var url = $(this).data('ajax-url');
	var next_limit = $(this).data('next-limit');
	//var ajax_data = $.parseJSON($(this).data('ajax'));
	var ajax_data = $(this).data('ajax');

	// Parse the string back into a proper JSON object
    //var json = $.parseJSON($(this).data('ajax'));

	console.log("next_limt " + next_limit);
	console.log("ajax url " + url);
	console.log("ajax data " + ajax_data);
	// making an ajax call

	$.ajax({
		url: url,
		type: 'POST',
		data: {next_limit: next_limit, ajax_data: ajax_data},
		success: function(){
			console.log('success');
		}
	});

});
	
});
