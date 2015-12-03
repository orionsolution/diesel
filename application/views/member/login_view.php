<div id="main" role="main" class="page-content clearfix my-account-registration">
   <div id="browser-check">
      <noscript>
         <div class="browser-compatibility-alert">
            <p class="browser-error">Your browser's Javascript functionality is turned off. Please turn it on so that you can experience the full capabilities of this site.</p>
         </div>
      </noscript>
   </div>
   <div class="login-header-banner">
      <div class="html-slot-container" data-slotid="account-login-banner">
         <div>
            <img title="" src="<?=base_url();?>images/Banner-account2.jpg" alt="">  
         </div>
      </div>
   </div>
   <h1 class="title">My Account</h1>
   <div class="breadcrumb-container">
      <ol class="breadcrumb">
         <li>
            <h4><a href="<?=base_url();?>" title="Home" >Home</a></h4>
            <span class="divider">&#47;</span>
         </li>
         <li>
            <h4><a href="https://shop.diesel.com/account" title="My Account"  class="breadcrumb-last" >My Account</a></h4>
         </li>
      </ol>
   </div>
   <div class="my-account-primary-wrapper">
      <div id="primary" class="primary-content">
         <h2>My Account Login</h2>
         <div class="login-header-banner-slot">
            <div data-slotid="account-login-banner" class="html-slot-container">
               <div>
                  <img alt="" src="https://shop.diesel.com/on/demandware.static/-/Sites/default/dwef2752b9/Diesel-Site-Unification/Banner-account2.jpg" title="" />
               </div>
            </div>
         </div>
         <div class="account-login">
            <div class="col-1">
               <div class="login-box login-account">
                  <h2 class="section-header">Returning Customers</h2>
                  <div class="login-box-content returning-customers clearfix">
                     <p>If you are a registered user, please enter your email and password.</p>
                     <form action="<?=base_url();?>member/user_login" method="post" class="clearfix" id="dwfrm_login">
                        <fieldset>
                           <div class="form-row   required " data-required-text="Please enter your email address">
                              <label for="dwfrm_login_username_d0sjourfhqrs">
                              <span>
                              email address*
                              </span>
                              </label>
                              <input autocomplete="off" class="input-text email-input email required" id="dwfrm_login_username_d0sjourfhqrs" type="email" name="dwfrm_login_username_d0sjourfhqrs" value="<?php echo set_value('dwfrm_login_username_d0sjourfhqrs'); ?>" maxlength="2147483647" />
                              <?php echo form_error('dwfrm_login_username_d0sjourfhqrs', '<span class="error">', '</span>'); ?>
                           </div>
                           <div class="form-row   required " data-required-text="Please enter your password">
                              <label for="dwfrm_login_password">
                              <span>
                              Password*
                              </span>
                              </label>
                              <input autocomplete="off" class="input-text-pw password-input required" id="dwfrm_login_password" type="password" name="dwfrm_login_password" value="" maxlength="2147483647" />
                              <?php echo form_error('dwfrm_login_password', '<span class="error">', '</span>'); ?>
                           </div>
                           <div class="form-row form-row-button clearfix">
                              <button type="submit" value="Login" name="dwfrm_login_login">
                              Login
                              </button>
                              <a id="password-reset" href="/account-passwordReset" title="Forgot Password?" data-dlg-action='{"test":100}' data-dlg-options='{"width":590,"height":"auto","dialogClass":"dialog-forgot-password"}'>
                              Forgot Password?
                              </a>
                           </div>
                           <input type="hidden" name="dwfrm_login_securekey" value="45512685" />
                        </fieldset>
                     </form>
                     <div class="mobile-login" style="display: none;">
                        <h3 class="title-newuser">NEW USER</h3>
                        <a class="new-register" href="https://shop.diesel.com/signup" value="Login" target="_parent" name="dwfrm_login_login">
                        CREATE ACCOUNT
                        </a>
                     </div>
                  </div>
                  <div class="vertical-block"></div>
               </div>
            </div>
            <div class="col-2">
               <div class="login-box login-create-account clearfix">
                  <h2 class="section-header">New Customers</h2>
                  <div class="login-box-content clearfix">
                     <p class="create-message">Creating an account is easy. Just fill in the form below and enjoy the benefits of having an account.</p>
                     <form action="https://shop.diesel.com/account?dwcont=C1520335179" method="post" id="dwfrm_login_register">
                        <fieldset>
                           <div class="form-row form-row-button clearfix">
                              <button type="submit" value="Create an Account" class="create-sccount-btn" name="dwfrm_login_register">
                              Create an Account Now
                              </button>
                           </div>
                           <input type="hidden" name="dwfrm_login_securekey" value="45512685" />
                        </fieldset>
                     </form>
                     <div class="account-benefits">
                        <div class="content-asset">
                           <!-- dwMarker="content" dwContentID="bcEiUiaaiM8Foaaadn86drDMYt" -->
                           <p><span style="font-size: large;">Benefits of Creating an Account</span>
                           </p>
                           <p class="checkmark-grey fl"></p>
                           <p class="fl"><strong>News and exclusive offers!</strong>
                              <br/>Sign up to receive email updates on special promotions, new product announcements, gift ideas and more.
                           </p>
                           <div class="clear"></div>
                           <p class="checkmark-grey fl"></p>
                           <p class="fl"><strong>Order History</strong>
                              <br/>Receive important information about your order. You can even track it up to the minute it arrives.
                           </p>
                           <div class="clear"></div>
                           <p class="checkmark-grey fl"></p>
                           <p class="fl"><strong>Faster Checkout</strong>
                              <br/>Save your billing and shipping information to make it easier to buy your favorite gear. <a class="read-more-security" href="https://shop.diesel.com/cms/legal/privacypolicy.html">read more about security</a>
                           </p>
                           <div class="clear"></div>
                        </div>
                        <!-- End content-asset -->
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <h2 id="check-order">Check An Order</h2>
         <div class="col-3 check-order-before-login">
            <div class="login-box login-order-track">
               <p>See your order even if you are not a registered user. Enter the Order Number,Email Address and the Billing Address Zip Code.</p>
               <form action="https://shop.diesel.com/account?dwcont=C1520335179" method="post" id="dwfrm_ordertrack">
                  <fieldset>
                     <div class="check-order">
                        <div class="form-row  ordernumber  required " data-required-text="Please enter an order number.">
                           <label for="dwfrm_ordertrack_orderNumber">
                           <span>
                           Order Number*
                           </span>
                           </label>
                           <input class="input-text required" autocomplete="off" id="dwfrm_ordertrack_orderNumber" type="text" name="dwfrm_ordertrack_orderNumber" value="" maxlength="2147483647" />
                        </div>
                        <div class="form-row  zipcode  required " data-required-text="Please enter a valid Zip Code">
                           <label for="dwfrm_ordertrack_postalCode">
                           <span>
                           Billing Zip Code*
                           </span>
                           </label>
                           <input class="input-text required" autocomplete="off" id="dwfrm_ordertrack_postalCode" type="text" name="dwfrm_ordertrack_postalCode" value="" maxlength="10" />
                        </div>
                        <div class="form-row  email  required " data-required-text="Please enter your email address">
                           <label for="dwfrm_ordertrack_custEmail">
                           <span>
                           email address*
                           </span>
                           </label>
                           <input autocomplete="off" class="input-text email-input email required" id="dwfrm_ordertrack_custEmail" type="email" name="dwfrm_ordertrack_custEmail" value="" maxlength="2147483647" />
                        </div>
                     </div>
                     <div class="form-row form-row-button check-order-button">
                        <button class="check-order-status-button" type="submit" value="Check Status" name="dwfrm_ordertrack_findorder">
                        Check Status
                        </button>
                     </div>
                  </fieldset>
               </form>
            </div>
         </div>
      </div>
      <div id="secondary" class="nav">
         <nav>
            <h1 class="visually-hidden">Secondary Navigation</h1>
            <div class="secondary-navigation">
               <div class="content-asset">
                  <!-- dwMarker="content" dwContentID="bcBY6iaaiMs3caaadnh57rDMYt" -->
                  <div class="my-account-left-nav">
                     <div class="content-asset">
                        <!-- dwMarker="content" dwContentID="bc41siaaiMQkaaaadnej7rDMYt" -->
                        <span class="my-accnt-nav-head">Shop Confidently</span>
                        <ul>
                           <li><a title="View privacy policy" href="https://shop.diesel.com/cms/legal/privacypolicy.html">Privacy Policy</a>
                           </li>
                           <li><a title="Secure shopping" href="https://shop.diesel.com/cms/help/shopping/shoppingsite.html">Secure Shopping</a>
                           </li>
                        </ul>
                     </div>
                     <!-- End content-asset -->
                  </div>
               </div>
               <!-- End content-asset -->
            </div>
         </nav>
         <div class="account-nav-asset">
            <div class="content-asset">
               <!-- dwMarker="content" dwContentID="bc2lUiaaiM18oaaadnf57rDMYt" -->
               <h2>Need Help?</h2>
               <p>If you have any question or need help with your account,
                  <br>you may <a href="http://shop.diesel.com/cms/help/contactus.html">Contact Us</a> to assist you.</br>
               </p>
               <h3>Customer Service</h3>
               <p><a href="mailto:customerservice@shop.diesel.com?Subject=Contact Us" target="_top">customerservice@shop.diesel.com</a>
               </p>
               <p>
                  877-344-8342
                  <br /> 8:00 AM ET to 12:00 AM ET, 7-days a week.
                  <br/>
               </p>
            </div>
            <!-- End content-asset -->
         </div>
      </div>
   </div>
</div>
<!-- /main -->
