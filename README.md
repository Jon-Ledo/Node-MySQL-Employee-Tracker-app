# SQL Employee Tracker

![license badge](./Assets/license-badge.svg)

- [link to video showcasing app](https://www.youtube.com/watch?v=8dr8B_Ng5Mw)

## Description

This is a command line application that is built to manage a company's employee database, built using primarily [Node.js](https://nodejs.org/en/docs/), [MySQL](https://www.mysql.com/) and [Inquirer](https://www.npmjs.com/package/inquirer). The app takes user inputs in order to add departments, roles and employees into an existing database, and also update information already there.

You can watch the linked video above, to see how the application runs in your terminal.

### My motivations

Never worked with SQL before, and this was my first attempt at it, while using some other technologies I've already used. It was a difficult experience because SQL is unlike anyhting I've seen before, but I'm proud of what I was able to achieve with it so far.

### What problem does it solve?

Stores valuable employee data into a digital database, as opposed to creating paper files, and allowing employers to easily update their teams when necessary.

### What I learned

Learned some basics about the SQL database, working with MySQL Workbench and connecting the database to my code. It was also further pracitise into experimenting with Node and some popular npm packages.

## Database Tables and Relationships

![Image showing how the database tables should be configured](./Assets/12-sql-homework-demo-01.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation

1. Download the code to your own local machine and open up in a terminal of your choice (like VS code).

2. Open terminal, and run

```
npm install
```

3. Once all the missing node packages are installed, you're good to go.

```
NOTE: If nodeJS is not installed on your machine, download at nodejs.org
```

4. Be sure to have MySQL workbench installed and a local computer already setup to use SQL and create a .env file in the folder's root and set the SECRET_KEY to your own SQL password

```
SECRET_KEY="your-own-password-here"
```

5. Finally, go into the db folder, and create your own database using the schema.sql file as a base. There are also seeds in the folder to use as a template.

## Usage

Once everything is properly connected, to run application type into your terminal

```
node server.js
```

## License

[![license badge](./Assets/license-badge.svg)](https://choosealicense.com/licenses/mit/)

For more information about the licensing of this project, please click on the badge above, or follow this link https://choosealicense.com/licenses/mit/

## How to Contribute

Fork, submit pull requests and star the project!

## Questions

How to get into contact with me?

[My Github Profile](https://github.com/Jon-Ledo)

Email : jonledo.code@gmail.com
