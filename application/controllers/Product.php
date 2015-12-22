<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product extends CI_Controller {

/**
 * default class contructor to initialize certain variables that must be avialable for all the methods
 */

public function __construct(){
	parent::__construct();
	$this->load->model('Product_model','product_model');
}


/**
 * function that displays the detial of a particular project
 * params: gender, product name, product style
 * return: 
 */


public function details($cat='',$prod_name='',$style='',$color=''){
	
	$data = '';
	$this->data['title']="";
	$data['category'] = $cat;
	
	if($style != '')
	{
		$this->data['prod_arr'] = $this->product_model->get_product_detail($style);	
		$this->data['size'] = $this->product_model->get_size($style,$color);
		$this->data['prod_attr'] = $this->product_model->get_prod_attributes($style);
		$this->data['color'] = $this->product_model->get_color($style);
		
		$count = sizeof($this->data['color']);
		$this->data['count_color'] = $count;
	}	
	$this->data['prod_image_arr'] = $this->product_model->get_prod_images($style,$color);
	
	//echo "<pre>";
	//var_dump($this->data['prod_arr']);
	//die();
	//echo "<pre>";
	//var_dump($this->data['size']);
	//die();
	$view_file_name = 'product_detail_view';
	$this->data['view_file_name'] = $view_file_name;
	$this->template->load_root_view($view_file_name , $this->data);

}


/**
 * listing page to display product specific to any gender
 * param:
 * return:
 */


public function listing($category=''){
	$data = '';
	$view_file_name = 'product_listing_view';
	/*echo '<pre>';
	print_r($this->config->item('denim_array'));
	echo '</pre>';
	exit;*/
	$data['landing_products'] = $this->product_model->get_landing_products($category);
	$data['main_arr'] = $this->config->item($category.'_array');
	//echo $data['main_arr'];exit;
	$data['category'] = $this->get_category($category);
	if($category=="kids"){
		$view_file_name = 'product_listing_view_kids';
	}
	$data['view_file_name'] = $view_file_name;
	$this->template->load_root_view($view_file_name , $data);
}

public function sublisting($gender,$category,$type=''){
		$data = '';
		//$data['main_group_arr'] = $this->product_model->get_maingroup_product($gender,$category);
		$data['category'] = $this->get_category($gender);
		$data['gender'] = $gender;
		$data['sub_category'] = $category;
		$data['product_arr'] = $this->product_model->get_sublisting_product($gender,$category,$type);
		$data['page_info'] = $this->product_model->get_sublising_page_info($this->get_category($gender), $category);
		$data['filter_arr'] = $this->product_model->get_filter($category,$gender);
		/*echo "<pre>";
		echo "in controller";
		echo "<pre>";
		print_r($return_data);
		exit;*/		
		
		$data['style'] = 'background: url('.base_url().'images/backmendenim.jpg);';
		$data['footer_label'] = 'display:none;'; 
		$view_file_name = 'sublisting_view';
		$data['view_file_name'] = $view_file_name;
		//$this->load->view('sublisting_view_dd'); 
		$this->template->load_listing_view($view_file_name , $data);
	}



 public function show_search(){
 	if(!empty($_GET['cgid'])){
/*      echo '<pre>';
      print_r($_GET['cgid']);
      echo '</pre>';
      exit;*/

	// retrieving search criteria info in an array
	$search_data = explode('-', $_GET['cgid']);
	$data['category'] = $this->get_category($search_data[1]);
	$data['sub_category'] = $search_data[3];
	/*echo '<pre>';
	print_r($search_data);
	echo '</pre>';
	exit;*/
	$data['product_arr'] = $this->product_model->get_sublisting_product($search_data[1],$search_data[2],$search_data[3]);
	$data['page_info'] = $this->product_model->get_sublising_page_info($this->get_category($search_data[1]), $search_data[3]);
	$data['filter_arr'] = $this->product_model->get_filter($search_data[3],$search_data[1],$search_data[2]);
	//$data['filter_arr'] = $this->product_model->get_filter($search_data[2]);

	$data['style'] = 'background: url('.base_url().'images/backmendenim.jpg);';
	$data['footer_label'] = 'display:none;'; 
	$view_file_name = 'sublisting_view';
	$data['view_file_name'] = $view_file_name;
	//$this->load->view('sublisting_view_dd'); 
	$this->template->load_listing_view($view_file_name , $data);



    }
 }

 public function filter($gender,$category,$type=''){
 	//echo 'inside filter method';exit;

 	$data['category'] = $this->get_category($gender);
	$data['sub_category'] = $category;
	$data['gender'] = $gender;

	$category_filter = $color_filter = $size_filter = '';
	//$_POST = array_filter($_POST);

	if(!empty($_POST)){
		

		//$_POST = array_filter($_POST);
		/*echo '<pre>';
		print_r($_POST);
		echo '</pre>';*/
		//exit;
		//echo "count: " . count($_POST);
		//print_r(current($_POST));
		//exit;
		if(count($_POST) == 1 && !empty(current($_POST))){
			//echo "inside if";exit;
			redirect('product/'.$gender.'/'.$category, 'refresh');
		}
		/*echo '<pre>';
		print_r($_POST);
		echo '</pre>';*/
		//exit;

		foreach($_POST as $key=>$curr_filter){
			$curr_filter = array_filter($curr_filter);

			if(!empty($curr_filter)){
	 		//print_r( $_GET['category'] );exit;
				$keys = explode("_", $key);

		 		$filter[$keys[0]] = $curr_filter;
		 		
		 		foreach($curr_filter as $inner_key=>$curr_value){
		 			if (strpos($curr_value,' ') !== false) {
			    		$curr_filter[$inner_key] = str_replace(' ', '-', $curr_value);
					}
				}

				$data['selected_filters'][$keys[0]] = implode("|", $curr_filter);
				
			} // if(!empty($curr_category))

		}
	}   // if(!empty($_POST))

	elseif (!empty($_GET)) {
		//echo 'inside elseif statement';exit;

		/*echo '<pre>';
		print_r($_GET);
		echo '</pre>';
		exit;*/
		foreach($_GET as $key=>$curr_category){
			if(!empty($curr_category)){
	 		//print_r( $_GET['category'] );exit;
		 		$filter[$key] = explode("|",$curr_category);
		 		$data['selected_filters'][$key] = $curr_category;
		 		foreach($filter[$key] as $inner_key=>$curr_filter){
		 			if (strpos($curr_filter,'-') !== false) {
				    	$filter[$key][$inner_key] = str_replace('-', ' ', $curr_filter);
					}
				}

			} // if(!empty($curr_category))

		} // foreach($_GET as $key=>$curr_category)
		
	} // elseif (!empty($_GET))
	else{
		//echo 'inside else statement';exit;
		redirect('product/'.$gender.'/'.$category, 'refresh');
	}

	/*echo '<pre>';
	print_r($data['selected_filters']);
	echo '</pre>';
	exit;*/

 	

 	$data['product_arr'] = $this->product_model->get_filter_product($gender,$category,$type,$filter);

 	$data['page_info'] = $this->product_model->get_sublising_page_info($this->get_category($gender), $category);
	$data['filter_arr'] = $this->product_model->get_filter($category,$gender);

	/*echo "<pre>";
	print_r($data['selected_filters']);
	echo "</pre>";*/
	//exit;
	
	$data['style'] = 'background: url('.base_url().'images/backmendenim.jpg);';
	$data['footer_label'] = 'display:none;'; 
	$view_file_name = 'sublisting_filter_view';
	$data['view_file_name'] = $view_file_name;
	//$this->load->view('sublisting_view_dd'); 
	$this->template->load_listing_view($view_file_name , $data);
 }


 public function ajax_load_products(){
 	/*echo '<pre>';
 	print_r($this->input->post());
 	echo '</pre>';*/
 	//exit;
 	//var_dump(json_decode($this->input->post('ajax_data')));
 	//exit;

 	$ajax_data = $this->input->post('ajax_data');
 	$offset = $this->input->post('next_limit');
 	//echo 'starting if';//exit;
 	if($ajax_data['cgid_status'] === 'true'){
 		//echo 'inside if';exit;
 	}else{
 		// check if subcategory contains "-" in it
 		//echo 'inside else';exit;

 		if (strpos($ajax_data['sub_category'],'-') !== false) {
		    // then remove "-" from the string
		    //echo 'inside strpost if';exit;	
		    $ajax_data['sub_category'] = str_replace('-', '', $ajax_data['sub_category']);
		    //echo $ajax_data['sub_category'];exit;
		}

		//echo 'before call to sublisting method';
 		$return_data = $this->product_model->get_sublisting_product($ajax_data['category'],$ajax_data['sub_category'],'',$offset);
 		//$return_data = $this->product_model->get_sublisting_product('','','','');
 		//echo 'after call to sublisting method';
		//$data['product_arr'] = $return_data['prod_arr'];
		//$data['total_records'] = $return_data['total'];
 	}
 	



 }

 public function get_category($category){
 	if($category == 'men' || $category == 'mens' || $category == 'man'){
 		return 'men';
 	}elseif($category == 'women' || $category == 'womens' || $category == 'woman'){
 		return 'women';
 	}elseif($category == 'denim'){
 		return 'denim';
 	}
 	return '';
 }
	
/**
 * Product variation function for different colors and sizes specifically for retrieving size based on color and style.
 */

 public function prod_var(){
	 
	$color = $_GET['color'];
	$style = $_GET['style'];	
	
	$this->data['prod_arr'] = $this->product_model->get_product_detail($style);	
	$this->data['size'] = $this->product_model->get_size($style,$color);
	$this->data['prod_attr'] = $this->product_model->get_prod_attributes($style);
	$this->data['color'] = $this->product_model->get_color($style);
	
	$count = sizeof($this->data['color']);
	$count_size = sizeof($this->data['size']);
	$this->data['count_color'] = $count;
	$this->data['color_compare'] = $color;
	if(isset($_GET["size"]))
	{
		$this->data['size_compare'] = $size;
	}
	$this->data['count_size'] = $count_size;
	if(isset($this->data["size"]))
	{
		echo json_encode($this->data["size"]);	
	}
	
}

public function get_bar()
{
	$color = $_GET['color'];
	$style = $_GET['style'];
	$size  = $_GET['size'];
	$size_rep = ltrim($size);
	$fsize = rtrim($size_rep);
	//var_dump($color);
	//die();
	
	$this->data['prod_barcode'] = $this->product_model->get_barcode($style,$color,$fsize);
	
	echo json_encode($this->data["prod_barcode"]);
	
	
}

public function get_images()
{
	$color = $_GET['color'];
	$style = $_GET['style'];
	
	$this->data['prod_image_arr'] = $this->product_model->get_prod_images($style,$color);
	echo json_encode($this->data['prod_image_arr']);
}

// Abhishek adding my code.

}
