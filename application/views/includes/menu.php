<?php
  $menu_arr=array("denim"=>array(
            "men_explore_by_fit"=>array("Skinny","Tapered","Straight","Carrot","Bootcut"),
            "men_explore_by_wash"=>array("Clean","Coated","Destroyed","Medium Treated","Treated"),
            "men_explore"=>array("New Arrivals","Online Exclusives","Bestsellers"),
            "women_explore_by_fit"=>array("Jegging","Super Skinny","Skinny","Straight","Boyfriend","Bootcut","Flare"),
            "women_explore_by_wash"=>array("Clean","Coated","Destroyed","Medium Treated","Treated"),
            "women_explore"=>array("New Arrivals","Online Exclusives","Bestsellers"),
            ),
          "men"=>array(
            "denim_clothing"=>array("Denim","JoggJeans","Jackets","Pants","Shirts","Sweatshirts","Sweaters","Polos","Tshirts","Underwear","Beachwear"),
            "shoes_accessories"=>array("Shoes","Bags","Wallets","Belts","Other Accessories","Eyewear","Watches","Fragrance","Technology","Jewelry"),
            "explore"=>array("Shop by Look","New Arrivals","Online Exclusives","Bestsellers"),
            ),
          "women"=>array(
            "denim_clothing"=>array("Denim","JoggJeans","Dresses","Jumpsuits","Jackets","Pants","Shirts","Sweatshirts","Skirts","Sweaters","Tshirts","Underwear"),
            "shoes_accessories"=>array("Shoes","Bags","Wallets","Belts","Other Accessories","Eyewear","Watches","Fragrance","Technology"),
            "explore"=>array("Shop by Look","New Arrivals","Online Exclusives","Bestsellers"),
            ),
          "kids"=>array(
            "boys_infant"=>array("Denim","Clothing","Accessories"),
            "boys_junior"=>array("Denim","Clothing","Accessories"),
            "girls_infant"=>array("Denim","Clothing","Accessories"),
            "girls_junior"=>array("Denim","Clothing","Accessories"),
            ),
        );
?>
<header>
  <div class="utility-holder clearfix ">
    <ul class="menu-utility col-lg-4 col-md-4">
      <li class="ship_to">
        <h4>
            <a class="shipto-link" href="javascript:void(0);" >SHIP TO: <span class="ship_to_value">UNITED STATES</span><span class="ship_to_flag"></span></a>
        </h4>
      </li>

      <li class="seprator store-loca">
        <h4>
        <a href="/storelocator" target="_blank" title="Store Locator">
        Store Locator
        </a>
        </h4>
      </li>

    </ul>
          <div class="header-banner sprite-icon col-lg-4 col-md-4" id="header-banner-title">
            <div class="slider" id="marketing_message">
              <div>

                <div data-slotid="header-marketing-banner-1" class="html-slot-container">

                  <div>

                    <div class="pannel" data-desc="Free Ground Shipping on All Orders. The promotion will be applied automatically at check out." data-title="FREE GROUND SHIPPING ON ALL ORDERS!">
                      <h7>FREE GROUND SHIPPING ON ALL ORDERS!</h7>
                    </div>

                  </div>

                </div>
              </div>
              <div>

                <div data-slotid="header-marketing-banner-2" class="html-slot-container">

                  <div>

                    <div class="pannel" data-desc="Free Returns on all orders. &lt;a href=&quot;http://shop.diesel.com/cms/help/returns.html&quot&gt;CLICK HERE&lt;/a&gt; to get more details" data-title="EASY &amp; FREE RETURNS!">
                      <h7>EASY &amp; FREE RETURNS</h7>
                    </div>

                  </div>

                </div>
              </div>
              <div>

                <div data-slotid="header-marketing-banner-3" class="html-slot-container">

                  <div>

                    <div class="pannel" data-desc="Create an account at shop.diesel.com. Enjoy 15% off your first online order. &lt;a href=&quot;http://shop.diesel.com/online-register&quot&gt;REGISTER HERE&lt;/a&gt;, you'll get your coupon code via email." data-title="REGISTER FOR EXCLUSIVE BENEFITS">
                      <h7>REGISTER FOR EXCLUSIVE BENEFITS</h7>
                    </div>

                  </div>

                </div>
              </div>
              <div>

              </div>
              <div>

              </div>
              <div>

              </div>
            </div>
          </div>
          <div class="menu-utility-user-wrap col-lg-4 col-md-4">
            <ul class="menu-utility-user">

              <input type="hidden" id="isUserLogin" value="false" />
              <li class="myacc">
                <h4>
            
            <a href="<?=base_url();?>member/login" class="user-account">
            Log In / Register
            
             </a>
            <div style="display: none;">
                <ul class="header-myacc-drop">
                    <li class="first">
                     <a title="Login" href="<?=base_url();?>login.html" class="user-login ">
                    Log In
                     </a>       
                    </li>
                
                    <li>
                         <a title="Register" href="<?=base_url('member/register');?>" class="user-register">
                            Register
                        </a>            
                    </li>
                
                </ul>
            </div>
             
             </h4>

              </li>

              <li class="last help">

                <h4>
