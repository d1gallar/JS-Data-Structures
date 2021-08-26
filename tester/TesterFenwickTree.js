var FenwickTree = require("../FenwickTree");

const arr = [3,2,-1,6,5,4,-3,3,7,2,3];
// const arr = [4,8,5,2,6,1,0,8,1,5,4,9,1,0,6,6];
// const arr = [5,2,9,-3,5,20,10,-7,2,3,-4,0,-2,15,5]
var tree = new FenwickTree(arr);
tree.print();
console.log(tree.rangeQuery(3,4));
console.log(tree.rangeQuery(1,5));
console.log(tree.prefixSum(5));
console.log(FenwickTree.positionLSB(4))
tree.getTree().forEach(x => console.log(tree.numChildren(x)));
console.log(tree.uniqueParents());
console.log(tree.findDepth(5));
console.log(tree.findMaxDepth());