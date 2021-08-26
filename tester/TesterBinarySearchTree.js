var BinarySearchTree = require('../BinarySearchTree');

let tree = new BinarySearchTree();
tree.insertAll([15,6,23,4,7,71,50,5]);
tree.toString();
console.log(tree.remove(15))
console.log(tree.findParent(50))
console.log(tree.getLeafCount(tree.root))
tree.remove(7);
tree.remove(4);
tree.toString();