<a class="help-link" href="javascript:void(0);" title="Help">
Help
</a>
</h4>

              </li>
            </ul>
          </div>
        </div>
        <div class="store-ship" style="height:0px ;overflow:hidden; float:left; width: 100%;">

          <div class="content-asset">
            <!-- dwMarker="content" dwContentID="bcoNIiaaiMuvAaaadnQlZrDMYt" -->

            <div class="desktop-reg">
              <div class="change">
                <h1>ONLINE STORES:</h1>
                <div id="wrapper-ship">
                  <div class="thin">
                    <ul class="main-nation">
                      <li class="main-country">AMERICAS
                        <ul class="sub-nation">
                          <li class="active"><a href="#">United States</a>
                          </li>
                        </ul>
                      </li>
                      <li class="main-country columnbreak ">ASIA
                        <ul class="sub-nation">
                          <li><a href="#">Japan</a>
                          </li>
                        </ul>
                      </li>
                      <li class="main-country">EUROPE
                        <ul class="sub-nation">
                          <li><a href="#">Austria</a>
                          </li>
                          <li><a href="#/be">Belgium</a>
                          </li>
                          <li><a href="#/bg">Bulgaria</a>
                          </li>
                          <li><a href="#/hr">Croatia</a>
                          </li>
                          <li><a href="#/cz">Czech Republic</a>
                          </li>
                          <li><a href="#/dk">Denmark</a>
                          </li>
                          <li><a href="#/ee">Estonia</a>
                          </li>
                          <li><a href="#/fi">Finland</a>
                          </li>
                          <li><a href="#/fr">France</a>
                          </li>
                          <li><a href="#/de">Germany</a>
                          </li>
                          <li><a href="#/gr">Greece</a>
                          </li>
                          <li><a href="#/hu">Hungary</a>
                          </li>
                          <li><a href="#/ie">Ireland</a>
                          </li>
                          <li><a href="#/it">Italy</a>
                          </li>
                          <li><a href="#/nl">Netherlands</a>
                          </li>
                          <li><a href="#/no">Norway</a>
                          </li>
                          <li><a href="#/pl">Poland</a>
                          </li>
                          <li><a href="#/pt">Portugal</a>
                          </li>
                          <li><a href="#/ro">Romania</a>
                          </li>
                          <li><a href="#/ru">Russian Federation</a>
                          </li>
                          <li><a href="#/sk">Slovakia</a>
                          </li>
                          <li><a href="#/si">Slovenia</a>
                          </li>
                          <li><a href="#/es">Spain</a>
                          </li>
                          <li><a href="#/se">Sweden</a>
                          </li>
                          <li><a href="#/ch">Switzerland</a>
                          </li>
                          <li><a href="#/tr">Turkey</a>
                          </li>
                          <li><a href="#/ua">Ukraine</a>
                          </li>
                          <li><a href="#/gb">United Kingdom</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
              <div class="fixed">
                <ul class="main-nation">
                  <li>EXPLORE:
                    <ul class="sub-nation-1">
                      <li><a href="http://www.diesel.com">Australia</a>
                      </li>
                      <li><a href="http://www.diesel.com">Brazil</a>
                      </li>
                      <li><a href="http://www.diesel.com">Canada</a>
                      </li>
                      <li><a href="http://www.dieselchina.com.cn/">China</a>
                      </li>
                      <li><a href="http://www.diesel.com">All Other Countries</a>
                      </li>

                    </ul>
                  </li>
                </ul>
              </div>

            </div>

            <div class="mobile-reg">
              <h1>SHIP TO</h1>
              <div class="current-cou">Your current ship to country is :</div>
              <div class="default"><a href="http://production-shop-diesel.demandware.net/s/DieselUS/home">United States</a>
              </div>
              <h3>CHOOSE YOUR COUNTRY:</h3>
              <div id='cssmenu'>
                <ul>
                  <li><a href='http://google.com'><span>AMERICAS</span></a>
                    <ul>
                      <li><a href="http://production-shop-diesel.demandware.net">United States</a>
                      </li>
                    </ul>
                  </li>
                  <li><a href='http://google.com'><span>ASIA</span></a>
                    <ul>
                      <li><a href="http://store.diesel.co.jp/jp">JAPAN</a>
                      </li>
                    </ul>
                  </li>
                  <li><a href='http://google.com'><span>EUROPE</span></a>
                    <ul>
                      <li><a href="#/at">Austria</a>
                      </li>
                      <li><a href="#/be">Belgium</a>
                      </li>
                      <li><a href="#/bg">Bulgaria</a>
                      </li>
                      <li><a href="#/hr">Croatia</a>
                      </li>
                      <li><a href="#/cz">Czech Republic</a>
                      </li>
                      <li><a href="#/dk">Denmark</a>
                      </li>
                      <li><a href="#/ee">Estonia</a>
                      </li>
                      <li><a href="#/fi">Finland</a>
                      </li>
                      <li><a href="#/fr">France</a>
                      </li>
                      <li><a href="#/de">Germany</a>
                      </li>
                      <li><a href="#/gr">Greece</a>
                      </li>
                      <li><a href="#/hu">Hungary</a>
                      </li>
                      <li><a href="#/ie">Ireland</a>
                      </li>
                      <li><a href="#/it">Italy</a>
                      </li>
                      <li><a href="#/nl">Netherlands</a>
                      </li>
                      <li><a href="#/no">Norway</a>
                      </li>
                      <li><a href="#/pl">Poland</a>
                      </li>
                      <li><a href="#/pt">Portugal</a>
                      </li>
                      <li><a href="#/ro">Romania</a>
                      </li>
                      <li><a href="#/ru">Russian Federation</a>
                      </li>
                      <li><a href="#/sk">Slovakia</a>
                      </li>
                      <li><a href="#/si">Slovenia</a>
                      </li>
                      <li><a href="#/es">Spain</a>
                      </li>
                      <li><a href="#/se">Sweden</a>
                      </li>
                      <li><a href="#/ch">Switzerland</a>
                      </li>
                      <li><a href="#/tr">Turkey</a>
                      </li>
                      <li><a href="#/ua">Ukraine</a>
                      </li>
                      <li><a href="#/gb">United Kingdom</a>
                      </li>
                    </ul>
                  </li>

                  <li class="no-bag-mobile"><a href='http://google.com'><span>EXPLORE</span></a>
                    <ul>
                      <li><a href="http://www.diesel.com">Australia</a>
                      </li>
                      <li><a href="http://www.diesel.com">Brazil</a>
                      </li>
                      <li><a href="http://www.diesel.com">Canada</a>
                      </li>
                      <li><a href="http://www.dieselchina.com.cn/">China</a>
                      </li>
                      <li><a href="http://www.diesel.com">All Other Countries</a>
                      </li>

                    </ul>
                </ul>
              </div>
            </div>
          </div>
          <!-- End content-asset -->

        </div>
        <div class="floating-nav-wrapper">
          <div class="floating-nav-topcontainer">
            <span class="cross_icon"></span>
            <div class="inner"></div>
          </div>
          <div class="floating-nav clearfix">

            <div class='top-nav-holder clearfix '>
              <div class="primary-logo col-lg-3 col-md-2 col-sm-7">
                <a class="header-menu-icon" href="javascript:void(0);"><small class="header-menu-icon-inner">menu</small></a>
                <a class="brand-logo" href="<?=base_url();?>">
                                    <img src="<?=base_url();?>images/logo.png" alt="Diesel">
                                    <span>Diesel</span>
                                </a>
              </div>
              <div class="rgt-content-wrap col-lg-3 col-md-2 col-sm-5">
                <div class="rgt-content">

                  <div class="elements mini-cart-holder" id="cartpage">

                    <!-- Report any requested source code -->

                    <!-- Report the active source code -->

                    <div class="bag-holder">

                      <a href="#" title="Go to My Bag" class="mini-cart-link">

                        <span id="mini-cart-icon-empty" class='header-mini-cart empty-black-bag'>Empty Bag</span>

                        <span class="empty-bag-count">Bag Count</span>

                      </a>

                      <div class="minicart-tool-tip">

                      </div>

                    </div>

                    <div class="mini-bag-content container-fluid  pageName" data-pagename="Mini Cart">
                      <div class="row">
                        <div class="col-lg-8 col-md-6 mini-cart-products empty-cart-wrapper">
                          <div class="left-text-block">
                            <h2 class="heading-txt">Feed me I'm hungry </h2>

                          </div>

                        </div>
                        <div class="col-lg-4 col-md-6 mini-cart-totals">
                          <h2 class="heading-txt">SHOPPING BAG</h2>
                          <div class="seperator">
                          </div>
                          <P class="item-section">
                            0 Item
                          </P>

                          <div class="mini-cart-button clearfix">
                            <a class="primary-button red viewCart viewBag" href="#" title="Continue Shopping ">Continue Shopping </a>
                          </div>
                        </div>
                      </div>
                      <div class="row"><span class="ipad_cross_icon"></span>
                      </div>
                    </div>

                    <div class="rtaminicart" data-rtaCart="" data-rtaCartSku="" data-rtaCartAmounts="" data-rtaCartQuantities="" data-rtaSpecial="" data-rtaTags=""></div>

                  </div>

                  <div class="elements header-search active-search" style="cursor: pointer;">
                    <h4 class="search-btn" title="Search">Search</h4>
                    <h4 class="close-btn" style="display:none;">Close</h4>
                  </div>
                  <div class="header-search-content container-fluid">
                    <div id="search" class="search-header">

                      <form role="search" action="#" method="get" name="simpleSearch">
                        <fieldset>
                          <div class="search-input">
                            <span class="search-icon">
                    </span>
                            <span class="search-txt">SEARCH:</span>
                            <span class="search-message">
                        <span class="search-message-content">What are You looking for?</span>
                            </span>
                            <span class="search-btn">
                         <input type="submit" value="enter" class="new-sprite" />
                    </span>
                            <span class="search-inputbox">
                        <input type="text" id="q" name="q" value="" />
                    </span>
                          </div>
                        </fieldset>
                      </form>

                      <div class="search-list trending-search">
                        <div class="content-head">
                          Trending Searches
                        </div>
                        <div class="search-listitems trending-content">
                          <ul>

                            <li style="display:none;">
                              <a href="#">
                                        timeframe
                                    </a>
                            </li>

                            <li style="display:none;">
                              <a href="#">
                                        watches
                                    </a>
                            </li>

                            <li style="display:none;">
                              <a href="#">
                                        jogg jeans
                                    </a>
                            </li>

                            <li style="display:none;">
                              <a href="#">
                                        denim
                                    </a>
                            </li>

                            <li class='columnbreak' style="display:none;">
                              <a href="#">
                                        shoes
                                    </a>
                            </li>

                            <li style="display:none;">
                              <a href="#">
                                        kids
                                    </a>
                            </li>

                            <li style="display:none;">
                              <a href="#">
                                        man
                                    </a>
                            </li>

                            <li style="display:none;">
                              <a href="#">
                                        woman
                                    </a>
                            </li>

                            <li style="display:none;">
                              <a href="#">
                                        sale
                                    </a>
                            </li>

                            <li class='columnbreak' style="display:none;">
                              <a href="#">
                                        boys
                                    </a>
                            </li>

                            <li style="display:none;">
                              <a href="#">
                                        girls
                                    </a>
                            </li>

                          </ul>
                        </div>
                      </div>

                      <div class="search-suggestion">

                      </div>
                      <div class="outer-sec-cross-icon">
                        <div class="tab-cross-icon"></div>
                        <div class="tab-cross-text cursor">close</div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
              <div id="navigation" role="navigation">
                <nav>
                  <h2 class="visually-hidden navigation-header">Catalog Navigation</h2>
                  <div class="header-menus">

                    <ul class="menu-category level-1 desktop-only">

                      <li id="diesel-denim" class=first>

                        <h4><a  href='#' class="level-1">
                          <span class="s-diesel-denim s-catflytemp2" >DENIM</span>
                          <div class="s-diesel-denim s-catflytemp2 main-nav-arr"></div>
                          </a>
                        </h4>
                        <div class="level-2 s-catflytemp7 container-fluid">
                          <ul class="level-2 row clearfix">

                            <li class='col-md-6 sub-category-list diesel-man-features-denimguide  first active'>
                              <div class="sub-menus row">
                                <div class="white-bg col-md-12 col-lg-8">
                                  <h2>
                                    MEN
                                  </h2>
                                  <div class="level-3 clearfix">
                                    <ul class="level-3">

                                      <li class="s-catflytemp2 col-md-6">

                                        <a class="unclickable">
                                          SHOP BY FIT
                                        </a>

                                        <div class='level-4 '>
                                          <ul class="level-4">
                                            <?php 
                                              foreach($menu_arr['denim']['men_explore_by_fit'] as $cat):
                                                  $cat_href=base_url()."producttest/sublisting/mens/".str_replace(" ","_",$cat)."/";
                                                  $cat_href = strtolower($cat_href);
                                                  $cat_lower=strtolower($cat);
                                                  echo "<li>
                                                        <a data-catId='diesel-man-features-denimguide-fits-$cat_lower' href='$cat_href'>$cat</a>
                                                      </li>";
                                              endforeach;
                                            ?>


                                            <li class="see-all-link">
                                              <p><a href="#">SHOP ALL</a>
                                              </p>
                                            </li>

                                          </ul>
                                        </div>

                                      </li>

                                      <li class="s-catflytemp2 col-md-6">

                                        <a class="unclickable">
                                        SHOP BY WASH
                                        </a>

                                        <div class='level-4 '>
                                          <ul class="level-4">

                                            <li>

                                              <a data-catId="diesel-man-features-denimguide-washstories-clean" href="#">

                                                Clean
                                                </a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-man-features-denimguide-washstories-coated" href="#">

