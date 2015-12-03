								
<?php foreach($prod_arr as $curr_prod) {
					
							$product_name 	=  $curr_prod->disp_name;			
							$ldesc			=  $curr_prod->long_desc;
							$sdesc			=  $curr_prod->short_desc;
							$style			=  $curr_prod->style;
							$avalue			=  $curr_prod->attr_value;
							$acode			=  $curr_prod->attr_code;
							
							}
					
						?>

<div id="product-content">
    <h4 class="info-sec-heading">SELECT YOUR SIZE
        <span class="info-sec-heading-close">close</span>
    </h4>
    <div class="product-content-header">
        <h2 class="product-name" itemprop="name">
            <?php echo $product_name;?>
        </h2>
        <?php foreach($prod_attr as $row) { if($row->attr_id == 'season' && $row->attr_value != '') { ?>
        <p class="product-id">
            <!-- LEATHER JACKETS /  -->
            <?php echo $row->attr_value; ?>
        </p>
        <?php } } ?>
        <?php foreach($prod_attr as $row) { if($row->attr_id == 'productGroup' && $row->attr_value != '') { ?>
        <h5>
            <?php echo $row->attr_value; ?>
        </h5>
        <?php } } ?>
        <h6>ID:
            <?php echo $style;?>
        </h6>
        <div class="product-price">
            <span class='price-sales'>
            
            $1,298.00</span>
        </div>
    </div>
    <div id="product-content-detail">
        <div class='product-variations ' data-current="{}">
            <ul class="clearfix">
                <li class="attribute color clearfix" data-variation-type="color">
                    <div class="label">
                        <?php if(isset($count_color)) { ?>
                        <h5>
                            <span>
								Choose Color (<?php echo $count_color; ?>)
                            </span>
                        </h5>
                        <?php } ?>
                    </div>
                    <div class="value">
                        <div class="swatch-wrapper" data-sliderwidth="65">
                            <div class="swatch-Slider">
                                <ul class="swatches Color color-slides jcarousel-skin-tango" 
                                    <?php if($count_color == 1) { ?> style="height: 96px;position: relative;width: 84px;" 
                                    <?php } ?>
                                    <?php if($count_color == 2) { ?> style="height: 96px;position: relative;width: 168px;" 
                                    <?php } ?>
                                    <?php if($count_color == 3) { ?> style="height: 96px;position: relative;width: 252px;" 
                                    <?php } ?>
                                    <?php if($count_color == 4) { ?> style="height: 96px;position: relative;width: 336px;" 
                                    <?php } ?> >
                                    <?php 
														for($i = 0; $i < $count_color; $i++) 
														{ 
															if($color[$i]->color == $color_compare)
															{
														?>
                                    <li class='selected swatch-ele'>
                                        <a href="<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>" title="<?php echo $color_compare;?>" class="swatchanchor" data-lgimg='{"url":"<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg", "title":"W-NICK, Green", "alt":"W-NICK, Green", "hires":""}' data-productdetailsurl='<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>'>
                                            <img itemprop="image" src="<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=65&sh=87" alt="W-NICK, Green" data-thumb='{"src":"<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=30&sh=40","altimg":"<?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=320&sh=427","alt":"W-NICK, Green","title":"W-NICK, Green"}' >
                                            </img>
                                        </a>
                                        <div title="<?php $color[$i]->microcolor; ?>" class="selected-color-overlay">
                                            <h5>
                                                <span class="colorname">
                                                    <?php echo $color[$i]->microcolor; ?>
                                                </span>
                                            </h5>
                                        </div>
                                    </li>
                                    <?php 
															} 
															else 
															{ 
															?>
                                    <li class='emptyswatch swatch-ele'>
                                        <?php 
															if(isset($size_compare))
															{
															?>
                                        <a href="<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>&color=<?php echo $color[$i]->color; ?>&size=<?php echo $size_compare; ?>" title="<?php echo $color[$i]->microcolor;?>" class="swatchanchor" data-lgimg='{"url":"<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg", "title":"W-NICK, Green", "alt":"W-NICK, Green", "hires":""}' data-productdetailsurl='<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>&color=<?php echo $color[$i]->color; ?>&size=<?php echo $size_compare; ?>'>
											<img itemprop="image" src="<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=65&amp;sh=87" alt="W-NICK, Green" data-thumb='{"src":"<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=30&amp;sh=40","altimg":"<?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=320&amp;sh=427","alt":"W-NICK, Green","title":"W-NICK, Green"}' >
											</img>
										</a>
                                        <?php 
															} 
															else 
															{ 
															?>
                                        <a href="<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>&color=<?php echo $color[$i]->color; ?>" title="<?php echo $color[$i]->microcolor;?>" class="swatchanchor" data-lgimg='{"url":"<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg", "title":"W-NICK, Green", "alt":"W-NICK, Green", "hires":""}' data-productdetailsurl='<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>&color=<?php echo $color[$i]->color; ?>'>
                                             
															
                                            <img itemprop="image" src="<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=65&amp;sh=87" alt="W-NICK, Green" data-thumb='{"src":"<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=30&amp;sh=40","altimg":"<?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=320&amp;sh=427","alt":"W-NICK, Green","title":"W-NICK, Green"}' >
                                            </img>
										</a>
											<?php
											}
											
											?>
                                        
                                        <div title="<?php echo $color[$i]->microcolor; ?>" class="selected-color-overlay">
                                            <h5>
                                                <span class="colorname">
                                                    <?php echo $color[$i]->microcolor; ?>
                                                </span>
                                            </h5>
                                        </div>
                                    </li>
                                    <?php 
															} 
															} 
															?>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="size-info"></li>
                <li class="attribute size clearfix" id="size" data-variation-type="size">
                    <div class="value">
                        <div class="customSelectBox">
                            <?php 
												if(isset($size) && isset($size_compare))
													{
													for($i = 0; $i < $count_size; $i++) 
														{ 
														/*echo '
                            <li class="emptyswatch">';
														echo '
                                <a title="'.$row1->size.'" class="swatchanchor" href=""'.base_url().'"product-variation.html?pid="'.$prod_arr[0]->style.'"&amp;dwvar_"'.$prod_arr[0]->style.'"_color="'.$prod_arr[0]->attr_code.'"&amp;dwvar_"'.$prod_arr[0]->style.'"_size="'.$row1->size.'"" data-productdetailsurl=""'.base_url().'"product-variation.html?pid="'.$prod_arr[0]->style.'"&amp;dwvar_"'.$prod_arr[0]->style.'"_color="'.$prod_arr[0]->attr_code.'"&amp;dwvar_"'.$prod_arr[0]->style.'"_size="'.$row1->size.'"">';
														echo $row1->size;
														echo '</a>';
														echo '
                            </li>';*/
														if($size[$i]->size == $size_compare)
														{
												?>
                            <h5>
                                <span class="selectedVal">
                                    <?php echo $size[$i]->size;?>
                                </span>
                            </h5>
                            <?php 
														} 
														} 
													}
														else
														{
														?>
                            <h5>
                                <span class="selectedVal"> Size</span>
                            </h5>
                            <?php 	
														}
													?>
                            <span class="arrows"></span>
                            <div class="customSelectBoxScroll">
                                <div class="viewport">
                                    <div class="overview">
                                        <ul class="swatches swatch-variation size">
                                            <?php 
																	if(isset($size) && isset($size_compare))
																		{
																	for($i = 0; $i < $count_size; $i++) 
																		{	
																		if($size[$i]->size != $size_compare) 
																		{ ?>
                                            <li class="emptyswatch">
                                                <a title="<?php echo $size[$i]->size; ?>" class="swatchanchor" href="<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>&color=<?php echo $color_compare;?>&size=<?php echo $size[$i]->size; ?>" data-productdetailsurl='<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>&color=<?php echo $color_compare;?>&size=<?php echo $size[$i]->size; ?>'>
													<?php echo $size[$i]->size; ?>
                                                </a>
                                            </li>
                                            <?php	
																	} 
																	} 
																	} 
																	else 
																	{
																		foreach($size as $row1)
																		{
																?>
                                            <li class="emptyswatch">
                                                <a title="<?php echo $row1->size; ?>" class="swatchanchor" href="<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>&amp;color=<?php echo $color_compare;?>&amp;size=<?php echo $row1->size; ?>" data-productdetailsurl='<?=base_url();?>Product/prod_var?pid=<?php echo $style;?>&amp;color=<?php echo $color_compare;?>&amp;size=<?php echo $row1->size; ?>'>
													<?php echo $row1->size; ?>
                                                </a>
                                            </li>
                                            <?php
																		} 
																	}
																?>
                                            <!--<li class="emptyswatch"><a title="S" class="swatchanchor" href="
                                            <?//=base_url();?>product-variation.html?pid=00SJT20CAKE&amp;dwvar_00SJT20CAKE_color=51F&amp;dwvar_00SJT20CAKE_size=S" data-productdetailsurl='
                                            <?//=base_url();?>product-variation.html?pid=00SJT20CAKE&amp;dwvar_00SJT20CAKE_color=51F&amp;dwvar_00SJT20CAKE_size=S'>
