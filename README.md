
# Promodoro | Focus Tracker - Frontend

This repository contains the frontend implementation of the Time Management and Focus Tracker app named Promodoro. It provides a user-friendly, responsive interface for tracking study sessions, focus metrics, and gamification elements. Additionally, it includes two leaderboard features to foster competitiveness and motivation among users.

## Live Demo

- ⚠️ Backend of this app is hosted on Render(free tier).
- ⚠️ On Render's free tier, a service will go to sleep after approximately 15 minutes of inactivity. Please keep that in mind while checking out the live demo down below:

- ‼️ https://promodoro-app-theta.vercel.app/

Demo Credentials:
```bash
	•	Admin: admin@example.com / password123
	•	Student: student@example.com / password123
```


## Screenshots

![App Screenshot](https://i.ibb.co.com/60ksYZR/promodoro-dark-ui-1.webp)

![Dashboard](https://i.ibb.co.com/982TwMJ/promodoro-light-ui-1.webp)


## Tech Stack

	•	Framework: Next.js
	•	State Management: Zustand
	•	API Management: Tanstack Query & Axios
	•	Charting Library: Chart.js
	•	Language: TypeScript
	•	Styling: Tailwind CSS, Shadcn UI


## Features
1. Pomodoro Timer
	-	Start, pause, and reset functionality.
	-	Visual indicators for “Focus” and “Break” periods.
	-	Session count and streak progress display.
	-	Notifications (sound/visual) when sessions end.

2. Focus Dashboard
	-	Display daily and weekly focus metrics:
	    -	Total focus time.
	    -	Number of completed sessions.
	    -	Visual representation via detailed Bar Chart.
	-	Motivational messages based on user performance.

3. Gamification
	-	Streak tracking and badges for consistent focus habits.
	-	Highlight the longest streak and earned achievements.

4. Leaderboard Features
	-	Daily Leaderboard: Displays the top performers based on total focus time for the day.
	-	Overall Leaderboard: Highlights the top performers of all time, ranked by total focus time.

5. Responsive Design
	-	Optimized for mobile, tablet, and desktop devices.

6. Real-time Updates
	-	Dynamic timer and leaderboard updates without page refresh.



## Installation

1.	Clone the repository:
```bash
git clone <repository-url>
cd frontend
```
2.	Install dependencies:
```bash
npm install
```

3.	Run the development server:
```bash
npm run dev
```

4.	Open your browser and visit:
```bash
http://localhost:3000
```


4.	Open your browser and visit:
```bash
http://localhost:3000
```


## Environment Variables

This prjects requires 2 .env credentials. First one is the api url. Second one is IMGBB API KEY. You can get it from here: https://api.imgbb.com/

Create a .env file in the root directory and provide the following variables:

`NEXT_PUBLIC_API_BASE_URL=https://promodoro-backend.onrender.com/api`

`NEXT_PUBLIC_IMGBB_API_KEY='API_KEY`

