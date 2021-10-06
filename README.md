# Editor backend

## Description

This is a backend server for the course [jsramverk](https://jsramverk.se) at [BTH](https://www.bth.se).
[Client repository](https://https://github.com/akjon/js-frontend)

## Downloading and installing modules

```
git clone https://github.com/akjon/js-backend
cd js-backend
npm install
```

## Set database details

A './config.json' needs to be created to connect to a MongoDB Atlas cluster.

Use this format:

```
{
  "username": <MongoDB user>,
  "password": <MongoDB password>,
  "cluster": <MongoDB cluster address>
}
```

If not using MongoDB Atlas edit './db/database.js' to suit your needs.

## Starting the server

```
npm run start
```

## Available routes

### GET /editor

Returns all avaliable documents in the collection.

### POST /editor

Creates a new document in the collection with the request body's details. The id is generated in the client.

### PUT /editor/:documentId

Updates an existing document with the 'documentId' with the request body's details.
