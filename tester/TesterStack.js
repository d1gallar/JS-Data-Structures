var ArrayStack = require('../Stack').ArrayStack;
var LinkedListStack = require('../Stack').LinkedListStack;

let stack = new LinkedListStack();
// let stack = new ArrayStack();
stack.push(4);
stack.push(2);
stack.push(5);
stack.push(13);
stack.toString();
console.log(stack.search(0))
stack.pop();
stack.pop();
stack.pop();
stack.pop();
stack.toString();