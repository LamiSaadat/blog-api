# Blog API

A Hashnode inspired blog API to practice PostgreSQL and learn Prisma ORM.

All passwords are hashed with bcrypt.js before they are stored in the database. JWT tokens are used to login and protect user data.

## Run Locally

Follow these steps to run a local instance of this API. (You will need node, npm, and PostgreSQL already installed.)

### Installation

1. Clone the project

```bash
  git clone git@github.com:LamiSaadat/blog-api.git
```

2. Create a new database in pgadmin.

3. Install dependencies

```bash
  npm install
```

4. Run migrations

```bash
  npm run migrate
```

6. Set environment variables:

Rename `.env_sample` to `.env` and change the placeholder values.

```shell
  DATABASE_URL=<postgresql://USER:PASSWORD@HOST:PORT/DATABASE>
  ACCESS_TOKEN_SECRET=<your secret>
  PORT=<a port number>
```

7. Start the server

```bash
  npm start
```

## Features

- Register a user
- Login a user
- View all published posts
- View all user profiles
- View all followers of a user
- Logged in users can
  - Create posts
  - Create draft posts only visible to creator
  - Edit own posts
  - Delete own posts
  - Comment on posts
  - Like, and then unlike posts
  - Follow/Unfollow other users


## Project Demo

https://user-images.githubusercontent.com/69886705/233851574-bc4adc35-5355-4adc-8469-535624eef9de.mov


## API Reference

### Register a user

```http
  POST /user/signup
```

#### Body

    {
    "firstName": "Rory",
    "lastName": "Gilmore",
    "email": "rory@gmail.com",
    "password": "123"
    }

### Login a user

```http
  POST /user/login
```

#### Body

    {
    "email": "rory@gmail.com",
    "password": "123"
    }

### View own account details

```http
  POST /user/account
```

### View a user profile

```http
  POST /user/:id/profile
```

### Follow a user

```http
  POST /user/:id/follow
```

### Unfollow a user

```http
  POST /user/:id/unfollow
```

### Find all followers for a user

```http
  POST /user/:id/followers
```

### Get all published posts

```http
  GET /posts/feed
```

### Create a post

```http
  POST /posts/create
```

#### Body

    {
    "title": "test post title 4",
    "content": "test post content",
    "authorEmail": "givemecoffee@gmail.com",
    "published": false
    }

### Edit a post

```http
  PATCH /posts/:id
```

#### Body

    {
    "title": "edited title",
    "content": "edited content",
    "published": true
    }

### Get drafted/unpublished posts

```http
  GET /posts/drafts
```

### Delete a post

```http
  DELETE /posts/:id
```

### Comment on a post

```http
  POST /posts/:id/comment
```

#### Body

    {
    "comment": "sample comment",
    }

### Like a post

```http
  POST /posts/:id/like
```

#### Body

    {
    "like": true
    }

### Unlike a post

```http
  POST /posts/:id/unlike
```

## Lessons Learned

- Good documentation saves a lot of time and tears
- Learned about implicit vs explicit many-to-many relations which helped with creating the like and follow systems which was a struggle
- Learned to apply auth with jwt
- Learned to use pgadmin
- Learned Prisma migrations, and editing tables and creating new migrations

## Tech Stack

Node, Express, PostgreSQL, Prisma

## Acknowledgements

- [Prisma](https://www.prisma.io/)
- [bcrypt.js](https://github.com/matiassingers/awesome-readme)
- [jsonwebtoken](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
- [nodemon](https://www.npmjs.com/package/nodemon)
