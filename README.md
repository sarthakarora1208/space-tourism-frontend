## Inspiration

As the Billionaire space race intensifies, we need modern solutions for space flight booking.

Keyano is the world's first space marketplace.

a) The space tourism company wants to accept Euros with a European IBAN number that it provides to European customers even though the Space Tourism company is based in the US.

b) The space tourism company wants to accept Singaporean Dollars with a Singapore Virtual Account Number (VAN) that it provides to its Singaporean customers even though the Space Tourism company is based in the U.S.

c) The space tourism company wants to consume all of Rapyd’s VAN capabilities so it can accept local bank transfers from its customers around the world.

Why Credit Cards are not a good option? Credit card fees are cost-prohibitive for the space travel company. Interchange fees eat up a large portion of the payment amount. Most consumer credit cards don’t have a $100K+ limit and in many markets around the globe, credit cards are not the preferred option.

Why not use Wire Transfers? Wire transfers are expensive, can create reconciliation issues, and create a hassle for the sender as most banks will require extra due diligence for a cross-border transfer (and maybe for the large amount being sent?).

## What it does

As Space Tourism becomes mainstream, financial services will have to evolve to enable high-volume transactions.

Keyano is the world's first space flight marketplace connecting space exploration ventures directly to customers. They can search for flights, book flights and ask for refunds.

User Personas

##### Space Vendor -

- List flights
- Manage profile
- Manage tickets
- Manage funds in local bank accounts
- Process refunds

#### Space Tourists

- Search Space Flights
- Book Flights
- Cancel Flights

## How we built it

Keyano is a full-stack application built entirely using Typescript, ReactJS & NodeJS.

#### FRONTEND

ReactJs & Material UI power the frontend of the application. Redux handles the state management. Finally, Formik & Yup make for making elegant forms with dynamic error handling.

#### BACKEND

Nodejs and Typescript are used to build the backend. Express is used as a middleware to handle incoming requests from the React-based frontend. A PostgreSQL database hosted on AWS serves as the data store for the application to keep track of the audit data, the user data & the revision request data. Finally, TypeORM is an ORM (Object-relational Mapper) that helps us to write SQL queries.

#### Rapyd APIs used

Rapyd Virtual Accounts
Rapyd Disburse
Rapyd Issuing
Rapyd Wallet

## Challenges we ran into

## Accomplishments that we're proud of

We were able to complete the project in time and solve a problem that existed.

## What we learned

Rapyd Virtual Accounts
An innovative way to send money across borders

## What's next for Keyano Space Tourism

Enable multi-step payments
Adding compliance documents and