S
</a></li><li class="emptyswatch"><a title="M" class="swatchanchor" href="
                                            <?//=base_url();?>product-variation.html?pid=00SJT20CAKE&amp;dwvar_00SJT20CAKE_color=51F&amp;dwvar_00SJT20CAKE_size=M" data-productdetailsurl='
                                            <?//=base_url();?>product-variation.html?pid=00SJT20CAKE&amp;dwvar_00SJT20CAKE_color=51F&amp;dwvar_00SJT20CAKE_size=M'>
M
</a></li><li class="emptyswatch"><a title="L" class="swatchanchor" href="
                                            <?//=base_url();?>product-variation.html?pid=00SJT20CAKE&amp;dwvar_00SJT20CAKE_color=51F&amp;dwvar_00SJT20CAKE_size=L" data-productdetailsurl='
                                            <?//=base_url();?>product-variation.html?pid=00SJT20CAKE&amp;dwvar_00SJT20CAKE_color=51F&amp;dwvar_00SJT20CAKE_size=L'>
L
</a></li><li class="emptyswatch"><a title="XL" class="swatchanchor" href="
                                            <?//=base_url();?>product-variation.html?pid=00SJT20CAKE&amp;dwvar_00SJT20CAKE_color=51F&amp;dwvar_00SJT20CAKE_size=XL" data-productdetailsurl='
                                            <?//=base_url();?>product-variation.html?pid=00SJT20CAKE&amp;dwvar_00SJT20CAKE_color=51F&amp;dwvar_00SJT20CAKE_size=XL'>
