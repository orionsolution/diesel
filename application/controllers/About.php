<?php defined('BASEPATH') OR exit('No direct script access allowed');

class about extends CI_Controller {

	public function index()
	{
		$this->load->view('welcome_message');
	}
        
        public function worldofdiesel(){
            
            $this->template->load_info_view('about/worldofdiesel');
        }
        public function article_aboutdiesel(){
            
            $this->template->load_info_view('about/article_aboutdiesel');
        }
         public function article_press(){
            
            $this->template->load_info_view('about/article_press');
        }
}
