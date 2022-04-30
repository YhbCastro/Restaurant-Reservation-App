# Capstone: Restaurant Reservation System
[Live Application](https://mysterious-sierra-98874.herokuapp.com/dashboard)

A reservation system for fine dining restaurants, used only by restaurant personnel when a customer calls to request a reservation. 

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Running tests

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

##App functions
###Dashboard
![Dashboard](https://user-images.githubusercontent.com/85961954/166088033-9582ceaa-19ea-4283-9efa-c9da38ea7e5a.png)
 > In the dashboard page we have a list of all reservations for one date only, default as today,and display next, previous, and today buttons that allow the user to see reservations on other dates.

###New Reservation
![Reservation](https://user-images.githubusercontent.com/85961954/166088154-b272b28b-c73b-4530-8c64-d359c11079ca.png)
 > To create a new reservation the page display a form requesting the informations about the reservation, once finished and submited you are take back to the home page.

###Seat
![Seat](https://user-images.githubusercontent.com/85961954/166088236-7faa8eac-2067-414a-b924-eb03e6708ccd.png)
 > Once your reservtion is saved can be selected a available table for the party to be seated.

###New Table
![Table](https://user-images.githubusercontent.com/85961954/166088319-eb91e2fe-6de2-4e42-868c-001b30ff6413.png)
 > New tables can be added by filling a form with the table description (table number and capacity).

###Search
![Search](https://user-images.githubusercontent.com/85961954/166088359-bca66026-33b8-4cb6-a307-c539642bb30e.png)
 > The reservations can be find by using the phone number associated with it.
