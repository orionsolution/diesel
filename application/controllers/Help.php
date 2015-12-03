<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Help extends CI_Controller {

	public function index(){
		$view_file_name = 'home_view';
		$data = '';
		$this->template->load_root_view($view_file_name , $data);
	}


}
