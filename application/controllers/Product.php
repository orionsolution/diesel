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
	$data['category'] = $category;
	if($category=="kids"){
		$view_file_name = 'product_listing_view_kids';
	}
	$data['view_file_name'] = $view_file_name;
	$this->template->load_root_view($view_file_name , $data);
}

public function sublisting($gender='',$category){
		$data = '';
		//$data['main_group_arr'] = $this->product_model->get_maingroup_product($gender,$category);
		$data['category'] = $gender;
		$data['product_arr'] = $this->product_model->get_sublisting_product($gender,$category);
		/*echo "<pre>";
		echo "in controller";
		echo "<pre>";
		print_r($data['main_group_arr']);
		exit;*/
		$data['style'] = 'background: url(http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites-diesel-navigation-non-ecom/default/dwe9cb5c1b/backmendenim.jpg);';
		$data['footer_label'] = 'display:none;'; 
		$view_file_name = 'sublisting_view';
		$data['view_file_name'] = $view_file_name;
		//$this->load->view('sublisting_view_dd'); 
		$this->template->load_listing_view($view_file_name , $data);
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
	var_dump($color);
	//die();
	
	$this->data['prod_barcode'] = $this->product_model->get_barcode($style,$color,$fsize);
	
	echo json_encode($this->data["prod_barcode"]);
	
}

// Abhishek adding my code.

}
