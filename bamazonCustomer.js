var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');
var prompt = require('prompt');
var colors = require('colors');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gopher1234',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query('SELECT item_id, product_name, department_name, price FROM Products', function(err, result) {
    if (err) console.log(err);

    var table = new Table({
        head: ['Item Id', 'Product Name', 'Department', 'Price'],
        style: {
            head: ['blue'],
            compact: false,
            colAligns: ['center'],
        }

    });
    for (var i = 0; i < result.length; i++) {
        table.push(
            [result[i].item_id, result[i].product_name, result[i].department_name, result[i].price]
        );
    }
    console.log(table.toString());
});