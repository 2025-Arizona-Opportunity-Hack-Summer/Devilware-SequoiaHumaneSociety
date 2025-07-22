# 2025_summer Hackathon Project

## Quick Links

- Nonprofit: [Sequoia Humane Society](https://ohack.dev/nonprofit/9ajAkAzo9rnb0IOmE4VY)
- [Hackathon Details](https://www.ohack.dev/hack/2025_summer)
- [Team Slack Channel](https://opportunity-hack.slack.com/app_redirect?channel=devilware)

## Creator

@Faisal Alyousefi (on Slack)

## Team "Devilware"

- [Nghi H.](https://github.com/GittBitt)
- [Ngoc Dinh Khoa Nguyen](https://github.com/KhoaDinhNguyen)
- [Faisal Alyousefi](https://github.com/fkalyousefi)
<!-- Add all team members -->

## Project Overview

Brief description of your project and its goals.

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Python, Node.js, Express.js
- Database: MongoDB, AWS, Passport.js
- APIs: AWS S3
<!-- Add/modify as needed -->

## Local installation and running

Instructions on how to set up and run your project locally.

### Prerequistes

- git, any version
- **Node.js >= 20.16.0** and **npm >= 10.8.2** are the minimum required versions that this repo runs on, but we always recommend using the latest version of Node.js.

### Frontend Application `/matchmaker-app`

This section details the installation, running, and environment configurations of the `/matchmaker-app` directory, which houses our entire client-side application.

#### Installation and running

```bash
# Clone the repository
git clone https://github.com/2025-Arizona-Opportunity-Hack-Summer/Devilware-SequoiaHumaneSociety

# Change directory to frontend app folder
cd matchmaker-app

# Install dependencies
npm install

# Run development frontend server
npm run dev

# To run on both mobile devices, run dev server with network access
npx vite --host

```

#### Environment variables configure

This project utilizes environment variables for configuration

**Setup:**

1. Create a `.env` file based on `.env.example` and fill in necessary environment variables
2. Populate it with the following variables:

| Variable Name                      | Description                                                                                                                                     |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL`                     | The base URL for the backend API server. All other endpoints will be appended to this URL.                                                      |
| `VITE_USER_ENDPOINT`               | The relative path for user-related API operations. Used in conjunction with `VITE_API_URL`.                                                     |
| `VITE_PETS_ENDPOINT`               | The relative path for pet-related API operations. Used in conjunction with `VITE_API_URL`.                                                      |
| `VITE_USER_QUESTIONNAIRE_ENDPOINT` | The relative path to access a user's questionnaire data. **Must be appended to `VITE_USER_ENDPOINT`**.                                          |
| `VITE_FAVORITE_PET_ENDPOINT`       | The relative path to access a user's favorited pets. **Must be appended to `VITE_USER_ENDPOINT`**.                                              |
| `VITE_PROPELAUTH_URL`              | The URL for the [PropelAuth](https://www.propelauth.com/) authentication service, used for user account management (e.g., login, registration). |

**Example `.env` file for local development:**

```env
VITE_API_URL=http://localhost:3000
VITE_PETS_ENDPOINT=pets
VITE_USER_ENDPOINT=users
VITE_FAVORITE_PET_ENDPOINT=favorite-pets
VITE_USER_QUESTIONNAIRE_ENDPOINT=questionnaire
VITE_PROPELAUTH_URL=https://1234567890.propelauthtest.com
```

**Generate PropelAuth URL**

Follow this [doc](https://docs.propelauth.com/getting-started/quickstart-fe)

## Your next steps

1. ✅ Add everyone on your team to your GitHub repo like [this video posted in our Slack channel](https://opportunity-hack.slack.com/archives/C1Q6YHXQU/p1605657678139600)
2. ✅ Create your DevPost project [like this video](https://youtu.be/vCa7QFFthfU?si=bzMQ91d8j3ZkOD03)
3. ✅ Use the [this DevPost]() to submit your project
4. ✅ Your DevPost final submission demo video should be 4 minutes or less
5. ✅ Review the judging criteria on DevPost

# What should your final Readme look like?

Your readme should be a one-stop-shop for the judges to understand your project. It should include:

- Team name
- Team members
- Slack channel
- Problem statement
- Tech stack
- Link to your DevPost project
- Link to your final demo video
- Any other information you think is important

You'll use this repo as your resume in the future, so make it shine! 🌟

Examples of stellar readmes:

- ✨ [2019 Team 3](https://github.com/2019-Arizona-Opportunity-Hack/Team-3)
- ✨ [2019 Team 6](https://github.com/2019-Arizona-Opportunity-Hack/Team-6)
- ✨ [2020 Team 2](https://github.com/2020-opportunity-hack/Team-02)
- ✨ [2020 Team 4](https://github.com/2020-opportunity-hack/Team-04)
- ✨ [2020 Team 8](https://github.com/2020-opportunity-hack/Team-08)
- ✨ [2020 Team 12](https://github.com/2020-opportunity-hack/Team-12)
