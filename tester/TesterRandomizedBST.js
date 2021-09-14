var RandomizedBST = require('../RandomizedBST');

let randomBST = new RandomizedBST();
let arr = [4,20,50,22,43,18,100,70];
randomBST.insertAll(arr);
randomBST.toString();
// console.log(randomBST.search(20));
randomBST.clear();
randomBST.toString();
// console.log(randomBST.search(20));