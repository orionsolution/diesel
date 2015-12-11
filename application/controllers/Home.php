<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('Product_model','product_model');
	}

	public function index(){
		$data = '';
		$data['landing_products'] = $this->product_model->get_landing_products('home');
		/*echo '<pre>';
		print_r($data['landing_products']);
		echo '</pre>';
		exit;*/
		$view_file_name = 'home_view';
		$data['view_file_name'] = $view_file_name; 
		$this->template->load_root_view($view_file_name , $data);
	}

	public function new_method(){
		
	}
}
