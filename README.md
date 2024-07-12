To start: create an empty database. Set up .env file( .env.example is provided ). After: npm i && npm run dev

localhost:PORT/balance/update

Request( body )
{
  "userId": number,
  "amount": number
}

Response
{
  changedBalance: number
}
