var Treap = require('../Treap');

let treap = new Treap();
// let arr = [ 
//     {key: 2, priority: 10},
//     {key: 4, priority: 22},
//     {key: 1, priority: 14},
//     {key: 6, priority: 2},
//     {key: 19, priority: 43}
// ];

let arr = [ 
    {key: 6, priority: 1059},
    {key: 4, priority: 2489},
    {key: 8, priority: 1936},
    {key: 3, priority: 4407},
    {key: 5, priority: 9403},
    {key: 9, priority: 7336},
    {key: 1, priority: 4743},
];

treap.insertAll(arr);
// console.log(treap.getAncestors(2));
// treap.toString();
// treap.remove(19);
// treap.remove(4);
// treap.remove(2);
// treap.clear();
// console.log(treap.getAncestors(19));
treap.toString();