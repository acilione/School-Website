# University of Catania - Web Programming - Homework 2

## Website developed in Laravel Framework (backend) and Vanilla JS (frontend)

## Feauture:

- 4 types of login: student, principal, teacher, secretary;
- logout;

- Signup as administrator (Worker - secretary);

Student profile:

- display votes;
- attendance display;
- display school timetable;
- messaging between students belonging to the same class;

Principal profile:

- addition of circulars;

Teacher profile:

- adding/modifying votes;
- addition/modification of attendance;
- display school timetable;

Secretary profile:

- adding/modifying student;
- addition/modification of worker (principal, teacher, secretary);
- adding/deleting teaching;

On the homepage the following are dynamically displayed:

- locations;
- teachers;
- circulars;

It is possible at any time (whether logged in or not) to access the activities section from the navbar, within which it is possible to use
two REST APIs:

- mathJS, which allows you to solve equations;
- Harvard Art Museums API, which allows access to the Harvard Art Museum galleries;

Notes:

- database name configuration in the dbconfig.php file. Current name: "school3".
- When the secretary adds users (both student and worker) enter a valid email address, as the password to access the new account entered will be sent via email via SendGrid API.
- on the homepage, in the 'teachers' section, the teachers who have active teaching are listed. To view other teachers in addition to the one inserted through the query in the 'structure.sql' file, it is necessary to add a teacher from the 'section add worker' and a teaching related to the teacher from the 'add teaching' section, both accessible from a secretary's profile.
