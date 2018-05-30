# Project Description

## Goal
Build a web app from start to finish using the tech and approaches learned to date
Turn requirements into a working product
Practice architecting an app in terms of UI/UX, Routes/API and Database
Manage a multi-developer project with git
Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
Practice demoing an app to help prepare for the final project and employer interviews


## Stack Requirements
Your projects must use:

ES6 for server-side (Node) code
ES5 for front-end code
Node
Express
RESTful routes
Using AJAX or complete SPA approach is optional
One of the following two CSS grid and UI frameworks
Bootstrap 3
Zurb Foundation 5
jQuery
SASS for styling
PostgreSQL for DB
Knex.js for querying and migrations
git for version control
heroku for hosting (hosting is optional)


## Our choose
Option 7: Food Pick-up Ordering

A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.

Extensions:
allow clients to pay for their order online, using Stripe integration for implementing secure e-commerce. If implemented, the clients would choose wether to pay online or at the counter
allow the restaurant owner to view their orders
allow the restaurant owner to manage their dishes (prices, photos, descriptions, etc.)
support for multiple restaurants instead of just the one (making it a multi-tenant SaaS)