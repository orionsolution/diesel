<?

function clean_string_old($string) {
   $string = str_replace(' ', '', $string); // Replaces all spaces with hyphens.

   return preg_replace('/[^A-Za-z0-9\-]/', '', strtolower($string)); // Removes special chars.
}

function clean_string($string){
     $string = str_replace(" ","-",$string);
     //return $string;

    $string = preg_replace('/[^A-Za-z0-9\-]/', '-', strtolower($string)); // Removes special chars.
    return preg_replace('/-+/', '-', $string);
}

function clean_string_alt($string){
    return preg_replace('/[^A-Za-z0-9\-]/', ' ',$string); // Removes special chars.
}






/* Dharmesh */


function subproduct_page_info($cat_name,$gender){
    //$info = array("cat_info" => '',"cat_desc" => '' );
    switch($cat_name){
        case "best selling":
            $info = array(
                "cat_info" => "our best-selling running shoes for $gender",
                "cat_desc" => "Whatever your needs, whatever your style, we have your running shoe. Whether you need a lot of support or a little; a ton of cushion or just enough; extra stability or you just want to run wild. Or maybe you want a pair of running shoes that just looks cool. We have those, too."
            );
        break;

        case "neutral":
            $info = array(
                "cat_info" => "get superior cushioning for a smooth ride",
                "cat_desc" => "Neutral running shoes work with your natural stride, letting your body do its thing while offering plenty of cushioning and smooth heel-to-toe transitions. For the perfect blend of cushion and balance when you want to get out and run, our collection of Neutral running shoes are the right choice."
            );
        break;


        default:
            $info = array("cat_info" => '',"cat_desc" => '' );
            break;

    }
    return $info;
}


