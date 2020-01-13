import * as Router from 'koa-router';
import { validate } from '../../middlewares';
import * as Constant from '../../constant';
import * as JOI from './common.joi.validator';
import { sendSuccess } from '../../utils'
import { miscController } from '../../controllers';

export default (router: Router) => {
    router
        .get('/', async (ctx: Router.IRouterContext) => {
            ctx.body = "<html>  <head>  </head> <body> user-service@KFC</body> </html>"
        })
        .get('/faq',
            validate({
                headers: JOI.COMMON_HEADERS,
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    let res = await miscController.faq(headers);
                    let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    ctx.status = sendResponse.statusCode;
                    ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/privacy-policy',
            validate({
                headers: JOI.COMMON_HEADERS,
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    ctx.body = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, {
                        "html": "<html>  <head>  </head> <body> Privacy Policy copyright@KFC</body> </html>"
                    })
                    // let res = await miscController.privacyPolicy(headers);
                    // let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    // ctx.status = sendResponse.statusCode;
                    // ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
        .get('/terms-condition',
            validate({
                headers: JOI.COMMON_HEADERS,
            }),
            async (ctx) => {
                try {
                    let headers: ICommonRequest.IHeaders = ctx.request.header;
                    ctx.body = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, {
                        "html": '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                            '' +
                            '<html xmlns="http://www.w3.org/1999/xhtml" class="no-js" lang="en">' +
                            '<head>' +
                            '<!-- server 43-->' +
                            '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
                            '    <meta http-equiv=\'Content-Type\' content=\'text/html; charset=utf-8\' />' +
                            '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
                            '    <meta charset="utf-8" />' +
                            '    <meta name="viewport" content="width=device-width, initial-scale=1" />' +
                            '' +
                            '    <title>Welcome to KFC UAE – Order your meal online now!</title>' +
                            '    <meta name="description" content="Order great tasting fried chicken, sandwiches & family  meals online with KFC Delivery. Attractive combos & deals available from our menu for a \'so good\' feast!" />' +
                            '    <meta name="keywords" content="KFC, order online, online delivery, sandwiches, meals" />' +
                            '    <meta http-equiv="X-UA-Compatible" content="IE=9" />' +
                            '' +
                            '    <script type="text/javascript">var isIE = false; var isIE = !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/MSIE/)); if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) { isIE = true; }</script>' +
                            '    <!--[if IE]>' +
                            '        <script type="text/javascript">isIE = true;</script>' +
                            '    <![endif]-->' +
                            '    <link rel="stylesheet" href="/Themes/KFC-Americana-v3/Fonts/font_en.css?v=6" />' +
                            '    <link rel="stylesheet" href="/Themes/KFC-Americana-v3/CSS/CssFile.css?v=11" type="text/css" />' +
                            '' +
                            '    <!--[if (lte IE 9)&(!IEMobile)]>' +
                            '        <script>isLegacyIE = true;</script>' +
                            '        <![endif]-->' +
                            '    <!--[if (lte IE 8)&(!IEMobile)]>' +
                            '        <link rel="stylesheet" href="/Themes/KFC-Americana-v3/CSS/min768.css" />' +
                            '        <link rel="stylesheet" href="/Themes/KFC-Americana-v3/CSS/min980.css" />' +
                            '            <link rel="stylesheet" href="/Themes/KFC-Americana-v3/CSS/IE8Support.css" />' +
                            '        <![endif]-->' +
                            '    <!--[if (lte IE 7)&(!IEMobile)]>' +
                            '            <link rel="stylesheet" href="/Themes/KFC-Americana-v3/CSS/general_enclosed_foundicons_ie7.css" />' +
                            '                <link rel="stylesheet" href="/Themes/KFC-Americana-v3/CSS/social_foundicons_ie7.css" />' +
                            '                <![endif]-->' +
                            '    <!--<link href="https://fonts.googleapis.com/css?family=Anton" rel="stylesheet" type="text/css" />-->' +
                            '' +
                            '' +
                            '    <link rel="stylesheet" href="/Themes/KFC-Americana-v3/CSS/lang_en.css?v=4" type="text/css" />' +
                            '' +
                            '    <!--[if gte IE 9]>' +
                            '' +
                            '' +
                            '                <link rel="stylesheet" href="/Themes/KFC-Americana-v3/CSS/IE9Support.css" />' +
                            '' +
                            '' +
                            '    <![endif]-->' +
                            '    <style>' +
                            '        #homePromoMenuItems {' +
                            '            padding-right: 0px;' +
                            '        }' +
                            '    </style>' +
                            '' +
                            '' +
                            '</head>' +
                            '<body>' +
                            '    <div id="wrapper">' +
                            '        <!----------------------------------------Header area--------------------------------------->' +
                            '        <div class="row">' +
                            '            <div class="headerBGContainer">' +
                            '                <div class="headerBGStripe headerBGRed"></div>' +
                            '                <div class="headerBGStripe headerBGWhite"></div>' +
                            '                <div class="headerBGStripe headerBGRed headerBGShort"></div>' +
                            '                <div class="headerBGStripe headerBGWhite"></div>' +
                            '                <div class="headerBGStripe headerBGRed "></div>' +
                            '                <div class="headerBGStripe headerBGWhite"></div>' +
                            '                <div class="headerBGStripe headerBGRed headerBGShort"></div>' +
                            '                <div class="headerBGStripe headerBGWhite"></div>' +
                            '                <div class="headerBGStripe headerBGRed headerBGShort"></div>' +
                            '                <div class="headerBGStripe headerBGWhite"></div>' +
                            '                <div class="headerBGStripe headerBGRed headerBGShort headerBGLong"></div>' +
                            '                <div class="headerBGStripe headerBGWhite"></div>' +
                            '                <div class="headerBGStripe headerBGRed"></div>' +
                            '            </div>' +
                            '        </div>' +
                            '        <div class="row">' +
                            '            <div class="taxmsg">*All prices are VAT inclusive</div>' +
                            '            <div class="columns logoContainer" style="">' +
                            '                <fieldset id="logofieldset">' +
                            '                    <div align="center" class="logoImgContainer">' +
                            '                        <a id="home" href=\'#\'>' +
                            '                            <img id="ph_logo" class="logoview" src="/Themes/KFC-Americana-v3/Image/KFC-logo.png" />' +
                            '                            <!--<img id="ph_logo" class="logoview2" src="/Themes/KFC-Americana-v3/Image/kfc_newlogo_ar.png" />' +
                            '                            <img id="ph_logo2" class="logoMobview" src="/Themes/KFC-Americana-v3/Image/kfc_logo_mobile.png" />' +
                            '                            <img id="ph_logo2" class="logoMObview2" src="/Themes/KFC-Americana-v3/Image/kfc_logo_mobile.png" />-->' +
                            '                        </a>' +
                            '                    </legend>' +
                            '                </fieldset>' +
                            '            </div>' +
                            '            </div>' +
                            '        <div class="columns hide-for-medium-port-up mobMenu" style="">' +
                            '            <a id="cornerNav" class="menu-btn">' +
                            '                ' +
                            '            </a>' +
                            '' +
                            '            <div id="imageLogoMobile">' +
                            '' +
                            '            </div>' +
                            '        </div>' +
                            '        <div class="columns hide-for-medium-port-up mobBasket topbasketContainer" style="cursor: pointer">' +
                            '            <div class="row">' +
                            '                <!--<div onclick="javascript:ShowSignInOrAccount();" class="columns noPadding " style="width:25px">' +
                            '                    <img src="/Themes/KFC-Americana-v3/Image/img_trans.gif" style="background: url(/Themes/KFC-Americana-v3/Image/user.png) ; width: 35px; height: 25px" class="mobSignin" />' +
                            '                </div>-->' +
                            '                <div onclick="javascript:showMyCart();" class="columns smallest-60 mobCartPadding">' +
                            '                    <span id="mobileBasketCount" class="itmCounterPosi">0</span>' +
                            '                    <img class="posi" src="/Themes/KFC-Americana-v3/Image/img_trans.gif" style="background: url(/Themes/KFC-Americana-v3/Image/bucket.png) no-repeat; width: auto; height: 25px;  margin-left: 15px; margin-top:-2px;vertical-align: middle; " />' +
                            '                </div>' +
                            '            </div>' +
                            '        </div>' +
                            '        <div class="headerBG">' +
                            '            <div class="row" id="headerBlock">' +
                            '                <div class="med-large-12 medium-12  small-20 smallest-30  columns lanBar" style="z-index: 6;">' +
                            '                </div>' +
                            '                <div class="large-25 medium-25  columns text-right noPadding popMobST popCart">' +
                            '                    <div id="addedToBasket">' +
                            '                        <!-- this section is displayed when an item is added to cart, it should contain information about the added item.-->' +
                            '                        <div id="addedBasketInner">' +
                            '                            <div class="row hideUnderMedium">' +
                            '                                <div class="small-12 large-12 columns">' +
                            '                                    <span class="addedText ">Added to your order</span>' +
                            '                                </div>' +
                            '                            </div>' +
                            '                            <div class="row ">' +
                            '                                <div class="small-8 large-8 columns ">' +
                            '                                    <!--<p style="font-size: 1.2em; " class="hideOverMedium"><span id="addedItemQty"></span><span> </span>items</p>-->' +
                            '                                    <p id="addedItemName" class="" style="font-size: 1.2em;"></p>' +
                            '                                </div>' +
                            '                                <div class="small-4 large-4 columns  noPadding textR">' +
                            '                                    <p style="word-break: break-all;">' +
                            '                                        <span id="addedItemPrice"></span>' +
                            '                                        <br />' +
                            '                                        <span style="font-size: 0.7em; margin-left: 15px; margin-right: 15px">' +
                            '' +
                            '                                        </span>' +
                            '                                    </p>' +
                            '                                </div>' +
                            '                            </div>' +
                            '                        </div>' +
                            '                    </div>' +
                            '                </div>' +
                            '                <div class="show-for-medium-port-up columns text-right noPadding desktopBasketContainer right" style="z-index: 4;">' +
                            '                    <div class="hotlinebox row" style="">' +
                            '                        <div class="columnNoPad hotlineboxLink hotlineboxLoc">' +
                            '                            <span class="left storePosi"><img class="posi unPosi" src="/Themes/KFC-Americana-v3/Image/location.png" /><a id="" href="javascript:ShowStoreLocator();" class="storeStyle">Store Locations</a></span>' +
                            '                        </div>' +
                            '                        <!--<div class="columnNoPad hotlineboxLink  hotlineboxPhone">' +
                            '                            <a href="tel:600522252" class="hotline hotlineNum">600 522 252</a>' +
                            '                            <img src="/Themes/KFC-Americana-v3/Image/phone-small.jpg" class="LineIcon hotlineIcon" />' +
                            '                        </div>-->' +
                            '                        <div class="columnNoPad hotlineboxLink hotlineboxSignIn">' +
                            '                            <span id="welcome_box"></span>' +
                            '                        </div>' +
                            '                        <div class="columnNoPad hotlineboxLink  hotlineboxLang">' +
                            '                            <ul id="language" class="inline-list lan">' +
                            '                                <li>' +
                            '                                    <a id="lang_url_en" href="?lang=en" style="padding-right: 5px; text-transform: uppercase;"><span class=\'active_lang\'>English</span></a>' +
                            '                                </li>' +
                            '                                <li>' +
                            '                                    <a id="lang_url_un" href="?lang=un" style="font-family: \'frutigerltarabic\';">عربي</a>' +
                            '                                </li>' +
                            '                            </ul>' +
                            '                        </div>' +
                            '' +
                            '                    </div>' +
                            '                </div>' +
                            '                <!--<div class="med-large-8 medium-12 columns noPadding halalContainer right" style="direction: ltr!important;">' +
                            '                   <img id="halal" class="halalImage" src="/Themes/KFC-Americana-v3/Image/halal.png">' +
                            '                </div>-->' +
                            '            </div>' +
                            '        </div>' +
                            '        <div id="upperSubMenu" class="row categoryNavigation hideUnderDesktop">' +
                            '            <div class="large-12 small-12 row navMAR navSHDW">' +
                            '                <div id="navMar_inner">' +
                            '                    <div id="main-nav"></div>' +
                            '                    <div id="basketContainer" class="topbasketContainer hideUnderDesktop">' +
                            '' +
                            '                        <div onclick="javascript:showMyCart();">' +
                            '                            <div class="btmViewOrder baswidth small-66 columns noPadding">' +
                            '                                ' +
                            '                                <span id="basketCount" class="itmCounterPosi">0</span>' +
                            '                                <img class="posi" src="/Themes/KFC-Americana-v3/Image/img_trans.gif" style="background: url(/Themes/KFC-Americana-v3/Image/bucket.png) 0px -0px no-repeat; width: auto; height: 25px;  margin-left: 15px; margin-top:-2px;vertical-align: middle;" />' +
                            '                                <span>YOUR BUCKET</span>' +
                            '                            </div>' +
                            '' +
                            '                            <div class="med-25 small-25 small-land-4 med-small-100 columns btmCartPrice ">' +
                            '                                <span id=\'basketTotal\'>0 Dhs</span>' +
                            '                            </div>' +
                            '                        </div>' +
                            '                        <!--   <div class="med-large-25 med-22 columns right text-left chkbutton hideUnderDesktop" onclick="javascript: CheckTotalThenCheckout();">Checkout</div>-->' +
                            '' +
                            '                    </div>' +
                            '                    <div id="imageLogo">' +
                            '                        ' +
                            '                    </div>' +
                            '                </div>' +
                            '            </div>' +
                            '        </div>' +
                            '        <!---Welcome msg-->' +
                            '        <div class="row">' +
                            '            <div class="columns">' +
                            '                <div id="welcomeMsg" class="small-12 large-12 columns noPadding welmsgBroder"></div>' +
                            '            </div>' +
                            '        </div>' +
                            '        <!----------------------------------------End of Header area--------------------------------------->' +
                            '        <!----------------------------------------Page area--------------------------------------->' +
                            '' +
                            '' +
                            '        <div id="homePageWrapper">' +
                            '            <div id="homePage" style="display: block">' +
                            '			' +
                            '                <!-- start deal ----->' +
                            '                <div class=\'row\' id=\'homeDeals\'>' +
                            '                    <div class=\'large-12 columns\'>' +
                            '                        <div class=\'section-container row\' style=\'border: 0;\'>' +
                            '                            <div id=\'homeDealsCarousel2\'>' +
                            '' +
                            '                                <div class=\'large-12 large-centered small-land-12 medium-port-12 columns Promo\' id="homePromoMenuItems">' +
                            '                                </div>' +
                            '                                <div id="promoPaging"></div>' +
                            '                            </div>' +
                            '                        </div>' +
                            '                    </div>' +
                            '                </div>' +
                            '                <!-- end deal ---->' +
                            '' +
                            '                <div id="main-nav2" class="large-12 small-12 columns noPadding hide-for-medium-port-up " style="">' +
                            '                </div>' +
                            '            </div>' +
                            '' +
                            '            <div id="content" class="row paddingMOB" style="display: none; text-align: center;"></div>' +
                            '' +
                            '            <div id="PromotionMenu" class="row" style="display: none; text-align: center; padding-top: 15px">' +
                            '                <div class="large-12 large-centered small-land-12 medium-port-12  columns" style="bottom:0!important;top:20px">' +
                            '                    <input type="button" class="WebItemButton button mobwidTH buttonBG" id="#CONTINUE_ID#" value="Continue" style="width:180px;padding: 5px 10px 45px !important; font-size:19px;" />' +
                            '                </div>' +
                            '            </div>' +
                            '			 <div id="CateringBox" class="row" style="display: none; text-align: center; padding-top: 15px">' +
                            '               ' +
                            '            </div>' +
                            '            <div class="row" id="container_inner" style="display: none; text-align: center; ">' +
                            '' +
                            '            </div>' +
                            '            <div id="StoreLocatorContainer" style="display: none;">' +
                            '            </div>' +
                            '			<!--Order Mode  -->' +
                            '			<div class="row" id="ordermode" style="display: none; text-align: center;">' +
                            '			 <h1>Awesome! You\'ve built your meal</h1>' +
                            '			 <div class="large-12 large-centered small-land-12 medium-port-12  columns mobWebItemButton" style="bottom:0!important;top:20px">' +
                            '                    <input type="button" class="WebItemButton button mobwidTH buttonBG" id="view_order" value="View Order" style="width:180px;padding: 5px 10px 45px !important; font-size:25px;" />' +
                            '                </div>' +
                            '				<h1 class="or-selection" style="padding-top: 20px;">OR</h1>' +
                            '				 <div class="large-12 large-centered small-land-12 medium-port-12  columns mobWebItemButton" style="bottom:0!important;top:20px">' +
                            '                    <input type="button" class="WebItemButton button mobwidTH buttonBG" id="order_mode" value="Order More" style="width:180px;padding: 5px 10px 45px !important; font-size:25px; background: #000;" />' +
                            '                </div>' +
                            '			</div>' +
                            '			' +
                            '			' +
                            '			' +
                            '			' +
                            '			' +
                            '			' +
                            '            <!------CART----->' +
                            '            <div class="row" id="basket_box" style="text-align: center; display: none; margin-top: 50px;">' +
                            '                <div class="columns">' +
                            '                    <h2 class="Myorder"><span class="spSize">My Order</span></h2>' +
                            '                    <a href="javascript:showHome();" class="hideUnderMedium addMoreFood">Add More Food</a>' +
                            '                    <!--<div class="blockTitle">' +
                            '                <p class="title">' +
                            '                    <span class="headerAnchor" style="cursor: default; padding-bottom: 0.7em;">' +
                            '                        <span id="cartOrderMode" class="yellowBox"></span> <span id="cartAddress" class="cartLine" style="line-height: 20px;"></span> <span class="cartLine"><a class="yellowAnchor" href="javascript:storeAddressLocator.Show();">change</a></span>' +
                            '                        <input type="button" class="button hide-under-med right" onclick="javascript: showCheckout();" value="Checkout" style="width: 150px; cursor: pointer;" />' +
                            '                    </span>' +
                            '                </p>' +
                            '            </div>-->' +
                            '                    <div class="panelCorner noPadding">' +
                            '                        <div id="cart_basketitems_box" class="basketitemsTable"></div>' +
                            '' +
                            '                        <div class="row  cartGray">' +
                            '                            <div class="cartTotalContainer columns " style="padding-top: 20px">' +
                            '                                <p><span class="left totalLabel">Subtotal:</span><span class="right subFont" id="cart_subTotalPrice"></span></p>' +
                            '                                <p><span class="left totalLabel">Transportation Fee:</span><span class="right transFont" id=\'cart_servicecharge\'></span></p>' +
                            '                                <p><span class="left totalLabel">Your total:</span><span class="right yourTTL" id=\'cart_basketTotal\'></span></p>' +
                            '                                <div style="display: none;" id="basketitems_box"></div>' +
                            '                            </div>' +
                            '' +
                            '                            <div class="large-8 columns hide-for-small" style="margin-bottom: 0px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px">' +
                            '                                <h6 class="title" style="line-height: 30px;"> </h6>' +
                            '                            </div>' +
                            '                            <div class="small-land-12 columns btnCartContainer" style="margin-bottom: 0px;">' +
                            '                                <a href="javascript:showHome();" class="hideOverMedium cartBtn addMoreFood">Add More Food</a>' +
                            '                                <!--<a class="clearbutton reducedAddButton right clearM" style="text-align: center; " id="btnBasketClear">Clear</a>-->' +
                            '                                <a id="btnAddToFavorite" class="cartBtn">Add to favorite</a>' +
                            '                                <a class="cartBtn" href="javascript:showCheckout();">Checkout<i class="foundicon-right-arrow"></i></a>' +
                            '' +
                            '                            </div>' +
                            '                            <div class="large-8 columns hide-for-small" style="margin-bottom: 0px;">' +
                            '                                <h6 class="title" style="line-height: 30px;"> </h6>' +
                            '                            </div>' +
                            '                            <!--<div class="large-6 small-land-12 columns right text-rightB" style="padding-top: 20px; padding-bottom: 20px;">' +
                            '                        <a id="btnAddToFavorite" style="font-size: 0.9em; padding-left: 20px; width: 100%; padding-bottom: 20px; text-align: right;">Add to favorite</a>' +
                            '                        <a href="javascript:showHome();" class="text-rightB" style="font-size: 0.9em; padding-left: 20px; width: 100%; padding-bottom: 20px;">Continue shopping</a>' +
                            '                    </div>-->' +
                            '                        </div>' +
                            '' +
                            '                    </div>' +
                            '                </div>' +
                            '            </div>' +
                            '            <!------End of CART----->' +
                            '        </div>' +
                            '' +
                            '        <!--<div id="lowerSubMenu" class="row categoryNavigation ">' +
                            '' +
                            '            <div id="mobileLogin" class="row hideOverMedium" style="background-color:#cb0023;height:60px;padding:5px; ">' +
                            '            </div>' +
                            '' +
                            '            <div class="row hideOverMedium contactPushy">' +
                            '' +
                            '' +
                            '' +
                            '                <a href="tel:600522252" class="hotline2" style="direction:ltr!important;display:inline-block!important;">600 522 252</a>' +
                            '                <img src="/Themes/KFC-Americana-v3/Image/img_trans.gif" style="background: url(/Themes/KFC-Americana-v3/Image/result.png) 0px -106px; width: 30px; height: 30px;" class="LineIcon2" />' +
                            '' +
                            '            </div><br /><br /><br />' +
                            '            <div class="hideOverMedium" style="height:60px;padding:5px;text-align:center  ">' +
                            '                <a href="#" class="buttonOrder ORbuttonMOB">Order Now</a>' +
                            '' +
                            '            </div>' +
                            '        </div>-->' +
                            '        <div id="homePageWrapper2">' +
                            '            <div id="homeBanner" style="display: block">' +
                            '                <!-- promo banners ---->' +
                            '                <div class="row">' +
                            '                    <br />' +
                            '' +
                            '                </div>' +
                            '                <!-- end of promo banners ---->' +
                            '            </div>' +
                            '        </div>' +
                            '        <div class="bottm1BG">' +
                            '            <div class="FooterTop">' +
                            '                <div class="footerTopInner">' +
                            '                    <form class="custom subscribe" id="signupform" action="//kfc.us9.list-manage.com/subscribe/post?u=7fd3e88a4b36d9fa383068f78&id=acdf906869" method="post" target="_blank">' +
                            '                        <input type="hidden" name="b_7fd3e88a4b36d9fa383068f78_acdf906869" value="" />' +
                            '                        <fieldset class="newletterBG">' +
                            '                            <div class="row container">' +
                            '                                <div class="newsletterTextContainer columns" style="margin-bottom: 0;">' +
                            '                                    <input placeholder="Name" type="text" id="subscriberName" name="FNAME" size="25" />' +
                            '                                    <input placeholder="Email address" type="text" id="subscriberEmail" name="EMAIL" size="25" autocapitalize="off" autocorrect="off" />' +
                            '                                    <a class="button" id="subscribeSubmit">Subscribe</a>' +
                            '                                </div>' +
                            '                            </div>' +
                            '                        </fieldset>' +
                            '                    </form>' +
                            '                    <div class="socialLinks columns">' +
                            '                        <div class="socialBtn-Container">' +
                            '                            <a class="socialBtn column" id="socialFB" href=\'https://www.facebook.com/kfcarabia\' target="_blank">' +
                            '                                <i class="icon-facebook"></i>' +
                            '                            </a>' +
                            '' +
                            '                            <a class="socialBtn column" id="socialTwitter" href="http://www.twitter.com/kfcarabia" target="_blank">' +
                            '                                <i class="icon-twitter"></i>' +
                            '                            </a>' +
                            '' +
                            '                            <a class="socialBtn column" id="socialYoutube" href="http://www.youtube.com/user/KFCArabia" target="_blank">' +
                            '                                <i class="icon-youtube"></i>' +
                            '                            </a>' +
                            '                            <a class="socialBtn column" id="socialYoutube" href="https://www.instagram.com/kfcarabia/" target="_blank">' +
                            '                                <i class="icon-instagram"></i>' +
                            '                            </a>' +
                            '                        </div>' +
                            '                    </div>' +
                            '                    <div class="PhoneNumber columns">' +
                            '                        <div class="PhoneNumber-Container">' +
                            '                            <a href="tel:600522252" class="icon-phone">600 522 252</a>' +
                            '' +
                            '                        </div>' +
                            '                    </div>' +
                            '                </div>' +
                            '            </div>' +
                            '            <div class="site-overlay">' +
                            '                <img class="clsmenu" src="/Themes/KFC-Americana-v3/Image/img_trans.gif" style="background: url(/Themes/KFC-Americana/Image/result.png) 100% -440px no-repeat;width: 100px;height: 35px;" />' +
                            '            </div>' +
                            '            <div class="FooterBody pushy">' +
                            '                <div class="row">' +
                            '' +
                            '                    <div class="columns">' +
                            '                        <div class="site-overlay">' +
                            '                            <img class="clsmenu" src="/Themes/KFC-Americana-v3/Image/img_trans.gif" style="background: url(/Themes/KFC-Americana/Image/result.png) 100% -440px no-repeat;width: 100px;height: 35px;" />' +
                            '                        </div>' +
                            '                        <div class="row" id="footer">' +
                            '                            <div class="hide-for-medium topPushyLinks">' +
                            '                                <a id="lang_url_en" href="?lang=en" class="lang"><span class=\'active_lang\'>English</span></a>' +
                            '                                <a id="lang_url_un" href="?lang=un" class="lang" style="font-family: \'frutigerltarabic\';">عربي</a>' +
                            '                                <div onclick="javascript:ShowSignInOrAccount();" class="mobSigninPushy">SIGN IN</div>' +
                            '                            </div>' +
                            '                            <div class="large-19 medium-port-12 small-land-12 small-12 columns noPadding">' +
                            '                                <h6 class="" data-footer-header="navigation">MENU</h6>' +
                            '                                <ul id="navigation" class="subnav"></ul>' +
                            '                            </div>' +
                            '                            <div class="large-16 medium-port-12 small-land-12 small-12 columns  noPadding">' +
                            '                                <h6 data-footer-header="aboutus">About Us</h6>' +
                            '                                <ul id="aboutus" class="subnav">' +
                            '                                    <li>' +
                            '                                        <a id="about">Our Story</a>' +
                            '                                    </li>' +
                            '                                    <li>' +
                            '                                        <a href="http://www.americana-group.net/portal/careers/welcome.aspx" target="_blank">Careers</a>' +
                            '                                    </li>' +
                            '' +
                            '                                    <li>' +
                            '                                        <a href="/sitemap" target="_blank">Site Map</a>' +
                            '                                    </li>' +
                            '                                </ul>' +
                            '                            </div>' +
                            '                            <div class="large-5-12 medium-port-12 small-land-12 small-12 columns  noPadding">' +
                            '                                <h6 data-footer-header="footerUserMenu">My Account</h6>' +
                            '                                <ul id="footerUserMenu" class="subnav"></ul>' +
                            '                            </div>' +
                            '' +
                            '                            <div class="large-23 medium-port-12 small-land-12 small-12 columns  noPadding">' +
                            '                                <h6 data-footer-header="customerservice">Customer Services</h6>' +
                            '                                <ul class="subnav" id="customerservice">' +
                            '                                    <li>' +
                            '                                        <a id="contact">TALK TO US</a>' +
                            '                                    </li>' +
                            '                                    <li>' +
                            '                                        <a id="storelocator">Find a KFC</a>' +
                            '                                    </li>' +
                            '                                    <li>' +
                            '                                        <a id="faq">FAQs</a>' +
                            '                                    </li>' +
                            '                                </ul>' +
                            '' +
                            '' +
                            '                            </div>' +
                            '' +
                            '                            <div class="large-22 medium-port-12 small-land-12 columns  noPadding">' +
                            '                                <h6 data-footer-header="nutrition2">Nutrition</h6>' +
                            '                                <ul class="subnav" id="nutrition2">' +
                            '                                    <li>' +
                            '                                        <a href="/kfcnutrionaltable.pdf" class="nutriView" target="_blank">Nutrition Information</a>' +
                            '                                        <a href="/kfcnutrionaltable.pdf" class="nutriView2" target="_blank">Nutrition Information</a>' +
                            '                                    </li>' +
                            '                                </ul>' +
                            '                            </div>' +
                            '' +
                            '                        </div>' +
                            '                    </div>' +
                            '                </div>' +
                            '            </div>' +
                            '        </div>' +
                            '        <div class="bottomBG">' +
                            '            <div class="row bottomPart" id="tandcs">' +
                            '                <ul class="subnav" id="policies">' +
                            '                    <li>' +
                            '                        <a id="privacy">Privacy Policy</a>' +
                            '                    </li>' +
                            '                    <li>' +
                            '                        <a id="terms">Terms of Use</a>' +
                            '                    </li>' +
                            '                    <li>' +
                            '' +
                            '                    </li>' +
                            '                </ul>' +
                            '                <p class="footerText">' +
                            '                    <small>Items availability, prices, participation, delivery areas and charges, and minimum purchase requirements for delivery may vary.<br />©<span class="thisYear"></span>KFC, Inc. All rights reserved. The KFC name, logos and related marks are trademarks of KFC, Inc.<br />PEPSI, PEPSI-COLA, PEPSI MAX and the Pepsi Globe are registered trademarks of PepsiCo, Inc.<br />All other trademarks are the property of their respective owners.</small>' +
                            '                </p>' +
                            '            </div>' +
                            '        </div>' +
                            '' +
                            '    </div>' +
                            '' +
                            '    <a class="close-reveal-modal">×</a>' +
                            '    <div id="fb-root"></div>' +
                            '    ' +
                            '<script type="text/javascript" src=\'/Handlers/HtmlPages.ashx?l=en&ts=201911111022\'></script>' +
                            '<script type="text/javascript" src=\'/Handlers/ItemsInfo.ashx?l=en&isFullData=0&ts=202001121757\'></script>' +
                            '<script type="text/javascript" src=\'/Handlers/SessionData.ashx\'></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery-1.10.2.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery-ui-1.8.20.custom.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/date.format.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/date.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.address-1.6.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.combobox.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.cookie.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.datetimepicker.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.easing.1.3.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.lavalamp.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.maskedinput-1.3.1.custom.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.md5.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/jquery.mousewheel.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Thirdparty/json2.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/DrawCart.js?ts=201802281109"></script>' +
                            '<script type="text/javascript" src="/Scripts/ShoppingCart.js?ts=201911221743"></script>' +
                            '<script type="text/javascript" src="/Scripts/General.js?ts=201902181339"></script>' +
                            '<script type="text/javascript" src="/Scripts/FacebookIntegration.js?ts=201802281109"></script>' +
                            '<script type="text/javascript" src="/Scripts/GoogleLoginIntegration.js?ts=201911100943"></script>' +
                            '<script type="text/javascript" src="/Scripts/Initialization.js?ts=201802281109"></script>' +
                            '<script type="text/javascript" src="/Scripts/ItemsViewer.js?ts=201911111009"></script>' +
                            '<script type="text/javascript" src="/Scripts/TopMenu.js?ts=201805261321"></script>' +
                            '<script type="text/javascript" src="/Scripts/UserLogin.js?ts=201901232123"></script>' +
                            '<script type="text/javascript" src="/Scripts/GoogleTracking.js?ts=201911100933"></script>' +
                            '<script type="text/javascript" src="/Scripts/AddressFromMap.js?ts=201808011745"></script>' +
                            '<script type="text/javascript" src="/Scripts/AdvertPopup.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Alert.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Announcement.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Careers.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Checkout.js?ts=201912311601"></script>' +
                            '<script type="text/javascript" src="/Scripts/ContactUs.js?ts=201904251416"></script>' +
                            '<script type="text/javascript" src="/Scripts/CustomerRegistration.js?ts=201904281800"></script>' +
                            '<script type="text/javascript" src="/Scripts/CustomizeItem.js?ts=201811121810"></script>' +
                            '<script type="text/javascript" src="/Scripts/CustomizePizza.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/DealBuilder.js?ts=201807171312"></script>' +
                            '<script type="text/javascript" src="/Scripts/EditProfile.js?ts=201805280204"></script>' +
                            '<script type="text/javascript" src="/Scripts/FavoriteItems.js?ts=201802281109"></script>' +
                            '<script type="text/javascript" src="/Scripts/FavoriteMenu.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/FormValidator.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/HistoryOrders.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/ItemInformation.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/LoginWindow.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/NaturalWidthHeight.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Navigator.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/NotifyTooltip.js?ts=201901161857"></script>' +
                            '<script type="text/javascript" src="/Scripts/OrderTracking.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/PasswordRecovery.js?ts=201805270039"></script>' +
                            '<script type="text/javascript" src="/Scripts/PizzaBuilder.js?ts=201802281109"></script>' +
                            '<script type="text/javascript" src="/Scripts/PopupForm.js?ts=201802281109"></script>' +
                            '<script type="text/javascript" src="/Scripts/Sitemap.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/StoreAddressLocator.js?ts=201809111531"></script>' +
                            '<script type="text/javascript" src="/Scripts/StoreFromMap.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/StoreInfo.js?ts=201802281109"></script>' +
                            '<script type="text/javascript" src="/Scripts/StoreLocator.js?ts=201802281109"></script>' +
                            '<script type="text/javascript" src="/Scripts/StoreMapLocation.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/VirtualGroupCustomization.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/Questionnaire.js?ts=201801081731"></script>' +
                            '<script type="text/javascript" src="/Scripts/MatrixSuggestiveSelling.js?ts=201806211703"></script>' +
                            '<script type="text/javascript" src="/Scripts/CollectExistingAddressLocation.js?ts=201806241621"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/Scroll.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/vendor\custom.modernizr.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/custom.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/jquery.accordion.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/jquery.selectBoxIt.min.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/WelcomeMsg.js?ts=201707292216"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/Script.js?ts=201912040918"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/SingleCustomization.js?ts=201906201330"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/CustomizeItemOverride.js?ts=201912010002"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/jquery.mCustomScrollbar.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/off-canvas-pushy-modified.js?ts=201709040232"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/storeAddressLocatorOverride.js?ts=201910201056"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/foundation\foundation.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/foundation\foundation.reveal.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/foundation\foundation.clearing.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/foundation\foundation.dropdown.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/vendor\jquery.placeholder.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/vendor\rwd-table.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/vendor\jquery.touchSwipe.min.js?ts=201504141154"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/SubmenuItem.js?ts=201504291446"></script>' +
                            '<script type="text/javascript" src="/Themes/KFC-Americana-v3/JS/jquery.countdown.js?ts=201504141154"></script>' +
                            '<link rel=\'stylesheet\' href=\'/Themes/KFC-Americana-v3/Fonts/font_en.css\' type=\'text/css\' />' +
                            '    <script src="/Themes/KFC-Americana-v3/JS/ItemsAvailabilityValidation.js?v=7" type="text/javascript"></script>' +
                            '    <!--<script src="/Themes/KFC-Americana-v3/JS/CRMPromotion.js?v=3" type="text/javascript"></script>-->' +
                            '	<script src="/Themes/KFC-Americana-v3/JS/GESPromotion.js?v=21" type="text/javascript"></script>' +
                            '	<script src="/Themes/KFC-Americana-v3/JS/Catering.js?v=4" type="text/javascript"></script>' +
                            '	<!-- <script src="/Themes/KFC-Americana-v3/JS/PromotionSuggestion.js?v=4" type="text/javascript"></script>-->' +
                            '	<!-- <script src="/Themes/KFC-Americana-v3/JS/FreeDelivery.js?v=6" type="text/javascript"></script>-->' +
                            '   <!-- <script src="/Themes/KFC-Americana-v3/JS/MTZCustomPromotion.js" type="text/javascript"></script>-->' +
                            '' +
                            '    <div class="row" id="sitemap_container" style="display: none; text-align: center; padding-top: 30px">' +
                            '        <h1></h1>' +
                            '        <p></p>' +
                            '    </div>' +
                            '    <script>/* window.fbAsyncInit = function () { FB.init({ appId: \'738965552824288\', status: true, xfbml: true }); }; (function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) { return; } js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/all.js"; fjs.parentNode.insertBefore(js, fjs); }(document, \'script\', \'facebook-jssdk\')); */</script>' +
                            '    <script>!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? \'http\' : \'https\'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + \'://platform.twitter.com/widgets.js\'; fjs.parentNode.insertBefore(js, fjs); } }(document, \'script\', \'twitter-wjs\');</script>' +
                            '<!--	<script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script> -->' +
                            '' +
                            '' +
                            '</body>' +
                            '</html>'
                        // "<html>  <head>  </head> <body> Terms and Condition copyright@KFC</body> </html>"
                    })
                    // let res = await miscController.privacyPolicy(headers);
                    // let sendResponse = sendSuccess(Constant.STATUS_MSG.SUCCESS.S200.DEFAULT, res)
                    // ctx.status = sendResponse.statusCode;
                    // ctx.body = sendResponse
                }
                catch (error) {
                    throw error
                }
            })
}