Coated
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-man-features-denimguide-washstories-destroyed" href="#">

Destroyed
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-man-features-denimguide-washstories-mediumtreated" href="#">

Medium Treated
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-man-features-denimguide-washstories-treated" href="#">

Treated
</a>
                                            </li>

                                            <li class="see-all-link">
                                              <p><a href="#">SHOP ALL</a>
                                              </p>
                                            </li>

                                          </ul>
                                        </div>

                                      </li>

                                    </ul>
                                  </div>
                                </div>

                                <div class="grey-bg-denim col-md-12 col-lg-4">
                                  <ul class=" level-3 level-3-grey_cols">

                                    <li class="s-catflytemp2">
                                      <a class="unclickable">SHOP BY</a>
                                      <ul>

                                        <li>

                                          <a data-catId="diesel-denim-man-features-NA" href='#'>

                                            <span>New Arrivals</span>
                                          </a>
                                        </li>

                                        <li>

                                          <a data-catId="diesel-denim-man-features-OE" href='#'>

                                            <span>Online Exclusives</span>
                                          </a>
                                        </li>

                                        <li>

                                          <a data-catId="diesel-denim-man-features-bestsellers" href='#'>

                                            <span>Bestsellers</span>
                                          </a>
                                        </li>

                                      </ul>
                                    </li>

                                  </ul>
                                </div>
                              </div>
                            </li>

                            <li class='col-md-6 sub-category-list diesel-woman-features-denimguide last inactive'>
                              <div class="sub-menus row">
                                <div class="white-bg col-md-12 col-lg-8">
                                  <h2>
WOMEN
</h2>
                                  <div class="level-3 clearfix">
                                    <ul class="level-3">

                                      <li class="s-catflytemp2 col-md-6">

                                        <a class="unclickable">
SHOP BY FIT
</a>

                                        <div class='level-4 '>
                                          <ul class="level-4">

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-fits-jegging" href="#">

Jegging
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-fits-superskinny" href="#">

Super Skinny
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-fits-skinny" href="#">

Skinny
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-fits-regular-straight" href="#">

Straight
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-fits-boyfriend" href="#">

Boyfriend
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-fits-bootcut" href="#">

Bootcut
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-fits-flare" href="#">

Flare
</a>
                                            </li>

                                            <li class="see-all-link">
                                              <p><a href="#">SHOP ALL</a>
                                              </p>
                                            </li>

                                          </ul>
                                        </div>

                                      </li>

                                      <li class="s-catflytemp2 col-md-6">

                                        <a class="unclickable">
SHOP BY WASH
</a>

                                        <div class='level-4 '>
                                          <ul class="level-4">

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-washstories-clean" href="#">

Clean
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-washstories-coated" href="#">

Coated
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-washstories-destroyed" href="#">

Destroyed
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-washstories-mediumtreated" href="#">

Medium Treated
</a>
                                            </li>

                                            <li>

                                              <a data-catId="diesel-woman-features-denimguide-washstories-treated" href="#">

