<?php
//$products = simplexml_load_string($data);
set_time_limit ( 0 );
include_once "server.php";


 $xml_file = "diesel_master_catalog_20150826.xml";
 if (file_exists($xml_file)) {
    $xml = simplexml_load_file($xml_file);   
    /*echo "<pre>"  ;
     print_r($xml);
    echo "<pre>"  ;
    exit;*/
	 
} else {
    exit('Failed to open test.xml.');
}


if(count($xml->product) > 0):
	echo "<br> count = ".count($xml->product);	
	$i=1;	
	foreach($xml->product as $curr_product) {				
		$prodid=(string)$curr_product['product-id'];
		if(!is_numeric($prodid)):
			echo "<br> $prodid is Style"; 
			parse_style($curr_product);
			echo "<br>----------------------------- end of Style<br>";
		else:
			echo "<br> --- $prodid is barcode"; 
			parse_barcode($curr_product);
			echo "<br>----------------------------- end of barcode<br>";
		endif;
	}
endif;	

function parse_barcode($curr_product){
	$prodid=(string)$curr_product['product-id'];
	echo"<br> Current Barcode : $prodid";

	foreach($curr_product->{'custom-attributes'}->{'custom-attribute'} as $curr_attribute) :
		$attr_id=(string)$curr_attribute['attribute-id'];	
		$attr_val=$curr_attribute;
		echo "<br>--------- $attr_id : $attr_val ";

		/*$sql = "Update prod_barcode set $attr_id='$attr_val'
				where barcode = '$prodid'";
		mysql_query($sql);
		echo "<br>SQL : $sql";*/
	endforeach;
		
}


function parse_style($curr_product){

	$prodid=(string)$curr_product['product-id'];
	echo"<br> Current Style : $prodid";

	$min_order_qty 		=$curr_product->{'min-order-quantity'};
	$disp_name			=$curr_product->{'display-name'};
	$short_desc			=$curr_product->{'short-description'};
	$short_desc			=mysql_real_escape_string($short_desc);
	$long_desc			=$curr_product->{'long-description'};	
	$long_desc			=mysql_real_escape_string($long_desc);
	$online_flag		=$curr_product->{'online-flag'};
	if($online_flag == 'true')
	{
		$online_flag ='Yes';
	}else{
		$online_flag ='No';
	}
	$available_flag		=$curr_product->{'available-flag'};
		if($available_flag == 'true')
		{
			$available_flag ='Yes';
		}else{
			$available_flag ='No';
		}
	$searchable_flag	=$curr_product->{'searchable-flag'};
		if($searchable_flag == 'true')
		{
			$searchable_flag ='Yes';
		}else{
			$searchable_flag ='No';
		}
	$page_title = $curr_product->{'page-attributes'}->{'page-title'};

	echo "<br>---------min_order_qty  ---- $min_order_qty";
	echo "<br>---------disp_name      ---- $disp_name";
	echo "<br>---------short_desc     --- $short_desc";
	echo "<br>---------long_desc      --- $long_desc";
	echo "<br><br>---------online_flag  ---- $online_flag";
	echo "<br>---------available_flag --- $available_flag";
	echo "<br>---------searchable_flag --- $searchable_flag";
	echo "<br>---------page_title          $page_title ";
	echo"<br> Images :";

	$sql = "INSERT INTO prod_mast(style,min_order_qty,disp_name,short_desc,long_desc,online_flag,available_flag,searchable_flag,page_title) values ('$prodid','$min_order_qty','$disp_name','$short_desc','$long_desc','$online_flag','$available_flag','$searchable_flag','$page_title')";
	mysql_query($sql);
	echo "<br><br>SQL : $sql<br><br>";

	foreach($curr_product->images->{'image-group'} as $curr_image) :
		$variation_value=(string)$curr_image['variation-value'];		
			foreach($curr_image->image as $image):

				$path=(string)$image['path'];
				echo "<br> $variation_value - $path ";
				$sql = "INSERT INTO prod_images(style,variation_code,image_path) values ('$prodid','$variation_value','$path')";
				mysql_query($sql);
				echo "<br><br>SQL : $sql<br><br>";
			endforeach; 
	endforeach;

	$i=1;
	foreach($curr_product->{'custom-attributes'}->{'custom-attribute'} as $curr_attribute):
		//$curr_attribute		=$curr_attribute->{'custom-attribute'};
		$custom_attribute_id=(string)$curr_attribute['attribute-id'];
		/*echo "<br>curr_attribute ------------- $curr_attribute ";	
		echo "<br>custom_attribute_id ------------- $custom_attribute_id ";*/	
		$sql = "INSERT INTO prod_attributes(style,attr_id,attr_value) values ('$prodid','$curr_attribute','$custom_attribute_id')";
		mysql_query($sql);		
		echo "<br><br>SQL : $sql<br><br>";
	endforeach;	

	foreach($curr_product->{'variations'}->{'attributes'}->{'variation-attribute'} as $curr_var_attribute):
		$var_attribute_id=(string)$curr_var_attribute['attribute-id'];			
		foreach($curr_var_attribute->{'variation-attribute-values'}->{'variation-attribute-value'} as $curr_var_value):
			$var_attribute_value=(string)$curr_var_value['value'];			
			$var_attribute_disp_value=$curr_var_value->{'display-value'};	

			echo "<br>var_attribute_value ------------- $var_attribute_value ";	
			echo "<br>var_attribute_disp_value ------------- $var_attribute_disp_value ";	
			$sql = "INSERT INTO prod_variation(style,attr_type,attr_code,attr_value) values ('$prodid','$var_attribute_id','$var_attribute_value','$var_attribute_disp_value')";
			mysql_query($sql);
			echo "<br><br>SQL : $sql<br><br>";		
		endforeach;
	endforeach;

	foreach($curr_product->{'variations'}->{'variants'}->{'variant'} as $curr_variant):		
		$prod_var_id=(string)$curr_variant['product-id'];	

		echo "<br> variant ------------ $prod_var_id"	;
		$sql = "INSERT INTO prod_barcode(style,barcode,color,size,microcolor,macrocolor) values ('$prodid','$prod_var_id','','','','')";
		mysql_query($sql);
		echo "<br><br>SQL : $sql<br><br>";
	endforeach;
}	
?>