<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Producttest extends CI_Controller {

	/**
	 * default class contructor to initialize certain variables that must be avialable for all the methods
	 */

	public function __construct(){
		parent::__construct();
		$this->load->model("producttest_model");
	}


	/**
	 * function that displays the detial of a particular project
	 * params: gender, product name, product style
	 * return: 
	 */


	public function details($gender='',$prod_name='',$style=''){
		$data = '';
		$view_file_name = 'product_detail_view';
		$this->template->load_root_view($view_file_name , $data);
	}


	/**
	 * listing page to display product specific to any gender
	 * param:
	 * return:
	 */


	public function listing($gender=''){
		$data = '';
		$view_file_name = 'product_listing_view';
		$data['view_file_name'] = 'product_listing_view';
		$this->template->load_root_view($view_file_name , $data);
	}

	public function sublisting($gender='',$main_group){
		$data = '';
		$data['main_group_arr'] = $this->producttest_model->get_maingroup_product($gender,$main_group);
		/*echo "<pre>";
		echo "in controller";
		echo "<pre>";
		print_r($data['main_group_arr']);
		exit;*/
		$data['style'] = 'background: url(http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites-diesel-navigation-non-ecom/default/dwe9cb5c1b/backmendenim.jpg);';
		$data['footer_label'] = 'display:none;'; 
		$view_file_name = 'sublisting_view_test';
		$data['view_file_name'] = $view_file_name; 
		$this->template->load_listing_view($view_file_name , $data);
	}

}
