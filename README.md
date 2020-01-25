Issue Tracker
=============

## Start

Run this commands in sequence:

- `npm install`
- `docker-compose -f docker/docker-compose.yaml up -d` <= To get Postgres up
- Wait a few seconds until docker has finished bringing up both services
- `npm run db:migrate`
- `npm run db:seed` <= Only the fist time, to create dummy data
- `npm run start`

## Tests
Run `npm run test` to test the application

## Coverage
Coverage automatically created when running `npm run test` and can be seen on detail opening `coverage/lcov-report/index.html` in the browser.

## Testing with Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5970145e4c3ae5e21ca7)

## Database
Through Docker, this service connects to a Postgres database.
We use Postgres to keep the relations between models.

## TODO's:
- [x] users can report an issue. `POST: /issues/create`
- [x] New issues should be automatically assigned to a free support agent.
- [x] Support agents can only handle one issue at a time. (New issues will remain OPEN until an agent becomes free)
- [x] Support agents resolve issues: once done the issue is marked as resolved and the support agent becomes available to take a new issue.
- [x] The system should be able to assign unassigned issues automatically when a support agent becomes available.

# Note
`.env` files pushed on purpose to ease start of the application. Either way they are not exposing any sensitive data.

# What I would like to do if I had more time?
- [ ] Integration tests
- [ ] Proper error handling
- [ ] Typescript
