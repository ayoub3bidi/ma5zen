# Ma5zen  
A full-stack inventory web app.  

## Setup
* You need to have docker desktop app to be installed on your machine, then create a PostgreSQL container and you will find a `connection link`.   
* Change the `.env.example` to `.env`, then replace `SECRET` and `NEXTAUTH_SECRET` with a string you choose on your own.  
* For the `DATABASE_URL` you need to put the connection link from the previous step.  
* For both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` you need to generate them first from [Google Cloud Console](https://console.cloud.google.com/apis/credentials) by going to `Create credentials` menu, choose `OAuth client ID` and fill out the form (don't forget under the `Authorised JavaScript origins` to fill the URI with [http://localhost:3000](http://localhost:3000), and the same thing for `Authorised redirect URIs` with [http://localhost:3000/api/auth/callback/google](http://localhost:3000/api/auth/callback/google)).  

**Notes**:
* When you go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials), you will find yourself in the latest firebase project you have, if you want to go another project you probably need to change it from the link query (since the UI is a little bit crappy). If you want to create a new project go to firebase and create one from there.  
* If you are using VS Code, I recommend using Prisma extension for better experience with prisma files.

## Available Scripts

In the project directory, you can run:

```
npm install
```
This will install all dependencies.

```
npm run dev
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.   

```
npm run build
```
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.  
```
npx prisma generate dev
```
This will make prisma generate migrations.  
```
npx prisma studio
```
This will display prisma data in a GUI style on [http://localhost:5555](http://localhost:5555).
