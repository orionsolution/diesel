
<div id="main" role="main" class="page-content clearfix my-account-registration">
   <div id="browser-check">
      <noscript>
         <div class="browser-compatibility-alert">
            <p class="browser-error">Your browser's Javascript functionality is turned off. Please turn it on so that you can experience the full capabilities of this site.</p>
         </div>
      </noscript>
   </div>
   <div class="login-header-banner">
   </div>
   <h1 class="title">My Account</h1>
   <div class="breadcrumb-container">
      <ol class="breadcrumb">
         <li>
            <h4><a href="<?=base_url();?>" title="Home" >Home</a></h4>
            <span class="divider">&#47;</span>
         </li>
         <li>
            <h4><a href="#" title="My Account"  class="breadcrumb-last" >My Account</a></h4>
         </li>
      </ol>
   </div>
   <div class="my-account-primary-wrapper">
      <div id="primary" class="primary-content">
         <h2>Create Account</h2>
         <div class="account-register" >

            <form action="<?=base_url();?>member/user_registration" method="post" id="RegistrationForm">
               <fieldset>
                  <input type="text" style="display: none" />
                  <input type="password" style="display: none" />
                  <div class="form-row   required ">
                     <label for="dwfrm_profile_customer_email">
                     <span>
                     Email*
                     </span>
                     </label>
                     <input  class="input-text email required" autocomplete="off" id="dwfrm_profile_customer_email" type="text" name="dwfrm_profile_customer_email" value="<?php echo set_value('dwfrm_profile_customer_email'); ?>"  maxlength="50"/>
                     <?php echo form_error('dwfrm_profile_customer_email', '<span class="error">', '</span>'); ?>
                  </div>
                  <div class="form-row   required ">
                     <label for="dwfrm_profile_customer_emailconfirm">
                     <span>
                     Confirm Email*
                     </span>
                     </label>
                     <input  class="input-text email required" autocomplete="off" id="dwfrm_profile_customer_emailconfirm" type="text" name="dwfrm_profile_customer_emailconfirm" value="<?php echo set_value('dwfrm_profile_customer_emailconfirm'); ?>"  maxlength="50"/>
                     <?php echo form_error('dwfrm_profile_customer_emailconfirm', '<span class="error">', '</span>'); ?>
                  </div>
                  <div class="form-row  help-tips  required ">
                     <label for="dwfrm_profile_login_password">
                     <span>
                     Password*
                     </span>
                     </label>
                     <input  autocomplete="off" class="input-text-pw required" id="dwfrm_profile_login_password" type="password" name="dwfrm_profile_login_password" value=""  maxlength="20"/>
                     <span class="form-caption">
                        <!--  Display Form Error Message -->8 - 20 characters
                     </span>
                     <?php echo form_error('dwfrm_profile_login_password', '<span class="error">', '</span>'); ?>
                  </div>
                  <div class="form-row   required ">
                     <label for="dwfrm_profile_login_passwordconfirm">
                     <span>
                     Confirm Password*
                     </span>
                     </label>
                     <input  autocomplete="off" class="input-text-pw required" id="dwfrm_profile_login_passwordconfirm" type="password" name="dwfrm_profile_login_passwordconfirm" value=""  maxlength="20"/>
                     <?php echo form_error('dwfrm_profile_login_passwordconfirm', '<span class="error">', '</span>'); ?>
                  </div>
                  <div class="form-row   required ">
                     <label for="dwfrm_profile_customer_firstname">
                     <span>
                     First Name*
                     </span>
                     </label>
                     <input  class="input-text required" autocomplete="off" id="dwfrm_profile_customer_firstname" type="text" name="dwfrm_profile_customer_firstname" value="<?php echo set_value('dwfrm_profile_customer_firstname'); ?>"  maxlength="50"/>
                     <?php echo form_error('dwfrm_profile_customer_firstname', '<span class="error">', '</span>'); ?>
                  </div>
                  <div class="form-row   required ">
                     <label for="dwfrm_profile_customer_lastname">
                     <span>
                     Last Name*
                     </span>
                     </label>
                     <input  class="input-text required" autocomplete="off" id="dwfrm_profile_customer_lastname" type="text" name="dwfrm_profile_customer_lastname" value="<?php echo set_value('dwfrm_profile_customer_lastname'); ?>"  maxlength="50"/>
                     <?php echo form_error('dwfrm_profile_customer_lastname', '<span class="error">', '</span>'); ?>
                  </div>
                  <div class="form-row   ">
                     <label for="dwfrm_profile_customer_birthday">
                     <span>
                     Date of Birth*
                     </span>
                     </label>
                     <input  class="input-text datepicker account-dob" autocomplete="off" id="dwfrm_profile_customer_birthday" type="text" name="dwfrm_profile_customer_birthday" value="<?php echo set_value('dwfrm_profile_customer_birthday'); ?>"  maxlength="10"/>
                     <?php echo form_error('dwfrm_profile_customer_birthday', '<span class="error">', '</span>'); ?>
                  </div>
                  <div class="inline-input">
                     <div class="form-row  gender  ">
                        <label for="dwfrm_profile_customer_customergender">
                        <span>
                        Gender
                        </span>
                        </label>
                        <select class="input-select  gender-dropdown" id="dwfrm_profile_customer_customergender" name="dwfrm_profile_customer_customergender" >
                           <option class="select-option" label="Male" value="Male">Male</option>
                           <option class="select-option" label="Female" value="Female">Female</option>
                        </select>
                        <?php echo form_error('dwfrm_profile_customer_customergender', '<span class="error">', '</span>'); ?>
                     </div>
                     <label for="dwfrm_profile_customer_zip"><span>Zip Code*</span></label>
                     <div class="form-row  zipcode  ">
                        <input  class="input-text zip-code  account-zip" autocomplete="off" id="dwfrm_profile_customer_zip" type="text" name="dwfrm_profile_customer_zip" value="<?php echo set_value('dwfrm_profile_customer_zip'); ?>"  maxlength="10"/><!-- postalCode -->
                        <?php echo form_error('dwfrm_profile_customer_zip', '<span class="error">', '</span>'); ?>
                     </div>
                  </div>
               </fieldset>
               <div class="privacy-policy-container ">
                  <div class="form-row  form-indent privacy-policy-content   ">
                     <input class="input-checkbox" type="checkbox" name="dwfrm_profile_customer_privacypolicy" id="dwfrm_profile_customer_privacypolicy" value="true"  data-checkbox="main"/>
                  </div>
                  <label for="dwfrm_profile_customer_privacypolicy">I have read and understood the  <a href="/cms/legal/privacypolicy.html" data-dlg-options='{"height":600,"dialogClass":"basic-dialog-theming privacy-notice "}'  class="dialogify privacy-policy-dialog" title="Privacy Notice">Privacy Notice</a> about the processing of my personal data by Diesel USA and DIESEL S.p.A., and I agree to its collection for marketing purposes (newsletters, news and promotions) and profiling.<br>If you would like to choose a partial consent option, <a href="" class="click-here">please click here.</a></label>
                  <div class="form-row  form-indent label-inline  ">
                     <input class="input-checkbox" type="checkbox" checked="checked" name="dwfrm_profile_customer_acceptnewsletters" id="dwfrm_profile_customer_acceptnewsletters" value="true"  data-checkbox="subscription"/>
                     <label for="dwfrm_profile_customer_acceptnewsletters">I agree to the processing of my personal data to send me news and general promotions from Diesel USA and DIESEL S.p.A. through newsletters.</label>
                  </div>
                  <div class="form-row  form-indent label-inline font-regular  ">
                     <input class="input-checkbox" type="checkbox" checked="checked" name="dwfrm_profile_customer_addtoemaillist" id="dwfrm_profile_customer_addtoemaillist" value="true"  data-checkbox="subscription"/>
                     <label for="dwfrm_profile_customer_addtoemaillist">I agree to the processing of my personal data for profiling in order to send me personalised communications and promotions from Diesel USA and DIESEL S.p.A.</label>
                  </div>
               </div>
               <div class="form-row form-row-button signup-button clearfix">
                  <button type="submit" value="Apply" name="dwfrm_profile_confirm" id="dwfrm_profile_confirm">
                  Apply
                  </button>
               </div>
               <input type="hidden" name="dwfrm_profile_securekey" value="617179477"/>	
            </form>
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
                           <li><a title="View privacy policy" href="#">Privacy Policy</a></li>
                           <li><a title="Secure shopping" href="#">Secure Shopping</a></li>
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
               <p>If you have any question or need help with your account,<br>you may <a href="#">Contact Us</a> to assist you.</br></p>
               <h3>Customer Service</h3>
               <p><a href="mailto:customerservice@shop.diesel.com?Subject=Contact Us" target="_top">customerservice@shop.diesel.com</a></p>
               <p>
                  877-344-8342<br />
                  8:00 AM ET to 12:00 AM ET, 7-days a week.<br/>
               </p>
            </div>
            <!-- End content-asset -->
         </div>
      </div>
   </div>
</div>
<!-- /main -->
<script type="text/javascript">
   $( "#dwfrm_profile_confirm" ).click(function() {
      var privacy_policy = $('#dwfrm_profile_customer_privacypolicy').is(':checked');
      var accept_newsletters = $('#dwfrm_profile_customer_acceptnewsletters').is(':checked');
      var addto_emaillist = $('#dwfrm_profile_customer_addtoemaillist').is(':checked');

      if (privacy_policy == true && accept_newsletters == true && addto_emaillist == true) {
         $('#RegistrationForm').submit();
      }
   });
</script>