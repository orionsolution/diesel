/**
**  Custom JavaScript File
**  brooksrunning.com.au
**  By Dominic Fernandes
**/

// Ajax Header Cart show

$(function(){
    load_cart();
	$('.mini-cart-total').hover(function(){ // hover in function 
        var qty = $('#mini-cart-quantity').val();
        if($('div.mini-cart-content-custom').is(":visible")){
            $('.mini-cart-total').addClass('active');
        }
        
        if(qty == 0 || isNaN(qty)){
            // console.log('is Nan');
            $('.mini-cart-content-custom').hide('fast');
        }else{
            // console.log('Not Nan');
            $(".mini-cart-content-custom").slideDown("slow");
		}
		

    },function(){ // hover out function
        if($('div.mini-cart-content-custom').is(":visible")){
            $('.mini-cart-total').addClass('active');
        }else{
            $(this).removeClass('active');
        }
        
    });

    /*$('.mini-cart-total').mouseout(function() {
        $('.mini-cart-content-custom').slideUp("slow");
    });*/


    $('.mini-cart-close').click(function(){ 
        $('.mini-cart-content-custom').hide(); 
    });

    $('.continueshop-btn').click(function(){ 
        $('.mini-cart-content-custom').hide(); 
    });
    
});


function load_cart(){
   // $('.mini-cart-products').html('');
    var url = $('.ajax-url').attr('href');
    var t   = 0;
    // console.log(url);
	// return false;
    $.ajax({
        url     : url,
        dataType:'json',
        success:function(result){
            // console.log(result);
            if(result.length > 0)
			{
                var image       = $('.mini-cart-image a img');
                var prod_name   = $('.mini-cart-name a');
                var attribute   = $('.mini-cart-attributes');
                var pricing     = $('.mini-cart-pricing');
                var qty         = $('.mini-cart-quantity');
                var qty_val     = $('#mini-cart-quantity');
                var subtotal    = 0;
                var count       = parseInt(result.length);

                qty.html(count);
                qty_val.val(count);

                $.each(result, function(key, val){
                    
                    var productDiv  = $( "<div class='mini-cart-product clearfix'></div>" );                                             
                    var nameDiv     = '<div class="mini-cart-name font"><a href="'+val.link+'">'+val.name+'</a></div>';
                    var attributes  = $( "<div class='mini-cart-attributes'></div>" );
                    var colorAttr   = '<div class="attribute"><span class="label">Colour: </span><span class="value">'+val.color+'</span></div>';
                    var sizeAttr    = '<div class="attribute"><span class="label">Size&nbsp&nbsp&nbsp: </span><span class="value">'+val.size+'</span></div>';
                    
                    if(val.width.length > 0){
                        var widthAttr   = '<div class="attribute"><span class="label">Width : </span><span class="value">'+val.width+'</span></div>';
                    }
                    var price_sale  = val.price_sale
                    price_sale = parseFloat(price_sale);
                    price_sale = price_sale.toFixed(2);
                    
                    var pricing = '<div class="mini-cart-pricing"><span class="label">Qty&nbsp&nbsp&nbsp&nbsp: </span><span class="value">'+val.qty+'</span><span class="mini-cart-price">$'+price_sale+'</span></div>';
                    
                    var total   = val.subtotal;
                    subtotal    = parseFloat(subtotal) + parseFloat(total);

                    if(val.image != null && val.image != ''){
                        var imageDiv    = $( "<div class='mini-cart-image'></div>" );
                        var startlink   = '<a href="'+val.link+'">';
                        var endlink     = '</a>';
                        var img         = '<img src="'+val.image+'" alt="'+val.name+'" title="'+val.name+'" />';
                        imageDiv.append(startlink+img+endlink);
                        productDiv.append(imageDiv);
                    }
                    
                    productDiv.append(nameDiv);
                    attributes.append(colorAttr);
                    attributes.append(sizeAttr);

                    if(val.width.length > 0){
                        attributes.append(widthAttr);
                    }
                    productDiv.append(attributes);
                    productDiv.append(pricing);
                    
                    $('.mini-cart-products').append(productDiv);
                    
                });
                subtotal = subtotal.toFixed(2);
                $('.mini-cart-subtotals span.value').html('$'+subtotal);
            }
            
        },
        error:function(){
            $(".mini-cart-content-custom").hide('fast');
        }
        
        
    });

}

//Add product to cart 
function cart()
{
	
	
    /*if(isMobile.any()) {
        console.log('mobile');
    }else{*/
	    $(".cartForm").submit(function(e){
            /*console.log('loading cart form');
			console.log($(this).serialize());
			return false;*/
					/*var prod_type = document.getElementById("prod_type1").value;
					if(prod_type == 'footwear'){
						var width_value = document.getElementById("va-width").value;
					} else {
						var width_value = '';
					}
					
					var size_value = document.getElementById("va-size").value;
					var addcart = document.getElementById("add-to-cart");
					var qvalue = document.getElementById("Quantity").value;
					//var errormsgdiv = document.getElementById("error-msg");
					var errorattrdiv = document.getElementById("attr-error");
					var error = document.getElementById("errorattr");
									
					if((size_value === '' && width_value === '') && prod_type === 'footwear'){
						//alert("Select Size and width!");
						error.style.display = "block";
						errorattrdiv.innerHTML = "size, width";
						addcart.addClass("disabled");
					}else if(width_value === '' && prod_type === 'footwear'){
						error.style.display = "block";
						errorattrdiv.innerHTML = "width";
						addcart.addClass("disabled");
					}else if(size_value === ''){
						error.style.display = "block";
						errorattrdiv.innerHTML = "size";
						addcart.addClass("disabled");
					}else if(qvalue === ''){
						alert('Quantity is required');
						addcart.addClass("disabled");
					}else{*/
						//addcart.removeClass("disabled");
						//error.style.display = "none";
						
						var url         = $(this).attr("action")+'/ajax/';
						console.log(url);
						var data        = $(this).serialize();
						var dataType    = "json";
						
						$.ajax({
						  type: "POST",
						  url: url,
						  data: data,
						}).done(function( data ) {
							
							if(data){
								// $('#add-to-cart').hide();
								load_cart();
								$(".mini-cart-content-custom").slideDown("slow");
								// $( "#add-to-cart" ).replaceWith( "<p>New heading</p>" );
			
								$("#backToTop").trigger('click');
			
							}
			
						});



            e.preventDefault();
						
						
					
					
					
            
        });
    // }


}



