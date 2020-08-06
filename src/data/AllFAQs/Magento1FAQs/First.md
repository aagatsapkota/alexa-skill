---
title: "Troubleshoot your Magento 1 setup"
category: "Magento 1 Q&A"
priority: -1
template: "faqs"
tags: "Magento 1, fail-orders, fail-order, fail-order-m1"
---

The agnoStack plugin continues to make use of Zendesk's existing [Magento 1(M1) Extension (https://github.com/zendesk/magento_extension)](https://github.com/zendesk/magento_extension) to provide the connection between our app for Magento M1 and your Magento instance.

<br/>

If you see an error within the new agnoStack plugin containing a Reference ID and an Error Type of "`fail-order-m1`", "`fail-order`" or "`fail-orders`", this is usually related to issues with the M1 Extension.

<br/>

<center>
  <img class="border" src="/images/fail-orders-screenshot.png" data-canonical-src="/images/fail-orders-screenshot.png" />
</center>

<br/>
<br/>

## Make sure there are no URL redirects in place

For security purposes, Zendesk's built-in secure proxy used by the plugin to access the Magento Extension APIs does not support redirects.

<br/>

Make sure the store URL you have entered into the plugin points directly to your store, and is not relying on redirects at the CDN, network, or server. Having redirects in place will often result in "`fail-orders`" errors within the new app.

<br/>

The plugin will make requests similar to the following:

<br/>

<pre>https://<< YOUR ZENDESK SUBDOMAIN >>.zendesk.com/proxy/apps/secure/<< YOUR STORE URL >>%2Findex.php%2Fzendesk%2Fapi%2Fcustomers%2Fsomecustomer%40somedomain.com</pre>

<br/>

<span>
Any requests coming from **_https://<< YOUR SUBDOMAIN >>.zendesk.com/proxy/apps/secure_**
and going to your Magento server at 
**_<< YOUR STORE URL >>/index.php/zendesk/api/*_** must be able to come through without restriction (firewall or otherwise) and without any redirects.
</span>

<br/>
<br/>

You can find additional details around how to fix related errors at: [Check your Extension version and Firewall settings](/faqs/magento-1-q-a/check-your-extension-version-and-firewall-settings).

<br/>
<br/>

## Ensure you use an https (TLS) domain for your store URL

Your store URL within the new plugin's settings should start with `https://` protocol. The `http://` protocol is not supported.

<center>
  <img class="border" src="/images/magento1-configuration-url-screenshot.png" data-canonical-src="/images/magento1-configuration-url-screenshot.png" />
</center>
