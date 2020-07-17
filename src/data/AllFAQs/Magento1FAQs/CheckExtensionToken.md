---
title: "Check your M1 Extension Agent token"
category: "Magento 1 Q&A"
template: "faqs"
tags: "magento1"
path: "/faqs/magento-1-q-a/check-your-m-1-extension-agent-token"
---

To confirm your M1 Extension is using the correct Agent token:

<br>

1. Inside the Magento Extension, go to the Zendesk configuration page by selecting **System** > **Configuration** > **Zendesk**. The "`Agent Token`" field in the Magento Extension requires a Zendesk API token created within the Zendesk admin screen. This token should be 40 characters in length.
   <br/>
   <br/>

<center>
  <img class="border" src="/images/magento1-extension-agent-token-screenshot.png" data-canonical-src="/images/magento1-extension-agent-token-screenshot.png" width="700" />
</center>

<br/>
<br/>

2. To obtain that token, open another window and log in there to your Zendesk subdomain/account.
   <br/>
   <br/>

3) In the sidebar of that Zendesk window, select **Admin**(cog icon) > **Channels** > **API**. The Zendesk API page is displayed.
   <br/>
   <br/>

4) Under the "`Token Access`" heading, you can view your current active tokens, or use the + button to add a new token.
   <br/>
   <br/>

<center>
  <img class="border" src="/images/magento1-zendesk-agent-token-screenshot.png" data-canonical-src="/images/magento1-zendesk-agent-token-screenshot.png" width="700" />
</center>

<br/>
<br/>

5. Copy the token from the Zendesk screen to paste into the Magento Extension "`API Token`" field in step 1.
