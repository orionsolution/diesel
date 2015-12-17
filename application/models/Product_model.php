<?php

class Product_model extends CI_Model {
	
public function __construct(){
    parent::__construct();
}

public function get_maingroup_product($gender,$main_group){
		ini_set('max_execution_time', 0); 
		$gender = $this->get_gender($gender);
		$prod_array = array();
		$attribute_array = array();
		$sql = "select pm.style,pm.genderCode,pm.disp_name,pa.attr_id
				from prod_mast pm,prod_attributes pa
				where pm.style = pa.style
				and  ( pm.genderCode =  '$gender' OR pm.genderCode =  'U')
				and pa.attr_id = 'productMainGroup'
				and pa.attr_value ='$main_group'
				and pm.available_flag='Yes'";

	   /*echo $sql;
	   exit;*/
	   
		$query = $this->db->query($sql);
		$result = $query->result_array();
		/*echo "<pre>";
		print_r($result);
		exit;*/

        foreach($result as $key => $value){
        	$prod_style = $value['style'];
		    $value['attributes'] = $this->get_prod_group($prod_style);
		    $value['color'] = $this->get_prod_color($prod_style);
        	/*echo "<pre>";
        	print_r($value);exit;*/
      		$attribute_array[] = $value;
        }
		/*echo "<pre>";
        	print_r($attribute_array);exit;*/
        //$prod_array['prod_attributes'] = $attribute_array;
		return $attribute_array;
	}

	/*public function get_gender($gender){
		if($gender == 'mens'):
			$gender = 'M';
		else : 
			$gender = 'F';
		endif;

		return $gender;
	}*/ 

	public function get_prod_group($style){
		$sql = "SELECT attr_id,attr_value	 
				FROM prod_attributes
				WHERE style='{$style}'
				AND attr_id = 'productGroup'";
		$query = $this->db->query($sql);
		return $query->result();
	}

