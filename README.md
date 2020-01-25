Issue Tracker
=============

## Start

Run this commands in sequence:

- `npm install`
- `docker-compose -f docker/docker-compose.yaml up -d` <= To get Postgres up
- `npm run db:seed` <= Only the fist time, to create dummy data
- `npm run start`

## Testing with Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d90a03211680536c9cad)