function listing_page_info($category){
    switch($category){
        case "men":
            $info = array(
                "slot_1" => array(
                    "heading" => "MALE COLLECTION",
                    "description" => "The Fall Winter collection is fresh, modern and still packed with that unmistakable Diesel attitude. Military camouflage and rock 'n' roll denim get updated with texture-clashing fabrics, innovative treatments and shots",
                    "main_image_name" => "men_cover_img"
                ),

                "slot_2" => array(
                    "heading" => "DENIM",
                    "description" => "Worn-in for a vintage look, dyed and coated for a contemporary feel or detailed with rebel studs and punk safety pins; as long as you like your denim with attitude the Fall/ Winter range has you covered. Try the innovative stretch-denim JoggJeans for a sporty fit and effortless movement.",
                    "main_image_name" => "02_DENIM-MALE",
                    "url" => base_url().'product/mens/denim'

                ),

                "slot_3" => array(
                    "feature_1" => array(
                        "feature_image_name" => '03_SHOES-MALE',
                        "feature_heading"   => 'SHOES',
                        "feature_description" => 'The Fall/ Winter footwear mixes biker references with classic style. Choose from buckled motorcycle boots, clean-lined shoes or relaxed sneakers in clashing materials.',
                        "url" => base_url().'product/mens/footwear',
                        "img_alt_title_data" => 'SHOES',
                        "anchor_title_data" => 'Shop Male Shoes'
                    ),
                    "feature_2" => array(
                        "feature_image_name" => '04_JACKETS-MALE',
                        "feature_heading"   => 'LEATHER JACKETS',
                        "feature_description" => 'Sharp silhouettes and clean-lined design bring contemporary cool to our Fall/ Winter leather jacket offering. Biker style and punk irreverence still reign supreme with metal-studded black leather and safety pins.',
                        "url" => base_url().'product/mens/jackets',
                        "img_alt_title_data" => 'JACKETS',
                        "anchor_title_data" => 'Shop Jackets for Men'
                    ),
                    "feature_3" => array(
                        "feature_image_name" => '05_WATCHES-MALE',
                        "feature_heading"   => 'WATCHES',
                        "feature_description" => 'Sync it up and strap it on. Size matters.',
                        "url" => base_url().'product/mens/watches',
                        "img_alt_title_data" => 'WATCHES',
                        "anchor_title_data" => 'Shop New Male Watches'
                    ),

                )

            );
        break;

	
		
		//case women 	
			
		case "women":
            $info = array(
                "slot_1" => array(
                    "heading" => "S/S'16 PRE-COLLECTION",
                    "description" => "Mix and match 70's Americana and 90's grunge for a relaxed, downtown vibe this season",
                    "main_image_name" => "01_2"
                ),

                "slot_2" => array(
                    "heading" => "DENIM DU JOUR",
                    "description" => "From alternative fits like the denim Chino to the classic, high waisted skinny, it's time to make a fresh statement with your denim",
                    "main_image_name" => "02_2",
                    "url" => base_url().'product/womens/denim'

                ),

                "slot_3" => array(
                    "feature_1" => array(
                        "feature_image_name" => '03_SHOES',
                        "feature_heading"   => 'SHOES',
                        "feature_description" => 'Wear them flatform high or distinctively mannish and low. The choice is stylishly yours',
                        "url" => base_url().'product/womens/footwear',
                        "img_alt_title_data" => 'SHOES',
                        "anchor_title_data" => 'Shop Female Shoes'
                    ),
                    "feature_2" => array(
                        "feature_image_name" => '04_BAGS_2',
                        "feature_heading"   => 'IT\'S IN THE BAG',
                        "feature_description" => 'Your new arm candy has arrived',
                        "url" => base_url().'product/womens/bags',
                        "img_alt_title_data" => 'BAGS',
                        "anchor_title_data" => "Shop Women's Bags"
                    ),
                    "feature_3" => array(
                        "feature_image_name" => '05_LEATHER-JACKETS',
                        "feature_heading"   => 'LEATHER JACKETS',
                        "feature_description" => 'From the classic biker to the updated motor cross jacket reinterpreted from our archives. Get your hands on our leathers',
                        "url" => base_url().'product/womens/jackets',
                        "img_alt_title_data" => 'JACKETS',
                        "anchor_title_data" => 'Shop Jackets for Women'
                    ),

                )

            );
        break;

			
		//case denim	
		
		case "denim":
            $info = array(
                "slot_1" => array(
                    "heading" => "TRAIL-BLAZE IN DENIM",
                    "description" => "Introducing the S/S 16 Preview collection: We've taken denim to another level",
                    "main_image_name" => "01_SS16COLLECTION"
                ),

                "slot_2" => array(
                    "feature_1" => array(
                        "feature_image_name" => '09_DENIM LANDING',
                        "feature_heading"   => 'SEASONAL WASHES FOR HIM',
                        "feature_description" => 'From vintage styles to rock marble washes, find your new season denim now',
                        "url" => base_url().'product/womens/bags',
                        "img_alt_title_data" => 'Shop the Fall Winter \'15 Wash Stories'
                    ),
                    "feature_2" => array(
                        "feature_image_name" => '09_DENIM LANDING_03',
                        "feature_heading"   => 'SEASONAL WASHES FOR HER',
                        "feature_description" => 'From deep contrasting tones to ripped and repaired finishes, Diesel\'s mastery in denim treatments knows no bounds this season',
                        "url" => base_url().'product/womens/bags',
                        "img_alt_title_data" => 'Shop the Fall Winter \'15 Wash Stories'
                    ),
                ),

                "slot_3" => array(
                    "feature_1" => array(
                        "feature_image_name" => '09_DENIM LANDING_04',
                        "feature_heading"   => 'THE NEW ACTYVISTA',
                        "feature_description" => 'Meet blogger superstar Mimi Elashiry as she shows off denim\'s versatile side',
                        "url" => base_url().'product/womens/footwear',
                        "background_image_name" => '05_ACTYVISTA_BACKGROUND',
                        "img_alt_title_data" => 'ACTYVISTA',
                        "anchor_title_data" => 'Shop Actyvista'
                    ),
                    "feature_2" => array(
                        "feature_image_name" => '09_DENIM LANDING_05',
                        "feature_heading"   => 'TELLING IT LIKE IT IS',
                        "feature_description" => 'New season, New Denim film',
                        "url" => base_url().'product/womens/bags',
                        "background_image_name" => '06_BRAND-FILM_BACKGROUND',
                    ),
                )

            );
        break;


        default:
            $info = array();
            break;
			
    }
    return $info;
}



/**
 * return different filter by option for particular category
 * @param: category name string
 * @return: options array
 */


