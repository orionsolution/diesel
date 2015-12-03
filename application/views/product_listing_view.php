<div id="main" role="main" class="clearfix">
      <script>
        /*$(document).ready(function() {
          var id = "diesel-man";
          $('#' + id + ' a.level-1').addClass('active');
          $('#' + id + ' a.level-1').parents('li').addClass('selected');
        });*/
      </script>
      <div id="browser-check">
        <noscript>
          <div class="browser-compatibility-alert">
            <p class="browser-error">Your browser's Javascript functionality is turned off. Please turn it on so that you can experience the full capabilities of this site.</p>
          </div>
        </noscript>
      </div>
      <div id="primary" class="primary-content">
        <div class="department-landing home-landing">
          <div class="content-slot">
            <div data-slotid="landing-content-slot1" class="html-slot-container subnav-top-container">
              <section class="inpage-new-single-gender container-fluid ">
                <div class="row">
                  <div class="col-md-9 col-sm-12 col-md-push-3 inpagedlpcover-image">
                    <div class="tag-mobile-men"></div>
                    <div class="cover-fullbleed" data-stellar-ratio="0.8"> <img alt="MALE COLLECTION" title="MALE COLLECTION" src="<?=base_url().'images/category_images/'.$category.'_cover_img.jpg'?>" /> <a class="full-img-link" href="http://shop.diesel.com/man/?prefn1=onlineFrom&amp;prefv1=-30&amp;hps=true" alt="Shop New Arrivals">Explore</a> </div>
                    <article class="lp-text">
                      <h1>MALE COLLECTION</h1>
                      <p>The Fall Winter collection is fresh, modern and still packed with that unmistakable Diesel attitude. Military camouflage and rock 'n' roll denim get updated with texture-clashing fabrics, innovative treatments and shots of color. </p> <span class="link-area"><a class="button-links"
                      href="http://shop.diesel.com/man/?prefn1=onlineFrom&amp;prefv1=-30&amp;hps=true">SHOP NEW ARRIVALS</a>                      </span> </article>
                  </div>
                  <div class="col-md-3  col-sm-12 col-md-pull-9 accordian-gender" data-widget="sub-nav-scroll">
                    <?if(!empty($main_arr)):?>
                      <?if($category !== 'denim'):?>
                        <a href="http://shop.diesel.com/man/" class="see-all-link data-category"><h3>MEN</h3></a>
                        <p class="gender-subtitle">GO TO:</p>
                        <div class="single-scroll-area">
                          <div class='inpage-accordian'>
                            <ul>                    
                              <?foreach($main_arr as $category_name=>$category_list):?>
                                <li> <a href="javascript:void(0)"><span><?=$category_name;?></span></a>
                                  <ul>
                                    <?foreach($category_list as $curr_category):?>
                                      <li>
                                        <a data-catId="diesel-man-denimandclothing-denim" href='#'>
                                          <?=$curr_category;?>
                                        </a> 
                                      </li> 
                                    <?endforeach;?>
                                  </ul>
                                </li>
                              <?endforeach;?>
                            </ul>                                
                          </div>                      
                        </div>
                      <?endif;// category men or women?>


                      <?if($category == 'denim'):?>
                        <div class="accordion-holder" data-widget="dual-gender-accordion" id="dual-gender-acc">
                          <ul>
                            <li class="head-li ">
                              <h1>DENIM</h1>
                              <p class="gender-subtitle">GO TO:</p>
                              <ul class="mobile-level-2">
                                <div class="scroll-area" style="overflow: hidden; padding: 0px; width: 362px;">
                                  
                                    
                                      <?foreach($main_arr as $gender => $category_arr):?>
                                        <li class="subcat-title">

                                          <h2><span class="mobile-only">Go to</span><?=$gender;?><span class="mobile-only">: </span></h2>
                                          <div class="inpage-accordian">
                                            <ul>
                                              <?foreach($category_arr as $category_name => $category_list):
                                              //echo $category_name.'<br>';exit; 
                                                if($category_name != 'shop by' && $category_name != 'highlights'):
                                              ?>
                                                <li class="has-sub"><a href="javascript:void(0)"><span><?=$category_name;?></span></a>
                                                  <ul style="display: none; overflow: hidden;">
                                                    <?foreach($category_list as $curr_category):?>
                                                      <li class="cursor mobile-level-4"> <a data-catid="diesel-man-features-denimguide-fits-skinny" href="http://shop.diesel.com/mens/denimguide/skinny/"><?=$curr_category;?></a>
                                                      </li>
                                                    <?endforeach;?>                                     
                                                  </ul>
                                                </li>
                                              <?endif;endforeach;?>
                                            </ul>
                                          </div>
                                        </li>
                                      <?endforeach;?>
                                     
                                  <!-- this -->
                                </div>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      <?endif; // category denim?>
                    <?endif;?>
                  </div>
                </div>
              </section> <span class="anchor-icon"></span> </div>
          </div>
          <div class="content-slot">
            <div class="in-page-product clearfix ">
              <div class=" hp-product-slider">
                <div class="panel col-lg-6 col-md-6">
                  <div class="homepage-oneslot-carousel">
                    <div class="image-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5"> <img itemprop="image" class="primary-image" data-altimg="images/00SK0A_0846X_01_R.jpg?sw=230&amp;sh=345" src="<?=base_url();?>images/00SK0A_0846X_01_F.jpg?sw=230&amp;sh=345" alt="TAYLHOR 0846X, " /> </div>
                    <div class="content-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5">
                      <div class="content-sec-inner">
                        <div class="middle">
                          <h5 class="gender-crousel">men</h5>
                          <h5>TAYLHOR 0846X</h5>
                          <div class="pricing">
                            <div class="product-price"> <span class='price-sales'>
      
      $208.00</span> </div>
                          </div> <a class="button-theme" href="<?=base_url()?>product/details">buy</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="panel col-lg-6 col-md-6">
                  <div class="homepage-oneslot-carousel">
                    <div class="image-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5"> <img itemprop="image" class="primary-image" data-altimg="images/00SKAL_0845N_02_R.jpg?sw=230&amp;sh=345" src="<?=base_url();?>images/00SKAL_0845N_02_F.jpg?sw=230&amp;sh=345" alt="D-JIM, " /> </div>
                    <div class="content-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5">
                      <div class="content-sec-inner">
                        <div class="middle">
                          <h5 class="gender-crousel">men</h5>
                          <h5>D-JIM</h5>
                          <div class="pricing">
                            <div class="product-price"> <span class='price-sales'>
      
      $898.00</span> </div>
                          </div> <a class="button-theme" href="https://shop.diesel.com/jackets/d-jim/00SKAL0845N.html">buy</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="panel col-lg-6 col-md-6">
                  <div class="homepage-oneslot-carousel">
                    <div class="image-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5"> <img itemprop="image" class="primary-image" data-altimg="images/00SDHB_0842U_01_R.jpg?sw=230&amp;sh=345" src="<?=base_url();?>images/00SDHB_0842U_01_F.jpg?sw=230&amp;sh=345" alt="BUSTER 0842U, " /> </div>
                    <div class="content-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5">
                      <div class="content-sec-inner">
                        <div class="middle">
                          <h5 class="gender-crousel">men</h5>
                          <h5>BUSTER 0842U</h5>
                          <div class="pricing">
                            <div class="product-price"> <span class='price-sales'>
      
      $278.00</span> </div>
                          </div> <a class="button-theme" href="https://shop.diesel.com/tapered/buster-0842u/00SDHB0842U.html">buy</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="panel col-lg-6 col-md-6">
                  <div class="homepage-oneslot-carousel">
                    <div class="image-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5"> <img itemprop="image" class="primary-image" data-altimg="images/00S0Y8_0847K_01_R.jpg?sw=230&amp;sh=345" src="<?=base_url();?>images/00S0Y8_0847K_01_F.jpg?sw=230&amp;sh=345" alt="ELSHAR, " /> </div>
                    <div class="content-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5">
                      <div class="content-sec-inner">
                        <div class="middle">
                          <h5 class="gender-crousel">men</h5>
                          <h5>ELSHAR</h5>
                          <div class="pricing">
                            <div class="product-price"> <span class='price-sales'>
      
      $448.00</span> </div>
                          </div> <a class="button-theme" href="https://shop.diesel.com/jackets/elshar/00S0Y80847K.html">buy</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-slot">
            <div data-slotid="landing-content-slot3" class="full-bleed-slot">
              <section class="cover-fullbleed " data-stellar-background-ratio="0.5" style="background:url('<?=base_url();?>images/02_DENIM-MALE.jpg') 0 0 / cover no-repeat fixed;"> <a class="full-img-link" href="http://shop.diesel.com/mens/denim/" alt="Shop Male Denim">Explore</a>
                <article class="lp-text">
                  <h1>DENIM</h1>
                  <p>Worn-in for a vintage look, dyed and coated for a contemporary feel or detailed with rebel studs and punk safety pins; as long as you like your denim with attitude the Fall/ Winter range has you covered. Try the innovative stretch-denim JoggJeans for a sporty fit and effortless movement. </p> <span class="link-area"><a class="button-links" href="http://shop.diesel.com/mens/denim/">SHOP</a> </span></article>
              </section>
            </div>
          </div>
          <div class="content-slot">
            <section data-slotid="landing-content-slot4" class="secondary-inpage-three-slot container-fluid threeinslot parallax-window" data-stellar-background-ratio="0.2" style="background:url('http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites/default/dwdad5fa3b/Diesel-Site-Unification/MEN LANDING/06_THREESLOT_MALE_BACKGROUND.jpg') 0 0 / cover no-repeat fixed;">
              <div class="row">
                <div class="dlp-slider-threeinslot" data-widget="threefront-vid-widget">
                  <div class="col-sm-12 col-md-4 theme-one">
                    <div class="theme-img three-sl">
                      <div class="inthree-img-holder"> <img alt="SHOES" title="SHOES" src='<?=base_url();?>Images/03_SHOES-MALE.jpg' /> <a class="full-img-link" href="http://shop.diesel.com/mens/footwear/" alt="Shop Male Shoes">Explore</a> </div>
                      <div class="three-text">
                        <h4>SHOES</h4>
                        <p>The Fall/ Winter footwear mixes biker references with classic style. Choose from buckled motorcycle boots, clean-lined shoes or relaxed sneakers in clashing materials. </p>
                        <p><a href="http://shop.diesel.com/mens/footwear/">SHOP</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-4 theme-one">
                    <div class="theme-img three-sl">
                      <div class="inthree-img-holder"> <img alt="LEATHER JACKETS" title="LEATHER JACKETS" src='<?=base_url();?>Images/04_JACKETS-MALE.jpg' /> <a class="full-img-link" href="http://shop.diesel.com/mens/jackets/leather-jackets/" alt="Shop Leather Jackets for Men">Explore</a> </div>
                      <div class="three-text">
                        <h4>LEATHER JACKETS</h4>
                        <p>Sharp silhouettes and clean-lined design bring contemporary cool to our Fall/ Winter leather jacket offering. Biker style and punk irreverence still reign supreme with metal-studded black leather and safety pins.</p>
                        <p><a href="http://shop.diesel.com/mens/jackets/leather-jackets/">SHOP</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-4 theme-one">
                    <div class="theme-img three-sl">
                      <div class="inthree-img-holder"> <img alt="WATCHES" title="WATCHES" src='<?=base_url();?>Images/05_WATCHES-MALE.jpg' /> <a class="full-img-link" href="http://shop.diesel.com/mens/watches/" alt="Shop New Male Watches">Explore</a> </div>
                      <div class="three-text">
                        <h4>WATCHES</h4>
                        <p>Sync it up and strap it on. Size matters.</p>
                        <p><a href="http://shop.diesel.com/mens/watches/">SHOP</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> <span class="anchor-icon"></span> </section>
          </div>
          <div class="content-slot">
            <div data-slotid="landing-content-slot5" class="full-bleed-slot">
              <section class="cover-fullbleed " data-stellar-background-ratio="0.5" style="background:url('<?=base_url();?>images/07_DBG MALE.jpg') 0 0 / cover no-repeat fixed;"> <a class="full-img-link" href="http://shop.diesel.com/mens/dieselblackgold/new-arrivals/" alt="Men's DBG New Collection">Explore</a>
                <article class="lp-text">
                  <h1>DIESEL BLACK GOLD FW15 COLLECTION</h1> <span class="link-area"><a class="button-links" href="http://shop.diesel.com/mens/dieselblackgold/new-arrivals/">SHOP</a> </span></article>
              </section>
            </div>
          </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
          <div class="content-slot"> </div>
        </div>
      </div>
    </div>
