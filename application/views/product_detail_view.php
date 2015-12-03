				<?php foreach($prod_arr as $curr_prod) {
					
					$product_name 	=  $curr_prod->disp_name;			
					$ldesc			=  $curr_prod->long_desc;
					$sdesc			=  $curr_prod->short_desc;
					$style			=  $curr_prod->style;
					$avalue			=  $curr_prod->attr_value;
					$acode			=  $curr_prod->attr_code;
					
					}
					
				?>
	<div id="pdpMain" class="pdp-main clearfix ">
					
                    <div class="pdp-main-1 pdp-redesign col-lg-9 col-md-9 col-sm-12 left-pdp-sec" style="background-image:url('<?=base_url();?>images/backmendenim.jpg');background-repeat:repeat" itemscope itemtype="http://schema.org/Product">

                        <div class="breadcrumb-container">

                            <ol class="breadcrumb ">

                                <li>
                                    <h4><a href="#">Home</a><span class="divider">&#47;</span></h4>
                                </li>

                                <script type="text/javascript">
                                    //<!--
                                    /* <![CDATA[ */
                                    if (dw && dw.__ac) {
                                        dw.__ac.page({
                                            category: 'diesel-man-denimandclothing-jackets-leatherjackets'
                                        })
                                    };
                                    /* ]]> */
                                    // -->
                                </script>

                                <script>
                                    $(document).ready(function() {
                                        var id = "diesel-man";
                                        $('#' + id + ' a.level-1').addClass('active');
                                    });
                                </script>

                                <li>
                                    <h4><a href="#">MEN</a><span class="divider">&#47;</span></h4>
                                </li>

                                <li>
                                    <h4><a href="#">Jackets</a><span class="divider">&#47;</span></h4>
                                </li>

                                <li>
                                    <h4><a href="#">LEATHER JACKETS</a><span class="divider">&#47;</span></h4>
                                </li>

                                <li>
                                    <h4><span class="last"><?php echo $product_name;?></span></h4>
                                </li>

                            </ol>

                        </div>

                        <div class="pdp-main-wrapper">

                            <!-- dwMarker="product" dwContentID="bcidoiaaiMmMaaaadkUroyokxa" -->
                            <div class="pdp-explore-main">

                                <div class="product-discription-tab col-lg-5 col-md-8 col-sm-12">
                                    <div class="pdptoplpback"></div>
                                    <div class="product-discription clearfix">
                                        <div class="pdptoplpback"></div>

                                        <h1 class="product-name" itemprop="name"><?php echo $product_name;?></h1>
                                        <h2 class="product-category" itemprop="name"><?php foreach($prod_attr as $row) { if($row->attr_id == 'productGroup') { echo $row->attr_value; } } ?></h2>
                                        <div class="info-sec-dialog">
                                            <h4 class="info-sec-heading">INFO <span class="info-sec-heading-close">close</span></h4>
                                            <ul class="detail-discription-1 col-lg-12 col-lg-push-0 col-md-10 col-md-push-1 col-sm-10 col-sm-push-1">

                                                <li class='first-li'>
                                                    <h4 class='active'>
                           
                                About
                           
                       </h4>

                                                    <div class="discription-list">
                                                        <ul class="discription-list-inner bullet-list">
														<?php if(isset($ldesc) && $ldesc != '') { ?>
                                                            <li class="bullet-list-none">
                                                                <p>
                                                                    <span><?php echo $ldesc; ?></span>
                                                                </p>
                                                            </li>
														<?php } ?>
														<?php foreach($prod_attr as $row) { if($row->attr_id == 'editorialComposition' && $row->attr_value != '') { ?>
                                                            <li>
                                                                <p>
                                                                    <span><?php $str1 = $row->attr_value; $arr1 = explode('+',$str1); for($i = 0;$i<sizeof($arr1);$i++) { echo $arr1[$i]; echo "<br>";} ?></span>
                                                                </p>
                                                            </li>
															<?php } } ?>
															<?php 
															if(isset($sdesc) &&  $sdesc != '')
															{
																$str = $sdesc;
																$arr = explode(',',$str);	
															for($i = 0; $i < sizeof($arr); $i++)
															{
															?>
                                                            
															<li>
                                                                <p>
                                                                    <span><?php echo $arr[$i];?></span>
                                                                </p>
                                                            </li>
															<?php } }?>
                                                        </ul>
                                                    </div>
                                                </li>

                                                <li class=''>
                                                    <h4 class=''>Size &amp; Fit</h4>

                                                    <div class="discription-list">
                                                        <ul class="discription-list-inner">

                                                            <li>
                                                                <strong>Size &amp; Fit</strong>
                                                                <p>
                                                                    <span>Model is wearing a size L and is 182 cm /  5'10''</span>
                                                                </p>
                                                            </li>
															<?php foreach($prod_attr as $row) { if($row->attr_id == 'fittingInfo' && $row->attr_value != '') { ?>
                                                            <li>
                                                                <strong>Fitting Information </strong>
                                                                <p>
                                                                    <span><?php echo $row->attr_value; ?></span>
                                                                </p>
                                                            </li>
															<?php } } ?>
															<?php foreach($prod_attr as $row) { if($row->attr_id == 'fittingEditorial' && $row->attr_value != '') { ?>
                                                            <li>
                                                                <strong>Fitting Editorial Information </strong>
                                                                <p>
                                                                    <span><?php echo $row->attr_value; ?></span>
                                                                </p>
                                                            </li>
															<?php } } ?>
                                                        </ul>
                                                    </div>
                                                </li>

                                            </ul>

                                        </div>
                                    </div>
                                </div>

                                <div class="product-image-sec product-image-container zoom-image-container col-lg-7 col-md-12">
								
                                    <div id="pdpThumbnails">
                                        <div class="zoom-image">
                                            <a class="zoom pdp-controls" id="zoom-hook" href="" data-src="http://shop.diesel.com/on/demandware.store/Sites-DieselUS-Site/default/Link-LoadZoom?viewtype=zoom" data-imageid="<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=640&amp;sh=853">
                Zoom
            </a>
                                        </div>
                                        <ul id="product-view" class="product-slides">

                                            <?php 
												for($i = 0;$i<sizeof($prod_image_arr);$i++)
												{
													
												
											?>
                                            <li id="product-thumbview-<?php echo $i;?>">
                                                <a data-href="<?=base_url();?>" class="product-image main-image" title="<?php echo $product_name;?>">

                                                    <img class="primary-image" src="<?=base_url().'images/'.$prod_image_arr[$i]->image_path?>" alt="<?php echo $product_name;?>,<?php echo $avalue;?>" title="<?php echo $product_name;?>,<?php echo $avalue;?>" />
                                                </a>
                                            </li>
											<?php } ?>

                                        </ul>

                                    </div>
                                    <div class="product-slides-wrapper">
                                        <span class="pdp-mobile-zoom-close"></span>
                                        <ul class="product-slides-list1">
											
											<?php 
												for($i = 0;$i<sizeof($prod_image_arr);$i++)
												{
													
												
											?>
                                            <li id="product-thumbview-<?php echo $i;?>">
                                                <a data-href="<?=base_url();?>" class="product-image main-image" title="<?php echo $product_name;?>">

                                                    <img class="primary-image" src="<?=base_url().'images/'.$prod_image_arr[$i]->image_path?>" alt="<?php echo $product_name;?>,<?php echo $avalue;?>" title="<?php echo $product_name;?>,<?php echo $avalue;?>" />
                                                </a>
                                            </li>
											<?php } ?>
											  

                                        </ul>

                                        <div class="badge new-arrivals">
                                            <img src="<?=base_url();?>images/flagNew.png" alt="" />
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="recommendations">

                            <div class="promotionBlock alsoLike">
                                <h3>You May Also Like</h3>
                                <div class="content">
                                    <div class="sliderContent">
                                        <ul>

                                            <li>

                                                <div class="display">
                                                    <a class="img-link" href="http://shop.diesel.com/t-shirts/t-xena/00SHPZ0SAHQ.html">

                                                       <img itemprop="image" class="primary-image" data-altimg="<?=base_url();?>images/00SHPZ_0SAHQ_100_R.jpg?sw=255&amp;sh=340" src="<?=base_url();?>images/00SHPZ_0SAHQ_100_F.jpg?sw=255&amp;sh=340" alt="T-XENA, " />


                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a class="name-link" href="http://shop.diesel.com/t-shirts/t-xena/00SHPZ0SAHQ.html" title="T-XENA">
                                                        <span class="name">T-XENA</span>
                                                    </a>
                                                    <span class="colors">
                                    
                                        T-Shirt
                                    
                                </span>

                                                    <div class="product-price">

                                                        <div class="price-range">
                                                            $74.00 - $148.00
                                                        </div>

                                                    </div>

                                                </div>

                                            </li>

                                            <li>

                                                <div class="display">
                                                    <a class="img-link" href="http://shop.diesel.com/sweatshirts/s-milza/00SL2M0EAKR.html">

                                                        <img itemprop="image" class="primary-image" data-altimg="<?=base_url();?>images/00SL2M_0EAKR_8FL_R.jpg?sw=255&amp;sh=340" src="<?=base_url();?>images/00SL2M_0EAKR_8FL_F.jpg?sw=255&amp;sh=340" alt="S-MILZA, " />

                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a class="name-link" href="http://shop.diesel.com/sweatshirts/s-milza/00SL2M0EAKR.html?dwvar_00SL2M0EAKR_color=100" title="S-MILZA">
                                                        <span class="name">S-MILZA</span>
                                                    </a>
                                                    <span class="colors">
                                    
                                        Sweatshirt
                                    
                                </span>

                                                    <div class="product-price">

                                                        <span class='price-sales'>
            
            $128.00</span>

                                                    </div>

                                                </div>

                                            </li>

                                            <li>

                                                <div class="display">
                                                    <a class="img-link" href="http://shop.diesel.com/sweatshirts/s-mifun-wool/00SJSY0SAFC.html">

                                                        <img itemprop="image" class="primary-image" data-altimg="<?=base_url();?>images/00SJSY_0SAFC_900_R.jpg?sw=255&amp;sh=340" src="<?=base_url();?>images/00SJSY_0SAFC_900_F.jpg?sw=255&amp;sh=340" alt="S-MIFUN-WOOL, " />

                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a class="name-link" href="http://shop.diesel.com/sweatshirts/s-mifun-wool/00SJSY0SAFC.html?dwvar_00SJSY0SAFC_color=8FL" title="S-MIFUN-WOOL">
                                                        <span class="name">S-MIFUN-WOOL</span>
                                                    </a>
                                                    <span class="colors">
                                    
                                        Sweatshirt
                                    
                                </span>

                                                    <div class="product-price">

                                                        <span class='price-sales'>
            
            $278.00</span>

                                                    </div>

                                                </div>

                                            </li>

                                            <li>

                                                <div class="display">
                                                    <a class="img-link" href="http://shop.diesel.com/shirts/d-carry/00SJGE0SAJJ.html">

                                                        <img itemprop="image" class="primary-image" data-altimg="<?=base_url();?>images/00SJGE_0SAJJ_01_R.jpg?sw=255&amp;sh=340" src="<?=base_url();?>images/00SJGE_0SAJJ_01_F.jpg?sw=255&amp;sh=340" alt="D-CARRY, " />

                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a class="name-link" href="http://shop.diesel.com/shirts/d-carry/00SJGE0SAJJ.html?dwvar_00SJGE0SAJJ_color=900" title="D-CARRY">
                                                        <span class="name">D-CARRY</span>
                                                    </a>
                                                    <span class="colors">
                                    
                                        Shirt
                                    
                                </span>

                                                    <div class="product-price">

                                                        <span class='price-sales'>
            
            $198.00</span>

                                                    </div>

                                                </div>

                                            </li>

                                            <li>

                                                <div class="display">
                                                    <a class="img-link" href="http://shop.diesel.com/pants/p-hell/00SJRP0GAKH.html">

                                                        <img itemprop="image" class="primary-image" data-altimg="<?=base_url();?>images/00SJRP_0GAKH_900_R.jpg?sw=255&amp;sh=340" src="<?=base_url();?>images/00SJRP_0GAKH_900_F.jpg?sw=255&amp;sh=340" alt="P-HELL, " />

                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a class="name-link" href="http://shop.diesel.com/pants/p-hell/00SJRP0GAKH.html?dwvar_00SJRP0GAKH_color=01" title="P-HELL">
                                                        <span class="name">P-HELL</span>
                                                    </a>
                                                    <span class="colors">
                                    
                                        Pant
                                    
                                </span>

                                                    <div class="product-price">

                                                        <span class='price-sales'>
            
            $228.00</span>

                                                    </div>

                                                </div>

                                            </li>

                                            <li>

                                                <div class="display">
                                                    <a class="img-link" href="http://shop.diesel.com/pants/chi-johnny/00SLMG0AABS.html">

                                                        <img itemprop="image" class="primary-image" data-altimg="<?=base_url();?>images/00SLMG_0AABS_5CD_R.jpg?sw=255&amp;sh=340" src="<?=base_url();?>images/00SLMG_0AABS_5CD_F.jpg?sw=255&amp;sh=340" alt="CHI-JOHNNY, " />

                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a class="name-link" href="http://shop.diesel.com/pants/chi-johnny/00SLMG0AABS.html?dwvar_00SLMG0AABS_color=900" title="CHI-JOHNNY">
                                                        <span class="name">CHI-JOHNNY</span>
                                                    </a>
                                                    <span class="colors">
                                    
                                        Pant
                                    
                                </span>

                                                    <div class="product-price">

                                                        <span class='price-sales'>
            
            $178.00</span>

                                                    </div>

                                                </div>

                                            </li>

                                            <li>

                                                <div class="display">
                                                    <a class="img-link" href="http://shop.diesel.com/sweatshirts/s-kawa/00SJSV0IAJH.html">

                                                        <img itemprop="image" class="primary-image" data-altimg="<?=base_url();?>images/00SJSV_0IAJH_900_R.jpg?sw=255&amp;sh=340" src="<?=base_url();?>images/00SJSV_0IAJH_900_F.jpg?sw=255&amp;sh=340" alt="S-KAWA, " />

                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a class="name-link" href="http://shop.diesel.com/sweatshirts/s-kawa/00SJSV0IAJH.html?dwvar_00SJSV0IAJH_color=5CD" title="S-KAWA">
                                                        <span class="name">S-KAWA</span>
                                                    </a>
                                                    <span class="colors">
                                    
                                        Sweatshirt
                                    
                                </span>

                                                    <div class="product-price">

                                                        <span class='price-sales'>
            
            $148.00</span>

                                                    </div>

                                                </div>

                                            </li>

                                            <li>

                                                <div class="display">
                                                    <a class="img-link" href="http://shop.diesel.com/polos/t-yae/00SJNM0GAKC.html">

                                                        <img itemprop="image" class="primary-image" data-altimg="<?=base_url();?>images/00SJNM_0GAKC_900_R.jpg?sw=255&amp;sh=340" src="<?=base_url();?>images/00SJNM_0GAKC_900_F.jpg?sw=255&amp;sh=340" alt="T-YAE, " />

                                                    </a>
                                                </div>
                                                <div class="desc">
                                                    <a class="name-link" href="http://shop.diesel.com/polos/t-yae/00SJNM0GAKC.html?dwvar_00SJNM0GAKC_color=900" title="T-YAE">
                                                        <span class="name">T-YAE</span>
                                                    </a>
                                                    <span class="colors">
                                    
                                        Polo
                                    
                                </span>

                                                    <div class="product-price">

                                                        <span class='price-sales'>
            
            $98.00</span>

                                                    </div>

                                                </div>

                                            </li>

                                        </ul>
                                    </div>
                                    <div class="wrapper"></div>
                                </div>
                            </div>

                        </div>

                        <div class="social-media-dialog share-media-top hide">
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
                                                "data_track_addressbar": true
                                            };
                                        </script>

                                        <script type="text/javascript" src="<?=base_url();?>js/addthis_widget.js#pubid=" +addThisID></script>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!--/pdpMain -->
                    <div class="product-col-2  product-detail col-lg-3 col-md-3 styleit-hide featuredin-hide">

                        <div id="product-content">

                            <h4 class="info-sec-heading">SELECT YOUR SIZE<span class="info-sec-heading-close">close</span></h4>
                            <div class="product-content-header">

                                <h2 class="product-name" itemprop="name"><?php echo $product_name;?></h2>
								
                                <?php foreach($prod_attr as $row) { if($row->attr_id == 'season' && $row->attr_value != '') { ?>
								
								<p class="product-id">
								<!-- LEATHER JACKETS /  --><?php echo $row->attr_value; ?></p> <?php } } ?>
								
								<?php foreach($prod_attr as $row) { if($row->attr_id == 'productGroup' && $row->attr_value != '') { ?>
								
                                <h5> <?php echo $row->attr_value; ?></h5>
								
								<?php } } ?>

                                <h6>ID:<?php echo $style;?></h6>

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
                                                <h5><span>Choose Color (<?php echo $count_color; ?>)</span></h5>
											<?php } ?>
                                            </div>

                                            <div class="value">

                                                <div class="swatch-wrapper" data-sliderwidth="65">
                                                    <div class="swatch-Slider">
                                                        <ul class="swatches Color color-slides jcarousel-skin-tango" <?php if($count_color == 1) { ?>style="height: 96px;position: relative;width: 84px;" <?php } ?> <?php if($count_color == 2) { ?>style="height: 96px;position: relative;width: 168px;" <?php } ?> <?php if($count_color == 3) { ?>style="height: 96px;position: relative;width: 252px;" <?php } ?> <?php if($count_color == 4) { ?>style="height: 96px;position: relative;width: 336px;" <?php } ?> >
														<?php for($i = 0; $i < $count_color; $i++) 
														{ 
															if($color[$i]->microcolor == $avalue)
															{
														?>	
                                                            <li class='selected swatch-ele'>
                                                                <?php $img = $color[$i]->color; $imgname = str_replace(' ', '', $img);?>

                                                                    <img class = "<?=$imgname?>" itemprop="image" src="<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=65&amp;sh=87" alt="W-NICK, Green" data-thumb='{"src":"<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=30&amp;sh=40","altimg":"<?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=320&amp;sh=427","alt":"W-NICK, Green","title":"W-NICK, Green"}' />

                                                                
																<?php if($i <= 0) { ?>
																
                                                                <div title="<?php echo $color[$i]->color; ?>" class="selected-color-overlay">
                                                                    <h5><span class="colorname"><?php echo $color[$i]->microcolor; ?></span></h5>
                                                                </div>
																
																<?php } ?>
                                                            </li>
														<?php } else { ?>
															<li class='emptyswatch swatch-ele'>
                                                                <?php $img = $color[$i]->color; $imgname = str_replace(' ', '', $img);?>
                                                                    <img class = "<?=$imgname?>" itemprop="image" src="<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=65&amp;sh=87" alt="W-NICK, Green" data-thumb='{"src":"<?=base_url();?>images/00SJT2_0CAKE_51F_F.jpg?sw=30&amp;sh=40","altimg":"<?=base_url();?>images/00SJT2_0CAKE_51F_R.jpg?sw=320&amp;sh=427","alt":"W-NICK, Green","title":"W-NICK, Green"}' />
  
																
                                                                <div title="<?php echo $color[$i]->color; ?>" class="selected-color-overlay">
                                                                    <h5><span class="colorname"><?php echo $color[$i]->microcolor; ?></span></h5>
                                                                </div>
																
																
                                                            </li>
														<?php } } ?>
                                                        </ul>
                                                    </div>
                                                </div>
												<?php $img = str_replace(' ', '', $avalue);?>
												<script type="text/javascript">
												
												/*$(document).ready(function(){
													var color = $('li .selected > div').attr("title");
													var style = <?php echo $avalue;?>;
													
													$.ajax({
														url     : '<?=base_url()?>Product/prod_var',
														data: {'color': color,'style': style},
														dataType:'json',
														success:function(result){
															//alert("success");
															console.log(result);
															if(result.length > 0)
															{
																$.each(result, function(key, val){	
																	$('.customSelectBoxScroll .viewport').attr('style','height:150px;overflow : hidden');
																	var size = '<li class="emptyswatch"><a title="'+val.size+'" onclick="size_change('+val.size+')" class="swatchanchor" href="">'+val.size+'</a></li>';
																	$('.swatches.swatch-variation.size').append(size);
																	if(val.microcolor == b)
																	{
																		document.getElementById("barcode").value = val.barcode;
																	}
																 });
															}	
														}		
													});
													
												});
												*/
													$("li.selected.swatch-ele > img").hover(function(){
														$(this).css({cursor:"pointer"});
													}); 
													$("li.emptyswatch.swatch-ele").hover(function(){
														$(this).css({cursor:"pointer"});
													});
													
													
													$("ul.color-slides li > img").click(function()
													{
														//$(this).each(function(){
															//var classname = $(this).parent().attr("class");
															//console.log(classname);
															//if(classname == 'emptyswatch')
															//{
																//console.log("hello");
																var unsel = $('li.selected').removeClass("selected").addClass("emptyswatch");
																var nsel = $(this).parent().removeClass("emptyswatch").addClass("selected");
																//console.log(unsel);
																//console.log(nsel);
															//}	
														//});
														var color = $(this).attr("class");
														var style = "<?=$style?>";
														var size  = $(".selectedVal").text();
														//console.log(size);
														if(size == 'Size')
														{
															var all = {'color': color,'style': style};
															var url = '<?=base_url()?>Product/prod_var';
														}
														else
														{
															var all = {'color': color,'style': style,'size':size};
															var url = '<?=base_url()?>Product/get_bar';
														}
														//console.log(all);
														$.ajax({
														url     : url,
														data: all,
														dataType:'json',
														success:function(result){
															//alert("success");
															//console.log(result);
																if(result.length > 0)
																{
																	
																	$('.swatches.swatch-variation.size').empty();
																	if(result[0].size != '')
																	{
																		$.each(result, function(key, val){	
																			//$('.customSelectBoxScroll .viewport').attr('style','height:150px;overflow : hidden');
																			
																			var size = '<li class="emptyswatch"><a href="" class="swatchanchor">'+val.size+'</a></li>';
																			$('.swatches.swatch-variation.size').append(size);
																	
																		});	
																	}
																	else
																	{
																		document.getElementById('barcode').setAttribute('value', result[0].barcode);
																	}
																	
																}	
															}		
														});
														
													});
													/*$("li.emptyswatch > img").click(function(e)
													{
														e.stopPropagation();
														//var NAME = $(this).attr("id");
														var b = '<?=$style?>';
														//console.log(NAME);
														//return false;
														//var ab = $(this).parent().attr("class"); 
														//if($(this).parent().attr("class") != 'selected')
														//{
														$('li.selected').removeClass("selected").addClass("emptyswatch");
														$(this).parent().removeClass("emptyswatch").addClass("selected");
														//}
														
														/*$("li.emptyswatch > img").each(function(){
															var ev = $._data(this, 'events');
															//console.log(ev);
															//return false;
															if(ev && !ev.click)
															{
																 //var name = $(this).attr('class');
																 //document.write(name);
																$(this).click(function()
																	{ 
																		if($(this).parent().attr("class") != 'selected')
																			{
																				var val = $('li.selected').removeClass("selected").addClass("emptyswatch");
																				var val1 = $(this).parent().removeClass("emptyswatch").addClass("selected");
																			} 
																	});
																	
															}
														});
														//return false;
														var color = $('li.selected .selected-color-overlay').attr("title");
														var style = b;
														//console.log(color);
														//return false;
														$.ajax({
														url     : '<?=base_url()?>Product/prod_var',
														data: {'color': color,'style': style},
														dataType:'json',
														success:function(result){
															//alert("success");
															//console.log(result);
															if(result.length > 0)
															{
																$('.swatches.swatch-variation.size').empty();
																$.each(result, function(key, val){	
																	//$('.customSelectBoxScroll .viewport').attr('style','height:150px;overflow : hidden');
																	
																	var size = '<li class="emptyswatch"><a href="" class="swatchanchor">'+val.size+'</a></li>';
																	$('.swatches.swatch-variation.size').append(size);
																	
																	
																	/*if(val.microcolor == b)
																	{
																		document.getElementById("barcode").value = val.barcode;
																	}
																 });
															}	
														}		
													});*/
													/*});
														
													
													
													$("li.emptyswatch a.swatchanchor").click(function(e){
														e.stopPropagation();
														$("li.emptyswatch.is-active").removeClass("is-active");
														$(this).parent().addClass("is-active");
														var value = $(this).text();
														$("span.selectedVal").text(value);
													});*/
													
													
													
												</script>

                                            </div>
                                        </li>

                                        <li class="size-info">

                                        </li>
                                        <li class="attribute size clearfix" data-variation-type="size">

                                            <div class="value">

                                                <div class="customSelectBox">
                                                    <h5><span class="selectedVal">Size</span></h5>
                                                    <span class="arrows"></span>
                                                    <div class="customSelectBoxScroll">
                                                        <div class="viewport">
                                                            <div class="overview">
                                                                <ul class="swatches swatch-variation size" id="sizes">
																
																<?php 
																	foreach($size as $row1)
																	{
																		/*echo '<li class="emptyswatch">';
																		echo '<a title="'.$row1->size.'" class="swatchanchor" href=""'.base_url().'"product-variation.html?pid="'.$prod_arr[0]->style.'"&amp;dwvar_"'.$prod_arr[0]->style.'"_color="'.$prod_arr[0]->attr_code.'"&amp;dwvar_"'.$prod_arr[0]->style.'"_size="'.$row1->size.'"" data-productdetailsurl=""'.base_url().'"product-variation.html?pid="'.$prod_arr[0]->style.'"&amp;dwvar_"'.$prod_arr[0]->style.'"_color="'.$prod_arr[0]->attr_code.'"&amp;dwvar_"'.$prod_arr[0]->style.'"_size="'.$row1->size.'"">';
																		echo $row1->size;
																		echo '</a>';
																		echo '</li>';*/
																	?>
																	<li class="emptyswatch">
																		<a class="swatchanchor" href="">
																			<?php echo $row1->size; ?>
																		</a>
																	</li>
																<?php	
																	}
																?>
																

                                                                </ul>
                                                            </div>
                                                        </div>
														<script type="text/javascript">
															$("li.emptyswatch a.swatchanchor").click(function(e){
																e.stopPropagation();
																$("li.emptyswatch.is-active").removeClass("is-active");
																$(this).parent().addClass("is-active");
																var value = $(this).text();
																$("span.selectedVal").text(value);
																
																//document.write("hello");
																// check if width is selected or not
																var size1 = $(this).text();
																var color = $("ul.color-slides li > img").attr("class");
																var style = "<?=$style?>";
																//console.log(color);
																$.ajax({
																url     : '<?=base_url()?>Product/get_bar',
																data: {'color': color,'style': style,'size':size1},
																dataType:'json',
																success:function(result){
																	//alert("success");
																	//console.log(result);
																		if(result.length > 0)
																		{
																			//$('.customSelectBoxScroll .viewport').attr('style','height:150px;overflow : hidden');
																			
																			document.getElementById('barcode').setAttribute('value', result[0].barcode);
																	
																			/*$('.swatches.swatch-variation.size').empty();
																			$.each(result, function(key, val){	
																				//$('.customSelectBoxScroll .viewport').attr('style','height:150px;overflow : hidden');
																				
																				var size = '<li class="emptyswatch"><a href="" class="swatchanchor">'+val.size+'</a></li>';
																				$('.swatches.swatch-variation.size').append(size);
																				
																			 });*/
																		}	
																	}		
																});
																e.preventDefault();
															});
															
														/*$(function(){
															
															$("ul.swatch-variation li").click(function() {
															document.write("hello");
															// check if width is selected or not
															var size = $(this).text();
															var color = $("ul.color-slides li.selected span.colorname").text();
															var style = "<?=$style?>";
															
															$.ajax({
															url     : '<?=base_url()?>Product/prod_var',
															data: {'color': color,'style': style,'size':size},
															dataType:'json',
															success:function(result){
																//alert("success");
																//console.log(result);
																	if(result.length > 0)
																	{
																		console.log(result);
																		return false;
																		$('.swatches.swatch-variation.size').empty();
																		$.each(result, function(key, val){	
																			//$('.customSelectBoxScroll .viewport').attr('style','height:150px;overflow : hidden');
																			
																			var size = '<li class="emptyswatch"><a href="" class="swatchanchor">'+val.size+'</a></li>';
																			$('.swatches.swatch-variation.size').append(size);
																			
																		 });
																	}	
																}		
															});*/
															/*document.getElementById("errorattr").style.display = "none";
															var overlay = jQuery('<div id="overlay"> </div>');
															overlay.appendTo(document.body);

															var width_value = $( "#va-width" ).val();
															//console.log("width value" + width_value);
															width_value 	= (width_value !== '')? width_value:'';

															var size_value = $(this).val();
															
																	$( "select#va-size option:selected" ).each(function() {
																
																	  var size 		= $(this).val();
																	  var style 	= $('input[name=prd_style]').val();
																	  var width_name= (width_value !== '') ? $("#va-width option[value="+ width_value +"]").text() : '';
																	  width_name 	= (width_name !== 'Select Width')? width_name:'';

																	  // console.log("width name: " + width_name);
																	  // return;
																	  
																	  if(size != ''){
																		var url = "<? echo site_url('product/ajax_width').'/'.$gender.'/'.$prod_name.'/'.$product_style.'_'.$product_color.'/'; ?>" +size+ "/" +width_name;
																	  }else{
																		var url = "<? echo site_url('product/ajax_width').'/'.$gender.'/'.$prod_name.'/'.$product_style.'_'.$product_color.'/'; ?>"+ "no-size/" +width_name;
																	  }

																		$.ajax({
																			url 	: url,
																			dataType:'json',
																			success:function(result){
																				// console.log(result);
																				var colorcode_arr = result.color_code;
																				$('.swatches li').each(function(){
																					$(this).removeClass('unselectable');
																					$(this).find('a').attr('href','');
																				});
																				//console.log('color code', result.color_code);
																				if (!(colorcode_arr.length < 1)){
																					// array is not empty
																					// check for list element have color code														    
																					
																						$('.swatches li').each(function(){
																							var curr_code = $(this).find('a').attr('title');
																							if(jQuery.inArray(curr_code, colorcode_arr) === -1){
																								$(this).addClass('unselectable');
																								$(this).find('a').removeAttr('href');
																							}
																						}); 
																				   

																				}


																				$("#va-width").removeAttr('disabled');
																				$("#va-width").html(result.options);
																				//$("#va-width").show();
																				//alert($('#va-width').find('option[text="'+width_name+'"]').val());
																				//console.log($('#va-width option:contains('+width_name+')'));
																				//console.log("width name: " + width_name);

																				if(width_name !== ''){
																					//console.log("width name in if: " + width_name);
																					$('input[name=prd_barcode]').val($('#va-width option[data-width-name='+width_name+']').val());
																					$('#va-width option[data-width-name='+width_name+']').attr('selected','selected');
																				}

																				$('input[name=prd_barcode]').val($('#va-width option:contains('+width_name+')').val());
																				$('#va-width option:contains('+width_name+')').attr('selected','selected');
																				$("#overlay").remove();
																			},
																			error:function(){
																				$("#va-width").hide();
																			}
																			
																			
																		});

																	});
															//} // end of if 

																
							
															});
														});*/
														</script>
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
								
                                <div class="product-add-to-cart">
                                    <div class="product-bottom-wrap">
                                        <div class="product-add-cart">
			                                <div class="product-tool-tip">
                                                <span class="arrow"></span>
                                                <div class="msg"></div>
                                            </div>
                                            <form action="<?php echo base_url();?>Cart/add" method="post" id="add-to-cart" class="pdpForm">
                                                <fieldset>

                                                    <input type="hidden" name="cartAction" id="cartAction" value="add" />
                                                    <input type="hidden" name="pid" id="pid" value="00SJT20CAKE" />
                                                    <input type="hidden" name="pname" id="pname" value="W-NICK" />
                                                    <input type="hidden" name="pageName" id="pageName" value="ProductDetail" />
                                                    <input type="hidden" name="updateProduct" id="updateProduct" value="true" />
                                                    <input type="hidden" name="isQuickView" id="isQuickView" value="false" />
													<input type="hidden" name="barcode" id="barcode" value="" />

                                                    <div id="pdp-actions" class="pdp-actions">
                                                        <h3><button id="add-to-cart" type="submit" value="Add to Bag"  class="btn-oswald red  add-to-cart">Add to Bag</button>
                                
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
                                        <h4><a href="https://shop.diesel.com/cart" class="goto-mybag" title="Go to My Bag">Go to My Bag</a></h4>
                                        <h4 class="button_1"><a class="continue_shopping" title="Continue Shopping ">Continue Shopping </a></h4>
                                    </div>

                                    <div class="goto_sec">
                                        <h5 class="pdp-explore-main" data-goto="pdp-explore-main"><a href="javascript:void(0);">Explore</a></h5>

                                        <h5 class="promotionBlock-styleIt" data-goto="promotionBlock.styleIt"><a href="javascript:void(0);">Style It</a></h5>

                                        <h5 class="promotionBlock-featuredIn" data-goto="promotionBlock.featuredIn"><a href="javascript:void(0);">Featured In</a></h5>

                                        <h5 class="promotionBlock-alsoLike" data-goto="promotionBlock.alsoLike"><a href="javascript:void(0);">You May Also Like</a></h5>

                                    </div>

                                    <div class="pdp-share-link clearfix">

                                        <div class="info-icon-link col-md-4"><span>+INFO</span>
                                        </div>

                                        <a class='favorite color col-md-4 col-lg-6 wl-action ' title="Add to Wishlist" href="https://shop.diesel.com/wishlist-add?pid=00SJT20CAKE&amp;source=productdetail"><span class="fav-link pdp-sprite-icon">Add to Wishlist</span></a>

                                        <a class="social-media-link col-md-4 col-lg-6 share color" id="social-media-bottom" title="Share" href=""><span class="share-link pdp-sprite-icon">Share</span></a>

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

                                                    <script type="text/javascript" src="<?=base_url();?>js/addthis_widget.js#pubid=" +addThisID></script>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <script>
                                var elms = jQuery('#product-content-detail ul.product-description-list').find('li');
                                elms.each(function() {
                                    if (jQuery.trim($(this).html()) == '') $(this).remove();
                                });
                            </script>
                        </div>
                        <div class="mobile-strip-product">
                            <div class="info-icon-link col-sm-2 info-btn"><span>+INFO</span>
                            </div>
                            <div class="col-sm-3 icon-link color-btn">
                                <h5>Color (1)</h6></div>
        
        <div class="col-sm-3 icon-link price-btn have-cut-price">
        

    
    <div class="product-price">
            
            
            
            
            <span class='price-sales'>
            
            $1,298.00</span>
                    
 
    </div>
 
        
        </div>
        
        
        <div class="col-sm-4 icon-link add-btn"><h3>Add</h3></div>
         
        
    </div>
    </div>
     
     
        <div class="content-asset"><!-- dwMarker="content" dwContentID="bcJ9kiaaiMb4aaaadnuChrDMYt" -->
            
            <section class="contextual-content container-fluid contextual-support " style="background-color:white;">
<div class="row">
<div class="col-md-4 posting-text-left">
<div class="posting-content-left">
<h2 class="contextual-title">PICK UP IN STORE</h2>

<p class="contextual-text">Order online and pick up in store with free shipping!<br />
Select the &quot;Ship to Store&quot; option as the first step at check out</p>

</div>
</div>

<div class="col-md-4 posting-text-mid">
<div class="posting-content-mid">
<h2 class="contextual-title">CONTACT US</h2>

<p class="contextual-text">Send us an <a href="mailto:customerservice@shop.diesel.com"><strong>Email</strong></a> or<br />
call us on <strong>877.344.8342</strong> (8:00 am to 12:00 am ET, 7-days/week)</p>

</div>
</div>

<div class="col-md-4 posting-text-right">
<div class="posting-content-right">
<h2 class="contextual-title">EASY & FREE RETURNS</h2>

<p class="contextual-text">Don't love it? Return it for free.<br>You've got 30 days to return it for a full refund.</br></p>

</div>
</div>
</div>
</section>
        </div> <!-- End content-asset -->
    
    </div>
