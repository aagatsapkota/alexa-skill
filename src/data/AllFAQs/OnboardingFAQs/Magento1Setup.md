---
title: "Configuring Magento 1"
category: "Setup & Onboarding"
priority: 3
template: "faqs"
tags: "Magento, Magento 1"
---

<p>[Magento 1](https://magento.com/blog/magento-news/magento-community-edition-1.9.1-now-available-download) is available as a Commerce Provider within the agnoStack plugin with basic support for our Free as well as Starter subscription tiers.</p>

<br/>

The new agnoStack "`M1 plugin`" continues to make use of Zendesk's existing [Magento 1(M1) Extension (https://github.com/zendesk/magento_extension)](https://github.com/zendesk/magento_extension) to provide the connection between our app for Magento M1 and your Magento instance.

<br/>

After you've installed the agnoStack app, upon opening any ticket, you will be prompted (as an admin) to Configure Your Account.

<br/>

<center>
<img class="border" src="/images/magento1-configuration-screenshot.png" data-canonical-src="/images/magento1-configuration-screenshot.png" />
</center>

```
(NOTE: You can return to the Configure/Manage Your Account Screen at any time as and admin to modify your settings or subscription settings)
```

<br/>

## Store URL

<span>
Please enter the URL where your Magento 1 store is publicly accessible (starting with `https://`). This should be the location where you have installed the Magento 1 Extension and should not contain any extra values such as `/index.php` or similar - it is typically just as simple as **https://<< YOUR DOMAIN >>.com**.
</span>

<br/>
<br/>

## API Token

The agnoStack Zendesk plugin needs to be provided with the API token provided by the Magento Extension.

<br/>

1. Log into your Magento Admin Panel and access the configuration page by selecting **System** > **Configuration** > **Zendesk**.

<br/>

<center>
  <img class="border" src="/images/magento1-extension-api-token-screenshot.png" data-canonical-src="/images/magento1-extension-api-token-screenshot.png" width="700" />
</center>

<br/>
<br/>

2. Under the **API Details** section, ensure that the "`API Enabled`" dropdown option is set to Yes.

<br/>
<br/>

3. Copy the value from the "`API Token`" field in the Magento Extension (above) to enter into the "`API Token`" field inside of the agnoStack plugin "`Configure/Manage Your Account`" screen. This token should be 32 characters in length.

<br/>
<br/>

## Store Code (OPTIONAL)

Store Code is optional, but if you are running multiple stores within you Magento 1 instance, you can obtain the store code for the store that you wish to use from the Magento Admin panel under **System** > **Manage Stores**.

<br/>
<br/>

The "`Store Code`" is set up when you create a "`New Website`" within that page initially and should be available if you're running multiple Magento 1 Stores (ie. Websites) on the same server.

<center>
  <img class="border" src="/images/magento1-admin-store-code-screenshot.png" data-canonical-src="/images/magento1-admin-store-code-screenshot.png" />
</center>

<br/>
<br/>

```
(NOTE: If you need to use the agnoStack plugin to access multiple stores (or multiple Magento instances - or even multiple Commerce platforms/websites), you can install the plugin multiple times in Zendesk and configure each installtion pointing to a different configuration.)
```

<br/>

## Troubleshooting Zendesk Magento 1 Extension

If you're having any trouble setting up or running the app, please see our [Magento 1 Troubleshooting Guide](/faqs/magento-1/troubleshoot-your-magento-1-setup).

<br/>
<br/>

Once you've completed entering your Provider configuration data, continue on to [Select a Subscription](/faqs/setup-onboarding/selecting-a-subscription). Our Magento 1 Provider is available today for both our Starter tier, providing core functionality needed to support most eCommerce businesses, as well as a Free tier with basic funcationality matching the previous "Zendesk M1 plugin".

<br/>

We will continue to explore adding our other tiers to our Magento 1 integration, prioritized based on client interest. Contact us any time at <a href="mailto:support@agnostack.com?subject=Magento%201">support@agnostack.com</a> to learn more or share any input.
