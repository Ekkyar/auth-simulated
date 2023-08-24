# Next Auth Simulated App

This is a simple authentication app built with Next.js, Tailwind CSS, and JSON-server to simulate a backend. It includes user registration, login, and a dashboard page.

## Features

- User registration with unique username and email validation
- User login with JWT authentication
- Dashboard page showing user information

## Technologies Used

- Next.js
- Tailwind CSS
- JSON-server
- Axios
- Formik
- Yup
- JWT-decode
- React Toastify

## Setup

1. Clone this repository to your local machine.
2. Install the dependencies using the following command:

```bash
npm install
```

3. Run these command :

```bash
npx json-server --watch db.json --port 8000

and

npm run json-server
```

4. In a new terminal, start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:3000 to access the app.

## Usage

- Register a new user by filling out the registration form.
- Login with the registered user's email and password.
- Upon successful login, you'll be redirected to the dashboard page where you can see your user information.
- Click the "Logout" button to log out.

## Screenshots

-