XL
</a></li>-->
                                        </ul>
                                    </div>
                                </div>
                                <div class="scrollbar">
                                    <div class="track">
                                        <div class="thumb">
                                            <div class="end"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
		<?php 
		
		?>
						
        <div class="product-add-to-cart">
            <div class="product-bottom-wrap">
                <div class="product-add-cart">
				<?php if(empty($size_compare)) { ?>
                    <div class="product-tool-tip">
                        <span class="arrow"></span>
                        <div class="msg"></div>
                    </div>
				<?php } ?>	
				
                    <form action="<?php echo base_url();?>Cart/add" method="post" id="dwfrm_product_addtocart_d0ujnqfmsabp" class="cartForm" >
                        <fieldset>
							<input type="hidden" name="pid" id="pid" value="<?php echo $style; ?>"></input>
							<input type="hidden" name="pname" id="pname" value="<?php echo $product_name; ?>"></input>
							<input type="hidden" name="prd_color" id="prd_color" value="<?php echo $color_compare; ?>" ></input>
						
							<div id="pdp-actions" class="pdp-actions">
                                <h3>
                                    <button id="add-to-cart-button" type="submit" value="Add to Bag" class="btn-oswald red  add-to-cart-button" >Add to Bag</button>
                                </h3>
                                <a class='mobile-wishlist-button' title="Add to Wishlist">Add to Wishlist</a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div class='feedback-panel product-id-00SJT20CAKE'>
                <span class="close-icon-b"></span>
                <h3>1 item added to bag</h3>
                <h4>
                    <a href="<?php echo base_url();?>Cart" class="goto-mybag" title="Go to My Bag">Go to My Bag</a>
                </h4>
                <h4 class="button_1">
                    <a class="continue_shopping" id="continue_button" title="Continue Shopping ">Continue Shopping </a>
                </h4>
				<div class="ajax" id="ajax"></div>
            </div>
            <div class="goto_sec">
                <h5 class="pdp-explore-main" data-goto="pdp-explore-main">
                    <a href="javascript:void(0);">Explore</a>
                </h5>
                <h5 class="promotionBlock-styleIt" data-goto="promotionBlock.styleIt">
                    <a href="javascript:void(0);">Style It</a>
                </h5>
                <h5 class="promotionBlock-featuredIn" data-goto="promotionBlock.featuredIn">
                    <a href="javascript:void(0);">Featured In</a>
                </h5>
                <h5 class="promotionBlock-alsoLike" data-goto="promotionBlock.alsoLike">
                    <a href="javascript:void(0);">You May Also Like</a>
                </h5>
            </div>
            <div class="pdp-share-link clearfix">
                <div class="info-icon-link col-md-4">
                    <span>+INFO</span>
                </div>
                <a class='favorite color col-md-4 col-lg-6 wl-action ' title="Add to Wishlist" href="https://shop.diesel.com/wishlist-add?pid=00SJT20CAKE&amp;source=productdetail">
                    <span class="fav-link pdp-sprite-icon">Add to Wishlist</span>
                </a>
                <a class="social-media-link col-md-4 col-lg-6 share color" id="social-media-bottom" title="Share" href="">
                    <span class="share-link pdp-sprite-icon">Share</span>
                </a>
            </div>
            <div class="social-media-dialog share-media-bottom hide ">
                <div class="social-media">
                    <div class="ui-popup-close">
                        <span class="sprite-icon popup-close">Closeclose</span>
                    </div>
                    <div class="share-icon">
                        <div class=" addthis_toolbox addthis_default_style addthis_32x32_style" addthis:url="http://shop.diesel.com/leather-jackets/w-nick/00SJT20CAKE.html" id="global-popup">
                            <div class="share-icon">
                                <div class="addthis_toolbox addthis_default_style addthis_32x32_style">
                                    <a class="addthis_button_preferred_1"></a>
                                    <a class="addthis_button_preferred_2"></a>
                                    <a class="addthis_button_preferred_3"></a>
                                    <a class="addthis_button_preferred_4"></a>
                                    <a class="addthis_button_compact"></a>
                                    <a class="addthis_counter addthis_bubble_style" style=""></a>
                                </div>
                            </div>
                            <script type="text/javascript">
                                                        var addthis_config = {
                                                            "data_track_addressbar": false
                                                        };
                                                    </script>
                            <script type="text/javascript" src="
                                <?=base_url();?>js/addthis_widget.js#pubid=" +addThisID>
                            </script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="update-images" style="display:none">
            <div id="pdpThumbnails">
                <div class="zoom-image">
                    <a class="zoom pdp-controls" id="zoom-hook" href="" data-src="http://shop.diesel.com/on/demandware.store/Sites-DieselUS-Site/default/Link-LoadZoom?viewtype=zoom" data-imageid="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_F.jpg?sw=640&amp;sh=853">
											Zoom
										</a>
                </div>
                <ul id="product-view" class="product-slides">
                    <li id="product-thumbview-0">
                        <a data-href="<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=2000" title="<?php echo $product_name;?>">
                            <img class="primary-image" src="<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=80&amp;sh=107" alt="<?php echo $product_name;?>,<?php echo $avalue;?>" title="<?php echo $product_name;?>,<?php echo $avalue;?>" />
                            </a>
                            <div class="selected-overlay">Overlay Background</div>
                        </li>
                        <li id="product-thumbview-1">
                            <a data-href="
                                <?=base_url();?>images/00SJT2_0CAKE_51F_E.jpg?sw=2000" title="W-NICK">
                                <img class="primary-image" src="
                                    <?=base_url();?>images/00SJT2_0CAKE_51F_E.jpg?sw=80&amp;sh=107" alt="W-NICK, Green" title="W-NICK, Green" >
                                </img>
                            </a>
                            <div class="selected-overlay">Overlay Background</div>
                        </li>
                        <li id="product-thumbview-2">
                            <a data-href="
                                <?=base_url();?>images/00SJT2_0CAKE_51F_A.jpg?sw=2000" title="W-NICK">
                                <img class="primary-image" src="
                                    <?=base_url();?>images/00SJT2_0CAKE_51F_A.jpg?sw=80&amp;sh=107" alt="W-NICK, Green" title="W-NICK, Green" >
                                </img>
                            </a>
                            <div class="selected-overlay">Overlay Background</div>
                        </li>
                        <li id="product-thumbview-3">
                            <a data-href="
                                <?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=2000" title="W-NICK">
                                <img class="primary-image" src="
                                    <?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=80&amp;sh=107" alt="W-NICK, Green" title="W-NICK, Green" >
                                </img>
                            </a>
                            <div class="selected-overlay">Overlay Background</div>
                        </li>
                    </ul>
                </div>
                <div class="product-slides-wrapper">
                    <span class="pdp-mobile-zoom-close"></span>
                    <ul class="product-slides-list1">
                        <li id="product-thumbview-0">
                            <a data-href="
                                <?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=2000" class="product-image main-image" title="W-NICK">
                                <img class="primary-image" src="
                                    <?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=640&amp;sh=853" alt="W-NICK, Green" title="W-NICK, Green" >
                                </img>
                            </a>
                        </li>
                        <li id="product-thumbview-1">
                            <a data-href="
                                <?=base_url();?>images/00SJT2_0CAKE_51F_E.jpg?sw=2000" class="product-image main-image" title="W-NICK">
                                <img class="primary-image" src="
                                    <?=base_url();?>images/00SJT2_0CAKE_51F_E.jpg?sw=640&amp;sh=853" alt="W-NICK, Green" title="W-NICK, Green" >
                                </img>
                            </a>
                        </li>
                        <li id="product-thumbview-2">
                            <a data-href="
                                <?=base_url();?>images/00SJT2_0CAKE_51F_A.jpg?sw=2000" class="product-image main-image" title="W-NICK">
                                <img class="primary-image" src="
                                    <?=base_url();?>images/00SJT2_0CAKE_51F_A.jpg?sw=640&amp;sh=853" alt="W-NICK, Green" title="W-NICK, Green" >
                                </img>
                            </a>
                        </li>
                        <li id="product-thumbview-3">
                            <a data-href="
                                <?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=2000" class="product-image main-image" title="W-NICK">
                                <img class="primary-image" src="
                                    <?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=640&amp;sh=853" alt="W-NICK, Green" title="W-NICK, Green" >
                                </img>
                            </a>
                        </li>
                        <li id="product-thumbview-4">
                            <a data-href="
                                <?=base_url();?>images/00SJT2_0CAKE_51F_O.jpg?sw=2000" class="product-image main-image" title="W-NICK">
                                <img class="primary-image" src="
                                    <?=base_url();?>images/00SJT2_0CAKE_51F_O.jpg?sw=640&amp;sh=853" alt="W-NICK, Green" title="W-NICK, Green" >
                                </img>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <script>
			var elms = jQuery('#product-content-detail ul.product-description-list').find('li');
			elms.each(function() {
				if (jQuery.trim($(this).html()) == '') $(this).remove();
			});
		</script>
		
		<script type="text/javascript">
			/**
**  Custom JavaScript File
**  brooksrunning.com.au
**  By Dominic Fernandes
**/

