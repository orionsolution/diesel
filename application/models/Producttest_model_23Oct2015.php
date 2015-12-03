<?php

class Producttest_model extends CI_Model {
	
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
				and pa.attr_value ='Denim'
				and pm.available_flag='Yes' limit 5";

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

	public function get_gender($gender){
		if($gender == 'mens'):
			$gender = 'M';
		else : 
			$gender = 'F';
		endif;

		return $gender;
	} 

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
	
	public function get_prod_attributes($style){
		$sql = "SELECT attr_id,attr_value	 
				FROM prod_attributes
				WHERE style='{$style}'
				AND attr_id != ''
				AND attr_value != ''";
		$query = $this->db->query($sql);
		return $query->result();
	}




	
} // end of model class
	
	
?>
