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
		$data['sub_category'] = $category;
		$return_data = $this->product_model->get_sublisting_product($gender,$category,$type);
		$data['product_arr'] = $return_data['prod_arr'];
		$data['total_records'] = $return_data['total'];
		$data['page_info'] = $this->product_model->get_sublising_page_info($this->get_category($gender), $category);
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
	$return_data = $this->product_model->get_sublisting_product($search_data[1],$search_data[2],$search_data[3]);
	$data['product_arr'] = $return_data['prod_arr'];
	$data['total_records'] = $return_data['total'];
	$data['page_info'] = $this->product_model->get_sublising_page_info($this->get_category($search_data[1]), $search_data[3]);

	$data['style'] = 'background: url('.base_url().'images/backmendenim.jpg);';
	$data['footer_label'] = 'display:none;'; 
	$view_file_name = 'sublisting_view';
	$data['view_file_name'] = $view_file_name;
	//$this->load->view('sublisting_view_dd'); 
	$this->template->load_listing_view($view_file_name , $data);



    }
 }

 public function ajax_load_products(){
 	echo '<pre>';
 	print_r($this->input->post());
 	echo '</pre>';
 	//exit;
 	//var_dump(json_decode($this->input->post('ajax_data')));
 	//exit;

 	$ajax_data = $this->input->post('ajax_data');
 	$offset = $this->input->post('next_limit');
 	echo 'starting if';//exit;
 	if($ajax_data['cgid_status'] === 'true'){
 		echo 'inside if';exit;
 	}else{
 		// check if subcategory contains "-" in it
 		echo 'inside else';exit;

 		if (strpos($ajax_data['sub_category'],'-') !== false) {
		    // then remove "-" from the string
		    $ajax_data['sub_category'] = str_replace('-', ' ', $ajax_data['sub_category']);
		}


 		$return_data = $this->product_model->get_sublisting_product($ajax_data['category'],$ajax_data['sub_category'],'',$offset);
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
