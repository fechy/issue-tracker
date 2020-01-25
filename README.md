Issue Tracker
=============

## Start

Run this commands in sequence:

- `npm install`
- `docker-compose -f docker/docker-compose.yaml up -d` <= To get Postgres up
- `npm run db:migrate` <= Only the fist time, to create dummy data
- `npm run db:seed` <= Only the fist time, to create dummy data
- `npm run start`

## Tests
Run `npm run test` to test the application

## Testing with Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5970145e4c3ae5e21ca7)

## Database
Through Docker, this service connects to a Postgres database.