Treated
</a>
                                            </li>

                                            <li class="see-all-link">
                                              <p><a href="#">SHOP ALL</a>
                                              </p>
                                            </li>

                                          </ul>
                                        </div>

                                      </li>

                                    </ul>
                                  </div>
                                </div>

                                <div class="grey-bg-denim col-md-12 col-lg-4">
                                  <ul class=" level-3 level-3-grey_cols">

                                    <li class="s-catflytemp2">
                                      <a class="unclickable">SHOP BY</a>
                                      <ul>

                                        <li>

                                          <a data-catId="denim-newseason-women" href='#'>

                                            <span>New Arrivals</span>
                                          </a>
                                        </li>

                                        <li>

                                          <a data-catId="denim-newseason-women-onlineexclusive" href='#'>

                                            <span>Online Exclusives</span>
                                          </a>
                                        </li>

                                        <li>

                                          <a data-catId="denim-newseason-women-bestsellers" href='#'>

                                            <span>Bestsellers</span>
                                          </a>
                                        </li>

                                      </ul>
                                    </li>

                                  </ul>
                                </div>
                              </div>
                            </li>

                          </ul>

                          <ul class="highlights-category row">

                            <li class="category-higlight col-md-6">
                              <ul class="desktop-only bottom-section">

                                <li class="col-md-4 highlight-items">
                                  <div class="img-container ">

                                    <a data-catId="diesel-man-denim-highlights-newstyle" href='#'>





                                                                            <img alt="New Style: Taylhor" src='<?=base_url();?>images/01_STIKKER.jpg' />

                                                                        </a>
                                  </div>
                                  <div class="txt-content">

                                    <a data-catId="diesel-man-denim-highlights-newstyle" href='#'>

New Style: Taylhor</isprint></a>
                                  </div>
                                </li>

                                <li class="col-md-4 highlight-items">
                                  <div class="img-container ">

                                    <a data-catId="diesel-man-denim-highlights-joggjeans" href='#'>





                                                                            <img alt="JoggJeans" src='<?=base_url();?>images/02_JOOGJEANS.jpg' />

                                                                        </a>
                                  </div>
                                  <div class="txt-content">

                                    <a data-catId="diesel-man-denim-highlights-joggjeans" href='#'>

JoggJeans</isprint></a>
                                  </div>
                                </li>

                                <li class="col-md-4 highlight-items">
                                  <div class="img-container ">

                                    <a data-catId="diesel-man-denim-highlights-newdenim" href='#'>





                                                                            <img alt="New Denim FW15" src='<?=base_url();?>images/03_DENIM-MALE.jpg' />

                                                                        </a>
                                  </div>
                                  <div class="txt-content">

                                    <a data-catId="diesel-man-denim-highlights-newdenim" href='#'>

New Denim FW15</isprint></a>
                                  </div>
                                </li>

                              </ul>
                              <div class="mobile-only">
                                <div class="txt-items col-md-6">
                                  <h2>HIGHLIGHTS </h2>

                                  <div class="txt-content">

                                    <a data-catId="diesel-man-denim-highlights-newstyle" href='#'>

New Style: Taylhor</isprint></a>
                                  </div>

                                  <div class="txt-content">

                                    <a data-catId="diesel-man-denim-highlights-joggjeans" href='#'>

JoggJeans</isprint></a>
                                  </div>

                                  <div class="txt-content">

                                    <a data-catId="diesel-man-denim-highlights-newdenim" href='#'>

New Denim FW15</isprint></a>
                                  </div>

                                </div>
                                <div class="img-items col-md-6">

                                  <div class="img-container">

                                    <a data-catId="diesel-man-denim-highlights-newstyle" href='#'>





                                                                            <img class="primary-image2 " src="<?=base_url();?>images/01_STIKKER.jpg" alt="New Style: Taylhor" />

                                                                        </a>
                                  </div>

                                  <div class="img-container">

                                    <a data-catId="diesel-man-denim-highlights-joggjeans" href='#'>





                                                                            <img class="primary-image2 " src="<?=base_url();?>images/02_JOOGJEANS.jpg" alt="JoggJeans" />

                                                                        </a>
                                  </div>

                                  <div class="img-container">

                                    <a data-catId="diesel-man-denim-highlights-newdenim" href='#'>





                                                                            <img class="primary-image2 " src="<?=base_url();?>images/02_JOOGJEANS.jpg" alt="New Denim FW15" />

                                                                        </a>
                                  </div>

                                </div>
                              </div>
                            </li>

                            <li class="category-higlight col-md-6">
                              <ul class="desktop-only bottom-section">

                                <li class="col-md-4 highlight-items">
                                  <div class="img-container ">

                                    <a data-catId="diesel-woman-denim-highlights-newstyle" href='#'>





                                                                            <img alt="New Style: Actyvista" src='<?=base_url();?>images/04_ACTYVISTA.jpg' />

                                                                        </a>
                                  </div>
                                  <div class="txt-content">

                                    <a data-catId="diesel-woman-denim-highlights-newstyle" href='#'>

New Style: Actyvista</isprint></a>
                                  </div>
                                </li>

                                <li class="col-md-4 highlight-items">
                                  <div class="img-container ">

                                    <a data-catId="diesel-woman-denim-highlights-joggjeans" href='#'>





                                                                            <img alt="JoggJeans" src='<?=base_url();?>images/05_JOGGJEANS.jpg' />

                                                                        </a>
                                  </div>
                                  <div class="txt-content">

                                    <a data-catId="diesel-woman-denim-highlights-joggjeans" href='#'>

JoggJeans</isprint></a>
                                  </div>
                                </li>

                                <li class="col-md-4 highlight-items">
                                  <div class="img-container ">

                                    <a data-catId="diesel-woman-denim-highlights-newdenim" href='#'>





                                                                            <img alt="New Denim FW15" src='<?=base_url();?>images/03_DENIM-MALE.jpg' />

                                                                        </a>
                                  </div>
                                  <div class="txt-content">

                                    <a data-catId="diesel-woman-denim-highlights-newdenim" href='#'>

New Denim FW15</isprint></a>
                                  </div>
                                </li>

                              </ul>
                              <div class="mobile-only">
                                <div class="txt-items col-md-6">
                                  <h2>HIGHLIGHTS </h2>

                                  <div class="txt-content">

                                    <a data-catId="diesel-woman-denim-highlights-newstyle" href='#'>

New Style: Actyvista</isprint></a>
                                  </div>

                                  <div class="txt-content">

                                    <a data-catId="diesel-woman-denim-highlights-joggjeans" href='#'>

JoggJeans</isprint></a>
                                  </div>

                                  <div class="txt-content">

                                    <a data-catId="diesel-woman-denim-highlights-newdenim" href='#'>

New Denim FW15</isprint></a>
                                  </div>

                                </div>
                                <div class="img-items col-md-6">

                                  <div class="img-container">

                                    <a data-catId="diesel-woman-denim-highlights-newstyle" href='#'>





                                                                            <img class="primary-image2 " src="<?=base_url();?>images/04_ACTYVISTA.jpg" alt="New Style: Actyvista" />

                                                                        </a>
                                  </div>

                                  <div class="img-container">

                                    <a data-catId="diesel-woman-denim-highlights-joggjeans" href='#'>





                                                                            <img class="primary-image2 " src="<?=base_url();?>images/05_JOGGJEANS.jpg" alt="JoggJeans" />

                                                                        </a>
                                  </div>

                                  <div class="img-container">

                                    <a data-catId="diesel-woman-denim-highlights-newdenim" href='#'>





                                                                            <img class="primary-image2 " src="<?=base_url();?>images/06_DENIM-FEMALE.jpg" alt="New Denim FW15" />

                                                                        </a>
                                  </div>

                                </div>
                              </div>
                            </li>

                          </ul>

                          <span class="ipad_cross_icon"></span>
                        </div>

                      </li>

                      <li id="diesel-man">

                        <h4>
