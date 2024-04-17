# Voting Application

This project is a API for conducting elections where users can vote for a set of candidates. It includes user authentication, candidate management, and live vote count tracking.

## Features

1. **User Authentication**: Users can sign up for a new account or log in to an existing account using their Aadhar card number and password.

2. **Voting**: Users can view the list of candidates and vote for one candidate. Once voted, a user cannot vote again.

3. **Live Vote Counts**: There is a route available for users to view the list of candidates sorted by their vote counts.

4. **User Profile**: Users can view and update their profile information, including changing their password.

5. **Admin Panel**: There is an admin panel available for managing candidates. Admins can add, update, and delete candidates but cannot vote.

## Routes

### User Authentication

- **POST /signup**: Create a new user account.
- **POST /login**: Log in to an existing account using Aadhar card number and password.

### Voting

- **GET /candidates**: Get the list of candidates.
- **POST /vote/:candidateId**: Vote for a specific candidate.

### Vote Counts

- **GET /vote/counts**: Get the list of candidates sorted by their vote counts.

### User Profile

- **GET /profile**: Get the user's profile information.
- **PUT /profile/password**: Change the user's password.

### Admin Candidate Management

- **POST /candidates**: Create a new candidate.
- **PUT /candidates/:candidateId**: Update an existing candidate.
- **DELETE /candidates/:candidateId**: Delete a candidate from the list.

## Technologies Used

<!-- - **Frontend**: HTML, CSS, JavaScript (or any frontend framework like React, Angular, Vue.js) -->

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MONGO_URL and PORT in .env file (same as .env.sample) 
4. Set up MongoDB and configure the connection.
5. Run the server using `npm start`.
6. Access the application through the provided routes.