// Ajax Header Cart show
/*
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

	$('.continue_shopping').click(function(){
		$("#product-content-detail.feedback-show .feedback-panel").hide();
		$("#product-content-detail .feedback-panel").hide();
		$(".product-bottom-wrap").show();
		$("#size").show();
	});	

    /*$('.mini-cart-close').click(function(){ 
        $('.mini-cart-content-custom').hide(); 
    });

    $('.continueshop-btn').click(function(){ 
        $('.mini-cart-content-custom').hide(); 
    });
    
});*/


function load_cart(){	
   // $('.mini-cart-products').html('');
    var url = $('.ajax-url').attr('href');
    var t   = 0;
     
    $.ajax({
        url     : url,
        dataType:'json',
        success:function(result){
			//alert("success");
			
            if(result.length > 0)
			{
				var image       = $('.mini-cart-image a img');
                var prod_name   = $('.mini-cart-name a');
            //    var attribute   = $('.mini-cart-attributes');
            //    var pricing     = $('.mini-cart-pricing');
                var qty         = $('.mini-cart-quantity');
                var qty_val     = $('#mini-cart-quantity');
                var subtotal    = 0;
                var count       = parseInt(result.length);

                qty.html(count);
                qty_val.val(count);

                $.each(result, function(key, val){
                    
                    //var productDiv  	= $( "<div class='mini-cart-details clearfix'></div>" );                                             
                    //var nameDiv     	= '<div class="mini-cart-name font"><a href="''">'+val.name+'</a></div>'; edited by abhishek on 17/11/15.
					//var miniCartSize  	= $( "<div class='mini-cart-size'></div>" );
					//var nameDiv     	= '<div class="mini-cart-name font"><h5><a href="http://shop.diesel.com/winter-jackets/w-hermes/8059966250754.html">W-HERMES</a></h5></div>';
					//var header6			= '<h6></h6>';
					//var value 			= '<div class="attribute"><span class="value">2</span></div>';
					//var label 			= '<div class="attribute"><span class="label"> x </span></div>';
					//var miniattr		= $( "<div class='mini-cart-attributes'></div>" );
					//var attribute		= '<span class="attribute"></span>';
					//var avalue			= '<div class="attribute"><span class="value">2 x Army , M W</span></div>';
					
					
					//productDiv.appendchild(nameDiv);
					//miniattr.appendchild(avalue);
				
					//$('.mini-cart-productss').appendchild(productDiv);
					//var colorAttr   	= '<div class="attribute"><span class="label">Colour: </span><span class="value">'+val.color+'</span></div>';
                    //var sizeAttr    	= '<div class="attribute"><span class="label">Size&nbsp&nbsp&nbsp: </span><span class="value">'+val.size+'</span></div>';
                    
                   /* if(val.width.length > 0){
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
                    
                    $('.mini-cart-products').append(productDiv);*/
                    
                });
                //subtotal = subtotal.toFixed(2);
                //$('.mini-cart-subtotals span.value').html('$'+subtotal);
            }
			else
			{
				document.write("Hello");
			}
            
        },
        error:function(){
            $(".mini-bag-content").hide('fast');
        }
        
        
    });
	
					var productDiv  	= $( "<div class='mini-cart-details clearfix'></div>" ); 		
                    //var nameDiv     	= '<div class="mini-cart-name font"><a href="''">'+val.name+'</a></div>'; edited by abhishek on 17/11/15.
					//var miniCartSize  	= $( "<div class='mini-cart-size'></div>" );
					var nameDiv     	= '<div class="mini-cart-name font"><h5><a href="http://shop.diesel.com/winter-jackets/w-hermes/8059966250754.html">W-HERMES</a></h5></div>';
					//var header6			= '<h6></h6>';
					//var value 			= '<div class="attribute"><span class="value">2</span></div>';
					//var label 			= '<div class="attribute"><span class="label"> x </span></div>';
					var miniattr		= $( "<div class='mini-cart-size'></div>" );
					//var attribute		= '<span class="attribute"></span>';
					var avalue			= '<span class="value">2 x Army , M W</span>';
					var price			= '<div class="mini-cart-pricing">$998.00</div>';
					var item_details	= '<div class="item-details"><span class="total-items">1 Item</span><span class="items-price">$998.00</span></div><hr>';
					var total			= '<div class="mini-bag-totals"><span class="label">Order Subtotal:</span><span class="value">$998.00</span></div>';
					var header			= '<h2 class="heading-txt">SHOPPING BAG</h2><hr>';
					var button_bag		= '<div class="mini-cart-button clearfix"><a class="primary-button red viewCart viewBag" href="#" title="Continue Shopping ">Continue Shopping </a></div>';			
					
					$(".mini-cart-totals").empty();
					
					
					$(".mini-cart-totals").append(header);
					$(".mini-cart-totals").append(item_details);
					$(".mini-cart-totals").append(total);
					$(".mini-cart-totals").append(button_bag);
					productDiv.append(nameDiv);
					miniattr.append(avalue);
					productDiv.append(miniattr);
					productDiv.append(price);
				
					$('.mini-cart-productss').append(productDiv);

}

