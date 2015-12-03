<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Shipping extends CI_Controller {

	public function index()
	{
		$this->load->view('welcome_message');
	}
        
        public function shipping(){
            
            $this->template->load_info_view('shipping/shippingtimecost');
        }
}
