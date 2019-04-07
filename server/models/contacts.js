/*
  File name: contacts.js
  Author's name: Phuong Linh Pham
  StudentID: 300923800
  Web App name: comp308_asgn2
*/

let mongoose = require('mongoose');

// create a model class
let contactsSchema = mongoose.Schema({
    Name: String,
    Number: String,
    Email: String,
},
{
  collection: "contacts"
});

module.exports = mongoose.model('contacts', contactsSchema);
