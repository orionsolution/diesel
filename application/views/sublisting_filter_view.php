<?//=//$this->uri->segment(1);//exit;?>
<?//=//parse_str($_SERVER['QUERY_STRING'], $_GET);exit;?>
<?//=//$_GET['cgid'];exit;?>

<?
/*echo '<pre>';
print_r($selection_category_arr);
echo '</pre>';
exit;*/
?>
<script type="text/javascript" src="<?=base_url();?>js/sublisting.js"></script>

<div id="main" role="main" class="clearfix plp-search-page">
	<script>
		/*$(document).ready(function(){
			var id = "diesel-man";
			$('#'+id+' a.level-1').parents('li').addClass('selected');
			$('#'+id+' a.level-1').addClass('active');	
		});*/
	</script>  
    
    <div id="browser-check">
        <noscript>
            &lt;div class="browser-compatibility-alert"&gt;
                &lt;p class="browser-error"&gt;Your browser's Javascript functionality is turned off. Please turn it on so that you can experience the full capabilities of this site.&lt;/p&gt;		
            &lt;/div&gt;
        </noscript>
    </div>

<!-- start breadcrumb -->     
    <div class="breadcrumb-and-pagination clearfix plp-breadcrum">
        <div class="breadcrumb" style="left: 0px; max-width: 1263px;">
            <a href="<?=base_url();?>" class="breadcrumb-home" title="Home">Home</a>
            <span class="divider">/</span>
            <a href="<?=base_url().'product/'.$category;?>" title="<?=$category;?>"><?=$category;?></a>
            <span class="divider">/</span>
            <a class="breadcrumb-last" href="#" title="<?=$sub_category;?>"><?=$sub_category;?></a>
        </div>
    </div> 
<!-- end breadcrumb -->  

<!-- start header banner -->    
    <div class="category-header-banner">
        <div class="content-slot slot-grid-header">
            <div class=" container-fluid plp-banner">
                <div class="row plp-banner-row">
                    <div class="plp-banner-title col-md-3 col-sm-6 ">
                        <p class="banner-title">
                            <?=(!empty($page_info['display_sub_category_name']) ? strtoupper($page_info['display_sub_category_name']) : '' );?>
                        </p>
                        <p class="banner-sub-title">
                            <?=(!empty($page_info['description']) ? $page_info['description'] : '' );?>
                        </p>
                    </div>
                    <div class="plp-banner-crousel col-md-9 col-sm-6">
                        <img alt="<?=ucfirst($page_info['category']) . '\' '. $sub_category;?>" src="<?=(!empty($page_info['image_name']) ? base_url().'images/sublisting/'.$page_info['image_name'] : base_url().'images/sublisting/no_image.jpg' );?>">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="category-header"></div>
<!-- end header banner -->   

