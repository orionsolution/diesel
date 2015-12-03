<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index(){
		$view_file_name = 'home_view';
		$data = '';
		$data['view_file_name'] = $view_file_name; 
		$this->template->load_root_view($view_file_name , $data);
	}

	public function new_method(){
		
	}
}
