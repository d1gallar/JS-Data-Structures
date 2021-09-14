var Treap = require('../Treap');

let treap = new Treap();
let arr = [ 
    {key: 2, priority: 10},
    {key: 4, priority: 22},
    {key: 1, priority: 14},
    {key: 6, priority: 2},
    {key: 19, priority: 43}
];

treap.insertAll(arr);
console.log(treap.getAncestors(2));
treap.toString();
treap.remove(19);
treap.remove(4);
treap.remove(2);
// treap.clear();
// console.log(treap.getAncestors(19));
treap.toString();