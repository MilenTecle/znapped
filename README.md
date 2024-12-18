# Znapped

Znapped is a social media application built using React.js for the frontend and Django REST Framework for the backend. It allows users to create posts, follow other users, like and comment on posts, send direct messages and manage notifications. The platform emphasizes user interaction and engagement through intuitive UI and dynamic content.

Live Links
- Frontend live Site: [Znapped](https://znapped-972f129d36da.herokuapp.com/)
- Backend live API: [Znapped API](https://znapped-drfapi-8eee30ca5ab2.herokuapp.com/)

- Backend repository: [Backend repository](https://github.com/MilenTecle/znapped-drf-api/tree/main)


![Znapped Am I Responsive Image](src/assets/readme-images/znapped-am-i-responsive.PNG)

## Contents

- [UI/UX](#)
    - [Project Sections](#project-sections)
    - [User Stories](#user-stories)
    - [Agile](#agile)
    - [Site Owner Goals](#site-owner-goals)
    - [5 planes of UX](#5-planes-of-ux)
    - [Design](#design)
        - [Images](#images)
        - [Colours](#colours)
        - [Fonts](#fonts)
        - [Wireframes](#wireframes)
- [Features](#features)
 -  [Authenticaton](#authentication)
  - [Navigation](#navigation)
  - [Posts](#posts)
  - [Comments](#comments)
  - [Profiles](#profiles)
  - [Notifications](#notifications)
  - [Messaging](#messaging)
  - [Features left to implement](#features-left-to-implement)
- [CRUD](#crud)
- [Database design](#database-design)
    - [Database Models](#database-models)
- [Testing](#testing)
- [Security Features](#security-features)
- [Technologies & Languages used](#technologies--languages-used)
- [Libraries & Frameworks](#libraries--frameworks)
- [Tools & Programs](#tools--programs)
- [Deployment](#deployment)
    - [Heroku](#heroku)
- [Credits](#credits)
  - [Code](#code)
  - [Content](#content)
  - [Media](#media)
  - [Acknowledgements](#acknowledgements)



## UX/UI

## Project Sections
The frontend is built using React.js and includes:
- User Authentication (Sign Up, Sign In, Token Management)
- CRUD Features: Create, read, update, delete posts, comments, messages and notifications.
- Notifications: Interactive notficications for likes, messages and followers.
- Responsive Design: The app is fully optimized for all screen sizes.

## User Stories

### Navigation & Authentication
- Navbar: As a user, I can access a navigation bar on every page so I can easily browse between different sections of the app.
- Seamless Navigation: As a user, I can navigate between pages without refreshing so that I experience fast and smooth transitions.
- Sign Up: As a user, I can create an account so that I can access features available only to registered users.
- Sign In: As a user, I can log into my account so that I can use the functionality available to logged-in users.
- Logged-in Status: As a user, I can easily tell whether I am logged in or not so that I know when I need to sign in.
- Token Refresh: As a logged-in user, I can stay logged in until I choose to log out so that my session is maintained without interruptions.
- Conditional Navbar: As a logged-out user, I can see sign-in and sign-up options in the navbar so that I can access my account or create a new one.


### Post Interaction (Comments, Likes, Edit)
- Post Comments: As a user, I can read comments on a post so that I can engage with the community’s thoughts on the content.
- Add Comments: As a logged-in user, I can comment on posts so that I can share my opinions or reactions.
- Like Notifications: As a user, I will receive notifications when someone likes my post so that I know when my content is appreciated.
- Comment Notifications: As a user, I will receive notifications when someone comments on my post so that I stay informed about new interactions.
- Edit Posts: As a post owner, I can edit the title or description of my post so that I can update or correct content after posting.
- Delete/Modify Comments: As a comment owner, I can delete or edit my comments so that I can control the content I’ve shared.


### The Feed on homepage
- View Recent Posts: As a user, I can see the latest posts ordered by the most recent so that I stay up to date with new content.
- Search Posts: As a user, I can search for posts by keywords so that I can quickly find posts and user profiles that interest me.
- Liked Posts: As a logged-in user, I can view a collection of posts I’ve liked so that I can easily revisit content I enjoy.
- Followed Users' Posts: As a logged-in user, I can see posts from users I follow so that I can keep track of their updates.
- As a user, I can see a list of the most popular profiles so that I can see which profiles are the most popular.


### User profiles & Profile page
- Profile Pages: As a user, I can view profiles of other users so that I can learn more about them and their posts.
- View All Posts by a User: As a user, I can see all the posts by a specific user so that I can explore their content or catch up on their latest updates.
- Edit Profile: As a logged-in user, I can edit my profile picture, bio, and other details so that I can personalize my account.
- Update Username & Password: As a logged-in user, I can change my username and password so that I can maintain account security.
- Profile image: As a user, I can see avatars of other users so that I can easily identify them on the platform.
- Infinite Scroll: As a user, I can scroll through posts continuously without having to click on next pages so that browsing is more convenient.


### Follows
- Follow/Unfollow: As a logged-in user, I can follow or unfollow users so that I can manage whose content appears in my feed.
- New Follower Notification: As a user, I will receive a notification when someone starts following me so that I can stay informed about new connections.

### Hashtags & tags
- Hashtag Posts: As a user, I can add hashtags to my posts so that they can be categorized and discovered by other users.
- Search by Hashtags: As a user, I can search for posts using hashtags so that I can find content related to specific topics or themes.
- Tagging users: As a user, I can tag or mention another users in posts or comments for direct interaction/attention with a specific user.

### Direct Messages
- As a user, I can send a message directly to a user so that we can have separate conversation.


### Final Touches
- As a product owner, I want the application to be fully polished, tested, and documented so that it is ready for deployment and provides a seamless experience for users.


## Agile
The development of this project followed an agile approach, emphasizing flexibility from initial planning to final implemenation. To facilitate the management of tasks
and user stories, a GitHub project was created, using the Kanban board method. To gain insights to the project's progress and detailed user stories, including their
associated tasks, please see link to the project board [here](https://github.com/users/MilenTecle/projects/5). Each user story has been categorized with labels indicating its importance and relevance to the overall functionality and usability of the application.

### Site Owner Goals
The primary goals for Znapped include:
- Encouraging user interaction through posts, comments and likes.
- Providing seamless navigation and content discovery.
- Enabling users to communicate directly through messages.
- Offering personalized feeds based on user activity.

## 5 planes of UX

### Strategy
Deliver a user-friendly social media app focusing on engagement and content sharing.

### Scope
Features include posts, comments, likes, follows, notifications and messaging.

### Structure
Easy navigation with clear paths to key features.

### Skeleton
Intuitive layouts for all devices with responsive design.

### Surface
Modern, clean visuals with emphasis on functionality.


## Design

### Images
Images are dynamically rendered based on user uploads, with placeholder assets for profiles and no-content states.

### Colours
A modern, neutral palette is used, ensuring high readability and accessibility.


### Fonts
Roboto is the main font used for the body of the application and Lato used for the headings. Sans Serif is the backup font. The fonts were imported via
[Google Fonts](https//:fonts.google.com).

## Wireframes
The wireframes were produced via Balsamiq.

<details>
  <summary>Landing Page</summary>

  ![Landing Page](src/assets/wireframes/Landing-page.png)
</details>

<details>
  <summary>Sign up</summary>

  ![Sign up](src/assets/wireframes/Sign-up.png)
</details>

<details>
  <summary>Home</summary>

  ![Home](src/assets/wireframes/Home.png)
</details>

<details>
  <summary>Create Post</summary>

  ![Create Post](src/assets/wireframes/Add-post.png)
</details>


<details>
  <summary>Liked</summary>

  ![Liked](src/assets/wireframes/Liked.png)
</details>

<details>
  <summary>Profile</summary>

  ![Profile](src/assets/wireframes/Profile.png)
</details>

<details>
  <summary>Notifications Page</summary>

  ![Notification page](src/assets/wireframes/Notifications-page.png)
</details>

<details>
  <summary>Message Page</summary>

  ![Notification page](src/assets/wireframes/Message-page.png)
</details>

<details>
  <summary>Direct Message conversation</summary>

  ![Direct Message](src/assets/wireframes/Direct-message-conversation.png)
</details>


## Features
### Authentication
1. User registration and login.
2. Logged-in status management.
3. Token-basen authentication with auto-refresh.

 <details open>
  <summary>Sign up</summary>

  ![Sign Up](src/assets/readme-images/sign_up.PNG)
  </details>

  <details open>
  <summary>Sign in </summary>

  ![Sign in](src/assets/readme-images/sign_in.PNG)
   </details>

### Navigation

1. Responsive navbar with dynamic links for logged-in and logged-out users.
2. Burger menu for smaller screens.

  <details open>
  <summary>Navbar not logged in</summary>

  ![Navbar - not logged in](src/assets/readme-images/navbar_not_logged_in.PNG)
  </details>

  <details open>
  <summary>Navbar logged in </summary>

  ![My Inventory](docs/readme_images/features/navbar_logged_in.png)
   </details>

   <details open>
   <summary>Burger dropdown</summary>

  ![Burger dropdown](src/assets/readme-images/burger_dropdown.PNG)
   </details>

</details>

### Posts

1. Users can create, edit, delete and view posts.
2. Posts support text, images and hashtags.
3. User can like post with various reactions (heart, thumbs, happy, sad and angry)
4. Users can view all posts with infinite scrolling.

 <details open>
  <summary>Create post</summary>

  ![Create post](src/assets/readme-images/create_post.PNG)
</details>

  <details open>
  <summary>Edit and delete post</summary>

  ![Edit and delete post](src/assets/readme-images/edit_delete_post.PNG)
</details>

  <details open>
  <summary>Like posts</summary>

  ![Like posts](src/assets/readme-images/like_posts_reaction.PNG)
</details>


### Comments
1. User can add, edit and delete comments on posts.
2. Mentions are supported, allowing users to tag others in comments.

<details open>
  <summary>Comments</summary>

  ![Post, edit and delete](src/assets/readme-images/post_edit_delete_comment.PNG)
</details>

### Profiles
1. View other users's profiles with their posts and follower statistics.
2. Follow/unfollow functionality.
3. Profile editing, change image, password or username.


  <details open>
  <summary>View other profiles</summary>

  ![Other users profiles](src/assets/readme-images/other_users_profile.PNG)
</details>

  <details open>
  <summary>Edit profile</summary>

  ![Edit profile](src/assets/readme-images/edit_profile.PNG)
</details>



### Notifications
1. Notifications for likes, comments, mentions, follows and messages.
2. Mark notifications as read when clicked.
3. Delete notifications in the NotificationsList.

  <details open>
  <summary>Notifications</summary>

  ![Notifications](src/assets/readme-images/notification_displayed.PNG)
</details>

  <details open>
  <summary>Notifications page</summary>

  ![Notifications page](src/assets/readme-images/notifications_page.PNG)
</details>

  <details open>
  <summary>Delete notifications</summary>

  ![Delete notifications](src/assets/readme-images/delete_notifications.PNG)
</details>


### Messaging
1. Direct messaging feature for private communication.
2. Message notifications.
2. Threaded view for conversations.
3. Delete messages in the MessageList.

  <details open>
  <summary>Messages</summary>

  ![Message notifications](src/assets/readme-images/message_notification.PNG)
</details>

  <details open>
  <summary>Messages page</summary>

  ![Messages page](src/assets/readme-images/messages_page.PNG)
</details>

  <details open>
  <summary>Delete messages</summary>

  ![Delete messages](src/assets/readme-images/delete_messages.PNG)
</details>


### Features left to implement
1. Add video upload functionality for posts. I was planning on implementing that but I had to leave it out due to time constraints.
2. Implement user mentions for post captions. I was planning on implementing this as well but I hade to leave this out as well due to time constraints.
3. Instant reply functionality in messages. I didn't have time to implement this but for the future I'm planning to add this as well.
4. Add success messages when user logs in and performs edit and delete operations.


## CRUD
CRUD functionality is included in the above features.

**Create**: An authenticated user can create posts.

**Read**: A user can read the content of their own feed and messages.

**Update** An authenticated user can edit and update their posts, comments and user details.

**Delete**: An authenticated user can delete their own posts, comments, notifications and messages.


## Database Design

### Database Models
The entity relationship diagram provided is the first draft and does not include all the fields and models in the final database.

<details open>
  <summary>Database schema</summary>

  ![Database schema](docs/readme_images/database_schema.png)
</details>



## Testing
Testing and the results can be found [here](/TESTING.md).


## Technologies & Languages used

  - HTML5
  - CSS
  - Javascript

  - [Chrome Dev Tools](https://developer.chrome.com/docs/devtools/) - Was used throughout the project to make changes and to test the responsivness.
  - [Django](https://docs.djangoproject.com/en/5.0/) - Main python framework for development of this project.
  - [ElephantSQL](https://www.elephantsql.com/) - PostgreSQL database hosting for this project.
  - [Git](https://git-scm.com/) - Git was used for version control by using the Gitpod terminal to commit and then push to Github.
  - [Github](https://github.com/) - Is where the projects code is stored after being pushed.
  - [Gitpod](https://gitpod.io/) - Was the Codespace used for this project.
  - [Heroku](https://www.heroku.com) - The cloud based platform to deploy the site on.

  ## Libraries & Frameworks
  - [Boostrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - Was used to style the app and make it responsive.
  - [Cloudinary](https://cloudinary.com/) - Used to upload the QR-code images.
  - [Crispy-boostrap5](https://pypi.org/project/crispy-bootstrap5/) - To render Django forms in a Boostrap 5 style.
  - [Django-allauth](https://docs.allauth.org/en/latest/) - Authentication library used to create the user accounts.
  - [Django-crispy-forms](https://django-crispy-forms.readthedocs.io/en/latest/) - Used to render the forms.
  - [Django-debug-toolbar](https://django-debug-toolbar.readthedocs.io/en/latest/) - Was used for debugging during the project.
  - [Gunicorn](https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/gunicorn/) - Python HTTP server for WSGI applications.
  - [Psycopg2](https://pypi.org/project/psycopg2/) - PostgreSQL database adapter for Python.
  - [QRcode](https://django-qr-code.readthedocs.io/en/latest/) -  Used to generate QR codes.
  - [Whitenoise](https://whitenoise.readthedocs.io/en/latest/) - To serve static files directly from Django.

  Additional information is available in the [requirements.txt file](requirements.txt)



   ## Tools & Programs
- [Am I Responsive](https://ui.dev/amiresponsive) - Was used to ensure that the website is responsive on diffrerent devices.
- [Balsamiq](https://balsamiq.com/) - Was used to create the wireframes before starting the project.
- [Font Awesome](https://fontawesome.com/) - Was used for Social Media icons in footer and other icons throughout the application.
- [Google Fonts](https://fonts.google.com/) - Was used to import fonts to the page.

- [JS-hint](https://jshint.com/) - Was used for Javascript Validation.
- [Lucid charts]() - Was used to create the ERD diagrams.
- [PEP-8]() - Was used for Python Validation.
- [Responsinator](http://www.responsinator.com/) - Was also used to ensure that the website is responsive on diffrerent devices.
- [W3C](https://www.w3.org/) - Was used for HTML and CSS Validation.
- [Web Formatter](https://webformatter.com/html) - Was used to make sure the format looks good.
- [WEBP Converter](https://cloudconvert.com/webp-to-png)- Also used to reduce the file size and keep the image quality.
- [TinyPNG](https://jshint.com/) - Was used to reduce the file size and keep the image quality of the background image.


## Deployment

### Heroku
The application was deployed to Heroku using the following steps:

#### Create the Heroku App
1. Log in to Heroku
2. Click on New and select Create new app from the drop-down menu.
3. Enter a unique and appropiate app name.
4. Select you region.
5. Click on "Create App"

#### Create the PostgreSQL database using ElephantSQL
1. Log in to ElephantSQL and navigate to Dashboard.
2. Click on "Create New Instance".
3. Provide a project name and choose "Tiny Turtle", the free plan.
4. Click on "Select Region" and choose Data center.
5. Review all the details and click on "Create Instance".
6. Return to the Dashboard and click on the newly created instance and copy the database URL.

#### Create and prepare files

- Create requirements.txt file
- Create a "Procfile" in the main directory and add: web: gunicorn project-name.wsgi

  ##### Env.py file
  - Create an env.py file in the main directory in your Gitpod workspace and ensure it's included in the .gitignore file.
  - Add the DATABASE_URL and SECRET_KEY to the env.py file.
  - Add the Cloudinary URL to env.py.

  ##### Settings.py file
  - Update the settings.py file to import the env.py file.
  - Add the SECRET_KEY and DATABASE_URL file paths.
  - Comment out the default database configuration.
  - Add Cloudinary to the list of installed apps.
  - Add the settings for STATIC files:
    - The URL
    - Directory path
    - Rooth path
    - Storage path
    - Media URL
    - Default file storage path
  - Link the file to the templates directory in Heroku
  - Change the templates directory to TEMPLATES_DIR
  - Add Heroku to the ALLOWED_HOSTS list

  #### Heroku Config Vars
  Add these Config Vars in Heroku:
  - SECRET_KEY and value
  - CLOUDINARY_URL
  - PORT: 8000
  - DISABLE_COLLECTSTATIC = 1

### Deploy
  - DEBUG in settings.py needs to be set to False before deploying.
  - Navigate to the deploy tab on Heroku and connect to Github and choose your repository.
  - Click on "Enable Automatic Deploys" for automatic deploys or "Deploy Branch" for manual deploys.
  - Click on view or open app to view the deployed site.

### Fork
- Navigate to the repository [Znapped](https://github.com/MilenTecle/Inventory-Manager/tree/main).
- On the right side of the page, at the top of the repository, select "Fork".
- A copy of the repository is now created.

### Clone
1. Navigate to the repository [Znapped](https://github.com/MilenTecle/Inventory-Manager/tree/main).
2. Click on the **'Code'** dropdown menu above the list of files and choose a method to copy the URL, via HTTPS, SSH or GitHub CLI.
3. Open **Terminal**, change the current working directory to the desired location of the cloned directory.
4. Type **'git clone'** and paste the URL copied form GitHub.
5. Type **'Enter'** to create the local clone.




The live link can be found here - [Znapped](https://inventory-manager-milen-aa94458871b4.herokuapp.com/)

## Credits

### Code

#### General
- I Think, Therefore I Blog - I relied on the instructions and walkthrough to setup my project.
- [Integrating Cloudinary-storage](https://dev.to/spymonk/integrating-cloudinary-storage-with-django-4ipb)
- [Django reverse import](https://docs.djangoproject.com/en/5.0/ref/urlresolvers/)
- [Change display name in django admin](https://forum.djangoproject.com/t/django-admin-page-edit-app-names/14720)
- [Debug toolbar](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html) - Was used when building the project to further investigate errors.
- [Style the login and signup form](https://github.com/danihodovic/django-allauth-ui) - Style concept was taken from here.

#### Django Authentication System

- [Django authentication system](https://docs.djangoproject.com/en/5.0/topics/auth/default/)

- [Django allauth installation guide ](https://docs.allauth.org/en/latest/installation/quickstart.html)

- [Using Google](https://medium.com/@infowithkiiru/django-user-registration-with-google-67524cce5ab7)
- [Django google oauth](https://pylessons.com/django-google-oauth)

#### Django email authentication
- [Django allauth email](https://florianbgt.com/posts/django_allauth_email_login)
- [email authentication](https://www.codesnail.com/django-allauth-email-authentication-tutorial/?utm_content=cmp-true)


#### QR-code functionality

I used code from here to build the QR-code function:

- [Make a QR-code](https://stackoverflow.com/questions/60404466/can-i-make-a-qrcode-from-a-python-function-with-django)
- [QR-code in django](https://medium.com/@mbrsagor/use-qr-code-in-django-2b5f4c97896)
- [How to generate a QR-code](https://studygyaan.com/django/how-to-generate-a-qr-code-in-django?utm_content=cmp-true)
- [Reading image](https://stackoverflow.com/questions/76900044/issues-reading-image-from-bytesio-object-using-pil)

#### Building the URL
The QR-code image wouldn't display on the deployed site. I encountered a mixed content warning and after a lot of reasearch I understood that I had to make sure the QR code images were loaded securely.


I used these guides and code to solve that problem:
- [Absolute url](https://syntaxfix.com/question/48692/how-can-i-get-the-full-absolute-url-with-domain-in-django)
- [Cloudinary quickstart](https://cloudinary.com/documentation/python_quickstart)
- [Using Cloudinary for image storage](https://www.topcoder.com/thrive/articles/using-cloudinary-for-image-storage-with-express)


#### Clone list
Credit to my mentor Antonio who helped me implement the functionality to clone a list.

#### Empty label
- [Empty label category dropdown](https://stackoverflow.com/questions/37223688/django-empty-label-in-choice-field-no-queryset)

#### Formsets
I used code from here to implement the inline-factory formset:
- [Inline formset](https://stackoverflow.com/questions/29758558/inlineformset-factory-create-new-objects-and-edit-objects-after-created)
- [Django forms](https://docs.djangoproject.com/en/5.0/ref/forms/models/)
- [Formsets](https://docs.djangoproject.com/en/5.0/topics/forms/formsets/)

### For loop counter
To number the inventory lists automatically:
- [For loop counter](https://testdriven.io/tips/f41d2a7e-ee74-4121-bfd5-976f32b9e67a/)

#### Read-only fields

I used code from here to implement the read-only function upon for inline editing:
- [Readonly-fields](https://www.appsloveworld.com/django/100/22/readonly-fields-in-django-formset#google_vignette)
- [Make readonly](https://stackoverflow.com/questions/70340853/how-to-make-some-django-inlines-read-only)


#### Sending email function
I used code from here to setup the sending email function using send_email:

- [send_email](https://docs.djangoproject.com/en/5.0/topics/email/)
- [send_email](https://stackoverflow.com/questions/55156059/how-to-reply-email-from-django-default-admin-to-the-contact)
- [sending emails with gmail](https://cbi-analytics.nl/sending-emails-with-django-1-configuration-and-basics-of-sending-emails-with-gmail/)

#### Share QR-code via email
- [Insert line break](https://stackoverflow.com/questions/22765834/insert-a-line-break-in-mailto-body)

#### Tests
- [Tests](https://testdriven.io/blog/django-custom-user-model/)
- [Transaction atomic](https://docs.djangoproject.com/en/5.0/topics/db/transactions/)

#### Using Boostrap delete confirmation
- [Delete confirmation](https://stackoverflow.com/questions/59566549/how-to-do-delete-confirmation-for-a-table-data-with-bootstrap-modal-in-django)


### Content
The content is written by the developer.


### Media
- The background Image was taken from [iStock](https://www.istockphoto.com/se)

 - I created the logo using [Canva](https://www.canva.com/)


### Acknowledgements
- Antonio, my mentor, for guiding med throughout the project with important suggestions to improve the applications funcionality.
- To the slack community for answering my questions and guiding me.
- To tutor support, for helping me when I got stuck trying to solve problems throughout the project.
- To my husband and family, for all the support and patience throughout this project.