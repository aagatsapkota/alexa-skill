---
title: "Check your Extension version and Firewall settings"
category: "Magento 1 Q&A"
template: "faqs"
tags: "Magento, Magento 1,fail-orders,fail-order,fail-order-m1"
---

Older versions of the M1 Extension are no longer supported and are likely to cause "`fail-order`" errors within the new app. Please check that your extension version matches the latest version available (https://github.com/zendesk/magento_extension). If not please update by following the instructions in [Magento: Installing the Zendesk extension for Magento.](https://support.zendesk.com/hc/en-us/articles/203660046-Magento-Integration-Installing-the-Zendesk-extension-for-Magento)

<br>

Errors caused by outdated M1 Extension versions can be seen within your Magento PHP logs, and include the following error messages:

<pre>
ArgumentCountError
<br/>
Uncaught exception ‘ArgumentCountError’ with message ‘Too few arguments to function Zendesk_Zendesk_ApiController::ordersAction()
</pre>

or

```
PHP Fatal error: Call to a member function find() on a non-object in /var/www/html/apache.git/magento/store2/app/code/community/Zendesk/Zendesk/Model/Observer.php`
```

<br/>

## Check your firewall configuration for Zendesk

<span>
If are experiencing a "`fail-orders`" error, you may have a firewall in front of your Magento instance (and/or CDN) that needs to be configured to ensure it allows access from Zendesk's built-in Secure Prooxy. Wnsure you have allowed unrestricted access to your Magento 1 Extension's API routes **_<< YOUR STORE URL >>/index.php/zendesk/api/*_** from your Zendesk Subdomain and/or Zendesk’s IPs. For more details, see [Configuring your firewall for Zendesk.](https://support.zendesk.com/hc/en-us/articles/203660846).
</span>
