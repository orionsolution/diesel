<?php

class Product_model extends CI_Model {
	
public function __construct(){
    parent::__construct();
}

public function get_maingroup_product($gender,$main_group){
	$gender = $this->get_gender($gender);
	$sql = "select * from prod_mast pm 
            INNER JOIN (select * from prod_attributes where attr_value='productGroup' 
            	and style in(select style from prod_attributes 
			where attr_id = '$main_group' 
			and attr_value='productMainGroup' 
			and style in(select style from prod_attributes where attr_id='$gender'))) p ON pm.style=p.style ORDER By disp_name";

   /*echo $sql;
   exit;*/
   
	$query = $this->db->query($sql);
	$result = $query->result_array();
    
	return $result;
}

public function get_gender($gender){
	if($gender == 'mens'):
		$gender = 'Male';
	else : 
		$gender = 'Female';
	endif;

	return $gender;
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

public function get_size($style=''){

	$customized_arr = array(); //customized array that will contatin the final result of the method


	// get all the size available for the particular style

	$sql = "SELECT distinct barcode,color,size, microcolor,macrocolor	 
			FROM prod_barcode 
			WHERE style='$style'
			AND size != '' 
			GROUP BY size";
		
		$query = $this->db->query($sql);
		
		return $query->result();
		//echo $sql;exit;

}

public function get_prod_images(){
	$sql = "SELECT variation_code,image_path	 
			FROM prod_images
			WHERE style='00SJT20CAKE'";

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


	
} // end of model class
	
	
?>
