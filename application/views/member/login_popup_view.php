<!doctype html>
<!--[if lt IE 7]> 
<html class="ie6 oldie" lang="en">
<![endif]-->
<!--[if IE 7]>    
<html class="ie7 oldie" lang="en">
<![endif]-->
<!--[if IE 8]>    
<html class="ie8 oldie" lang="en">
<![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->
<head>
   <link rel="stylesheet" href="<?=base_url();?>css/MyFontsWebfontsKit.css" />
   <link href="<?=base_url();?>css/jquery.ui.all.css" type="text/css" rel="stylesheet" />
   <!-- jQuery -->
   <script src="<?=base_url();?>js/jquery-1.7.1.min.js" type="text/javascript"></script>
   <script>
      var app = {};
   </script>
   <script type="text/javascript" src="<?=base_url();?>js/igdrta.js"></script>
   <link rel="stylesheet" href="<?=base_url();?>css/style-new.css" />
</head>
<body class='null' id="sigin-overlay">
   <div class="loader">
      <div class="loader-indicator"></div>
      <div class="loader-bg"></div>
   </div>
   <h2>My Account Login</h2>
   <div class="account-login">
      <div class="col-1">
         <div class="login-box login-account">
            <h2 class="section-header">Returning Customers</h2>
            <div class="login-box-content returning-customers clearfix">
               <p>If you are a registered user, please enter your email and password.</p>
               <form action="<?=base_url('member/user_login_popup');?>" method="post" class="clearfix" id="dwfrm_login">
                  <fieldset>
                     <div class="form-row   required " data-required-text="Please enter your email address">
                        <label for="dwfrm_login_username_d0tjusaihued">
                        <span>
                        email address*
                        </span>
                        </label>
                        <input autocomplete="off" class="input-text email-input email required" id="dwfrm_login_username_d0tjusaihued" type="email" name="dwfrm_login_username_d0tjusaihued" value="<?php echo set_value('dwfrm_login_username_d0tjusaihued'); ?>" maxlength="2147483647" />
                        <?php echo form_error('dwfrm_login_username_d0tjusaihued', '<span class="error">', '</span>'); ?>
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
                     <input type="hidden" name="dwfrm_login_securekey" value="62280303" />
                  </fieldset>
               </form>
               <div class="mobile-login" style="display: none;">
                  <h3 class="title-newuser">NEW USER</h3>
                  <a class="new-register" href="<?=base_url();?>member/register" value="Login" target="_parent" name="dwfrm_login_login">
                  CREATE ACCOUNT
                  </a>
               </div>
            </div>
            <div class="vertical-block"></div>
         </div>
      </div>
   </div>

  
   <script src="<?=base_url();?>js/persist-all-min.js" type="text/javascript"></script>
   <script src="<?=base_url();?>js/diesel.plugins.min.js" type="text/javascript"></script>
   <script src="<?=base_url();?>js/jquery.bxslider.js" type="text/javascript"></script>
   <script src="<?=base_url();?>js/jquery.mousewheel.js" type="text/javascript"></script>
   <script src="<?=base_url();?>js/jquery.jscrollpane.min.js" type="text/javascript"></script>
   <script src="<?=base_url();?>js/jquery.stellar.min.js" type="text/javascript"></script>
   
   <script type="text/javascript">
      (function(app) {
        /*app.isMobileUserAgent = false;
        app.zoomViewerEnabled = true;
        app.carouselDelay = 7000;
        app.bonusProductsCount = 0*/
       /* app.constants = {
          "AVAIL_STATUS_IN_STOCK": "IN_STOCK",
          "AVAIL_STATUS_PREORDER": "PREORDER",
          "AVAIL_STATUS_BACKORDER": "BACKORDER",
          "AVAIL_STATUS_NOT_AVAILABLE": "NOT_AVAILABLE",
          "PI_METHOD_GIFT_CERTIFICATE": "GIFT_CERTIFICATE"
        };*/
        app.resources = { 
          "SERVER_ERROR": "Server connection failed!",
          "MISSING_LIB": "jQuery is undefined.",
          "BAD_RESPONSE": "Bad response, Parser error",
          "INVALID_EMAIL": "Please enter a valid email address.",
          "COOKIES_DISABLED": "Your browser currently is not set to accept Cookies. Please turn it on or check if you have another program set to block cookies."
        };
        
        app.clientcache = {
          "LISTING_INFINITE_SCROLL": true,
          "LISTING_REFINE_SORT": true
        };
        /*app.newsletterSignUp = true
        app.enableShipToStore = true;*/
      }(window.app = window.app || {}));
   </script>
   <script type="text/javascript" src="<?=base_url();?>js/addthis_widget.js#pubid=ra-524670f854b3d609"></script>
   <script src="<?=base_url();?>js/app.js" type="text/javascript"></script>
   <script src="<?=base_url();?>js/common.js" type="text/javascript"></script>
   <script src="<?=base_url();?>js/diesel.app.js" type="text/javascript"></script>
  <!--  <script>
      app.page.setContext({
        "title": "My Account",
        "type": "MyAccount",
        "ns": "account"
      });
   </script> -->
   <script>
      var meta = "";
      var keywords = "";
   </script>
   <script type="text/javascript">
      if (!window.mstag) mstag = {
        loadTag: function() {},
        time: (new Date()).getTime()
      };
   </script>
   <script id="mstag_tops" type="text/javascript" src="<?=base_url();?>js/mstag.js"></script>
   <script type="text/javascript">
      mstag.loadTag("analytics", {
        dedup: "1",
        domainId: "1994212",
        type: "1",
        revenue: "",
        actionid: "166326"
      })
   </script>
   <noscript>
      <iframe src="//flex.msn.com/mstag/tag/dcb81f33-cc3f-44b3-8772-02e309239e1f/analytics.html?dedup=1&domainId=1994212&type=1&revenue=&actionid=166326" frameborder="0" scrolling="no" width="1" height="1" style="visibility:hidden;display:none"> </iframe>
   </noscript>
   <!-- Google Code for Remarketing Tag -->
   <noscript>
      <div style="display:inline;">
         <img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/984403838/?value=0&amp;guid=ON&amp;script=0" />
      </div>
   </noscript>
   <script>
      $(document).ready(function() {
        app.progress.show();
        var form = $('#sigin-overlay').find('form');
        form.attr('action', form.attr('action'));
        if ($('#password-reset').length) {
          var dlgOption = $('#password-reset').data('dlg-options');
          dlgOption.width = 440;
          dlgOption.height = 300;
          $('#password-reset').data('dlg-action', dlgOption);
        }
        app.progress.hide();
      });
   </script>
</body>
</html>