function get_filter_by_options($sub_category_name){

    switch ($sub_category_name) {
        case 'jackets':
            //return array('prod_attributes'=>'category','prod_attributes'=>'color','prod_variation'=>'size');
            return array(
                array(
                    'table_name'=>'prod_attributes',
                    'option_name'=>'category',
                ),
                array(
                    'table_name'=>'prod_attributes',
                    'option_name'=>'color',
                ),
                array(
                    'table_name'=>'prod_variation',
                    'option_name'=>'size',
                ),

                
            );
            
            break;
        
        default:
            return array(
                array(
                    'table_name'=>'prod_attributes',
                    'option_name'=>'category',
                ),
                array(
                    'table_name'=>'prod_attributes',
                    'option_name'=>'color',
                ),
                array(
                    'table_name'=>'prod_variation',
                    'option_name'=>'size',
                ),

                
            );
            break;
    }
}


/* return proper url for navigation menu */

function get_url($category_key,$gender){
    if (strpos($category_key,'cgid') !== false) {
        return base_url().'show_search'.strtolower($category_key);
    }else{        
        return base_url().'product/'.$gender.'/'.strtolower($category_key);
    }
}


/**
 * take an array and returns a string that is compatible for mysql in operator
 */

function make_sql_in_string($type_arr){
    $type_range = '';
    // echo "type range: <br>";
    // echo '<pre>';
    // print_r($type_arr);
    //exit;
    //$type_arr = array_filter($type_arr);
    if(!empty($type_arr)){
       foreach($type_arr as $curr_type):
        $type_range .= "'" . $curr_type . "'".",";
        endforeach;
        //$type_range = trim($type_range,','); 
    }
    
    return $type_range;
}



// Sublisting filter page functions

function append_filter_before($filter_arr_keys, $option_name, $selected_filters){
    $url = '';
    // check for all the filter options that exists befor the current option name in filter_array_keys
    $sliced_array = array_slice($filter_arr_keys, 0,array_search($option_name, $filter_arr_keys));

    /*echo '<pre>';
    print_r($sliced_array);
    echo '</pre>';
    exit;   */                                                             

    if(!empty($sliced_array)){
    // If option exists Yes
    //echo 'inside if';exit; 

    // Then check if this option/options present in the sliced array exists in selectd_filters_array

        foreach($sliced_array as $curr_slice_key=>$curr_sliced_value){
            if(!empty($selected_filters[$curr_sliced_value])){
                // +if exists Yes
                // Then append its string present in respective selected_filters_array element
                $url .= ($curr_slice_key == 0 ? '?' : "&");

                $url .= $curr_sliced_value . "=" . $selected_filters[$curr_sliced_value];
            }

            else{
                // if exits No
                $url .= ($curr_slice_key == 0 ? '?' : "&");

                $url .= $curr_sliced_value . "=";
            }
            //echo $current_filter_url;exit;

        } // foreach($sliced_array as $curr_slice_key=>$curr_sliced_value)

        $url .= "&$option_name=";

    } //if(!empty($sliced_array))

    else{
        $url .= "?$option_name="; 
    }

    return $url;
} // end of function


function append_filter_after($filter_arr_keys, $option_name, $selected_filters){
    $url = '';
    $sliced_reverse_array = array_slice($filter_arr_keys, array_search($option_name, $filter_arr_keys) + 1);

    /*echo '<pre>';
    print_r($sliced_reverse_array);
    echo '</pre>';
    exit;*/

    if(!empty($sliced_reverse_array)){
        // If option exists Yes
        //echo 'inside if';exit; 

       // Then check if this option/options present in the sliced array exists in selectd_filters_array

        foreach($sliced_reverse_array as $curr_slice_key=>$curr_sliced_value){
            if(!empty($selected_filters[$curr_sliced_value])){
                // +if exists Yes
                // Then append its string present in respective selected_filters_array element
                $url .= "&";
                $url .= $curr_sliced_value . "=" . $selected_filters[$curr_sliced_value];
            }

            else{
                // if exits No
                $url .= "&";

                $url .= $curr_sliced_value . "=";
            }
            //echo $current_filter_url;exit;

        } // foreach($sliced_reverse_array as $curr_slice_key=>$curr_sliced_value)

        //$current_filter_url .= "&$option_name=";

    } //if(!empty($sliced_reverse_array))

    // no else part for sliced_reverse_array

    /*else{
       $current_filter_url .= "?$option_name="; 
    }*/

    return $url;

}