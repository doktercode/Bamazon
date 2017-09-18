var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');
var prompt = require('prompt');
var colors = require('colors');
//Make connection
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


//Grab info.
connection.query('SELECT item_id, product_name, department_name, price FROM Products', function(err, result) {
    if (err) console.log(err);

    //Create table. 
    var table = new Table({
        head: ['Item Id', 'Product Name', 'Department', 'Price'],
        style: {
            head: ['blue'],
            compact: false,
            colAligns: ['center'],
        }

    });

    //Add inventory
    for (var i = 0; i < result.length; i++) {
        table.push(
            [result[i].item_id, result[i].product_name, result[i].department_name, result[i].price]
        );
    }
    console.log(table.toString());

    prompt.start();

    //ask for item id. 

    console.log("\nWhat is the ID of the item you'd like to purchase?");
    prompt.get(["idSelection"], function(err, result) {

        var idSelection = result.idSelection;

        console.log("\nQuantity: ");
        prompt.get(["quantity"], function(err, result) {

            var quantity = result.quantity;

            // CHECK DB FOR QAUNTITY
            connection.query("SELECT stock_quantity FROM products WHERE ?", [{ item_id: idSelection }], function(err, res) {

                if (err) throw err;

                var quantityLeft = res[0].stock_quantity;

                //update database

                if (quantityLeft >= quantity) {
                    var newQuantity = parseInt(quantityLeft) - parseInt(quantity);

                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: quantityLeft }, { item_id: idSelection }], function(err, res) {
                        if (err) throw err;

                    });
                    var total;
                    connection.query("SELECT price FROM products WHERE ?", [{ item_id: idSelection }], function(err, res) {
                        var itemPrice = res[0].price;
                        total = quantity * itemPrice.toFixed(2);
                        total = total.toFixed(2);

                        console.log("\nTotal: $" + total + ".");


                        connection.end();
                    });
                } else {
                    // out
                    console.log("\nSorry, we only have " + quantityLeft + " in stock.");
                    connection.end();
                }


            }); //updating DB

        }); //quanity
    }); //id
});