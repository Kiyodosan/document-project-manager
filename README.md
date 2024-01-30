# Document-Project-Manager

Table of contents
=================

<!--ts-->
   * [Description](#description)
   * [How To Run Application](#how-to-run-application)
   * [Functionality](#functionality)
   * [App Preview](#app-preview)
   * [Developers](#developers)
   * [License](#license)
<!--te-->

## Description 

- The document-project-manager application provides a destination for documents/images to be uploaded for others to provide input. Users can create a profile to make posts and comment on them.

## How To Run Application

Click link below to launch app
* https://document-project-manager-43ce028ce2c1.herokuapp.com/

## Functionality

* Application uses Node.js and Express.js to create a RESTful API
* Handlebars.js is used to create a template engine for the webpage 
* MySQL and Sequelize ORM are used for the database
* Implemented UploadCare's API for uploading and displaying files

## App Preview

* Home Page - When first on the home page, you will see most recent posts at the top and older posts as you scroll down. The post name is highlighted so you can click on the title to view it. In the top right corner you have a navigation bar with the options of Home, Login, Signup, and Profile. 
![home page](<public/assets/images/dpm - home.png>)

* Login Page - When you first launch the login page you are greeted with the prompts to enter your email and password and a button to sign in. Below the sign in button, in case a user doesn't have an account they can create one by clicking the link. 
![login page](<public/assets/images/dpm - login.png>)

* Sign Up Page - The Sign Up page can be accessed from the home page or the login page. To sign up the user will create a username, enter an email, and create a password then click the Sign Up button to create an account. Below the Sign Up button, there is an option to login in case the user already has an account. 
![sign up page](<public/assets/images/dpm - sign up.png>)

* Profile Page - When the profile page is launched the user is given a form to create a new post. They can enter a title, upload a file, and provide content for the post. Below the post entry you can see a list of posts the user has created. You can click on a post to view them entirely or delete them if they are no longer needed. 
![profile page](<public/assets/images/dpm - profile.png>)

* Post Page - The post page contains detailed info including the title, content, user, and date created along with uploaded files if appended.  Below the post details is a list of comments created by other users. To comment on a post a user must be logged in.  
![post page](<public/assets/images/dpm - post.png>)

## Developers

* Tyler Odo 
* Anthony Strange
* Tim Van Deusen
* Martin Castaneda 

## License 

* ISC