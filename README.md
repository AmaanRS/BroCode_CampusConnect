https://drive.google.com/file/d/1I0M704CxWUbfIpQ-ljc8qDeHaL_atwh2/view?usp=drive_link

# Requirements
Note:

    You should have Git installed on your device!!

    You should have Nodejs installed on your device!!

    You should have Mongodb server on your device!!

    The mongodb server should be running!!

    





## Run Locally
- Create a new folder

- Open an IDE (VSCode) in the folder

- Open the terminal and paste the code given below

- Clone the project

```bash
git clone https://github.com/AmaanRS/BroCode_CampusConnect.git
```

Go to the project directory

```bash
cd BroCode_CampusConnect/src/backend/
```

Install dependencies

```bash
npm install
```

Start the Backend Server

```bash
nodemon app.js
```
**Now Your Backend Server is Running!!**


Now Open a new terminal

Go to the project directory

```bash
cd BroCode_CampusConnect/src/frontend/CampusConnect/
```
Install dependencies

```bash
npm install
```

Start the Frontend Server

```bash
npm run dev
```

**Now Your Frontend Server is Running!!**

Open a Browser and Search

```bash
http://localhost:5173/
```


## How to use

- The first you will see is the Signup page

- Enter your College Email Id

- Here the Email should be in the format of (**yourname.numbers@vcet.edu.in** ) Since we took our college Email Id as Reference

- You will get a otp at that Email

- Since you don't posses that Email we changed the OTP from random number to **123456**

- Now login with the email Id and password

- Now you have to fill your profile

- **First you have to create a Admin, then Principal, then Hod, then Teachers, then Students**

- If not followed the App won't Break but you will not be able to create Id's without this order

- **Creation of Principal and Hod Id requires the approval of Admin**

- **Creation of Teachers requires the approval of Hod of Respective Department** 

## Student
- If you login as a Student you can see all the Committees on the Left SideBar

- If you are a Head of Committee or Technical Head, you can see the Committee in the NavBar **(Only Teacher/Hod can create a Committee) and add a Student**

## Teacher
- If you login as a Teacher you can see all the Committees on the Left SideBar

- You can create a Committee from the NavBar which requires the approval of Hod

- After creating an Committee you can create an Event

## Hod
- If you login as a Hod you can see all the Committees on the Left SideBar

- You can create a Committee from the NavBar

- After creating an Committee you can create an Event

- The NavBar will have a Requests button after clicking which you can see all the requests waiting for Approval

## Admin
- If you login as a Admin you can see the Request in the SideBar on clicking which you can see all the Requests waiting for Approval

END
