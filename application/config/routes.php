<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/


// Ajax Product Route Rule
$route['product/ajax_load_products'] = "product/ajax_load_products";

//$route['product/(:any)/(:any)/(:any)/(:any)'] = "product/details/$1/$2/$3/$4";
$route['product/(:any)'] = "product/listing/$1";

// Sublisting Page Routes
$route['product/mens/t-shirts-and-tops'] = "product/sublisting/mens/tshirtsandtops";
$route['product/mens/sweat-shirts'] = "product/sublisting/mens/sweatshirts";
$route['product/mens/wallets-and-small-goods'] = "product/sublisting/mens/walletsandsmallgoods";
$route['product/mens/other-accessories'] = "product/sublisting/mens/otheraccessories";

// women
$route['product/womens/sweat-shirts'] = "product/sublisting/womens/sweatshirts";
$route['product/womens/t-shirts-and-tops'] = "product/sublisting/womens/tshirtsandtops";
$route['product/womens/wallets-and-small-goods'] = "product/sublisting/womens/walletsandsmallgoods";
$route['product/womens/other-accessories'] = "product/sublisting/womens/otheraccessories";

// Filter routing rules

$route['product/(:any)/(:any)/filter'] = "product/filter/$1/$2";
$route['product/(:any)/(:any)/(:any)/filter'] = "product/filter/$1/$2/$3";

$route['product/(:any)/(:any)'] = "product/sublisting/$1/$2";
$route['product/(:any)/(:any)/(:any)'] = "product/sublisting/$1/$2/$3";




// Search Page Routes

$route['show_search'] = "product/show_search";






$route['product/(:any)/(:any)/(:any)/(:any)'] = "product/details/$1/$2/$3/$4";
$route['default_controller'] = 'home';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

