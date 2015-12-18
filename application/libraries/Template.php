<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Template 
{
    var $ci;
     
    function __construct() 
    {
        $this->ci =& get_instance();
    }

    function member_load($view_file_path = null, $data = null) 
	{
	    $this->ci->load->view('includes/header', $data);
	    $this->ci->load->view($view_file_path, $data);
	    $this->ci->load->view('includes/footer', $data);
	}

    function cart_load($body_view = null, $data = null) 
    {
        $this->ci->load->view('includes/header', $data);
        $this->ci->load->view('cart/'.$body_view, $data);
        $this->ci->load->view('includes/footer', $data);
    }

    function load_root_view($view_file_name = null, $data = null){
        $this->ci->load->view('includes/header', $data);
        $this->ci->load->view($view_file_name, $data);
        $this->ci->load->view('includes/footer', $data);
    }

    function load_member_view($view_file_name = null, $data = null){
        $this->ci->load->view('includes/header', $data);
        $this->ci->load->view('member/'.$view_file_name, $data);
        $this->ci->load->view('includes/footer', $data);
    }
	
	function load_listing_view($view_file_name = null, $data = null){
        $this->ci->load->view('includes/header', $data);
        $this->ci->load->view($view_file_name, $data);
        $this->ci->load->view('includes/footer', $data);
    }
    
    function load_info_view($view_file_name = null, $data = null){
        $this->ci->load->view('includes/header', $data);
        $this->ci->load->view($view_file_name, $data);
        $this->ci->load->view('includes/footer', $data);
    }
    
    function load_shipping_view($view_file_name = null, $data = null){
        $this->ci->load->view('includes/header', $data);
        $this->ci->load->view($view_file_name, $data);
        $this->ci->load->view('includes/footer', $data);
    }
	
	function load_var_view($view_file_name = null, $data = null){
       // $this->ci->load->view('includes/header', $data);
        $this->ci->load->view($view_file_name, $data);
        //$this->ci->load->view('includes/footer', $data);
    }
	
	function load_cart_view($view_file_name = null, $data = null){
        $this->ci->load->view('includes/header', $data);
        $this->ci->load->view($view_file_name, $data);
        $this->ci->load->view('includes/footer', $data);
    }
}