<?php

class Cart_model extends CI_Model{

	public function __construct()
    {
        // Call the Model constructor
        parent::__construct();

        //$this->load->library('productimage');
    }


/**
 * check if a product exists in database and set the product
 * param: sku, color code
 * return: boolean
 */

	//public function check_product($color, $barcode, $qty = 1, $style='', $cart_id = ''){
	/*public function check_product($p_color, $pid){
		  
        $returnVal = false;

        if(!empty($color) && empty($barcode)):

            $sql = "SELECT distinct barcode	 
					FROM prod_barcode 
					WHERE style='$style'
					AND color = '$color'";
                    
            $query  = $this->db->query($sql);
			var_dump($query);
			die();
            if($query->num_rows() != 1):
                exit;
            endif;
            
            $rec        = $query->result_array();
            $rec        = $rec[0];
            $subtotal   = $rec['price'];
            $user_id    = $this->session->userdata('session_id');
            $price_sale = (!empty($rec['price_sale']))? $rec['price_sale']:0;

            $cart_data = array(
                            'user_id'    => $user_id,
                            'product_id' => $rec['style'],
                            'prod_type'  => $rec['prod_type'],
                            'barcode'    => $rec['barcode'],
                            'color'      => $rec['color_code'],
                            'price'      => $rec['price'],
                            'price_sale' => $price_sale,
                            'qty'        => $qty,
                            'created_dt' => date('Y-m-d H:i:s'),
                        );



            $barcode = $rec['barcode'];
            $user_id = $this->session->userdata('session_id');

            if(!empty($cart_id)){

                $sql     = "SELECT cart_id FROM cart WHERE cart_id = '{$cart_id}' AND user_id = '{$user_id}'";
            
                $query  = $this->db->query($sql);
                
                $table = 'cart';

                if($query->num_rows() == 0){
                    $this->db->insert($table, $cart_data);
                    $returnVal = true;
                }else{
                    $this->db->where("cart_id", $cart_id);
                    $this->db->where("user_id", $user_id);
                    $this->db->update($table, $cart_data);
                    $returnVal = true;
                }

            }else{

                $sql     = "SELECT cart_id FROM cart WHERE barcode = '{$barcode}' AND user_id = '{$user_id}'";
            
                $query  = $this->db->query($sql);
                
                $table = 'cart';

                if($query->num_rows() == 0){
                    $this->db->insert($table, $cart_data);
                    $returnVal = true;
                }else{

                    $this->db->where("product_id", $style);
                    $this->db->where("user_id", $user_id);
                    $this->db->update($table, $cart_data);
                    $returnVal = true;
                }

            }
            
        endif;
                

        return $returnVal;
	}*/
	
	public function check_product($p_color, $pid){
		  
			$returnVal = false;
            $sql = "SELECT *
                    FROM prod_mast fm 
                    join prod_variation fv on fm.style = fv.style 
                    join prod_barcode fb on fb.style = fv.style AND fb.color = fv.attr_code
                    WHERE fm.style = '$pid' AND fb.color = '$p_color'";
                    
            $query  = $this->db->query($sql);
			
			if($query->num_rows() == 0):
                exit;
            endif;
			
			$rec        = $query->result_array();
            $rec        = $rec[0];
			
            //$subtotal   = $rec['price'];
            $subtotal   = '1298';
			$user_id    = '1001';
			$product_id	= $rec['style'];
			$prod_type	= 'jacket';	
			$barcode	= $rec['barcode'];
			$color		= $p_color;
			$price		= '1298';
			$qty 		= 1;
            
			$cart_data = array(
                            'user_id'    => $user_id,
                            'product_id' => $product_id,
                            'prod_type'  => $prod_type,
                            'code'    	 => $barcode,
                            'color'      => $color,
                            'price'      => $price,
                            //'price_sale' => $price_sale,
                            'qty'        => $qty,
                            'created_dt' => date('Y-m-d H:i:s'),
                        );
						
			//$barcode = $rec['barcode'];
            //$user_id = $this->session->userdata('session_id');
			$cart_id = '123545';

            if(!empty($cart_id)){

                $sql     = "SELECT cart_id FROM cart WHERE cart_id = '{$cart_id}' AND user_id = '{$user_id}'";
            
                $query  = $this->db->query($sql);
                
                $table = 'cart';

                if($query->num_rows() == 0){
                    $this->db->insert($table, $cart_data);
                    $returnVal = true;
                }else{
                    $this->db->where("cart_id", $cart_id);
                    $this->db->where("user_id", $user_id);
                    $this->db->update($table, $cart_data);
                    $returnVal = true;
                }

            }else{

                $sql     = "SELECT cart_id FROM cart WHERE barcode = '{$barcode}' AND user_id = '{$user_id}'";
            
                $query  = $this->db->query($sql);
                
                $table = 'cart';

                if($query->num_rows() == 0){
                    $this->db->insert($table, $cart_data);
                    $returnVal = true;
                }else{

                    $this->db->where("product_id", $style);
                    $this->db->where("user_id", $user_id);
                    $this->db->update($table, $cart_data);
                    $returnVal = true;
                }

            }
    
        return $returnVal;
	}
	