<a  href='<?=base_url()?>product/listing' class="level-1">
<span class="s-diesel-man s-catflytemp1" >MEN</span>
<div class="s-diesel-man s-catflytemp1 main-nav-arr"></div>
</a>
</h4>

                        <div class="level-2 menu-horizontal s-catflytemp1">
                          <div class="subnav-gender-inner container-fluid">
                            <div class="top-area-holder container-fluid">
                              <h1 class="col-lg-12">
MEN
</h1>
                              <ul class="level-2 col-lg-9 col-md-12">

                                <li class="sub-category-list first">

                                  <div class="sub-menus">

                                    <h2><a href="" class="level-2 unclickable">

DENIM &amp; CLOTHING</a></h2>

                                    <div class="level-3">
                                      <ul class="level-3 col-lg-6 col-md-6">

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-denim" href="#">

Denim
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-joggjeans" href="#">

JoggJeans
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-jackets" href="#">

Jackets
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-pants" href="#">

Pants
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-shirts" href="#">

Shirts
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-sweatshirts" href="#">

Sweatshirts
</a></h6>
                                        </li>

                                      </ul>
                                      <ul class="level-3 col-lg-6 col-md-6 second">

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-sweaters" href="#">

Sweaters
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-polos" href="#">

Polos
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-tshirtsandtops" href="#">

Tshirts
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-underwear" href="#">

Underwear
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-denimandclothing-beachwear" href="#">

Beachwear
</a></h6>
                                        </li>

                                      </ul>
                                    </div>

                                  </div>

                                </li>

                                <li class="sub-category-list ">

                                  <div class="sub-menus">

                                    <h2><a href="" class="level-2 unclickable">

SHOES &amp; ACCESSORIES</a></h2>

                                    <div class="level-3">
                                      <ul class="level-3 col-lg-6 col-md-6">

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-footwear" href="#">

Shoes
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-bags" href="#">

Bags
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-walletsandsmallgoods" href="#">

Wallets
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-belts" href="#">

Belts
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-otheraccessories" href="#">

Other Accessories
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-jewels" href="#">

Jewelry
</a></h6>
                                        </li>

                                      </ul>
                                      <ul class="level-3 col-lg-6 col-md-6 second">

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-eyewear" href="#">

Eyewear
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-timeframes" href="#">

Watches
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-fragrances" href="#">

Fragrance
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-man-footwearandaccessories-technology" href="#">

Technology
</a></h6>
                                        </li>

                                      </ul>
                                    </div>

                                  </div>

                                </li>

                                <li class="sub-category-list ">

                                </li>

                                <li class="sub-category-list last">

                                </li>

                              </ul>

                              <div class="custom you-enjoy col-lg-3 col-md-6">
                                <div class="you-enjoy-tit">
                                  <h2><a href="" class="you-enjoy-link unclickable">SHOP BY</a></h2>
                                </div>
                                <div class="you-enjoy-list">
                                  <ul>

                                    <li>

                                      <h6><a data-catId="diesel-man-features-latestarrivals" href='#'>

<span>New Arrivals</span>
</a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="diesel-man-features-onlineexclusives" href='#'>

<span>Online Exclusives</span>
</a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="diesel-man-features-bestsellers" href='#'>

<span>Bestsellers</span>
</a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="diesel-man-features-Rock" href='#'>

<span>Casual Rock</span>
</a></h6>
                                    </li>

                                  </ul>
                                </div>
                              </div>

                              <div class="custom horizantal-custom col-lg-12 col-md-6" id="horizantal-custom-diesel-man">
                                <div>
                                  <ul class="horizantal-slider" id="">
                                    <li class="col-lg-12">
                                      <h2 class="highlights">Highlights</h2>

                                      <div class='image-sec col-lg-2 col-md-6 first-element'>

                                        <a data-catId="diesel-man-highlights-eveningrock" href='#'>





                                                                                    <img alt="Evening Rock" src='<?=base_url();?>images/10_EVENING ROCK.jpg' />


                                                                                </a>
                                      </div>

                                      <div class='content-wrapper col-lg-2 col-md-6 first-element'>
                                        <h6><span class="display-text">

<a data-catId="diesel-man-highlights-eveningrock" href='#'>

Evening Rock
</a>
</span>
</h6>
                                      </div>

                                      <div class='image-sec col-lg-2 col-md-6 '>

                                        <a data-catId="diesel-man-highlights-neoprene" href='#'>





                                                                                    <img alt="Neoprene" src='<?=base_url();?>images/08_NEOPRENE.jpg' />


                                                                                </a>
                                      </div>

                                      <div class='content-wrapper col-lg-2 col-md-6 '>
                                        <h6><span class="display-text">

<a data-catId="diesel-man-highlights-neoprene" href='#'>

Neoprene
</a>
</span>
</h6>
                                      </div>

                                      <div class='image-sec col-lg-2 col-md-6 '>

                                        <a data-catId="diesel-man-highlights-zipround" href='#'>





                                                                                    <img alt="Zip Round" src='<?=base_url();?>images/09_ZIP.jpg' />


                                                                                </a>
                                      </div>

                                      <div class='content-wrapper col-lg-2 col-md-6 '>
                                        <h6><span class="display-text">

<a data-catId="diesel-man-highlights-zipround" href='#'>

Zip Round
</a>
</span>
</h6>
                                      </div>

                                    </li>
                                  </ul>
                                </div>
                              </div>

                            </div>

                            <div class="custom horizantal-custom col-lg-12 col-md-6" id="horizantal-custom-diesel-man">
                              <div>
                                <ul class="horizantal-slider" id="">
                                  <li class="col-lg-12">
                                    <h2 class="highlights">Highlights</h2>

                                    <div class='image-sec col-lg-2 col-md-6 first-element'>

                                      <a data-catId="diesel-man-highlights-eveningrock" href='#'>





                                                                                <img alt="Evening Rock" src='<?=base_url();?>images/10_EVENING ROCK.jpg' />


                                                                            </a>
                                    </div>

                                    <div class='content-wrapper col-lg-2 col-md-6 first-element'>
                                      <h6><span class="display-text">

<a data-catId="diesel-man-highlights-eveningrock" href='#'>

Evening Rock
</a>
</span>
</h6>
                                    </div>

                                    <div class='image-sec col-lg-2 col-md-6 '>

                                      <a data-catId="diesel-man-highlights-neoprene" href='#'>





                                                                                <img alt="Neoprene" src='<?=base_url();?>images/08_NEOPRENE.jpg' />


                                                                            </a>
                                    </div>

                                    <div class='content-wrapper col-lg-2 col-md-6 '>
                                      <h6><span class="display-text">

<a data-catId="diesel-man-highlights-neoprene" href='#'>

Neoprene
</a>
</span>
</h6>
                                    </div>

                                    <div class='image-sec col-lg-2 col-md-6 '>

                                      <a data-catId="diesel-man-highlights-zipround" href='#'>





                                                                                <img alt="Zip Round" src='<?=base_url();?>images/09_ZIP.jpg' />


                                                                            </a>
                                    </div>

                                    <div class='content-wrapper col-lg-2 col-md-6 '>
                                      <h6><span class="display-text">

<a data-catId="diesel-man-highlights-zipround" href='#'>

