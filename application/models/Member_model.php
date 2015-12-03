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
    	if($query->num_rows()){
    		return $query->row();
    	} else {
    		return false;
    	}
    }

} // end of model class

?>
