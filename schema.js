/**
 * Created by choesin-yeong on 2018. 6. 16..
 */
const fetch = require('node-fetch');
//key: kBxbmXgoRJ5URnY86V86g
//secret: JGNTH3E14fFIkxNBe4rgaqCXgDEJtb7P6Na6WixfnH8

//npm install --save node-fetch
//npm install graphql
//npm install --save xml2js

const { GraphQLSchema, GraphQLObjectType,GraphQLInt, GraphQLString, GraphQLList } = require('graphql');

const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

/*
fetch(
    'https://www.goodreads.com/author/show/18541?format=xml&key=kBxbmXgoRJ5URnY86V86g'
).then(response => response.text()).then(parseXML);
*/

const BookType = new GraphQLObjectType({
    name : 'Book',
    description: '...',
    fields : () => ({
        title : {
            type : GraphQLString,
            resolve : xml =>
            xml.title[0]
           // console.log('i am xml', JSON.stringify(xml, null, 2))
        },
        isbn : {
            type : GraphQLString,
            resolve : xml => xml.isbn[0]

        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : "Author",
    description : "...",
    fields : () => ({
        name : {
            type : GraphQLString,
            resolve : xml =>
            xml.GoodreadsResponse.author[0].name[0]
        },
        books : {
            type : GraphQLList(BookType),
            resolve : xml =>
            xml.GoodreadsResponse.author[0].books[0]
        }
    })

})


module.exports = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'Query',
        description : "...",
        fields : () => ({
                author : {
                    type : AuthorType,
                    args : {
                        id : {type : GraphQLInt}
                    },
                    resolve : (root,args) => fetch(
                        `https://www.goodreads.com/author/show?id=${args.id}&key=kBxbmXgoRJ5URnY86V86g`
                    ).then(response => response.text()).then(parseXML)
                }
        })
    })
});
