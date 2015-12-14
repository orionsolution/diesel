<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Member extends CI_Controller {

	 public function __construct(){
        parent::__construct();
        $this->load->model('member_model');
        $this->load->library('form_validation');
    }

	public function index(){

	}

	public function login(){
		if(isset($this->session->userdata['s_uid'])){
			redirect('home');
		}

		$this->form_validation->set_message('dwfrm_login_username_d0sjourfhqrs','Please enter valid email;');
		$view_file_name = 'login_view';
		$data = '';
		$data['view_file_name'] = $view_file_name;
		$this->template->load_member_view($view_file_name , $data);
	}

	public function login_popup(){
		$this->form_validation->set_message('dwfrm_login_username_d0tjusaihued','Please enter valid email;');
		$view_file_name = 'member/login_popup_view';
		$data = '';
		$data['view_file_name'] = $view_file_name;
		$this->load->view($view_file_name , $data);
	}

	public function user_login(){
		$this->form_validation->set_rules('dwfrm_login_username_d0sjourfhqrs', 'email address', 'trim|required|valid_email');
		$this->form_validation->set_rules('dwfrm_login_password', 'Password', 'trim|required|min_length[8]|max_length[20]');

		if ($this->form_validation->run() == FALSE):
			$this->login();
		else:
			$data = array(
		 		'email' => $this->input->post('dwfrm_login_username_d0sjourfhqrs'),
				'password' => $this->input->post('dwfrm_login_password')
			);
			$user_detail = $this->member_model->check_user_login($data);
			if($user_detail):
				//Redirect to account page
				redirect('home');
			else:
				$this->form_validation->set_message('dwfrm_login_username_d0sjourfhqrs','Please enter valid email;');
				$this->login();
			endif;
		endif;
	}

	public function user_login_popup(){

		$this->form_validation->set_rules('dwfrm_login_username_d0tjusaihued', 'email address', 'trim|required|valid_email');
		$this->form_validation->set_rules('dwfrm_login_password', 'Password', 'trim|required|min_length[8]|max_length[20]');

		if ($this->form_validation->run() == FALSE):
			$this->login_popup();
		else:
			$data = array(
		 		'email' => $this->input->post('dwfrm_login_username_d0tjusaihued'),
				'password' => $this->input->post('dwfrm_login_password')
			);
			$user_detail = $this->member_model->check_user_login($data);
			if($user_detail):
				//Redirect to account page
				redirect('home');
			else:
				$this->form_validation->set_message('dwfrm_login_username_d0tjusaihued','Please enter valid email;');
				$this->login_popup();
			endif;
		endif;
	}


	public function register(){
		if(isset($this->session->userdata['s_uid'])){
			redirect('home');
		} 
		
		$view_file_name = 'register_view';
		$data = '';
		$data['view_file_name'] = $view_file_name;
		$this->template->load_member_view($view_file_name , $data);
	}

	public function user_registration(){
		
		$this->form_validation->set_rules('dwfrm_profile_customer_email', 'Email', 'trim|required|valid_email|is_unique[register.email]');
		$this->form_validation->set_rules('dwfrm_profile_customer_emailconfirm', 'Confirm Email', 'trim|required|matches[dwfrm_profile_customer_email]');
		$this->form_validation->set_rules('dwfrm_profile_login_password', 'Password', 'trim|required|min_length[8]|max_length[20]');
		$this->form_validation->set_rules('dwfrm_profile_login_passwordconfirm', 'Confirm Password', 'trim|required|matches[dwfrm_profile_login_password]');
		$this->form_validation->set_rules('dwfrm_profile_customer_firstname', 'First Name', 'trim|required');
		$this->form_validation->set_rules('dwfrm_profile_customer_lastname', 'Last Name', 'trim|required');
		$this->form_validation->set_rules('dwfrm_profile_customer_birthday', 'Date of Birth', 'trim|required|callback_checkDateFormat');
		$this->form_validation->set_rules('dwfrm_profile_customer_customergender', 'Gender', 'trim|required');
		$this->form_validation->set_rules('dwfrm_profile_customer_zip', 'Zip Code', 'trim|required');

		if($this->form_validation->run() == FALSE):
   			$this->register();
  		else:
			$data = array(
				'fname' => $this->input->post('dwfrm_profile_customer_firstname'),
				'lname' => $this->input->post('dwfrm_profile_customer_lastname'),
				'email' => $this->input->post('dwfrm_profile_customer_email'),
				'password' => $this->input->post('dwfrm_profile_login_password'),
				'gender' => $this->input->post('dwfrm_profile_customer_customergender'),
				'postcode' => $this->input->post('dwfrm_profile_customer_zip'),
				'dob' => $this->input->post('dwfrm_profile_customer_birthday')
			);
   			$register_id = $this->member_model->register($data);
   			if($register_id):
   				redirect('member/login');
   			endif;
  		endif;
	}

	function checkDateFormat($date) {
				if (preg_match('/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$/',$date)):
			if(checkdate(substr($date, 3, 2), substr($date, 0, 2), substr($date, 6, 4))):
				return true;
			else:
				$this->form_validation->set_message('checkDateFormat','Please enter valid birth date.');
				return false;
			endif;
		else:
			$this->form_validation->set_message('checkDateFormat','Please enter valid birth date.');
			return false;
		endif;
	} 

	function logout(){
		$this->session->sess_destroy();
		redirect("home");
	}
}
