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

function get_gender($gender)
{
    switch ($gender){
        
        case 'Women':
            $fGen="w";
        break;
            case 'Men':
            $fGen="m";
        break;
         case 'women':
            $fGen="w";
        break;
            case 'men':
            $fGen="m";
        break;

        case 'all':
            $fGen="Men's";
        break;

        case 'All':
            $fGen="Men's ";
        break;
    }


    return $fGen;
}

function get_gender_suffix($gender){
    
    switch (strtolower($gender)):
		case 'w':
		case 'women':
            $fGen="Women's ";
			break;
		case 'm':
		case 'men':
		case 'all':
            $fGen="Men's ";
			break;
		case 'kids':
            $fGen="Kids ";
			break;
		case 'unisex':
		default:
            $fGen="";
			break;			
	endswitch;
    return $fGen;
}


function test_empty_array_elements($arr_ele){
	if(!empty($arr_ele)){
		return true;
	}else{
		return false;
	}
}

function get_gender_name($gender){
    
    switch ($gender){        
        case 'W':
            $fGen="women";
        break;
            case 'M':
            $fGen="men";
        break;
        case 'w':
            $fGen="women";
        break;
        case 'm':
            $fGen="men";
        break;
        case 'women':
            $fGen="women";
        break;
        case 'men':
            $fGen="men";
        break;

        case 'kids':
            $fGen="kids";
        break;


        case 'all':
            $fGen="men";
        break;

        case 'All':
            $fGen="men";
        break;
        default:
            $fGen=$gender;
        break;
    }


    return $fGen;
}

/*function footwear_link($gender, $name, $style, $color_code){
    
    switch ($gender){
        
        case 'W':
            $fGen="women";
        break;
            case 'M':
            $fGen="men";
        break;
        case 'w':
            $fGen="women";
        break;
        case 'm':
            $fGen="men";
        break;
        default:
            $fGen=$gender;
        break;
    }

    

    $formatid = $style."/".$color_code;
    $formatappname = clean_string($name);
    

    $link = base_url()."product/detail/$formatappname/$fGen/$formatid/";

    $link =strtolower($link);
    
    return $link;

}*/


function product_link($prod_type, $gender, $name, $style, $color_code){
    
    switch (strtolower($gender)):
        case 'w':
        case 'women':
            $fGen="women";
            break;
        case 'm':
        case 'men':
            $fGen="men";
            break;
        default:
            $fGen="men";
            break;
    endswitch;

    $prod_type     = clean_string($prod_type);
    $formatappname = clean_string($name);
    $formatid      = $style."_".$color_code;
    $base_url      = base_url();

    $link = $base_url."$prod_type/$fGen/$formatappname/$formatid/";
    // $link = "$prod_type/$fGen/$formatappname/$formatid/";

    return $link;

}


function get_search_link($url){
    $base_url      = base_url();
    $link = $base_url.$url;

    return $link;
}


function quickview_link($prod_type, $gender, $name, $style, $color_code, $cart_id, $qty, $barcode=""){
    
    switch ($gender){
        
        case 'W':
            $fGen="women";
        break;
            case 'M':
            $fGen="men";
        break;
        case 'w':
            $fGen="women";
        break;
        case 'm':
            $fGen="men";
        break;
        default:
            $fGen="all";
        break;
    }
    $prod_type     = clean_string($prod_type);
    $formatappname = clean_string($name);
    $formatid = $style."_".$color_code;

    $link = base_url()."cart/show_product/$prod_type/$fGen/$formatappname/$formatid/$cart_id/$qty/$barcode";

    return $link;

}



/* Clean DB Entries */

function cleanDbEntries($data){

    $data = htmlspecialchars($data);
    $data = htmlentities($data);
    $data = addslashes($data);

    return $data;

}

// Form Select
function sel_chk($db_val,$sel_val){
    if($db_val==$sel_val){
        echo 'selected="selected"';
    }
}


/**
 * function to sort array of result set in asc order on price & price_sale
 */

