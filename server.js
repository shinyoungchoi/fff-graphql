/**
 * Created by choesin-yeong on 2018. 6. 16..
 */
const express = require('express');
const graphQlHttp = require('express-graphql');
const app = express();

const schema = require('./schema');

app.use('/graphql', graphQlHttp({
    schema,
    graphiql : true
}));
app.listen(4000);
console.log("listening ...");

//write down like this and move to command line prompt
//npm init !!
//npm install --save express
//node server.js then you can see listening... on console!

//npm install --save express-graphql
//npm install graphql
