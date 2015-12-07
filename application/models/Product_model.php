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
			$product_arr = array('00SD240669T','00CKS10843S','00SKAA0667S','00SH260662E');
			$criteria = "";
			break;

		case 'women':
			$product_arr = array('00SJLF0NAHP','00SIH30844Q');
			$criteria = "";
			break;

	}

	// get product details 

	foreach($product_arr as $curr_arr){
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
				a.style = '{$curr_arr}' and 
				b.attr_type = 'color'
				group by b.style";

		//echo $sql;exit;

		$query = $this->db->query($sql);
		$ret_val_arr[] = $query->row_array();	

	}

	/*echo '<pre>';
	print_r($ret_val_arr);
	echo '</pre>';
	exit;*/

	return $ret_val_arr;

	
}


/**
 * get sublisting page products
 * @param: gender string, category string
 * @return: product array
 */

public function get_sublisting_product($gender,$category_name){
	$prod_arr = array();
	$return_gender_value = $this->get_gender($gender);
	$sql = "select a.disp_name , a.style, attr_code, d.*
			from prod_mast a, prod_variation b, category_assignment d 
			where a.style = b.style and 
			a.style = d.`product-id` and
			d.L1 = 'diesel' and
			d.L2 = '{$return_gender_value}' and
			d.L4 = '{$category_name}' and  
			b.attr_type = 'color'
			group by b.style" ;
	//echo $sql;exit;
	$query = $this->db->query($sql);
	$result = $query->result_array();
	/*echo '<pre>';
	print_r($result);
	echo '</pre>';
	exit;*/
	return $result;
	
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
		
		default:
			# code...
			break;
	}
}


/**
 * return pre-built header array for differenct category
 * @return: header array
 */

public function generate_header_nav(){
	$main_header_arr = array();

	$sql = "select distinct L3 from `category_assignment` WHERE `L1` = 'diesel' AND `L2` = 'man'";
	$query = $this->db->query($sql);
	$l3_result = $query->result_array();

	foreach($l3_result as $curr_result){
		
	}

}



	
} // end of model class
	
	
?>