//Add product to cart 
$(function(){
	$(".add-to-cart-button").click(function() {
	
	$(".product-bottom-wrap").css({display: "none"});
	$("#size").css({display: "none"});
	$("#product-content-detail.feedback-show .feedback-panel").css({display: "block"});
	$("#product-content-detail .feedback-panel").css({display: "block", margintop: "10px",padding: "0 24px 0 24px",position: "relative"});
	//$( ".rows .mini-cart-totals" ).children().last().removeClass("mini-cart-button");
    //$( ".rows .mini-cart-totals" ).children().last().addClass("mini-cartcheckout-button"); 
	//$('.mini-cart-button').removeClass('mini-cart-button').addClass('mini-cartcheckout-button');
	//$( "div.mini-cart-button" ).replaceWith( $( ".mini-cartcheckout-button" ) );
	$(".mini-cart-button").attr("class",this.className.replace('mini-cartcheckout-button'));
	//$('.bag-holder #mini-cart-icon.empty-black-bag').removeClass('empty-black-bag').addClass('empty-red-bag');
    /*if(isMobile.any()) {
        console.log('mobile');
    }else{*/
	    $(".cartForm").submit(function(e){
						
						
						var url         = $(this).attr("action")+'/ajax/';
						console.log(url);
						var data        = $(this).serialize();
						var dataType    = "json";
						
						$.ajax({
						  type: "POST",
						  url: url,
						  data: data,
						  success: function( data ) {
							
							if(data){
								console.log(data);
								// $('#add-to-cart').hide();
								load_cart();
								$("html, body").animate({ scrollTop: 0 }, "fast");
								setTimeout(function(){ 
									$('#mini-cart-icon-empty').attr('id', 'mini-cart-icon');	
									$('.bag-holder #mini-cart-icon.empty-black-bag').removeClass('empty-black-bag').addClass('empty-red-bag');
									$('.bag-holder #mini-cart-icon.empty-black-bag').removeClass('empty-black-bag').addClass('empty-red-bag');
									$('.bag-holder .empty-bag-count').removeClass('empty-bag-count').addClass('bag-count');
									$('.bag-count').html('1');
									$(".bag-count").css({color: "rgb(208, 2, 27)"});
									$(".mini-bag-content").slideDown("slow"); 
									$(".mini-bag-content").css({position: "absolute !important"});
								}, 1000);
								
								// $( "#add-to-cart" ).replaceWith( "<p>New heading</p>" );
			
								//$("#backToTop").trigger('click');
			
							}
							else
							{
								document.write("HELLO");
							}
			
						}
						});
					e.preventDefault();
						
            
        });
    // }
	});

});




		</script>
		
    </div>
	
	
	
					