Zip Round
</a>
</span>
</h6>
                                    </div>

                                  </li>
                                </ul>
                              </div>
                            </div>

                          </div>

                          <span class="ipad_cross_icon"></span>
                        </div>

                      </li>

                      <li id="diesel-woman">

                        <h4>
<a  href='#' class="level-1">
<span class="s-diesel-woman s-catflytemp1" >WOMEN</span>
<div class="s-diesel-woman s-catflytemp1 main-nav-arr"></div>
</a>
</h4>

                        <div class="level-2 menu-horizontal s-catflytemp1">
                          <div class="subnav-gender-inner container-fluid">
                            <div class="top-area-holder container-fluid">
                              <h1 class="col-lg-12">
WOMEN
</h1>
                              <ul class="level-2 col-lg-9 col-md-12">

                                <li class="sub-category-list first">

                                  <div class="sub-menus">

                                    <h2><a href="" class="level-2 unclickable">

DENIM &amp; CLOTHING</a></h2>

                                    <div class="level-3">
                                      <ul class="level-3 col-lg-6 col-md-6">

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-denim" href="#">

Denim
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-joggjeans" href="#">

JoggJeans
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-dresses" href="#">

Dresses
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-jumpsuits" href="#">

Jumpsuits
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-jackets" href="#">

Jackets
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-pants" href="#">

Pants
</a></h6>
                                        </li>

                                      </ul>
                                      <ul class="level-3 col-lg-6 col-md-6 second">

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-shirts" href="#">

Shirts
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-sweatshirts" href="#">

Sweatshirts
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-skirts" href="#">

Skirts
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-sweaters" href="#">

Sweaters
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-tshirtsandtops" href="#">

Tshirts
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-denimandclothing-underwear" href="#">

Underwear
</a></h6>
                                        </li>

                                      </ul>
                                      <ul class="level-3 last">
                                        <li>
                                          <a data-catId="diesel-woman-denimandclothing" href="#"></a>
                                        </li>

                                      </ul>
                                    </div>

                                  </div>

                                </li>

                                <li class="sub-category-list ">

                                  <div class="sub-menus">

                                    <h2><a href="" class="level-2 unclickable">

SHOES &amp; ACCESSORIES</a></h2>

                                    <div class="level-3">
                                      <ul class="level-3 col-lg-6 col-md-6">

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-footwear" href="#">

Shoes
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-bags" href="#">

Bags
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-walletsandsmallgoods" href="#">

Wallets
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-belts" href="#">

Belts
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-otheraccessories" href="#">

Other Accessories
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-eyewear" href="#">

Eyewear
</a></h6>
                                        </li>

                                      </ul>
                                      <ul class="level-3 col-lg-6 col-md-6 second">

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-timeframes" href="#">

Watches
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-fragrances" href="#">

Fragrance
</a></h6>
                                        </li>

                                        <li>

                                          <h6><a data-catId ="diesel-woman-footwearandaccessories-technology" href="#">

Technology
</a></h6>
                                        </li>

                                      </ul>
                                    </div>

                                  </div>

                                </li>

                                <li class="sub-category-list ">

                                </li>

                                <li class="sub-category-list last">

                                </li>

                              </ul>

                              <div class="custom you-enjoy col-lg-3 col-md-6">
                                <div class="you-enjoy-tit">
                                  <h2><a href="" class="you-enjoy-link unclickable">SHOP BY</a></h2>
                                </div>
                                <div class="you-enjoy-list">
                                  <ul>

                                    <li>

                                      <h6><a data-catId="diesel-woman-features-latestarrivals" href='#'>

<span>New Arrivals</span>
</a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="diesel-woman-features-onlineexclusives" href='#'>

<span>Online Exclusives</span>
</a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="diesel-woman-features-bestsellers" href='#'>

<span>Bestsellers</span>
</a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="diesel-woman-features-rock" href='#'>

<span>Casual Rock</span>
</a></h6>
                                    </li>

                                  </ul>
                                </div>
                              </div>

                              <div class="custom horizantal-custom col-lg-12 col-md-6" id="horizantal-custom-diesel-woman">
                                <div>
                                  <ul class="horizantal-slider" id="">
                                    <li class="col-lg-12">
                                      <h2 class="highlights">Highlights</h2>

                                      <div class='image-sec col-lg-2 col-md-6 first-element'>

                                        <a data-catId="diesel-woman-highlights-eveningrock" href='#'>





                                                                                    <img alt="Evening Rock" src='<?=base_url();?>images/10_EVENING ROCK.jpg' />


                                                                                </a>
                                      </div>

                                      <div class='content-wrapper col-lg-2 col-md-6 first-element'>
                                        <h6><span class="display-text">

<a data-catId="diesel-woman-highlights-eveningrock" href='#'>

Evening Rock
</a>
</span>
</h6>
                                      </div>

                                      <div class='image-sec col-lg-2 col-md-6 '>

                                        <a data-catId="diesel-woman-highlights-tartan" href='#'>





                                                                                    <img alt="Tartan + Leather" src='<?=base_url();?>images/11_TARTAN.jpg' />


                                                                                </a>
                                      </div>

                                      <div class='content-wrapper col-lg-2 col-md-6 '>
                                        <h6><span class="display-text">

<a data-catId="diesel-woman-highlights-tartan" href='#'>

Tartan + Leather
</a>
</span>
</h6>
                                      </div>

                                      <div class='image-sec col-lg-2 col-md-6 '>

                                        <a data-catId="diesel-woman-highlights-industrialbag" href='#'>





                                                                                    <img alt="Industrial Bag" src='<?=base_url();?>images/12_INDUSTRIAL.jpg' />


                                                                                </a>
                                      </div>

                                      <div class='content-wrapper col-lg-2 col-md-6 '>
                                        <h6><span class="display-text">

<a data-catId="diesel-woman-highlights-industrialbag" href='#'>

Industrial Bag
</a>
</span>
</h6>
                                      </div>

                                    </li>
                                  </ul>
                                </div>
                              </div>

                            </div>

                            <div class="custom horizantal-custom col-lg-12 col-md-6" id="horizantal-custom-diesel-woman">
                              <div>
                                <ul class="horizantal-slider" id="">
                                  <li class="col-lg-12">
                                    <h2 class="highlights">Highlights</h2>

                                    <div class='image-sec col-lg-2 col-md-6 first-element'>

                                      <a data-catId="diesel-woman-highlights-eveningrock" href='#'>





                                                                                <img alt="Evening Rock" src='<?=base_url();?>images/10_EVENING ROCK.jpg' />


                                                                            </a>
                                    </div>

                                    <div class='content-wrapper col-lg-2 col-md-6 first-element'>
                                      <h6><span class="display-text">

<a data-catId="diesel-woman-highlights-eveningrock" href='#'>

Evening Rock
</a>
</span>
</h6>
                                    </div>

                                    <div class='image-sec col-lg-2 col-md-6 '>

                                      <a data-catId="diesel-woman-highlights-tartan" href='#'>





                                                                                <img alt="Tartan + Leather" src='<?=base_url();?>images/11_TARTAN.jpg' />


                                                                            </a>
                                    </div>

                                    <div class='content-wrapper col-lg-2 col-md-6 '>
                                      <h6><span class="display-text">

<a data-catId="diesel-woman-highlights-tartan" href='#'>

