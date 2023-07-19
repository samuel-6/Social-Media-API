# NoSQL Challenge: Social Network API

## Description

This project aimed to develop a social network API using MongoDB, a NoSQL database. We were driven by the need to handle large amounts of unstructured data, a common occurrence in many social networks. The API allows users to share their thoughts, react to their friends' thoughts, and manage a friend list. In the process, we leveraged Express.js for routing and the Mongoose ODM for easier interactions with MongoDB. We learned about NoSQL database management, data modeling with MongoDB, and CRUD operations with Mongoose.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Credits](#credits)
- [License](#license)

## Installation

To get this application up and running, follow these steps:

1. Clone the repository to your local machine.
2. Install Node.js if not already installed.
3. Navigate to the project directory and run `npm install` to install necessary dependencies.
4. Ensure MongoDB is installed and running on your machine.
5. Run `npm start` to start the server and sync the Mongoose models to the MongoDB database.

## Usage

Use API testing platforms like Postman or Insomnia to interact with the API endpoints. Available routes allow you to:

- Fetch all users and thoughts (GET request).
- Create, update, and delete users and thoughts (POST, PUT, DELETE requests).
- Add and remove reactions to thoughts and friends to a user's friend list (POST, DELETE requests).

## Demo

Because the application isn't deployed, we have provided a walkthrough video demonstrating its functionality. Check it out [here](LINK_TO_YOUR_VIDEO).

## Credits

This project was developed by [Samuel Munguia](https://www.github.com/samuel-6). 

## License

This project is licensed under the terms of the MIT License.

---

## Features

This API boasts several features, including:

- Full CRUD operations for users and thoughts.
- Ability to add and remove friends.
- Ability to post and delete reactions to thoughts.

## How to Contribute

Interested in contributing? We'd love to have you! Please reach out via GitHub for guidelines on how to get involved.

## Tests

To run tests on the application, navigate to the project directory and run `npm test`. This will start the test suite included in the `tests` folder.