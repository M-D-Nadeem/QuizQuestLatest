# QuizQuest

**QuizQuest** is a comprehensive quiz management application that offers a user-friendly experience for both admins and users. The platform allows for the creation of custom quizzes, exam attempts, result downloads, and secure storage of exam results for future reference. It also includes a specialized **AI Quiz** section, where users can customize their quiz experience by selecting topics, difficulty levels, question types, and the number of questions.

## Features

### Admin Features
- **Create Exams:** Admins can create new exams by specifying the subject name, duration, passing marks, total marks, and by adding questions.
- **Verify Results:** Admins have the ability to verify results for users who have attempted quizzes and can also download the results(.pdf) for record-keeping.
- **Manage Questions:** Admins can add, edit, or delete questions while setting up exams.

### User Features
- **Exam Participation:** Users can select from available quizzes displayed on the quiz portal and participate in exams.
- **Auto-Submit on Timeout:** Exams automatically end when the time limit is reached.
- **Answer Verification:** After the exam, users can review their answers and retake the exam if necessary.
- **View and Download Results:** Users can view their exam history and download their exam results(.pdf) for personal reference.
- **AI Quiz:** Users can attempt AI-generated quizzes by selecting a topic, difficulty level, number of questions, and question type (MCQ or True/False). The AI Quiz leverages the Trivia API for generating diverse questions.

## AI Quiz Options
- **Topic Selection:** Choose from a variety of topics.
- **Difficulty Levels:** Easy, Medium, Hard.
- **Question Types:** Multiple-choice or True/False.
- **Customizable Question Quantity:** Users can select the number of questions they want to attempt.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Port in which backend will be running
`PORT`

- MongoDB connection string
`MONGO_URI`

- JWT secret key for authentication
`JWT_SECRET_CODE`
`JWT_EXPIRY`

- Cors origin
`CLIENT_URL`

- Cloudinary credentials for image storage
`CLOUD_NAME`
`API_KEY`
`API_SECRET`


- For creating axios instance to connect frontend with backend
`VITE_BASE_URL`

## Installation

Follow these steps to set up the project on your local machine:
Clone the Repository

```bash
git clone https://github.com/M-D-Nadeem/QuizQuest.git
```

Install Dependencies

- Install the backend dependencies

```bash
  cd backend
  npm install 
  cd..
```
- Install the frontend dependencies
    
```bash
  cd frontend
  npm install 
  cd..
```
To run this project

Start the backend server:

```bash
  cd backend
  npm run start
```

Start the frontend development server:

```bash
  cd frontend
  npm run start
```

## Authors

- [@MD Nadeem](https://github.com/M-D-Nadeem)


## Demo

https://youtu.be/jrkH7Fr3XVQ

## Live

https://quiz-quest-latest.vercel.app/