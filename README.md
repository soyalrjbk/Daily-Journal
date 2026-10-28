# Daily Journal

A private space to write, edit, and look back on your daily journal entries.

<img width="935" height="725" alt="Screenshot 2026-10-26 at 1 08 16 PM" src="https://github.com/user-attachments/assets/2cb013e9-d641-4e02-8ef9-5865915af98c" />

## How It's Made:

**Tech used:**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Passport](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=black)

Daily Journal is a full-stack app built on an Express/MongoDB authentication boilerplate. Users create an account and log in through Passport.js, and sessions keep every entry private to the person who wrote it.

Each entry is saved in MongoDB with its date and linked to the user who wrote it. The dashboard lists entries newest first, so users can scroll back through past days. Users can write a new entry, edit an existing one, and delete entries they no longer want, which gives the app full CRUD functionality.

## Optimizations

- Add search and tags so users can find past entries quickly
- Add mood tracking with a simple chart of how the user felt over time
- Add a writing streak counter to encourage journaling every day
- Add a calendar view for jumping to any day's entry

## Lessons Learned:

This project helped me get more comfortable with full CRUD in Express, especially handling edit and delete requests and keeping the UI in sync with the database. I also learned how to scope database queries to the logged-in user, so nobody can read or change someone else's entries. Building it alongside my Time Capsule app pushed me to give each project its own design and identity, even though both started from the same boilerplate.

## Installation

1. Clone the repo
2. Run `npm install`
3. Create a `config/database.js` file (or `.env`) with your MongoDB connection string
4. Run `node server.js`
5. Open `http://localhost:8080` in your browser

