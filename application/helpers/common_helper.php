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


        case "guidance":
            $info = array(
                "cat_info" => "the sweet spot between cushion and support",
                "cat_desc" => "Get the perfect blend of cushion and stability with our Guidance running shoes. They’re ideal for heel to forefoot strikers who require a touch of stability for mild overpronation (the tendency to roll your foot to the medial or inside). With the aid of a small medial post (a denser foam on the instep) you can achieve a more neutral footstrike."
            );
        break;

        case "support":
            $info = array(
                "cat_info" => "balance your stride with added stability and cushion",
                "cat_desc" => "Support running shoes are great if you're a heel striker who requires added stability for moderate overpronation (the tendency to roll your foot to the medial or inside). A large medial post (a denser foam on the instep of the shoe) that runs from the rear of the shoe into the forefoot balances the inward motion of the foot to help you achieve a more neutral stride."
            );
        break;

        case "motion control":
            $info = array(
                "cat_info" => "the ultimate stability and support",
                "cat_desc" => "Control running shoes are a smart choice for heel strikers who need a higher degree of stability due to severe overpronation, and may have a low to no arch or use an orthotic. Control shoes feature a linear platform and a large medial post (a denser foam on the instep of the shoe) to create enough stability to help you achieve a neutral footstrike."
            );
        break;

        case "pureproject":
            $info = array(
                "cat_info" => "shoes for those who love to feel the run",
                "cat_desc" => "Our lightweight running shoes are built lower to the ground and have fewer overlays in the upper, which keeps them light and responsive. Like all Brooks shoes, our lightweight line is designed to enhance your natural running motion while providing the perfect amounts of support and cushion."
            );
        break;

        case "trail":
            $info = array(
                "cat_info" => "take a run at the great outdoors",
                "cat_desc" => "Brooks trail running shoes have all the features you expect from Brooks running shoes, with rugged extras that let you get down and dirty. Get a great Brooks fit combined with tricky-terrain technologies for all of your rock jumping, brush stomping, off-the-beaten-path outdoor excursions."
            );
        break;

        case "competition":
            $info = array(
                "cat_info" => "serious shoes for your serious runs",
                "cat_desc" => "Lace up our competition shoes and get ready for race day. Designed for serious runs using advanced materials and innovative technologies, they’re ready to take you from training to the starting pistol to your personal best. And you’re going to look good while you’re doing it!"
            );
        break;

        case "x-training":
            if($gender == 'women'){
                $info = array(
                "cat_info" => "",
                "cat_desc" => "Designed to stand up to a range of different workouts, these running inspired cross trainers will take you from your run, to the gym, to your favourite court sport and everywhere in between – no sweat! So if you need a shoe that is just as adaptive as your exercise regime, Brooks has a range of cross training shoes for you."
                );
            }else{
               $info = array(
                "cat_info" => "",
                "cat_desc" => "Like to mix it up when it comes to staying fit? Brooks' x-training shoes for men are designed specifically to be versatile for all kinds of surfaces and forms of exercise, so you can get the most out of every workout." 
                );
            }
            
        break;

        case "netball":
            $info = array(
                "cat_info" => "",
                "cat_desc" => "Be confident to pivot, pass, and generally play at your best with a pair of Brooks' netball shoes on your feet. We’ve used the latest in innovative sporting technology to make sure you're fully supported and comfortable throughout every game, no matter how intense."
            );
        break;

        case "kids":
            if($gender == 'girl'):
                $info = array(
                    "cat_info" => "",
                    "cat_desc" => "For girls with an active and adventuresome lifestyle, it's important to have a pair of running shoes that can keep up with them. We are dedicated to delivering products that will quickly become the best friend of your young one's feet because we care about the support, comfort, durability, and style of our footwear."
                );
            else:
                $info = array(
                    "cat_info" => "",
                    "cat_desc" => "Brooks is proud to be able to create some of the best boys' running shoes on the market, thanks to not only our focus on style, comfort, and support, but also on durability through all the wear and tear that occurs every day."
                );
            endif;
            
        break;

        case "walking":
            $info = array(
                "cat_info" => "walk a mile in our shoes - then walk another mile",
                "cat_desc" => "Get the fit and feel of top-of-the-line running shoes in a casual every day walker. Built with a supple leather upper, energy-returning midsole cushioning and a reliable slip-resistant outsole, Brooks walking shoes provide sturdy support, mile after mile."
            );
        break;

        case "sale":
            $info = array(
                "cat_info" => "closeout prices on earlier models of our running shoes for $gender",
                "cat_desc" => "Closeout prices on previous editions of our running shoes... whether you're looking for a bargain or you just can't bear to break up with your current model, you can score some great deals on sweet shoes. Think of this as our online outlet store."
            );
        break;

        default:
            $info = array("cat_info" => '',"cat_desc" => '' );
            break;

    }
    return $info;
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