
        <div id="main" role="main" class="clearfix">




            <div class="home-landing">
                <div class="content-slot">





                    <div data-slotid="homepage-slot1" class="full-bleed-slot">





                        <section id="fullbleed-outer-wrap" class="fullbleed-video-outer" data-widget="cover-full-widget">
                            <div id="fullbleed-vid-wrap" class="fullbleed-video-wrap">





                                <img class=custom-poster alt="null" title="null" src='http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Library-Sites-Diesel/default/dw2fc3aa49/Diesel-Site-Unification/Images/10_HOMEPAGE/coverWRB.jpg?sw=1920' />



                                <video id="fullbleed-video" preload="metadata" class="fullbleed-back-video" autoplay loop muted width="100%" height="100%">
                                    <source src="https://dhf4fp3a4zv08.cloudfront.net/01_HOMEPAGE_LOOP.mp4" type='video/mp4' />
                                    <source src="https://dhf4fp3a4zv08.cloudfront.net/01_HOMEPAGE_LOOP.ogg" type='video/ogg' />
                                    <source src="https://dhf4fp3a4zv08.cloudfront.net/01_HOMEPAGE_LOOP.webm" type='video/webm' />
                                    <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                                    </p>
                                </video>
                            </div>

                            <div class="cover-fullbleed full-cover-video ">
                                <article class="lp-text">
                                    <h2>WE'VE GOT A NEW SITE</h2>

                                    <p> Take us for a spin.</p>
                                    <span class="link-area"><a class="button-links" href="#">EXPLORE THE MAGAZINE </a> <a class="button-links" href="<?=base_url()?>product/men">Shop for Him</a><a class="button-links" href="<?=base_url()?>product/women">Shop for Her</a></span>
                                </article>
                                <span class="anchor-icon"></span>
                            </div>


                    </div>




                </div>
                <?if(!empty($landing_products)):?>
                <div class="content-slot">
                    <div class="in-page-product clearfix ">
                        <div class=" hp-product-slider">
                            <?foreach($landing_products as $curr_product):
                                $cat = '';
                                if($curr_product['L2'] == 'man'):
                                $cat = 'men';
                                elseif($curr_product['L2'] == 'woman'):
                                $cat = 'women';
                                endif;
                                // product url:

                                if($curr_product['L4'] == 'denim'){
                                $prod_cat = $curr_product['L5'];
                                }else{
                                $prod_cat = $curr_product['L4'];
                                }

                                $url = base_url().'product/details/'.$prod_cat.'/'.clean_string($curr_product['disp_name']).'/'.$curr_product['style'].'/'.$curr_product['attr_code'];
                                $image_path = base_url().'images/'.$curr_product['prod_images']['image_path'];

                            ?>
                                <div class="panel col-lg-6 col-md-6">
                                    <div class="homepage-oneslot-carousel">
                                        <div class="image-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5">
                                            <img itemprop="image" class="primary-image" data-altimg="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dweb94458e/images/large/00CKS1_0842R_01_R.jpg?sw=230&amp;sh=345" src="<?=$image_path;?>" alt="<?=$curr_product['disp_name'];?>" />
                                        </div>
                                        <div class="content-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5">
                                            <div class="content-sec-inner">
                                                <div class="middle">
                                                    <h5 class="gender-crousel"><?=$cat?></h5>
                                                    <h5><?=$curr_product['disp_name'];?></h5>
                                                    <div class="pricing">
                                                        <div class="product-price">
                                                            <span class='price-sales'>$1,298.00</span>
                                                        </div>
                                                    </div>
                                                    <a class="button-theme" href="<?=$url;?>">buy</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?endforeach;?>

                            <!-- <div class="panel col-lg-6 col-md-6">
                                <div class="homepage-oneslot-carousel">
                                    <div class="image-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5">
                                        <img itemprop="image" class="primary-image" data-altimg="http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/dw7904c892/images/large/00S54P_0844A_01_R.jpg?sw=230&amp;sh=345" src="<?=base_url()?>images/00SJKF_0SAGJ_62E_F.jpg?sw=640&sh=853" alt="L-UST" />
                                    </div>
                                    <div class="content-sec col-lg-5 col-lg-push-1 col-md-5 col-md-push-1 col-sm-5">
                                        <div class="content-sec-inner">
                                            <div class="middle">
                                                <h5 class="gender-crousel">women</h5>
                                                <h5>L-UST</h5>
                                                <div class="pricing">
                                                    <div class="product-price">
                                                        <span class='price-sales'>$698.00</span>
                                                    </div>
                                                </div>
                                                <a class="button-theme" href="<?=base_url()?>product/leather-jackets/W-NICK/00SJKF0SAGJ/62E">buy</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <?endif; //if(!empty($landing_products)) ?>
                <div class="content-slot">





                    <div data-slotid="homepage-slot3" class="one-slot cover-type">





                        <section class="oneinslot" style="background:url('http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites/default/dw1812ec02/Diesel-Site-Unification/HOMEPAGE/03_denim_background_B.gif') 0 0 / cover no-repeat fixed;" data-stellar-background-ratio="0.01" ;>


                            <figure class="main-image-slot">





                                <img alt="Diesel Denim Image" title="Diesel Denim Image" src='http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Library-Sites-Diesel/default/dw0da477a6/Diesel-Site-Unification/Images/10_HOMEPAGE/03_denim.jpg?sw=1920' />



                            </figure>

                            <article class="lp-text">
                                <h1>The new denim collection</h1>
                                <p>With unexpected washes and rich texture treatments, we've pushed the peddle on fabric innovation. But we're pioneers. That's what we do.</p>
                                <span class="link-area">
