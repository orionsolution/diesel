<?php

class Member_model extends CI_Model {
	 public function __construct(){
        parent::__construct();
    }

    public function register($data){
    	$this->db->insert('register',$data);
    	$register_id = $this->db->insert_id();
    	return $register_id;
    }

    public function check_user_login($data){
    	$this->db->where('email',$data['email']);
    	$this->db->where('password',$data['password']);
    	$query = $this->db->get('register');
       
    	if($query->num_rows() > 0){ 
    		$result = $query->row();
            $data = array(
                's_uid'=>$result->user_id,
                's_fname'=>$result->fname,
                's_lname'=>$result->lname,
                's_email'=>$result->email
            );          
            $this->session->set_userdata($data);
            return $result;
    	} else {
    		return false;
    	}
    }

} // end of model class

?>