<!-- start search-result -->
	<div id="search-result" data-layout="non-denim" class="search-result-wrapper clearfix ">
    	<div class="stickyfiltermove" style="visibility: hidden; height: 0px; display: block;"></div>
        
        <!-- start filter by -->
        <div id="primary" class="primary-content pageName full-width" data-pagename="Product Listing/Search results">
        	<div class="refinements refinementRedesign">
                <span id="no-of-column"></span>
                <div class="show-filter">
                    <span>show filter</span>
                </div>
                <div class="mobile-filter-refinements">
                    <div class="filter-mobile-clearall">
                        <span class="filter-by-text">FILTER BY :</span>
                        <span class="filter-bracket">(<a class="filter-clearall">Clear all filters</a>)</span>
                    </div>
                </div>
                <div class="filter-wrapper clearfix">
                    <div class="filter-label-wrapper">
                        <span class="filter-label">Filter By:</span>
                        <span class="filter-label-mobile">Filter</span>
                        <span class="hide-filter-block"></span>
                    </div>
                    <ul class="refinement-list">
                        <?foreach($filter_arr as $option_name=>$curr_option):?>                            
                            <li class="refinement-header-item <?=ucfirst($option_name);?>">
                            <h3 class="refinement-header">
                            <span>
                            <?=ucfirst($option_name);?> </span>
                            <?$check_arr = (!empty(${'selected_'.$option_name}) ? explode("|",${'selected_'.$option_name}) : array());?>
                            </h3>
                            <div class="refinement-item">
                                <div class="clearfix">
                                    <!-- check for the count -->
                                    <?if(count($curr_option) > 4):?>
                                        <?for($i = 0; $i < count($curr_option); $i += 4):?>                                    
                                                <ul>
                                                    <?foreach(array_slice($curr_option,$i,4) as $curr_value):?>
                                                        <?
                                                        $current_filter_url = base_url().'product/'.$gender.'/'.$sub_category.'/filter';
                                                        if(in_array(str_replace(" ", "-", $curr_value['attr_value']), $check_arr) ){
                                                            if($option_name == 'category'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color : '&color=');
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size : '&size=');                                                            
                                                          elseif($option_name == 'color'):
                                                           $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty(${'selected_'.$option_name}) ? '&color='.${'selected_'.$option_name} : '&color=');
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size : '&size=');
                                                          elseif($option_name == 'size'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color : '&color=');
                                                            $current_filter_url .= (!empty(${'selected_'.$option_name}) ? '&size='.${'selected_'.$option_name} : '&size=');
                                                          endif;
                                                            
                                                            $selected = "selected";
                                                        }else{
                                                            if($option_name == 'category'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category.'|'.str_replace(" ", "-", $curr_value['attr_value']) : '?category=');
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color : '&color=');
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size : '&size=');                                                            
                                                          elseif($option_name == 'color'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color.'|'.str_replace(" ", "-", $curr_value['attr_value']) : '&color='.str_replace(" ", "-", $curr_value['attr_value']));
                                                            //echo $current_filter_url;exit;
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size : '&size=');
                                                          elseif($option_name == 'size'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color : '&color=');
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size.'|'.str_replace(" ", "-", $curr_value['attr_value']) : '&size='.str_replace(" ", "-", $curr_value['attr_value']));
                                                          endif;

                                                            //$curr_filter_url = base_url().'product/'.$gender.'/'.$sub_category.'/filter'.$category_prefix.'|'.str_replace(" ", "-", $curr_value['attr_value']).$color_prefix.$size_prefix;                                                
                                                            $selected = "";
                                                        }
                                                        //$filter_url = (str_replace(" ", "-", $curr_value['attr_value']) == )
                                                        //$filter_url = (in_array(str_replace(" ", "-", $curr_value['attr_value']), 'selection_'.$option_name.'_arr')  ? '?category=' . str_replace(" ", "-", $curr_value['attr_value']) : );
                                                        ?>                        
                                                        <li class="<?=$selected;?>">
                                                            <a href="<?=$current_filter_url;?>"><?=$curr_value['attr_value'];?></a>
                                                        </li>                                                       
                                                    <?endforeach; //foreach($curr_option as $curr_value) ?>
                                                </ul>                                            
                                        <?endfor;?>
                                    <?else:?>
                                        <ul> 
                                        <?foreach($curr_option as $curr_value):?> 
                                            <?
                                            $current_filter_url = base_url().'product/'.$gender.'/'.$sub_category.'/filter';
                                                        if(in_array(str_replace(" ", "-", $curr_value['attr_value']), $check_arr) ){
                                                            if($option_name == 'category'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color : '&color=');
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size : '&size=');                                                            
                                                          elseif($option_name == 'color'):
                                                           $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty(${'selected_'.$option_name}) ? '&color='.${'selected_'.$option_name} : '&color=');
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size : '&size=');
                                                          elseif($option_name == 'size'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color : '&color=');
                                                            $current_filter_url .= (!empty(${'selected_'.$option_name}) ? '&size='.${'selected_'.$option_name} : '&size=');
                                                          endif;
                                                            
                                                          $selected = "selected";
                                                        }else{
                                                            if($option_name == 'category'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category.'|'.str_replace(" ", "-", $curr_value['attr_value']) : '?category='.str_replace(" ", "-", $curr_value['attr_value']));
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color : '&color=');
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size : '&size=');                                                            
                                                          elseif($option_name == 'color'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color.'|'.str_replace(" ", "-", $curr_value['attr_value']) : '&color='.str_replace(" ", "-", $curr_value['attr_value']));
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size : '&size=');
                                                          elseif($option_name == 'size'):
                                                            $current_filter_url .= (!empty($selected_category) ? '?category='.$selected_category : '?category=');
                                                            $current_filter_url .= (!empty($selected_color) ? '&color='.$selected_color : '&color=');
                                                            $current_filter_url .= (!empty($selected_size) ? '&size='.$selected_size.'|'.str_replace(" ", "-", $curr_value['attr_value']) : '&size='.str_replace(" ", "-", $curr_value['attr_value']));
                                                          endif;

                                                            //$curr_filter_url = base_url().'product/'.$gender.'/'.$sub_category.'/filter'.$category_prefix.'|'.str_replace(" ", "-", $curr_value['attr_value']).$color_prefix.$size_prefix;                                                
                                                            $selected = "";
                                                        }
                                            //$filter_url = (str_replace(" ", "-", $curr_value['attr_value']) == )
                                            //$filter_url = (in_array(str_replace(" ", "-", $curr_value['attr_value']), 'selection_'.$option_name.'_arr')  ? '?category=' . str_replace(" ", "-", $curr_value['attr_value']) : );
                                            ?>                                          
                                            <li class="<?=$selected;?>">                                            
                                            <a href="<?=$current_filter_url;?>"><?=$curr_value['attr_value'];?></a>
                                            </li>
                                        <?endforeach;?>
                                    </ul>
                                    <?endif;//if(count($curr_option) > 4)?>
                                    
                                </div>
                                <div class="reset-refinement">
                                    <a data-prefn="productGroup" title="Show all options" href="">reset</a>
                                </div>
                                <div class="apply-refinement">
                                    <span>apply</span>
                                </div>
                            </div>                                
                            </li>                            
                        <?endforeach;?>
                    </ul>
                    <div class="filter-global-reset mobile">
                        <span class="reset">Reset All</span>
                    </div>
                    <div class="filter-done mobile">
                        <span>DONE</span>
                    </div>
                </div>
                <div class="filter-bxSlider-plp clearfix" style="display:block;">
                        <div class="filter-slider-wrapper" >
                            <form action="<?=base_url().'product/'.$gender.'/'.$sub_category.'/filter';?>" method="post" name="selection_form">
                            <?if(!empty($selected_category) || !empty($selected_color) || !empty($selected_size)):?>
                                <div class="filter-slider remove-trans">
                                    <?if(!empty($selected_category)):
                                        $selection_category_arr = explode("|",$selected_category);
                                    ?>
                                        <?foreach($selection_category_arr as $curr_selection):?>
                                            <span class="breadcrumb-refinement-value"><?=str_replace('-', " ", $curr_selection);?>
                                                <a class="breadcrumb-relax" href="#">
                                                    <img class="plp-filter-cross" src="<?=base_url();?>images/refine_filter.svg" alt="REMOVE">
                                                </a>
                                                <input type="hidden" name="category_selection_filter[]" value="<?=str_replace('-', " ", $curr_selection);?>">
                                            </span>
                                        <?endforeach;?>
                                    <?endif;?>

                                    <?if(!empty($selected_color)):
                                        $selection_color_arr = explode("|",$selected_color);
                                    ?>
                                        <?foreach($selection_color_arr as $curr_selection):?>
                                            <span class="breadcrumb-refinement-value"><?=str_replace('-', " ", $curr_selection);?>
                                                <a class="breadcrumb-relax" href="#">
                                                    <img class="plp-filter-cross" src="<?=base_url();?>images/refine_filter.svg" alt="REMOVE">
                                                </a>
                                                <input type="hidden" name="color_selection_filter[]" value="<?=str_replace('-', " ", $curr_selection);?>">
                                            </span>
                                        <?endforeach;?>
                                    <?endif;?>

                                    <?if(!empty($selected_size)):
                                        $selection_size_arr = explode("|",$selected_size);
                                    ?>
                                        <?foreach($selection_size_arr as $curr_selection):?>
                                            <span class="breadcrumb-refinement-value"><?=str_replace('-', " ", $curr_selection);?>
                                                <a class="breadcrumb-relax" href="#">
                                                    <img class="plp-filter-cross" src="<?=base_url();?>images/refine_filter.svg" alt="REMOVE">
                                                </a>
                                                <input type="hidden" name="size_selection_filter[]" value="<?=str_replace('-', " ", $curr_selection);?>">
                                            </span>
                                        <?endforeach;?>
                                    <?endif;?>
                                </div> <!-- end of filter-slider remove-trans -->
                            <?endif;?>
                            </form>
                        </div> <!-- end of filter-slider-wrapper -->
                    <div class="filter-global-reset">
                        <a href="<?=base_url().'product/'.$gender.'/'.$sub_category;?>" style="color: #FFF;text-decoration:none;"><span style="border:none;">Reset</span></a>
                    </div>
                </div>
            </div>
        </div>
        <!-- end filter by -->
        <script>
        // script for clearing the filter options
            $('a.breadcrumb-relax').on('click',function(event){
                event.preventDefault();
                $(this).next('input[type=hidden]').val("");
                //console.log('correct function');
                $('form[name="selection_form"]').submit();
            }); // end of click method
        </script>
        
        <h1 class="visually-hidden">Jackets</h1>
        
        <!-- start search-result-options -->
        <div class="search-result-options">
            <div class="result-options-right">
               <!--  <div class="sort-by">
                    <form action="" method="post" name="Product-Sorting-Options" novalidate="novalidate">
                        <fieldset style="position: relative;">
                            <label for="grid-sort-header">Sort By:</label>
                            <select id="grid-sort-header" style="-webkit-appearance: none;">
                                <option selected="" disabled="" value="SortBy">SORT BY</option>
                                <option value="#" selected="selected">Featured</option>
                                <option value="#">New Arrival</option>
                                <option value="#">Most Popular</option>
                            </select>
                            <button class="sort-Go-Button simple-submit" type="submit" value="Go">Go</button>
                            <span class="select-img" style="top: 0px; left: 0px; width: 95.4023%; height: 35px;"></span>
                        </fieldset>
                    </form>
                </div> -->
                <!-- END: sortby -->
                <? if(!empty($product_arr)): ?>
                    <div class="pagination">
                        <div class="results-hits">
                            <span class="showing-label">Showing </span><span class="current-page-label"><?=count($product_arr);?> /</span>
                            <span class="total-count"><?=count($product_arr);?></span> Products
                        </div>
                    </div>
                <?endif;?>
                <!-- END: viewby -->
            </div>
        </div>
		<!-- end search-result-options -->
        
        <div class="view-brand-link">
            <span></span>
        </div>
        
        <!-- start search-result-content -->
        <div class="search-result-content search-result-items tiles-container first-cat">
            <? if(!empty($product_arr)): ?>
    			<div class="packery" style="visibility: visible;">
                	<!-- product1 -->
                    <?  foreach($product_arr as $curr_product):
                            if($curr_product['L4'] == 'denim'){
                                $prod_cat = $curr_product['L5'];
                            }else{
                                $prod_cat = $curr_product['L4'];
                            }

                            /*echo '<pre>';
                            print_r($curr_product);
                            echo '</pre>';
                            exit;*/                            

                            $url = base_url().'product/details/'.$prod_cat.'/'.clean_string($curr_product['disp_name']).'/'.$curr_product['style'].'/';
                            if(!empty($curr_product['prod_images'])){
                                $image_path = base_url().'images/'.$curr_product['prod_images']['image_path'];
                            }else{
                                $image_path = base_url().'images/sublisting/prod_no_image.jpg';
                            }
                            
                        ?>
                        <div class=" grid-tile item w2 h2 reorder " data-colors-to-show="51F" style="max-width: 248px;">
                            <div class="product-tile default-products " id="bcidoiaaiMmMaaaadkUroyokxa" data-itemid="00SJT20CAKE">
                                <div class="product-tile-content" data-queue="{&quot;mo&quot;: []}">
                                    <div class="product-image clearfix" style="min-height: 0px; height: 304px;">
                                        <div class="item-swatches">
                                            <div class="griditem-swatchlist">
                                                <ul id="00SJT20CAKE" class="product-view swatch-itemslider bxslider product-view-container">
                                                    <?foreach($curr_product['color_code'] as $key=>$curr_color_code):?>
                                                        <li style="<?=($key == 0) ? 'display: block;' : 'display: none;' ?>">
                                                        <a href="<?=$url.$curr_color_code['attr_code'];?>" title="<?=$curr_color_code['attr_value'];?>">
                                                        <img itemprop="image" class="primary-image lazy" data-src="" data-original="" data-altimg="" src="<?=$image_path;?>" alt="<?=$curr_product['disp_name'], $curr_color_code['attr_value'];?>">
                                                        </a>
                                                        </li>
                                                    <?endforeach;?>
                                                    <!-- <li style="display: none;">
                                                    <a href="#" title="Green">
                                                    <img itemprop="image" class="primary-image lazy" data-src="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_F.jpg?sw=320&amp;sh=427" data-original="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_F.jpg?sw=320&amp;sh=427" data-altimg="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dwc6cd363b/images/large/00SJT2_0CAKE_51F_R.jpg?sw=320&amp;sh=427" src="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_O.jpg?sw=320&amp;sh=427" alt="W-NICK, Green">
                                                    </a>
                                                    </li> -->
                                                </ul>
                                                <!-- <ul class="outfit-view swatch-itemslider bxslider outfit-view-container">
                                                    <li>
                                                    <a href="#" title="Green">
                                                    <img itemprop="image" class="primary-image lazy" data-src="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_F.jpg?sw=320&amp;sh=427" data-original="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_F.jpg?sw=320&amp;sh=427" data-altimg="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dwc6cd363b/images/large/00SJT2_0CAKE_51F_R.jpg?sw=320&amp;sh=427" src="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_O.jpg?sw=320&amp;sh=427" alt="W-NICK, Green">
                                                    </a>
                                                    </li>
                                                    <li>
                                                    <a href="#" title="Green">
                                                    <img itemprop="image" class="primary-image lazy" data-src="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_F.jpg?sw=320&amp;sh=427" data-original="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_F.jpg?sw=320&amp;sh=427" data-altimg="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dwc6cd363b/images/large/00SJT2_0CAKE_51F_R.jpg?sw=320&amp;sh=427" src="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw5153feb8/images/large/00SJT2_0CAKE_51F_F.jpg?sw=320&amp;sh=427" alt="W-NICK, Green">
                                                    </a>
                                                    </li>
                                                </ul> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <div class="product-swatches-online-wrap clearfix ">
                                            <div class="product-swatches-online clearfix">
                                                <span class="product-swatches-all single-col">
                                                <?=count($curr_product['color_code']);?> Color </span>
                                            </div>
                                        </div>
                                        <div class="product-name clearfix">
                                            <a class="name-link" href="<?=$url;?>" title="<?=$curr_product['disp_name'];?>"><?=$curr_product['disp_name'];?></a>
                                            <a class="name-link-sub" href="<?=$url;?>" title="<?=$curr_product['disp_name'];?>"><?=$prod_cat?></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--  END: .product-tile -->
                        </div>
                        <?php endforeach;?>
                    
                    <!-- product1 end -->
                </div>
            
            
                <!-- load more -->
                <? if(!empty($product_arr)): ?>
                    <div class="load-more-wrap">
                        <div class="load-ajax-content" style="display: none;">
                        </div>
                        <?if($this->uri->segment(1) !== 'show_search'){
                            $category = $this->uri->segment(2);
                            $sub_category = $this->uri->segment(3);
                            //$cgid_status = false;
                            //$ajax_data = "{'cgid_status':'true', 'category': '$category', 'sub_category': '$sub_category'}";
                            $ajax_data = array(
                                "cgid_status" => false,
                                'category' => $category,
                                'sub_category'  => $sub_category
                                );
                            $json = json_encode($ajax_data);
                        }else{
                            // first segment is show search
                            //$cgid_status = true;
                            $cgid_data = $_GET['cgid'];
                            //$ajax_data = "{'cgid_status':'false', 'cgid_data': '$cgid_data'}";
                            $ajax_data = array(
                                "cgid_status" => true,
                                'cgid_data' => $cgid_data
                                );
                            $json = json_encode($ajax_data);
                        }

                        ?>
                        <!-- <a class="load-more" data-next-limit="<?=count($product_arr);?>" data-ajax-url="<?=base_url().'product/ajax_load_products';?>" data-ajax="<?=htmlentities($json, ENT_QUOTES, 'UTF-8'); ?>">LOAD MORE (
                        <div class="pagination fixed" style="right: 0px;">
                            <div class="results-hits">
                                <span class="showing-label">Showing </span><span class="current-page-label"><?=count($product_arr);?> /</span>
                                <span class="total-count"><?=count($product_arr);?></span> Products
                            </div>
                        </div>
                        
                        )</a> -->
                    </div>
                <?endif;?>
                <!-- load more end -->

            <?else:?>
                <h2 style="font-size: 2.5em; text-align: center; margin-bottom: 20px;">Sorry No Products Available</h2>
            <?endif; //  if(!empty($product_arr)):  ?>
            
        </div>
        <!-- end search-result-content -->
        
        <!-- end search-result-options -->
        <div class="search-result-options bottom-resullt fixed" style="right: 0px;">
            <div class="result-options-right">
                <div class="sort-by">
                    <form action="" method="post" name="Product-Sorting-Options" novalidate="novalidate">
                        <fieldset style="position: relative;">
                            <label for="grid-sort-footer">Sort By:</label>
                            <select id="grid-sort-footer" style="-webkit-appearance: none;">
                                <option selected="" disabled="" value="SortBy">SORT BY</option>
                                <option value="" selected="selected">Featured</option>
                                <option value="">New Arrival</option>
                                <option value="">Most Popular</option>
                            </select>
                            <button class="sort-Go-Button simple-submit" type="submit" value="Go">Go</button>
                            <span class="select-img" style="top: 0px; left: 0px; height: 18px;"></span>
                        </fieldset>
                    </form>
                </div>
                <!-- END: sortby -->
                <div class="pagination fixed" style="right: 0px;">
                    <div class="results-hits">
                        <span class="showing-label">Showing</span><span class="current-page-label">55 /</span>
                        <span class="total-count">90</span> Products
                    </div>
                </div>
                <!-- END: viewby -->
            </div>
            <div class="items-per-page">
                <form action="" method="post" name="Product-Paging-Options" novalidate="novalidate">
                    <fieldset style="position: relative;">
                        <label for="grid-paging-footer">Items / Page</label>
                        <select id="grid-paging-footer" style="-webkit-appearance: none;">
                            <option value="http://global.diesel.com/mens/jackets/?sz=12">12</option>
                            <option value="http://global.diesel.com/mens/jackets/?sz=24">24</option>
                            <option value="http://global.diesel.com/mens/jackets/?sz=36">36</option>
                            <option value="http://global.diesel.com/mens/jackets/?sz=48">48</option>
                            <option value="http://global.diesel.com/mens/jackets/?sz=60">60</option>
                        </select>
                        <button class="sort-Go-Button simple-submit" type="submit" value="Go">Go</button>
                        <span class="select-img" style="position: relative; top: 0px; left: 0px; height: 2px;"></span>
                    </fieldset>
                </form>
            </div>
            <!-- END: itemsperpage -->
        </div>
		<!-- end search-result-options -->
    </div>
<!-- end search-result -->
             
</div>