<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cart extends CI_Controller {

	private $data;

	public function __construct()
	{
		parent::__construct();
		$this->load->model("Cart_model");
		//$this->load->library('user_agent');

		//$this->load->model("product_model");
		
		//$this->data['page_info'] = $this->product_model->get_page_info();
	}

	public function index()
	{	
		
		$data = '';
		$view_file_name = 'cart_view';
		$data['view_file_name'] = $view_file_name;
		$this->template->load_cart_view($view_file_name , $data);

	}


	public function addCart($arg)
	{
		//retrieve all the post data.
		
		$color 		= $arg['prd_color'];
		$style 		= $arg['prd_style'];
		$prod_qty 	= $arg['Quantity'];
		$barcode 	= $arg['prd_barcode'];
		$cart_id 	= (!empty($arg['cart_id']))? $arg['cart_id']:'';
		

		// check if the products exists in database

		$prod 		= $this->cart_model->check_product($color, $barcode, $prod_qty, $style, $cart_id);

		if($prod){
			return true;
		}else{
			return false;
		}

	} // end of add method


	public function add($type = '')
	{
		
		//retrieve all the post data.
		$color 		= $this->input->post('color');
		$style 		= $this->input->post('style');
		$prod_qty 	= $this->input->post('qty');
		$barcode 	= $this->input->post('barcode');
		$cart_id 	= $this->input->post('cart_id');
		
		
		$prod 		= $this->Cart_model->check_product($color, $barcode, $prod_qty, $style, $cart_id);
		
		if(!empty($prod))
		{
			$updates = true;
		}
		
		else
		{
			$updates = false;
		}

		if(!empty($type) && $type == 'ajax')
		{
			echo $updates;
		}
		
		else
		{
			//echo 'inside redirect cart';exit;
			redirect('cart');
		}

	 // end of add method
	
	}	
	/**
 * show the cart page with the product present in the cart array
 * param: none
 * return: none
 */

	public function ajax_cart()
	{
		
		ini_set('max_execution_time', 3600);

		header('Content-Type: application/json');
		
		//$this->data['title']="Cart Page";
		//$this->data['main_content'] = 'ajax_cart_view';

		$carts = $this->Cart_model->show_cart();
		

		echo json_encode($carts);
		
	} // end of show cart method


} // end of class

