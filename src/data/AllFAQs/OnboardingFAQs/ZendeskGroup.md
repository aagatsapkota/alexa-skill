---
title: "Limit Access To Specific Agents"
category: "Setup & Onboarding"
template: "faqs"
priority: 99
tags: "Zendesk"
---

Zendesk provides built-in capability to manage which agents have access to any particular plugin through their built in Group functionality. Groups are used to create collections of agents based on criteria those agents have in common. All agents must belong to at least one group, and they can belong to multiple groups.

<br />

If you would like to limit access to our plugin to a subset of agents, follow the instructions below. This can be helpful if you want to keep your monthly billing down to a subset of agents (NOTE: minimum number of agents billed each month is determined by your configured agnoStack [Pricing Tier](/pricing)).

<br />
<br />

## Creating groups

How you set up your groups depends on how you want to define your workflow and organize your agents. You might create groups by skill (software vs hardware) or to reflect the organizations they serve (for example, a group might serve only customers in a certain region or time zone or a group for agents who specifically support eCommerce). You may also want to create a specific gr

<br />

**To create a group:**

1. Click the _**Admin**_ icon (<img src="/images/zendesk-group-admin_icon.png" data-canonical-src="/images/zendesk-group-admin_icon.png" />) in the sidebar, then select _**People**_.
1. Click _**Add group_.
1. Enter a group name (ie. `agnoStack` or `Commerce`).
1. Select the agents you want to add to the group.
1. If you want this group to be the default group that all new agents are added to, select _**Make default group**_.
1. Click _**Create group**_.

<br />

<center>
  You can also watch this <a href="https://fast.wistia.net/embed/iframe/1i7g26zf9t?popover=true" target="_blank">short video to learn how to create a group.</a>
  <br />
  <iframe src="https://fast.wistia.net/embed/iframe/1i7g26zf9t?popover=true" width="500" height="300" />
</center>

<br />
<br />

## Adding Agents to Groups

After you have an agent user created, you can add them to either pre-existing groups or assign them to new groups. For information on how to create a new agent, see <a href="https://support.zendesk.com/hc/en-us/articles/203661986-Adding-end-users-agents-and-administrators#topic_h43_2k2_yg" target="_blank">Adding end-users, agents, and administrators.</a>
<br />

<br />
Agents are added or removed from groups via the groups editor, accessed from their profile page.
<br />

<br />
**Adding specific agents to a group:**

1. On an agent's profile page, click the _**Groups**_ field.
1. Select the group you want to add the agent to. A default group will automatically be assigned. See <a href="https://support.zendesk.com/hc/en-us/articles/203661966-Creating-managing-and-using-groups#topic_mq1_h13_dt" target="_blank">Changing the default group </a> for information on how to change an agent's default group.
1. Click _**Close**_.

<br />

**Adding agents to a new group:**

1. On an agent's profile page, click the _**Groups**_ field.
1. Hover over _**Create a new group**_.
1. Type your new group name.
1. Click the add icon next to the new group name.
1. Your new group will be created with the agent added.

<br />
<br />

## Restricting agnoStack to a specific group

<div class="columns">
  <div class="full">
  After you have added the specific agents you want to a particular group, you can then go into your agnoStack plugin settings and limit access to that particular Group.

  <br />
  <br />

  <b>To configure enabled group:</b>
  <ol>
    <li>Click the _**Admin**_ icon (<img src="/images/zendesk-group-admin_icon.png" data-canonical-src="/images/zendesk-group-admin_icon.png" />) in the sidebar, then select _**Apps**_ > _**Manage**_.</li>
    <li>Click on the agnoStack plugin to go to the built-in configuration page.</li>
    <li>Enable the checkbox next to _**Enable group restrictions?**_.</li>
    <li>Select the group that you configured above from the list of available groups.</li>
    <li>Click _**Update**_ to save your new group restrictions for the plugin.</li>
  </ol>
  <br />
  Once you've enabled restrictions for a specific Group(s)/Role(s) for the plugin, please be sure to log in as a user with that specific group access and ensure the plugin is available in the Apps sidebar (as well as login with an account that is not part of the restricted group and ensure the app is not showing up).
  <br />
  If you run into any trouble or need additional assistance, please contact us any time at <a href="mailto:support@agnostack.com">support@agnostack.com</a>.
  </div>
  <div class="third right">
    <img class="border" width="100%" src="/images/zendesk-plugin-group-admin.png" data-canonical-src="/images/zendesk-plugin-group-admin.png" />
  </div>
</div>
