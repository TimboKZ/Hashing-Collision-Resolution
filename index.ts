// Main Typescript file

///<reference path="typings/easy-table.d.ts" />

import Table = require('easy-table');

import HCR = require('./lib/hashing-collision-resolution');

var size = 19;
var string = 'ASEARCHINGEXAMPLE';

// Linear probing
console.log("\nLinear Probing\n");
var lp = new HCR.HashingCollisionResolution.LinearProbing(size, string);
printTable(lp.resolve());

// Quadratic probing
console.log("\nQuadratic Probing\n");
var qp = new HCR.HashingCollisionResolution.QuadraticProbing(size, string);
printTable(qp.resolve());

// Chaining
console.log("\nChaining\n");
var ch = new HCR.HashingCollisionResolution.Chaining(size, string);
printTable(ch.resolve());

// Function to print a table
function printTable(data:string[][]) {
    var _table = new Table();
    data.forEach(function(row) {
        for(var i = 0; i < row.length; i++) {
            _table.cell('' + i, row[i]);
        }
        _table.newRow()
    });
    console.log(_table.toString());
}
