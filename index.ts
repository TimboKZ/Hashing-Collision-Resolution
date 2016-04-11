// Main Typescript file

///<reference path="typings/easy-table.d.ts" />

import Table = require('easy-table');

import hashingCollisionResolution = require('./lib/hashing-collision-resolution');

var size = 19;
var string = 'ASEARCHINGEXAMPLE';

var linearProbing = new hashingCollisionResolution.HashingCollisionResolution.LinearProbing(size, string);
var linearProbingResult = linearProbing.resolve();

var t = new Table();

linearProbingResult.forEach(function(product) {
    for(var i = 0; i < product.length; i++) {
        t.cell('' + i, product[i]);
    }
    t.newRow()
});

console.log(t.toString())