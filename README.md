# React Stories App

This App was created to train many aspects of React such as functional components and hooks.
Users can create, share and edit their stories.
The project is meant to be used as a part of a more complex app which needs this type of funcionality.

I used the following libraries:
  - <b>React Redux</b> to manage global state
  - <b>Formik</b> for the main form component which manages the creation of new stories
  - <b>Yup</b> to validate form input, both with and without Formik
  - <b>Axios</b> to manage api interaction

For backend support:
  - <b>PostgreSQL</b> database created with Heroku Postgres app
  - <b>PostgREST</b> to create a RESTful API from the PostgreSQL database

It includes three main components:
  - <b>ArticleForm</b>:
    - Creation of new stories and users with form validation
  - <b>ArticleSearch</b>:
    - Handles user input to search stories by title or author
  - <b>ArticleList</b>:
    - Displays a sorted list of articles fetched, through axios, from the database
    - Filters articles based on user input in the ArticleSearch component
    - With useEffect hook maintains data synched with a setInterval
