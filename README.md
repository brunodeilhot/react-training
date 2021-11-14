# React Stories App

This App was created to train many aspects of React such as functional components and hooks.
Users can create, share and edit their stories.
The project is meant to be used as a part of a more complex app which needs this type of funcionality.

I used the following libraries:
  - React Redux to manage global state
  - Formik for the main form component which manages the creation of new stories
  - Yup to validate form input, both with and without Formik
  - Axios to manage api interaction

For backend support:
  - PostgreSQL database created with Heroku Postgres app
  - PostgREST to create a RESTful API from the PostgreSQL database

It includes three main components:
  - ArticleForm:
    - Creation of new stories and users with form validation
  - ArticleSearch:
    - Handles user input to search stories by title or author
  - ArticleList:
    - Displays a sorted list of articles fetched, through axios, from the database
    - Filters articles based on user input in the ArticleSearch component
    - With useEffect hook maintains data synched with a setInterval
