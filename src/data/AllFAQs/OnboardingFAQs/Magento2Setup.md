---
title: "Configuring Magento 2"
category: "Setup & Onboarding"
priority: 2
template: "faqs"
tags: "magento2"
path: "faqs/setup-onboarding/configuring-magento-2"
---

<p>[Magento 2](https://www.adobe.com/commerce/magento.html) - as well as support for [Adobe Commerce Cloud](https://www.adobe.com/commerce/magento/enterprise.html) - is available as a Commerce Provider within the agnoStack plugin and supports using a built-in Shipping Provider, making use of the shipping configuration you've already set up in Magento. It currently supports our Starter and Professional subscription tiers, with upcoming support soon to be released for our Enterprise tier.</p>

<br/>

After you've installed the agnoStack app, upon opening any ticket within Zendesk, you will be prompted (as an admin) to Configure Your Account.

<br/>

<center>
  <img class="border" src="/images/magento2-configuration-screenshot.png" data-canonical-src="/images/magento2-configuration-screenshot.png" />
</center>

```
(NOTE: You can return to the Configure/Manage Your Account Screen at any time as and admin to modify your settings or subscription settings)
```

<br/>

## Store URL

<span>
Please enter the URL where your Magento 2 store is publicly accessible (starting with `https://`). This should not contain any extra values such as `/index.php` or similar - it is typically just as simple as **https://<< YOUR DOMAIN >>.com**.
</span>

<br/>
<br/>

## Magento 2 Dashboard

<span>
If you already have API credentials mentioned below, you may enter them in the agnoStack configuration screen, otherwise you can obtain these values by performing the following steps:
</span>

<br/>
<br/>

<span>
From your Magento 2 admin dashboard, navigate to the `Integrations` page by selecting __System__ > __Integrations__ from the menu on the dashboard.
</span>

<br/>
<br/>

<span>
Once on the `Integrations` screen, click on __Add New Integration__
 (You may use any desire name for your new Integration).
</span>

<br/>
<br/>
<br/>

## Access Token

<span>
In order for the agnoStack plugin to gain access to your Integration, you will need to configure the proper API permissions.
</span>
<br/>
<br/>
<span>
While creating your Integration, click on the API section and set the appropriate resources permissions.  You may either select 'All' from the Resource Access dropdown, or give your Integration customer permissions.  The following settings are recommended:
</span>

<br/>
<br/>

<center>
  <img
    class="border"
    width="500"
    src="/images/magento2-permissions-screenshot.png"
    data-canonical-src="/images/magento2-permissions-screenshot.png"
  />
</center>

<br/>
<br/>

<span>
Save your new new Integration, and you will be taken back to the `Integrations` listing page.  Find your new integration and click on the __Activate__ link in the third column.
</span>

<br/>
<br/>

<center>
  <img
    class="border"
    width="700"
    src="/images/magento2-integrations-screenshot.png"
    data-canonical-src="/images/magento2-integrations-screenshot.png"
  />
</center>

<br/>
<br/>

<span>
On the approval pop-up, click on __Allow__ to activate your integration.  You will be presented with your credentials where you can obtain the __Access Token__ needed for the agnoStack configuration screen.
</span>

<br/>
<br/>

<center>
  <img
    class="border"
    width="700"
    src="/images/magento2-credentials-screenshot.png"
    data-canonical-src="/images/magento2-credentials-screenshot.png"
  />
</center>

<br/>
<br/>
<br/>

## Default Payment Provider

Choose the Payment Provider that you use within your Magento 2 configuration.  We currently support Braintree and Authorize.net. If you use a Payment Provider that you don't see listed, just let us know and we'll take that info back to the team to influence the roadmap!

<br/>

By selecting "`Other Payment Method`" you will not see as rich transactional data within the agnoStack application, but can continue on with your activation.

<br/>
<br/>

<center>
  <img class="border" src="/images/magento2-configuration-defaultpayment-screenshot.png" data-canonical-src="/images/magento2-configuration-defaultpayment-screenshot.png" />
</center>

<br/>
<br/>

```
(NOTE: Depending on your selection for Default Payment Method, you may be prompted to also enter credentials for your selected Payment Provider.)
```

<br/>
<br/>
<br/>

## Store Code (OPTIONAL)

Store Code is optional, but if you are running multiple stores within you Magento 2 instance, you can obtain the store code for the store that you wish to use from the Magento Admin panel under **Stores** > **All Stores**.

<br/>
<br/>

The "`Store Code`" is set up after you choose "`Create Website`" within this page, and should be available if you're running multiple Magento 2 Stores (ie. Websites) on the same server.  The value for "`Store Code`" is listed in the "`Store View`" column on this screen and you must use the value from "`(Code: value)`".  In this example, it would be "`alternate`".

<br/>
<br/>

<center>
  <img class="border" src="/images/magento2-admin-store-code-screenshot.png" data-canonical-src="/images/magento2-admin-store-code-screenshot.png" />
</center>

<br/>
<br/>

```
(NOTE: If you need to use the agnoStack plugin to access multiple stores (or multiple Magento instances - or even multiple Commerce platforms/websites), you can install the plugin multiple times within Zendesk and configure each installation to point to a different configuration.)
```

<br/>
<br/>
<br/>

## Configure Your Payment Provider

For Magento 2, your Payment Provider configuration depends on what was selected as the "`Default Payment Provider`" in the Commerce Provider configuration.

<br/>
<br/>

## Braintree Configuration

<br/>

If Braintree is your default Payment Provider, there is nothing to configure.  Ensure that "`Magento 2`" is selected, and you can move on to the activation screen.

<br/>
<br/>

<center>
  <img class="border" src="/images/magento2-configuration-braintree-screenshot.png" data-canonical-src="/images/magento2-configuration-braintree-screenshot.png" />
</center>

<br/>
<br/>
<br/>

## Authorize.Net Configuration

<br/>

If Authorize.Net is your default Payment Provider, you must select the "`Authorize.Net`" option and enter in the credentials provided to you in your Authorize.Net admin screen.

<br/>
<br/>

<center>
  <img class="border" src="/images/magento2-configuration-authorizenet-screenshot.png" data-canonical-src="/images/magento2-configuration-authorizenet-screenshot.png" />
</center>

<br/>
<br/>
<br/>

## Configure Your Shipping Provider

For Magento 2, you do not need to configure a ShippingProvider. Our plugin will handle pulling in the proper shipping information.

<br/>

<center>
  <img 
    class="border"
    src="/images/magento2-configuration-shipping-screenshot.png"
    data-canonical-src="/images/magento2-configuration-shipping-screenshot.png"
  />
</center>

<br/>
<br/>

Once you've completed entering your Provider configuration data, continue on to [Select a Subscription](/faqs/setup-onboarding/selecting-a-subscription).
