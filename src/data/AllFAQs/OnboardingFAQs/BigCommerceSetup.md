---
title: "Configuring BigCommerce"
category: "Setup & Onboarding"
priority: 1
template: "faqs"
tags: "bigCommerce"
path: "/faqs/setup-onboarding/configuring-big-commerce"
---

<p>[BigCommerce](https://www.bigcommerce.com) is available as a Commerce Provider within the agnoStack plugin and supports using a built-in Shipping Provider, making use of the shipping configuration you've already set up in BigCommerce. It currently supports our Starter and Professional subscription tiers, with upcoming support soon to be released for our Enterprise tier.</p>

<br/>

After you've installed the agnoStack app, upon opening any ticket within Zendesk, you will be prompted (as an admin) to Configure Your Account.

<br/>

<center>
  <img
    class="border"
    src="/images/bigcommerce-configuration-screenshot.png"
    data-canonical-src="/images/bigcommerce-configuration-screenshot.png"
  />
</center>

```
(NOTE: You can return to the Configure/Manage Your Account Screen at any time as and admin to modify your settings or subscription settings)
```

<br/>
<br/>

## BigCommerce Dashboard

<span>
If you already have API credentials mentioned below, you may enter them in the agnoStack configuration screen.  Otherwise, you can obtain these values by performing the following steps:
</span>

<br/>
<br/>

<span>
From your BigCommerce store dashboard, navigate to the API accounts page by selecting __Advanced Settings__ > __API Accounts__.
</span>

<br/>
<br/>

<span>
Once on the `Store API Accounts` screen, click on __Create API Account__ and choose the __Create V2/V3 API Token__ option. NOTE: You may give your API account any name you wish.
</span>

<br/>
<br/>
<br/>

## API Path

<span>
Copy the value of `API Path` from the screen below to use in the agnoStack plugin configuration screen.
</span>

<br />
<br />

<center>
  <img
    class="border"
    width="500"
    src="/images/bigcommerce-configuration-api-path-screenshot.png"
    data-canonical-src="/images/bigcommerce-configuration-api-path-screenshot.png"
  />
</center>

<br />
<br />

```
(NOTE: if you already have API credentials which you wish to reuse, the value for API Path is the same across all API's in your store.)
```

<br/>
<br/>
<br/>

## Client ID and Access Token

<span>
In order for the agnoStack plugin to gain access to your API, you will need to configure the proper permissions in the `OAuth Scopes` section.
</span>
<br/>
<br/>
<span>
While setting up your `API`, ensure the following scopes have proper permission:
</span>
<span>
_(other scopes can be set to your discretion)_
</span>

<br/>
<br/>

<center>
  <img
    class="border"
    width="500"
    src="/images/bigcommerce-configuration-scopes-screenshot.png"
    data-canonical-src="/images/bigcommerce-configuration-scopes-screenshot.png"
  />
</center>

<br/>
<br/>

<span>
Save your new API Account, and you will be presented with your credentials.  You will need to obtain both the __Client ID__ and __Access Token__.
</span>

<br/>
<br/>

<center>
  <img
    class="border"
    width="700"
    src="/images/bigcommerce-configuration-api-credentials-screenshot.png"
    data-canonical-src="/images/bigcommerce-configuration-api-credentials-screenshot.png"
  />
</center>

<br/>
<br/>
<br/>

## Configure Payment and Shipping Providers

For BigCommerce, you do not need to select a PaymentProvider nor ShippingProvider at this time (until we enable Enterprise tier for BigCommerce). The Shipping provider will default to a built-in Shipping Provider, making use of the shipping configuration you've already set up in BigCommerce.

<br/>

<center>
  <img 
    class="border"
    src="/images/bigcommerce-configuration-payment-shipping-screenshot.png"
    data-canonical-src="/images/bigcommerce-configuration-payment-shipping-screenshot.png"
  />
</center>

<br/>

We regularly add new Providers to the application and continually reprioritizing our Roadmap based on customer input. If you use a Gateway or Shipping Provider that you don't see listed, just let us know and we'll take that info back to the team ASAP!

<br/>
<br/>

Once you've completed entering your Provider configuration data, continue on to [Select a Subscription](/faqs/setup-onboarding/selecting-a-subscription).