function ascProduct($a, $b) {
    if($a["price_sale"] != 0 && $b["price_sale"] == 0){
        return $a["price_sale"] - $b["price"];
    }elseif($a["price_sale"] == 0 && $b["price_sale"] != 0){
        return $a["price"] - $b["price_sale"];
    }elseif($a["price_sale"] != 0 && $b["price_sale"] != 0){
        return $a["price_sale"] - $b["price_sale"];
    }else{
        return $a["price"] - $b["price"];
    }

} // end of ascProduct


function descProduct($a, $b) {
    if($a["price_sale"] != 0 && $b["price_sale"] == 0){
        if($a['price_sale']==$b['price']) return 0;
        return $a['price_sale'] < $b['price']? 1:-1;
    }elseif($a["price_sale"] == 0 && $b["price_sale"] != 0){
        if($a['price']==$b['price_sale']) return 0;
        return $a['price'] < $b['price_sale']? 1:-1;
    }elseif($a["price_sale"] != 0 && $b["price_sale"] != 0){
        if($a['price_sale']==$b['price_sale']) return 0;
        return $a['price_sale'] < $b['price_sale']? 1:-1;
    }else{
        if($a['price']==$b['price']) return 0;
        return $a['price'] < $b['price']? 1:-1;
    }
    
} // end of descProduct



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
        $type_range = trim($type_range,','); 
    }
    
    return $type_range;
}

function sort_width($gender,$array){
    
    if($gender == 'women'){
       $order_arr = array('B-Normal','2A-Narrow','D-Wide','2E-Extra');
    }else{
       $order_arr = array('D-Normal','B-Narrow','2E-Wide','4E-Extra');
    }

    usort($array, array(new TermMetaCmpClosure($order_arr), "call"));

    return $array;

}


function custom_compare($a, $b, $order_arr){
    
    $a = array_search($a['width_name'], $order_arr);
    $b = array_search($b['width_name'], $order_arr);
    if($a === false && $b === false) { 
        return 0;                      
    }
    else if ($a === false) {           
        return 1;                     
    }
    else if ($b === false) {           
        return -1;                     
    }
    else {
        return $a - $b;
    }
}


class TermMetaCmpClosure
{
    private $meta;

    function __construct( $meta ) {
        $this->meta = $meta;
    }

    function call( $a, $b ) {
        return custom_compare($a, $b, $this->meta);
    }
}


function get_width_name($width_name){
    switch ($width_name) {
        case 'b-normal':
            return 'B-Normal';
            break;
        case 'd-wide':
            return 'D-Wide';
            break;

        case '2e-extra-wide':
            return '2E-Extra-Wide';
            break;

        case 'a-narrow':
            return 'A-Narrow';
            break;

        case 'd-normal':
            return 'D-Normal';
            break;

        case 'b-narrow':
            return 'B-Narrow';
            break;

        case '2e-wide':
            return '2E-Wide';
            break;

        case '4e-extra-wide':
            return '4E-Extra-Wide';
            break;

        default:
            return '';
            break;
    }
}


function invenDescSort($item1,$item2){
    if ($item1['style'] == $item2['style']) return 0;
    return ($item1['style'] < $item2['style']) ? 1 : -1;
}

// To check If file exist
function is_url_exist($url){
    $ch = curl_init($url);    
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if($code == 200){
       $status = true;
    }else{
      $status = false;
    }
    curl_close($ch);
   return $status;
}




// Ecommerce Tracking Functions

// Function to return the JavaScript representation of a TransactionData object.
function getTransactionJs(&$trans) {
return <<<HTML
      ga('ecommerce:addTransaction', {
        'id': '{$trans['id']}',
        'affiliation': '{$trans['affiliation']}',
        'revenue': '{$trans['revenue']}',
        'shipping': '{$trans['shipping']}',
        'tax': '{$trans['tax']}'
      });
HTML;
}


// Function to return the JavaScript representation of an ItemData object.
function getItemJs(&$transId, &$item) {
return <<<HTML
      ga('ecommerce:addItem', {
        'id': '$transId',
        'name': '{$item['name']}',
        'sku': '{$item['sku']}',
        'category': '{$item['category']}',
        'price': '{$item['price']}',
        'quantity': '{$item['quantity']}'
      });
HTML;
}