	public function show_cart(){
        $user_id    = '1001';
        $sql        = "SELECT * FROM cart WHERE user_id = '{$user_id}' limit 1";
        $query      = $this->db->query($sql);
        
        
        if($query->num_rows() != 0){
            
            $carts = $query->result_array();
				
			
            foreach ($carts as $cart_details) {
                
                
                $barcode = $cart_details['code'];
                $color   = $cart_details['color'];
                $qty     = $cart_details['qty'];

                $sql = "SELECT *
                        FROM prod_mast fm 
                        join prod_variation fv on fm.style = fv.style 
                        join prod_barcode fb on fb.style = fv.style AND fb.color = fv.attr_code
                        WHERE barcode = $barcode GROUP BY barcode";
                        //WHERE barcode = $barcode and price > 0 GROUP BY barcode";

                //echo "$sql";exit;
                        
                $query  = $this->db->query($sql);
                        
                if($query->num_rows() == 0):
                    exit;
                endif;
                $result     = $query->result_array();
				
				//echo "<pre>";
				//var_dump($result);
				//die();	
            	
                foreach ($result as $rec):

                    $name       = $rec['disp_name'];
                    $style      = $rec['style'];
                    $gender     = 'M';
                    //$width_code = $rec['width_name'];
                    $color_code = $rec['attr_code'];
                    //$prod_type  = $rec['prod_type'];
					$price 		= '1298';
                    
				/*
                    if($rec['prod_type'] == 'Footwear'){
                        $link  = product_link($prod_type, $gender, $name, $style, $color_code);
                        $image = $this->productimage->get_product_img($style, $name, $color_code, $type="IMAGE_LINK");
                    }else{
                        $link  = product_link($prod_type, $gender, $name, $style, $color_code);
                        $image = $this->productimage->get_apparel_img($style, $name, $color_code, $type="IMAGE_LINK");
                    }

                    if($rec['price_sale'] > 0){
                        $price = $rec['price_sale'];
                    }else{
                        $price = $rec['price'];
                    }

                    $total = $price * $qty;
                    $discount = 0;
                    if(isset($cart_details['discount']) && $cart_details['discount'] != 0){

                        if($cart_details['discount_type'] == "flat"){

                            $subtotal = $total - $cart_details['discount'];
                            $discount = $cart_details['discount'];

                        }else{

                            $subtotal = $total - (($cart_details['discount'] / 100) * $total);
                            $discount = (($cart_details['discount'] / 100) * $total);

                        }

                    }else{
                        $subtotal = $total;
                    }
                    
                    //$discount = number_format($discount, 2);
                    //$subtotal = number_format($subtotal, 2);
					*/
                    $product[] = array(
                                   // 'cart_id'       => $cart_details['cart_id'],
                                    'name'          => $name,
                                    'style'         => $style,
                                    'gender'        => $gender,
                                    //'description'   => $rec['prod_desc'],
                                    //'image'         => $image,
                                    //'link'          => $link,
                                    //'prodcode'      => $rec['style'],
                                    //'size'          => $rec['size'],
                                    //'sku'           => $rec['sku'],
                                    //'barcode'       => $rec['barcode'],
                                    'price_sale'    => $price,
                                    //'price'         => $rec['price'],
                                    //'promo_code'    => $cart_details['promo_code'],
                                    //'promo_string'  => $cart_details['promo_string'],
                                    //'coup_discount' => $discount,
                                    //'discount_type' => (!empty($cart_details['discount_type']))? $cart_details['discount_type']:'',
                                   // 'width'         => $width_code,
                                    'color'         => $color_code,
                                    //'subtotal'      => $subtotal,
                                    //'discount_amt'  => $discount,
                                    //'type'          => $rec['prod_type'],
                                    'qty'           => $qty
                                );
                    
                endforeach;
                        
                    
            }
            
            return $product;

        }else{
            return false;
        }
    }
}