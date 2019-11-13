# DNA

This DNA assignment is developed with ReactJS in Frontend and ExpressJS in Backend.

# Mock API data (Optional)

It returns mock data based on file db.json in folder mock-api. It works as follows

- npm install / yarn install
- npm run start-api / yarn start-api

It will use port 8081 to return data. For example

  Resources
  http://localhost:8081/dnaPackages
  http://localhost:8081/subscriptions
  http://localhost:8081/subscriptions?_expand=dnaPackage
  http://localhost:8081/users

  Home
  http://localhost:8081

# Backend to support REST API
It is simple ExpressJS to build API with some seed data. It is need to

- npm install / yarn install
- npm run start / yarn start

Then, http://localhost:8082 can be opened to work directly client side

# Frontend
It is developed first with mock API JSON data based on project in folder mock-api (until this [commit](https://github.com/bpc1985/dna/commit/ae3258ecce37a6a406cdfc0cc7afd96e1eb4a70b)) and then connected to ExpressJS Rest API.
It is initialized and configured with Webpack 4 and React JS. In order to run it, these steps are needed

- npm install / yarn install
- npm run start / yarn start

Then, it can be test in http://localhost:8080

Currently it worked with 3 accounts

  - user1@mail.com / abcd@1234  => Has 3 subscriptions
  - user2@mail.com / abcd@1234  => Has 1 subscription
  - user3@mail.com / abcd@1234  => Has no subscription