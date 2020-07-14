---
title: "Check your Zendesk app API token"
category: "Magento 1 Q&A"
template: "faqs"
tags: "magento-1"
---

In order to set up the flow of information between Zendesk and Magento, authentication tokens must be provided to both the agnoStack plugin as well as the M1 Extension. While there is validation in there, a common occurrence is mixing up which tokens are provided.

<br/>

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

3. Copy the value from the "`API Token`" field in the Magento Extension (above) to enter into the "`API Token`" field inside of the agnoStack plugin "`Configure/Manage Your Account`" screen (below). This token should be 32 characters in length.

<br/>

<center>
<img class="border" src="/images/magento1-configuration-url-screenshot.png" data-canonical-src="/images/magento1-configuration-url-screenshot.png" />
</center>