	public function get_prod_color($style){
		$sql = "SELECT distinct color, microcolor,macrocolor	 
				FROM prod_barcode
				WHERE style='{$style}'";
		//echo "sql :- ".$sql;exit; 	
		$query = $this->db->query($sql);
		return $query->result();
	}
	

// query for product detail page by Abhishek

/*public function get_product_detail($gender='',$prod_name='',$style=''){
    	$gen = 'male';
    	if($gender == 'women'){
    		$gen = 'w';
    	}else if($gender == 'men'){
    		$gen = 'male';
    	}
		
		$sql="SELECT a.*,b.app21_prodid,b.app21_colorid,b.color,b.color_code,b.width_code,b.price,b.price_sale, b.visible , c.sku , c.barcode
	    FROM `footwear_mast` a, footwear_variation b ,footwear_barcode c
	    WHERE a.style=b.style
	    and b.prodcode=c.prodcode
        and b.style='$prod_id'
        and b.color_code='$color_code' and gender = '$gen' and b.visible='Yes'
        GROUP BY b.style";

        $sql ="SELECT a.*, b.attr_type, b.attr_code,b.attr_value,c.*,d.attr_id,d.attr_value as list
				FROM prod_mast a,prod_variation b,prod_barcode c,prod_attributes d
				WHERE a.style = b.style
				AND b.style = c.style
				AND c.style = d.style
				and d.style='00SJT20CAKE'
				and d.attr_id != ''
				and d.attr_value != ''
				GROUP BY b.style";
				
			$this->db->select('prod_mast.*,
							   prod_variation.attr_type,
							   prod_variation.attr_code,
							   prod_variation.attr_value,
							   prod_attributes.attr_id,
							   prod_attributes.attr_value as cat,
							   ');
			$this->db->from('prod_mast');
			$this->db->join('prod_variation', 'prod_variation.style = prod_mast.style');
			$this->db->join('prod_attributes', 'prod_attributes.style = prod_mast.style');
			$this->db->where('prod_mast.style','00SJT20CAKE');
			$this->db->where('prod_attributes.attr_id !=','');
			$this->db->where('prod_attributes.attr_value !=','');
			$this->db->group_by('prod_mast.style');
			$query = $this->db->get();
			$values = $query->result();
			
		
   
	//	return $query->result();

}*/

// Dharmesh


public function get_product_detail($style=''){
	$sql ="SELECT a.*, b.attr_type,b.attr_code,b.attr_value
				FROM prod_mast a,prod_variation b,prod_barcode c
				WHERE a.style = b.style
				AND b.style = c.style
				AND b.attr_type = 'color'
				AND a.style='$style'
				GROUP BY b.style";
	
		$query = $this->db->query($sql);
		
		return $query->result();
	//echo $sql;exit;

}

public function get_size($style='',$color=''){
		
	$customized_arr = array(); //customized array that will contatin the final result of the method
	
	$sql = "SELECT attr_value	 
			FROM prod_variation 
			WHERE style='$style'
			AND attr_code = '$color'";
			
			$query = $this->db->query($sql);
		
			$col_val = $query->result();
			
			$color_val = $col_val[0]->attr_value;
					

	// get all the size available for the particular style

	$sql = "SELECT distinct barcode,color,size, microcolor,macrocolor	 
			FROM prod_barcode 
			WHERE style='$style'
			AND size != '' 
			AND microcolor='$color_val'
			GROUP BY size";
		
		$query = $this->db->query($sql);
		
		return $query->result();
		//echo $sql;exit;

}

public function get_prod_images($style = '',$color=''){
	$sql = "SELECT variation_code,image_path	 
			FROM prod_images
			WHERE style='$style'
			AND variation_code = '$color'
			AND variation_code != ''";
		
		$query = $this->db->query($sql);
		
		return $query->result();
	//echo $sql;exit;
}

public function get_prod_attributes($style=''){
	$sql = "SELECT attr_id,attr_value	 
			FROM prod_attributes
			WHERE style='$style'
			AND attr_id != ''
			AND attr_value != ''";
	//echo $sql;exit;
		$query = $this->db->query($sql);
		return $query->result();
}


public function get_color($style=''){

	$customized_arr = array(); //customized array that will contatin the final result of the method


	// get all the size available for the particular style

	$sql = "SELECT distinct barcode,color,size, microcolor,macrocolor	 
			FROM prod_barcode 
			WHERE style='$style'
			AND color != '' 
			GROUP BY color";
		
		$query = $this->db->query($sql);
		
		return $query->result();
		//echo $sql;exit;

}

/* Code by Abhishek 30/11/2015.
*** Get product barcode from style,size and color
*/

public function get_barcode($style='',$color='',$size='')
{
	
	$sql = "SELECT barcode	 
			FROM prod_barcode 
			WHERE style='$style'
			AND color = '$color'
			AND size = '$size'";
		
		
		$query = $this->db->query($sql);
		
		return $query->result();
		
}

//Dharmesh

public function get_landing_products($category_name){
	$ret_val_arr = array();

	switch ($category_name) {
		case 'men':
			$product_arr = array('00SK0A0846X','00SKAL0845N','00SDHB0842U','00S0Y80847K');
			$criteria = "";
			break;

		case 'denim':
			$product_arr = array('00AAZL0885K','00CZAK0600V','00CNYV0842R','00CQLP0800R');
			$criteria = "";
			break;

		case 'women':
			$product_arr = array('00SJDZ0DAJR','00SJ950SAIG');
			$criteria = "";
			break;

		case 'home':
			$product_arr = array('00SJT20CAKE', '00SJKF0SAGJ','00SJFF0HAHU','00SKAL0845N','00SLDR0BAAF', 'DZ733100QQQ', 'Y01182PR697', '00S5BL0837C', '00SIYP0IAIV', '00SM410HAFV', 'Y01182PR697', 'DZ733100QQQ');

	}

	// get product details 

	foreach($product_arr as $curr_style){
		/*$sql = "select c.attr_value, a.disp_name , a.style, attr_code
				from prod_mast a, prod_variation b, prod_attributes c
				where a.style = b.style and 
				b.style = c.style and
				a.style = '{$curr_arr}' and
				b.attr_type = 'color' and
				c.attr_id = 'dgaLook'
				group by c.style";*/

		$sql = "select a.disp_name , a.style, attr_code, d.*
				from prod_mast a, prod_variation b, category_assignment d 
				where a.style = b.style and 
				a.style = d.`product-id` and 
				a.style = '{$curr_style}' and 
				b.attr_type = 'color'
				group by b.style";

		//echo $sql;exit;

		$query = $this->db->query($sql);
		$curr_value = $query->row_array();
		$curr_value['prod_images'] = $this->get_product_img_url($curr_style,1);
		$ret_val_arr[] = $curr_value;	

	}

	/*echo '<pre>';
	print_r($ret_val_arr);
	echo '</pre>';
	exit;*/

	return $ret_val_arr;

	
}

/**
 * function to retrieve products from db as per filter options
 */

public function get_filter_product($gender,$category_name,$type='',$category_filter='',$color_filter='',$size_filter=''){

	$table_name = '';
	$prod_arr = array();

	

	$size_criteria = $filter_criteria = '';
	$table_criteria = 'a.style = b.style and ';
	$table_name .= ', prod_attributes b';
	$filter_criteria = " b.attr_value IN (";
	$filter_value = '';
	if(!empty($category_filter)){		
		$filter_value .= make_sql_in_string($category_filter);
	}

	if(!empty($color_filter)){
		$filter_value .= make_sql_in_string($color_filter);
	}

	//print_r($category_filter);exit;

	

	if(!empty($size_filter)){
		if(!empty($category_filter) || !empty($color_filter)){
			$filter_value = trim($filter_value,',');
			$filter_criteria .= "$filter_value) and";
		}
		elseif(!empty($category_filter) && !empty($color_filter)){
			$filter_value = trim($filter_value,',');
			$filter_criteria .= "$filter_value) and";	
			
		}else{
			$table_name = '';
			$filter_criteria = '';
			$table_criteria = '';
		}
		$table_name .= ', prod_variation c';
		$table_criteria .= 'a.style = c.style and ';
		$size_criteria = "c.attr_value IN (". trim(make_sql_in_string($size_filter), ',').") and";
	}else{
		$filter_value = trim($filter_value,',');
		$filter_criteria .= "$filter_value) and";
	}

	

	

	if($category_name == 'denimguide'){
		$return_gender_value = (!empty($this->get_gender($gender)) ? $this->get_gender($gender) : $gender);
		//$return_gender_value = $gender;
		$criteria = "d.L2 = '{$return_gender_value}' and
					 d.L4 = '{$category_name}' and
					 d.L6 = '{$type}'";
	}else{
		$return_gender_value = $this->get_gender($gender);
		$criteria = "d.L2 = '{$return_gender_value}' and
					 d.L4 = '{$category_name}'";
	}
	$sql = "select a.disp_name , a.style, d.*
			from prod_mast a, category_assignment d $table_name 
			where $size_criteria $filter_criteria	
			a.style = d.`product-id` and
			$table_criteria
			d.L1 = 'diesel' and
			$criteria
						
			group by a.style";
	echo $sql;
	//exit;

	$query = $this->db->query($sql);
	$result = $query->result_array();	

	foreach($result as $curr_result){
		$curr_result['prod_images'] = $this->get_product_img_url($curr_result['style'],1);
		$curr_result['color_code'] = $this->get_product_color($curr_result['style']);
		$prod_arr[] = $curr_result;
	}
	return $prod_arr;
}


/**
 * get sublisting page products
 * @param: gender string, category string
 * @return: product array
 */

public function get_sublisting_product($gender,$category_name,$type='',$offset_value=''){
	$prod_arr = array();

	if(empty($offset_value)){
		$offset_value = 0;
	}
	
	//echo $category_name;exit;
	if($category_name == 'denimguide'){
		$return_gender_value = (!empty($this->get_gender($gender)) ? $this->get_gender($gender) : $gender);
		//$return_gender_value = $gender;
		$criteria = "d.L2 = '{$return_gender_value}' and
					 d.L4 = '{$category_name}' and
					 d.L6 = '{$type}'";
	}else{
		$return_gender_value = $this->get_gender($gender);
		$criteria = "d.L2 = '{$return_gender_value}' and
					 d.L4 = '{$category_name}'";
	}
	$sql = "select a.disp_name , a.style, d.*
			from prod_mast a, category_assignment d 
			where a.style = d.`product-id` and
			d.L1 = 'diesel' and
			$criteria 
			group by a.style";

/*	select a.disp_name , a.style, count(*)
	from prod_mast a, category_assignment d
	where  a.style = d.`product-id` and d.L1 = 'diesel' and d.L2 = 'man' and d.L4 = 'denim' group by a.style*/
	//echo $sql;
	//exit;
	
	$query = $this->db->query($sql);
	$result = $query->result_array();	
	/*echo '<pre>';
	print_r($result_total_records);
	echo '</pre>';
	echo '<pre>';
	print_r($query->result_array());
	echo '</pre>';
	exit;*/	

	foreach($result as $curr_result){
		$curr_result['prod_images'] = $this->get_product_img_url($curr_result['style'],1);
		$curr_result['color_code'] = $this->get_product_color($curr_result['style']);
		$prod_arr[] = $curr_result;
	}
	/*echo '<pre>';
	print_r($prod_arr);
	echo '</pre>';
	exit;*/
	//return array('prod_arr'=>$prod_arr,'total'=>$result_total_records['total_records']);
	return $prod_arr;
	
}

/**
 * get appropriate gender string
 * @param: gender string
 * @return: calculated gender value
 */

public function get_gender($gender){
	switch ($gender) {
		case 'mens':
			return 'man';
			break;

		case 'womens':
			return 'woman';
			break;
		
		default:
			return '';
			break;
	}
}

/**
 * get product images url
 * @param: product style
 * @return: prod images url arr
 */


public function get_product_img_url($style,$limit=''){

	$sql = "SELECT * FROM `prod_images` WHERE `style` = '$style' AND `variation_code` != '' ORDER BY `prod_images_id`";
	if(!empty($limit)){
		$sql .= " LIMIT $limit";
	}
	//echo "$sql <br>";

	$query = $this->db->query($sql);	

	if($query->num_rows() == 1){
		return $query->row_array();
	}else{
		$result = $query->result_array();
		return $result;
	}

	
}

/**
 * 
 */


public function get_sublising_page_info($category,$sub_category){
	$sql = "SELECT * FROM `sublisting_info` WHERE `category` = '$category' AND `sub_category` = '$sub_category'";
	//echo $sql;exit;
	$query = $this->db->query($sql);
	return $query->row_array();
}


/**
 * get all the colors for particulat product
 * @param: style number
 */

public function get_product_color($style){
	$sql = "SELECT attr_code,attr_value  FROM `prod_variation` WHERE `style` = '$style' and attr_type = 'color'";
	$query = $this->db->query($sql);
	$result = $query->result_array();
	return $result;
}



/**
 * return distinct filter value for different option for particular sub_category, like distinct values for category, colors, size for jackets
 * @param: option_value (string), sub_category_name (string), $criteria (string)
 * @return: filter value
 */

public function get_filter($sub_category){
	$filter_arr = array();
	// get filter options array
	//echo $sub_category;exit;

	$option_arr = get_filter_by_options($sub_category);
	/*echo '<pre>';
	print_r($option_arr);
	echo '</pre>';
	exit;*/

	foreach($option_arr as $curr_option){
		$sql = "select distinct b.attr_value
				from prod_mast a, {$curr_option['table_name']} b, category_assignment d 
				where a.style = d.`product-id` and
				a.style = b.style and 
				d.L1 = 'diesel' and 
				d.L2 = 'man' 
				and d.L4 = '$sub_category' and 
				b.attr_value != '' and ";

		if($curr_option['option_name'] == 'category'){
			$sql .= "b.attr_id = 'productGroup'";
		}elseif($curr_option['option_name'] == 'color'){
			$sql .= "b.attr_id = 'macroColor'";
		}elseif ($curr_option['option_name'] == 'size') {
			$sql .= "b.attr_type = 'size'";
		}

		//echo $sql.'<br>';

		$query = $this->db->query($sql);
		$filter_arr[$curr_option['option_name']] = $query->result_array();
				

			/*select distinct b.attr_value
			from prod_mast a, prod_variation b, category_assignment d 
			where a.style = d.`product-id` and
			a.style = b.style and 
			d.L1 = 'diesel' and 
			d.L2 = 'man' 
			and d.L4 = 'jackets' and
			b.attr_type = 'size'*/
	}

	/*echo '<pre>';
	print_r($filter_arr);
	echo '</pre>';
	exit;*/

	return $filter_arr;

	
}





/**
 * return pre-built header array for differenct category
 * @return: header array
 */

/*public function generate_header_nav(){
	$main_header_arr = array();

	$sql = "select distinct L3 from `category_assignment` WHERE `L1` = 'diesel' AND `L2` = 'man'";
	$query = $this->db->query($sql);
	$l3_result = $query->result_array();

	foreach($l3_result as $curr_result){
		
	}

}*/



	
} // end of model class
	
	
?>