<a href="<?=base_url()?>product/men" class="button-links">SHOP MAN</a> <a href="<?=base_url()?>product/women" class="button-links">SHOP WOMAN</a>
</span>
                            </article>


                            <span class="anchor-icon"></span>
                        </section>
                    </div>

                </div>
                <!-- Black Gold commented -->
                <!-- <div class="content-slot">
                    <div data-slotid="homepage-slot4">
                        <section data-slotid="homepage-slot4" class="dbg-main-two dbgtwoinslot landing-page-scroll">
                            <h1>
                                <img  alt="null" title="null" src='http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites/default/dwb3f27cac/Diesel-Site-Unification/diesel-black-gold-logo.png'/>
                            </h1>
                            <div class="dbg-two-slot" data-widget="dbg-two-widget">
                                <div class="slot-outer slt1" data-stellar-background-ratio="0.01" style="background: url('http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Library-Sites-Diesel/default/dw4151aae3/Diesel-Site-Unification/Images/10_HOMEPAGE/04-05_dbg_background-2.gif') center 0 / cover no-repeat fixed;">
                                    <div class="slot-inner-wrap">
                                        <div class="two-main-image">
                                            <img alt="Diesel Black Gold Men Front Image" title="Diesel Black Gold Men Front Image" src='http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Library-Sites-Diesel/default/dwc65123a3/Diesel-Site-Unification/Images/10_HOMEPAGE/04_dbg_male.jpg?sw=960&amp;sh=960' />
                                            <a class="full-img-link" href="#" alt="Men's DBG New Collection">Explore</a>
                                        </div>
                                        <article class="lp-text">
                                            <h2>Diesel Black Gold</h2>
                                            <p>Fall/Winter '15 Collection</p>
                                            <a class="button-links" href="#">Menswear</a>
                                        </article>
                                    </div>
                                </div>
                                <div class="slot-outer slt2" data-stellar-background-ratio="0.01" style="background: url('http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Library-Sites-Diesel/default/dw4151aae3/Diesel-Site-Unification/Images/10_HOMEPAGE/04-05_dbg_background-2.gif') center 0 / cover no-repeat fixed;">
                                    <div class="slot-inner-wrap">
                                        <div class="two-main-image">
                                            <img alt="Diesel Black Gold Women Front Image" title="Diesel Black Gold Women Front Image" src='http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAPK_PRD/on/demandware.static/-/Library-Sites-Diesel/default/dwf2838d50/Diesel-Site-Unification/Images/10_HOMEPAGE/03_DBG-SHOW.jpg?sw=960&amp;sh=960' />
                                            <a class="full-img-link" href="#">DBG Fashion Show</a>
                                        </div>
                                        <article class="lp-text">
                                            <h2>Diesel Black Gold</h2>
                                            <p>SS16 womenswear show
                                            </p>
                                            <a class="button-links" href="#">FOLLOW THE SHOW</a>
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <span class="anchor-icon"></span>
                        </section>
                    </div>


                </div> -->
                <div class="content-slot">
                    <section data-slotid="homepage-slot6" class="secondary-inpage-three-slot container-fluid threeinslot parallax-window" data-stellar-background-ratio="0.2" style="background:url('http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites/default/dw0f05ecb5/Diesel-Site-Unification/HOMEPAGE/background_Black.jpg') 0 0 / cover no-repeat fixed;">
                        <div class="row">
                            <div class="dlp-slider-threeinslot" data-widget="threefront-vid-widget">
                                <div class="col-sm-12 col-md-4 theme-one">
                                    <div class="theme-img three-sl">
                                        <div class="inthree-img-holder">
                                            <img alt="Watches" title="Watches" src='<?=base_url()?>images/home/06_watches.jpg' />
                                            <a class="full-img-link" href="#" alt="Shop Men's Watches">Explore</a>
                                        </div>
                                        <article class="three-text">
                                            <h4>WATCHES</h4>
                                            <p>Sync it up and strap it on. Size matters.</p>
                                            <span class="link-area"><a href="#">SHOP NOW</a></span>
                                        </article>
                                    </div>
                                </div>





                                <div class="col-sm-12 col-md-4 theme-one">
                                    <div class="theme-img three-sl">
                                        <div class="inthree-img-holder">
                                            <img alt="eyewear" title="eyewear" src='<?=base_url()?>images/home/07_eyewear.jpg' />
                                            <a class="full-img-link" href="#" alt="Shop the eyewear collection">Explore</a>
                                        </div>
                                        <article class="three-text">
                                            <h4>EYEWEAR</h4>
                                            <p>Try the Denimeye Pollock style. Go creative. Be bold.</p>
                                            <span class="link-area"><a href="#">SHOP NOW</a></span>
                                        </article>
                                    </div>
                                </div>





                                <div class="col-sm-12 col-md-4 theme-one">
                                    <div class="theme-img three-sl">
                                        <div class="inthree-img-holder">
                                            <img alt="Living" title="Living" src='<?=base_url()?>images/home/herofit.jpeg' />
                                            <a class="full-img-link" href="#" alt="SHOP NOW">Explore</a>
                                        </div>
                                        <article class="three-text">
                                            <h4>HERO FIT</h4>
                                            <p>Hot enough for you?</p>
                                            <span class="link-area"><a href="#">SHOP NOW </a></span>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <span class="anchor-icon"></span>
                    </section>



                </div>
                <div class="content-slot">
                    <section data-slotid="homepage-slot7" class="secondary-inpage-three-slot container-fluid threeinslot parallax-window" data-stellar-background-ratio="0.2" style="background:url('http://demandware.edgesuite.net/aapk_prd/on/demandware.static/-/Sites/default/dw2a8e2749/Diesel-Site-Unification/HOMEPAGE/6-7-8_background_B.jpg') 0 0 / cover no-repeat fixed;">
                        <div class="row">
                            <h2 class="heading-left">D:CODE MAGAZINE</h2>
                            <div class="dlp-slider-threeinslot" data-widget="threefront-vid-widget">
                                <div class="col-sm-12 col-md-4 theme-one">
                                    <div class="theme-img three-sl">
                                        <div class="inthree-img-holder">
                                            <img alt="zip-round" title="zip-round" src='<?=base_url()?>images/home/09_live.gif' />
                                            <a class="full-img-link" href="#" alt="Explore the Zipround">Explore</a>
                                        </div>

                                        <div class="three-text">
                                            <h4>what's so special about the 'zip-round' anyway?</h4>

                                            <p>Zip up and around to get down. You've never seen a sneaker like this before</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4 theme-one">
                                    <div class="theme-img three-sl">
                                        <div class="inthree-img-holder"> <img alt="Tartan-Leather" title="Tartan-Leather" src='<?=base_url()?>images/home/10_live.jpg' /> <a class="full-img-link" href="#" alt="Explore The Magazine">Explore</a> </div>
                                        <div class="three-text">
                                            <h4>ROCK STEADY</h4>
                                            <p>Leather &amp; tartan gets reworked for Fall/ Winter '15</p>
                                            <p></p>
                                            <p></p>
                                            <p></p>
                                            <div class="button-container"><a class="button-links" href="#">EXPLORE THE MAGAZINE</a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4 theme-one">
                                    <div class="theme-img three-sl">
                                        <div class="inthree-img-holder"> <img alt="Activista" title="Activista" src='<?=base_url()?>images/home/11_live.jpg' /> <a class="full-img-link" href="#" alt="Explore Actyvista">Explore</a> </div>
                                        <div class="three-text">
                                            <h4>Innovation x Style: The new Actyvista denim range</h4>
                                            <p>Meet blogger superstar Mimi Elashiry as she shows off denim's versatile side</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="anchor-icon"></span>
                    </section>



                </div>
                
                <div class="content-slot">
                    <section class="contextual-content container-fluid contextual-support " style="background-color:white;">
                        <div class="row">
                            <div class="col-md-4 posting-text-left">
                                <div class="posting-content-left">
                                    <h2 class="contextual-title">PICK UP IN STORE</h2>
                                    <p class="contextual-text">Order online and pick up in store with free shipping!
                                        <br /> Select the &quot;Ship to Store&quot; option as the first step at check out</p>
                                    <p class="contextual-btn"><a href="#" title="EXPLORE">GET MORE DETAILS</a> </p>
                                </div>
                            </div>
                            <div class="col-md-4 posting-text-mid">
                                <div class="posting-content-mid">
                                    <h2 class="contextual-title">CONTACT US</h2>
                                    <p class="contextual-text">Send us an <a href="mailto:customerservice@shop.diesel.com"><strong>Email</strong></a> or
                                        <br /> call us on <strong>877.344.8342</strong> (8:00 am to 12:00 am ET, 7-days/week)</p>
                                    <p class="contextual-btn"><a href="#" title="EXPLORE">SEND US A MESSAGE</a> </p>
                                </div>
                            </div>
                            <div class="col-md-4 posting-text-right">
                                <div class="posting-content-right">
                                    <h2 class="contextual-title">CREATE AN ACCOUNT</h2>
                                    <p class="contextual-text">Sign up to receive must-have style news, updates and promotions before anyone else.</p>
                                    <p class="contextual-btn"><a href="#" title="EXPLORE">SIGN UP NOW</a> </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>




<!-- 
            <div id="igdRTA">
                <script type="text/javascript">
                    // iGoDigital RTA Initialization
                    var rtaRetailer = "diesel";
                    var rtaEmail = "";
                    var rtaSpecial = "";
                    var rtaTags = "";
                    addLoadEvent(function() {
                        callRTA();
                    });
                </script>
            </div> -->





            <div id="browser-check">
                <noscript>
                    <div class="browser-compatibility-alert">
                        <p class="browser-error">Your browser's Javascript functionality is turned off. Please turn it on so that you can experience the full capabilities of this site.</p>
                    </div>
                </noscript>
            </div>

        </div>