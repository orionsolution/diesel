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


public function details($style=''){
	
	$data = '';
	$this->data['title']="";
	
	if($style != '')
	{
		$this->data['prod_arr'] = $this->product_model->get_product_detail($style);	
		$this->data['size'] = $this->product_model->get_size($style);
		$this->data['prod_attr'] = $this->product_model->get_prod_attributes($style);
		$this->data['color'] = $this->product_model->get_color($style);
		$count = sizeof($this->data['color']);
		$this->data['count_color'] = $count;
		//echo "<pre>";
		//var_dump($this->data['count_color']);
		//die();
	}	
	$this->data['prod_image_arr'] = $this->product_model->get_prod_images();
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


public function listing($gender=''){
	$data = '';
	$view_file_name = 'product_listing_view';
	$data['view_file_name'] = $view_file_name;
	$this->template->load_root_view($view_file_name , $data);
}

public function sublisting(){
	$data = '';
	$data['style'] = 'background: url(http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites-diesel-navigation-non-ecom/default/dwe9cb5c1b/backmendenim.jpg);';
	$data['footer_label'] = 'display:none;'; 
	$view_file_name = 'sublisting_view';
	$data['view_file_name'] = $view_file_name; 
	$this->template->load_listing_view($view_file_name , $data);
}


}
