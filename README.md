# Wanderer's Guide: API Auth Workflow Template

[![Netlify Status](https://api.netlify.com/api/v1/badges/c791c5f7-4f80-43b0-b275-7d761e897b44/deploy-status)](https://app.netlify.com/sites/wg-api-auth-workflow-template/deploys)

This is a basic template for how one can create an authorization pipeline with [Wanderer's Guide's API](https://wanderersguide.app/api_docs/#usage_and_setup).

### **[Live Demo](https://wg-api-auth-workflow-template.netlify.app/)**

### Setup and Deploy Instructions (via Netlify)

There are various sites like Netlify, you could probably use GitHub pages w/ actions instead, I just found Netlify to be the easiest to setup.

1. Clone the repo:

   ```
   git clone https://github.com/Quzzar/wanderers-guide-api-auth-workflow-template.git
   ```

1. Within the main project folder, install dependencies:

   ```
   npm install
   ```

1. [Setup Netlify project](https://app.netlify.com/start).
   There are a few ways to setup a project. I recommend importing as an existing GitHub repo.

   Once setup, every time you push new changes to your repo, it will automatically re-deploy your site.

   Now that your site has been deployed, you should have a generated link (which you can always customize later).

1. Acquire API credentials from Wanderer's Guide
   Create a new client under [Account page](https://wanderersguide.app/profile).

   <img src="https://i.imgur.com/9Soq4dO.png" alt="Wanderer's Guide Client Setup" width="300"/>

   Instead of google.com, put the link to the oauthCallback netlify function for your deployed site (ex. https://my-site.netlify.app/.netlify/functions/oauthCallback).

   After creating, if you open the dropdown, you will now see a generated client ID and API key for your client.

1. Set environment variables in Netlify

   From your Netlify main site overview page go to `Site settings > Build & deploy > Environment`.

   Add the following environment variables, referencing the values you just generated on Wanderer's Guide.

   ```env
   VITE_API_KEY = <your API key>
   VITE_CLIENT_ID = <your client ID>
   VITE_AUTH_STATE = <optional string, see WGs API docs>
   BASE_URL = <the base URL of your netlify project (ex. https://my-site.netlify.app)>
   ```

   After adding these environment variables, you will need to re-deploy your site to apply these variables.

1. _Optional_ - Add .env file for development.

   You can add a .env file to the main project folder and include the same values from the previous step in it.

1. Done!

   Your site should now work properly, as shown in the [demo](https://wg-api-auth-workflow-template.netlify.app/).

   If you're having any issues getting this template deployed and working, feel free to ask questions in our [Discord server](https://discord.com/invite/kxCpa6G).