Tartan + Leather
</a>
</span>
</h6>
                                    </div>

                                    <div class='image-sec col-lg-2 col-md-6 '>

                                      <a data-catId="diesel-woman-highlights-industrialbag" href='#'>





                                                                                <img alt="Industrial Bag" src='<?=base_url();?>images/12_INDUSTRIAL.jpg' />


                                                                            </a>
                                    </div>

                                    <div class='content-wrapper col-lg-2 col-md-6 '>
                                      <h6><span class="display-text">

<a data-catId="diesel-woman-highlights-industrialbag" href='#'>

Industrial Bag
</a>
</span>
</h6>
                                    </div>

                                  </li>
                                </ul>
                              </div>
                            </div>

                          </div>

                          <span class="ipad_cross_icon"></span>
                        </div>

                      </li>

                      <li id="dieselblackgold">

                        <h4><a  href='#' class="level-1">
<span class="s-dieselblackgold s-catflytemp2" >DIESEL BLACK GOLD</span>
<div class="s-dieselblackgold s-catflytemp2 main-nav-arr"></div>
</a></h4>

                        <div class="level-2 menu-horizontal s-dieselblackgold s-catflytemp2">
                          <ul class="level-2 clearfix">

                            <li class="sub-category-list first active">

                              <div class="sub-menus">
                                <h1 class="col-lg-8 col-md-12">
MAN
</h1>

                                <div class="level-3 ">
                                  <ul class="level-3">

                                    <li class="s-catflytemp2 col-lg-4 col-md-6">

                                      <h2><a href="" class="unclickable">

DENIM &amp; CLOTHING
</a></h2>

                                      <div class="level-4">
                                        <ul class="level-4 ">

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-denimandclothing-denim" href="#">

Denim
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-denimandclothing-leather" href="#">

Leather
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-denimandclothing-readytowear" href="#">

Ready to Wear
</a></h6>
                                          </li>

                                        </ul>
                                      </div>

                                    </li>

                                    <li class="s-catflytemp2 col-lg-4 col-md-6">

                                      <h2><a href="" class="unclickable">

SHOES &amp; ACCESSORIES
</a></h2>

                                      <div class="level-4">
                                        <ul class="level-4 ">

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-footwearandaccessories-footwear" href="#">

Shoes
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-footwearandaccessories-bags" href="#">

Bags
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-footwearandaccessories-otheraccessories" href="#">

Other Accessories
</a></h6>
                                          </li>

                                        </ul>
                                      </div>

                                    </li>

                                    <li class="s-catflytemp2 col-lg-4 col-md-6">

                                      <h2><a href="" class="unclickable">

FEATURES
</a></h2>

                                      <div class="level-4">
                                        <ul class="level-4 features">

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-features-newarrivals" href="#">

New Arrivals
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-features-onlineexclusive" href="#">

Online Exclusives
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-man-features-bestsellers" href="#">

Bestsellers
</a></h6>
                                          </li>

                                        </ul>
                                      </div>

                                    </li>

                                  </ul>
                                </div>

                              </div>

                              <div class="bottom-banner-custom">

                                <div class="img-conatiner col-lg-8 col-md-12">

                                  <a data-catId="dieselblackgold-man-highlights" href='#'>





                                                                        <img alt="HIGHLIGHTS" src='<?=base_url();?>images/13_DBG-MALE.jpg?sw=640&sh=320' />


                                                                    </a>
                                </div>
                                <div class="content_sec col-lg-4 col-md-12">
                                  <h4>HIGHLIGHTS</isprint></h4>
                                  <ul>

                                    <li>

                                      <h6><a data-catId="dieselblackgold-man-highlights-fashionshow" href="#">

Fashion Show</isprint></a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="dieselblackgold-man-highlights-japanesedenim" href="#">

Japanese Denim</isprint></a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="dieselblackgold-man-highlights-autumn" href="#">

Autumn</isprint></a></h6>
                                    </li>

                                  </ul>
                                  <div class="diesel-black-gold-logo">
                                    <img class="" src="http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites/default/dwbb82764b/Diesel-Site-Unification/dbg-logo.png" alt="DIESEL BLACK GOLD" />
                                  </div>
                                </div>
                              </div>

                            </li>

                            <li class="sub-category-list last inactive">

                              <div class="sub-menus">
                                <h1 class="col-lg-8 col-md-12">
WOMAN
</h1>

                                <div class="level-3 clearfix">
                                  <ul class="level-3">

                                    <li class="s-catflytemp2 col-lg-4 col-md-6">

                                      <h2><a href="" class="unclickable">

DENIM &amp; CLOTHING
</a></h2>

                                      <div class="level-4">
                                        <ul class="level-4 ">

                                          <li>

                                            <h6><a data-catId="dieselblackgold-woman-denimandclothing-denim" href="#">

Denim
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-woman-denimandclothing-leather" href="#">

Leather
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-woman-denimandclothing-readytowear" href="#">

Ready to Wear
</a></h6>
                                          </li>

                                        </ul>
                                      </div>

                                    </li>

                                    <li class="s-catflytemp2 col-lg-4 col-md-6">

                                      <h2><a href="" class="unclickable">

SHOES &amp; ACCESSORIES
</a></h2>

                                      <div class="level-4">
                                        <ul class="level-4 ">

                                          <li>

                                            <h6><a data-catId="dieselblackgold-woman-footwearandaccessories-footwear" href="#">

Shoes
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-woman-footwearandaccessories-bags" href="#">

Bags
</a></h6>
                                          </li>

                                        </ul>
                                      </div>

                                    </li>

                                    <li class="s-catflytemp2 col-lg-4 col-md-6">

                                      <h2><a href="" class="unclickable">

FEATURES
</a></h2>

                                      <div class="level-4">
                                        <ul class="level-4 features">

                                          <li>

                                            <h6><a data-catId="dieselblackgold-woman-features-newarrivals" href="#">

New Arrivals
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-woman-features-onlineexclusive" href="#">

Online Exclusives
</a></h6>
                                          </li>

                                          <li>

                                            <h6><a data-catId="dieselblackgold-woman-features-bestsellers" href="#">

Bestsellers
</a></h6>
                                          </li>

                                        </ul>
                                      </div>

                                    </li>

                                  </ul>
                                </div>

                              </div>

                              <div class="bottom-banner-custom">

                                <div class="img-conatiner col-lg-8 col-md-12">

                                  <a data-catId="dieselblackgold-woman-highlights" href='#'>

                                    <img alt="HIGHLIGHTS" src='http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-navigation-catalog/default/dwc1211b26/images/Diesel-Site-Unification/00_CATEGORY BANNERS - MEGAMENU/14_DBG-FEMALE.jpg?sw=640&amp;sh=320' />

                                  </a>
                                </div>
                                <div class="content_sec col-lg-4 col-md-12">
                                  <h4>HIGHLIGHTS</isprint></h4>
                                  <ul>

                                    <li>

                                      <h6><a data-catId="dieselblackgold-woman-highlights-fashionshow" href="#">

Fashion Show</isprint></a></h6>
                                    </li>

                                    <li>

                                      <h6><a data-catId="dieselblackgold-woman-highlights-metallicdetails" href="#">

Metallic Details</isprint></a></h6>
                                    </li>

                                  </ul>
                                  <div class="diesel-black-gold-logo">
                                    <img class="" src="http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites/default/dwbb82764b/Diesel-Site-Unification/dbg-logo.png" alt="DIESEL BLACK GOLD" />
                                  </div>
                                </div>
                              </div>

                            </li>

                          </ul>
                          <span class="ipad_cross_icon"></span>
                        </div>

                      </li>

                      <li id="diesel-kids">

                        <h4><a  href='#' class="level-1">
