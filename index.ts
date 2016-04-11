// Main Typescript file

///<reference path="typings/easy-table.d.ts" />

import Table = require('easy-table');

import HCR = require('./lib/hashing-collision-resolution');

var size = 19;
var string = 'ASEARCHINGEXAMPLE';

// Linear probing
var lp = new HCR.HashingCollisionResolution.LinearProbing(size, string);
var lpResult = lp.resolve();
var lpTable = new Table();
lpResult.forEach(function(row) {
    for(var i = 0; i < row.length; i++) {
        lpTable.cell('' + i, row[i]);
    }
    lpTable.newRow()
});
console.log(lpTable.toString())