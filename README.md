# xhelpers-todo-sample-api

## Main Dependencies and Requisites

- [x-helpers-api 2.1.6](https://github.com/wmkDev/xhelpers-api).
- [TypeScript 3.8](https://www.typescriptlang.org/).
- [Node.js 12+](https://nodejs.org/).
- [Mongoose 5.7](https://mongoosejs.com/).
  - [Mongodb](https://www.mongodb.com/).

## Option 1 - With Docker

### Before you Start
Install:
- [docker-compose](https://docs.docker.com/compose/install/).
- [docker](https://docs.docker.com/engine/install/).

### Set the environment variables

Create a file named `.env` with them in the project root folder. Following the provided `env.example`.

For a fast start you can just rename the `env.docker.example` file to `.env`

### Run the project

On the terminal:

```bash
docker-compose up
```

if you are using your own database, run the following command to start just the application
```bash
docker-compose up api
```

Go to http://localhost:3000/documentation

To stop just run
```bash
docker-compose down
```

## Option 2 - Without docker

### Before you Start
Install:
- [docker-compose](https://docs.docker.com/compose/install/).
- [docker](https://docs.docker.com/engine/install/).
- [Node.js 12+](https://nodejs.org/).
- [NPM](https://www.npmjs.com/get-npm).


### Set the environment variables

Set the environment variables on your context or create a file named `.env` with them in the project root folder. Following the provided `env.example`.

For a fast start you can just rename the `env.example` file to `.env`

### Start the database
Run:
```bash
docker-compose up -d db
```

### Run the project

Install the dependencies:
```bash
npm install
```

```bash
npm run dev
```


Go to http://localhost:3000/documentation


To stop the database just run
```bash
docker-compose down
```
