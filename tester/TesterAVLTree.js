var AVLTree = require('../AVLTree');

// let balanced = new AVLTree();
// balanced.insertAll([2,1,3]);
// balanced.toString();

// console.log('Left Heavy')
// let leftHeavy = new AVLTree();
// leftHeavy.insertAll([3,2,1]);
// leftHeavy.toString();

// console.log('Right Heavy')
// let rightHeavy = new AVLTree();
// rightHeavy.insertAll([1,2,3]);
// rightHeavy.toString();

// console.log('Left Right')
// let leftRight = new AVLTree();
// leftRight.insertAll([3,1,2]);
// leftRight.toString();

// console.log('Right Left')
// let rightLeft = new AVLTree();
// rightLeft.insertAll([1,3,2]);
// rightLeft.toString();

let random = new AVLTree();
random.insertAll([74,20,40,10,30,17]);
random.toString();
random.remove(40);
random.toString();