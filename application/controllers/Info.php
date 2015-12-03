<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Info extends CI_Controller {

	public function index()
	{
		$this->load->view('welcome_message');
	}
        
        public function terms_condition(){

            $data['view_file_name'] = 'terms-condition';
            $this->template->load_info_view('info/terms-condition');
        }
        public function policy(){
            $data['view_file_name'] = 'policy';
            $this->template->load_info_view('info/policy');
        }
        
        public function paymentmethods(){
             $data['view_file_name'] = 'paymentmethods';
            $data['curr_page_paymentmethods']= 'selected';
            $this->template->load_info_view('info/paymentmethods',$data);
        }
        
        public function faqs(){
            $data['view_file_name'] = 'faqs';
            $data['curr_page_faqs']= 'selected';
            $this->template->load_info_view('info/faqs',$data);
            
        }
        
        public function contactus(){
             $data['view_file_name'] = 'contactus';
            $data['curr_page_contactus']= 'selected';
            $this->template->load_info_view('info/contactus',$data);
            
        }
        
        public function contactusmessage(){
             $data['view_file_name'] = 'contactusmessage';
            $data['curr_page_contactus_message']= 'selected';
            $this->template->load_info_view('info/contactusmessage',$data);
            
        }
        
        public function diesel(){
             $data['view_file_name'] = 'diesel';
            $data['curr_page_diesel']= 'selected';
            $this->template->load_info_view('info/diesel',$data);
            
        }
        
        public function dieselkids(){
             $data['view_file_name'] = 'dieselkids';
            $data['curr_page_dieselkids']= 'selected';
            $this->template->load_info_view('info/dieselkids',$data);
            
        }
        
         public function shoppingsite(){
             $data['view_file_name'] = 'shoppingsite';
            $data['curr_page_shoppingsite']= 'selected';
            $this->template->load_info_view('info/shoppingsite',$data);
            
        }
        
        public function productpage(){
             $data['view_file_name'] = 'productpage';
            $data['curr_page_productpage']= 'selected';
            $this->template->load_info_view('info/productpage',$data);
            
        }
        
        public function shoppingcart(){
             $data['view_file_name'] = 'shoppingcart';
            $data['curr_page_shoppingcart']= 'selected';
            $this->template->load_info_view('info/shoppingcart',$data);
            
        }
}
