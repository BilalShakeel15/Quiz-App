# Quiz App

This project is a Quiz App built using .NET 8 Core C# for the backend and React.js for the frontend.

## Backend
- **Technology**: .NET 8 Core C#
- **Features**:
  - **Question Pool**: A question pool is maintained in the database, from which 5 questions are randomly selected for each quiz.
  - **Participant Information**: Stores participant details and quiz results.
  - **JWT Authentication**: Implemented to secure the application, with role-based access control.
  - **Role-Based Endpoints**:
    - **Admin**: Can add, edit, and delete questions.
    - **User**: Can view and take the quiz.

## Frontend
- **Technology**: React.js
- **Features**:
  - **React Router DOM**: Ensures smooth navigation across the app.
  - **Interactive UI**: Designed with user experience in mind, making it easy to interact with the quiz.
  - **Component-Based Architecture**: The app is structured with reusable components for better code readability and maintenance.
  - **User Experience**:
    - **Login and Quiz Start**: Users can log in and start the quiz.
    - **Timer**: Tracks the time taken by users to complete the quiz, storing this data in the database.
    - **Quiz Result**: Displays the quiz results and stores them in the database.
    - **Randomized Questions**: Each quiz consists of 5 questions randomly selected from a pool containing more than 5 questions.


