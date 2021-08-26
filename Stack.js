/**David Gallardo
 * File: Stack.js
 * Date: 7/30/2021
 */

var SinglyLinkedList = require('./SinglyLinkedList.js');

//Creates a stack by using a singly linked list.
class LinkedListStack {
    constructor(){
        this.top = null;
        this.list = new SinglyLinkedList();
    }

    //Removes the object at the top of this stack 
    //and returns that object as the value of this function.
    pop(){
        if(this.list.isEmpty) return null;
        var removed = this.list.removeLast();
        this.top = this.list.peekLast();
        return removed;
    }

    //Pushes the element onto the top of this stack.
    push(element){
        this.list.add(element);
        this.top = this.list.peekLast();
    }

    //Returns the 1-based position where an object is on this stack.
    search(element){ 
        if(this.list.indexOf(element) === -1) {
            return -1;
        } else {
            return this.list.indexOf(element) + 1;
        }
    }

    //Tests if this stack is empty
    empty(){ return this.list.isEmpty(); }

    //Looks at the element at the top of this stack without removing it from the stack.
    peek(){ return this.top; }

    toString(){   
        if(this.list.isEmpty()) return console.log(" ");
        let result = "";
        let current = this.list.head;
        while(current !== null){
            if(current.next !== null){
                result += `${current.data} -> `;
            } else {
                result += current.data;
            }
            current = current.next;
        }
        if(!this.list.isEmpty) result += `\nTop:  ${this.top}`;
        console.log(result);
    }
}

//Creates a stack by using an array.
class ArrayStack {
    constructor(){
        this.top = null;
        this.stack = [];
    }

    //Removes the object at the top of this stack 
    //and returns that object as the value of this function.
    pop(){
    if(this.stack.length === 0) return null;
    let removed = this.stack.pop();

    if(this.empty()) {
        this.top = null;
    } else {
        this.top = this.stack[this.stack.length-1];
    }

    return removed;
    }

    //Pushes the element onto the top of this stack.
    push(element){
    this.stack.push(element);
    this.top = this.stack[this.stack.length-1]
    }

    //Returns the 1-based position where an object is on this stack.
    search(element){ 
    if(this.stack.indexOf(element) === -1) return -1;
    return this.stack.indexOf(element) + 1;
    }

    //Tests if this stack is empty
    empty(){ return this.stack.length === 0; }

    //Looks at the element at the top of this stack without removing it from the stack.
    peek(){ return this.top; }

    toString(){   
    console.log(this.stack.toString());
    if(!this.empty()) console.log("Top: ",this.top);
    }
}

module.exports = { ArrayStack, LinkedListStack };