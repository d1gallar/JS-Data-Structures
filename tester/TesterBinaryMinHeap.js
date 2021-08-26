var BinaryMinHeap = require("../BinaryMinHeap");

let heap = new BinaryMinHeap();
let arr = [10, 20, 25, 6, 12, 15, 4, 16];
heap.buildMinHeap(arr);
heap.toString();
heap.remove(6);
heap.toString();