<span class="s-diesel-kids s-catflytemp4" >KIDS</span>
<div class="s-diesel-kids s-catflytemp4 main-nav-arr"></div>
</a></h4>

                        <div class=" container-fluid level-2 menu-horizontal s-catflytemp4">
                          <ul class="level-2 row clearfix">

                            <li class='sub-category-list col-md-6 first active'>
                              <h2>BOYS</h2>
                              <div class="sub-menus row">

                                <div class='level-3 '>
                                  <ul class="level-3 s-catflytemp4">

                                    <li class=" col-md-6 category-items first">

                                      <a data-catId="diesel-kids-boys-baby" href="#">

                                        <h3>
INFANT &#40;3-36 MONTHS&#41;
</h3>
                                      </a>

                                      <div class="level-4">
                                        <ul class="level-4 s-catflytemp4">

                                          <li>

                                            <a data-catId="diesel-kids-boys-baby-denim" href="#">

Denim
</a>
                                          </li>

                                          <li>

                                            <a data-catId="diesel-kids-boys-baby-clothing" href="#">

Clothing
</a>
                                          </li>

                                          <li>

                                            <a data-catId="diesel-kids-boys-baby-accessories" href="#">

Accessories
</a>
                                          </li>

                                        </ul>
                                      </div>

                                    </li>

                                    <li class=" col-md-6 category-items first">

                                      <a data-catId="diesel-kids-boys-junior" href="#">

                                        <h3>
JUNIOR &#40;4-16 YEARS&#41;
</h3>
                                      </a>

                                      <div class="level-4">
                                        <ul class="level-4 s-catflytemp4">

                                          <li>

                                            <a data-catId="diesel-kids-boys-junior-denim" href="#">

Denim
</a>
                                          </li>

                                          <li>

                                            <a data-catId="diesel-kids-boys-junior-clothing" href="#">

Clothing
</a>
                                          </li>

                                          <li>

                                            <a data-catId="diesel-kids-boys-junior-accessories" href="#">

Accessories
</a>
                                          </li>

                                        </ul>
                                      </div>

                                    </li>

                                  </ul>
                                </div>

                              </div>

                              <div class="custom-feature row">

                              </div>

                              <ul class="highlights-category desktop-only row">

                                <li class="col-md-4 highlight-items">
                                  <div class="img-container">

                                    <a data-catId="diesel-kids-boys-highlights-jjjunior-1" href='#'>

                                      <img alt="See All" src='http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-navigation-catalog/default/dw87b5e7f7/images/Diesel-Site-Unification/00_CATEGORY BANNERS - MEGAMENU/15_JJJ-BOY.jpg?cx=0&amp;cy=0&amp;cw=320&amp;ch=180' />

                                    </a>
                                  </div>
                                  <div class="txt-content">

                                    <a data-catId="diesel-kids-boys-highlights-jjjunior-1" href='#'>

See All</isprint></a>
                                  </div>
                                </li>

                              </ul>
                              <div class="highlights-category mobile-only row" ">
<div class="txt-items col-md-6 ">

<h2>highlights </h2>

<div class="txt-content ">

<a data-catId="diesel-kids-boys-highlights-jjjunior-1 " href='#'>

See All</isprint></a>
</div>

</div>
<div class="img-items col-md-6 ">

<div class="img-container ">

<a data-catId="diesel-kids-boys-highlights-jjjunior-1 " href='#'>




        
    
    <img class="primary-image2 " src="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-navigation-catalog/default/dw87b5e7f7/images/Diesel-Site-Unification/00_CATEGORY BANNERS - MEGAMENU/15_JJJ-BOY.jpg?cx=0&amp;cy=0&amp;cw=320&amp;ch=180 " alt="See All "/>
    
</a>
</div>

</div>
</div>

</li>

<li class='sub-category-list col-md-6 inactive last' >
<h2>GIRLS</h2>
<div class="sub-menus row ">

<div class='level-3 clearfix'>
<ul class="level-3 s-catflytemp4 ">


<li class=" col-md-6 category-items first ">

<a data-catId="diesel-kids-girls-baby " href="# ">

<h3>
INFANT &#40;3-36 MONTHS&#41;
</h3>
</a>

<div class="level-4 ">
<ul class="level-4 s-catflytemp4 ">



<li>

<a data-catId="diesel-kids-girls-baby-denim " href="# ">

Denim
</a>
</li>




<li>

<a data-catId="diesel-kids-girls-baby-clothing " href="# ">

Clothing
</a>
</li>






<li>

<a data-catId="diesel-kids-girls-baby-accessories " href="# ">

Accessories
</a>
</li>






</ul>
</div>

</li>



<li class=" col-md-6 category-items first ">

<a data-catId="diesel-kids-girls-junior " href="# ">

<h3>
JUNIOR &#40;4-16 YEARS&#41;
</h3>
</a>

<div class="level-4 ">
<ul class="level-4 s-catflytemp4 ">



<li>

<a data-catId="diesel-kids-girls-junior-denim " href="# ">

Denim
</a>
</li>




<li>

<a data-catId="diesel-kids-girls-junior-clothing " href="# ">

Clothing
</a>
</li>






<li>

<a data-catId="diesel-kids-girls-junior-accessories " href="# ">

Accessories
</a>
</li>








</ul>
</div>

</li>






</ul>
</div>

</div>

<div class="custom-feature row ">














































</div>



<ul class="highlights-category desktop-only row ">

<li class="col-md-4 highlight-items ">
<div class="img-container ">

<a data-catId="diesel-kids-girls-highlights-jjjunior-1 " href='#'>




    
        
    
    
        
    
    
        
    
    
        
    
    
        
    
    
        <img  alt="See All " 
        
                            src='http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-navigation-catalog/default/dwde776963/images/Diesel-Site-Unification/00_CATEGORY BANNERS - MEGAMENU/18_JJJ-GIRL.jpg?cx=0&amp;cy=0&amp;cw=320&amp;ch=180'/>
    
</a>
</div>
<div class="txt-content ">

<a data-catId="diesel-kids-girls-highlights-jjjunior-1 " href='#'>

See All</isprint></a>
</div>
</li>

</ul>
<div class="highlights-category mobile-only row "">
                                <div class="txt-items col-md-6">

                                  <h2>highlights </h2>

                                  <div class="txt-content">

                                    <a data-catId="diesel-kids-girls-highlights-jjjunior-1" href='#'>

See All</isprint></a>
                                  </div>

                                </div>
                                <div class="img-items col-md-6">

                                  <div class="img-container">

                                    <a data-catId="diesel-kids-girls-highlights-jjjunior-1" href='#'>

                                      <img class="primary-image2 " src="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-navigation-catalog/default/dwde776963/images/Diesel-Site-Unification/00_CATEGORY BANNERS - MEGAMENU/18_JJJ-GIRL.jpg?cx=0&amp;cy=0&amp;cw=320&amp;ch=180" alt="See All" />

                                    </a>
                                  </div>

                                </div>
                              </div>

                            </li>

                          </ul>
                          <span class="ipad_cross_icon"></span>
                        </div>

                      </li>

                      <li id="diesel-stories" class=last>

                        <h4><a  href='' class="level-1">
<span class="s-diesel-stories" >MAGAZINE</span>
<div class="s-diesel-stories main-nav-arr"></div>
</a></h4>

                      </li>

                    </ul>

                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>