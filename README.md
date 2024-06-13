# Technical Assessment: Lead Developer

This assessment helps Vanti to hire people suited for the role of **Lead Developer**. As part of this role you will be developing user interfaces using Vue.js, and back-end functionality using cloud technologies. A polished and responsive user experience is key, coupled with maintainable and battle-tested code.

This assessment provides a sample project that allows basic management of booking information. This is typical of the type of system we work with daily here at Vanti. Working through this assessment you will add new features to the application to improve the utility and user experience, as well as fix bugs to ensure everything works as intended.

Outside of the technical requirements listed, we place no limits on how you want to deliver this solution. One of the things we are hoping to extract from your evaluation is an idea of what a good solution looks like to you. As this is a lead role, attention to detail is expected, but we aren't going to penalise the odd spelling mistake or duplicated code. These things happen.

When solving the below tasks try to break your work down into small changes and commit these into Git independently. The Git history really helps us to understand how you approach problem solving. Don't worry if you commit something you wish you hadn't, people change their minds or find better ways to do things all the time, this is part of our work and we like to see how you deal with this too. For larger goals, use commit messages or some other documentation to detail how the goal has been divided into tasks.

## Setup and submission

This repository is read-only, you will not be able to push changes to it. We'd like you to clone the repository, and push your changes to a code hosting site of your choosing. Try not to fork this repository directly, forks can be tracked and we'd like to reduce easy plagiarism. Using the [GitHub importer](https://github.com/new/import) to create a private copy is perfect!

Once your repository is available, send us a link / access, and let us know when you're done and we'll take a look.

Thank you for taking the time to complete this assessment, let's get started :rocket:

## Structure

There are several components to this system, as follows:

* `app` contains the user interface: a web-app using [Vue.js](https://vuejs.org/) and [Vuetify](https://v2.vuetifyjs.com/)
* `functions` contains a back-end functions for handling data changes: built using Node.js
* `server` contains a back-end with a mock database and WebSocket API: built using Node.js
* `types` contains type information: written in TypeScript

These parts have been defined to look similar to some [Firebase](https://firebase.google.com/) functionality. Different tasks will involve changes with different parts of the system.

## Goals

The client has given some feedback and comments having used the system, some messages from them are below. Use these to create some goals/tasks for improving the system. You should aim for two or three distinct tasks.

> When I press "+" to create a new booking, it does not show up in the table. I've noticed that when I load the app again it does show up though.

> Each time I want to make a change to a room, I have to ask to have the system updated. I would like a way to see the rooms we have, and also what capacity they have. It would be great if we could make changes to this ourselves.

A fellow developer has suggested a back-end feature, "auto-room creation". If a booking is created that references a room not in the store, that room should be added to the store. Using `functions`, implement this feature.

### Getting Started

To run the system, run the `server` script in the root, and `dev` script in the app.
