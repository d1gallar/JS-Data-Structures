/**David Gallardo
 * File: SinglyLinkedList.js
 * Date: 7/26/2021
 */

//Node class that holds data and points to the next node
class SinglyNode{
    constructor(data){
        this.next = null;
        this.data = data;
    }
}

//Singly Linked List class that holds nodes that point to the next node
class SinglyLinkedList {

    constructor(){
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    
    //Appends element to the end of the SLL
    add(element){
        this.addLast(element);
    }

    //Used to insert the specified element at the specified position index in a list.
    addAt(index,data){
        if(index === 0) return this.addFirst(data);
        if(index === this.size-1) return this.addLast(data);
        if(index < 0 || index > this.size) throw new RangeError("Index is out of bounds.");
        let current = this.head;
        for(let i = 0; i < index-1; i++){
            current = current.next;
        }
        let node = new SinglyNode(data);
        let next = current.next;
        current.next = node;
        node.next = next;
        this.size++;
    }

    //Inserts the given element at the beginning of the Singly Linked List
    addFirst(element){
        let node = new SinglyNode(element);
        if(this.isEmpty()){
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    //Inserts the given element at the end of the Singly Linked List
    addLast(element){ 
        let node = new SinglyNode(element);
        if(this.isEmpty()){
            this.head = node,this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }

    //Removes all the elements from the Singly Linked List
    clear(){
        let current = this.head;
        while(current !== null){
            let next = current.next;
            current = null;
            current = next;
        }
        this.head = null,this.tail = null;
        this.size = 0;
    }

    //Returns true if a list contains a specified element
    contains(element){
        let current = this.head;
        while(current !== null){
            if(current.data === element) return true; // equals ?
            current = current.next;
        }
        return false;
    }

    search(element){
        if(element === null) return null;
        let current = this.head;
        while(current !== null){
            if(current.data === element) return current.data;
            current = current.next;
        }
        return null;
    }

    //Returns the first element of the Singly Linked List or null if empty
    peekFirst(){
        if(this.isEmpty()){ return null}
        return this.head.data;
    }

    //Returns the last element of the Singly Linked List or null if empty
    peekLast(){
        if(this.isEmpty()){ return null}
        return this.tail.data;
    }
    
    //Returns the index of the element if found otherwise returns -1
    indexOf(element){
        let current = this.head;
        let index = 0;

        while(current !== null){
            if(current.data === element) return index;
            current = current.next;
            index++;
        }
        return -1;
    }

    //Removes the first element of the singly linked list
    removeFirst(){
        if(this.isEmpty()) return new Error("The linked list is empty.");
        let removedData = this.head.data;
        let newHead = this.head.next;
        this.head.data, this.head = null;
        this.head = newHead;
        this.size--;
        return removedData;
    }

    //Removes the last element of the singly linked list
    removeLast(){
        if(this.isEmpty()) return new Error("The linked list is empty.");
        let current = this.head;
        for(let i = 0; i < this.size-2; i++){
            current = current.next;
        }
        let removedData = current.data;
        current.next = null;
        this.tail.data = null, this.tail.next = null, this.tail = null;
        this.tail = current;
        this.size--;
        return removedData;
    }

    //Removes the specified element from the singly linked list
    remove(element){
        if(this.isEmpty()) return new Error("The linked list is empty.");
        if(this.head.data === element) return this.removeFirst();
        if(this.tail.data === element) return this.removeLast();
        let prev = this.head;
        while(prev !== null){
            let next = prev.next;
            if(next.data === element){
                prev.next = next.next;
                next.data, next.next, next = null;
                this.size--;
                return;
            }
            next = next.next;
        }
        
        return new Error("Element was not found in the linked list.");
    }

    //Removes the element at the specifed index from the singly linked list
    removeAt(index){
        if(index === 0) return this.removeFirst();
        if(index === this.size-1) return this.removeLast();
        if(index < 0 || index > this.size) return new RangeError("Index is out of bounds.");
        let prev = this.head;
        for(let i = 0; i < index-1; i++){
            prev = prev.next;
        }
        let next = prev.next;
        prev.next = prev.next.next;
        next.data,next.next,next = null;
        this.size--;
    }

    //Gathers all the data from each node and converts it into an array.
    toArray(){
        let current = this.head;
        let arr = [];
        while(current != null){
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    }

    //Returns true if the singly linked list is empty
    isEmpty(){ return this.size == 0; }

    //Returns the size of the singly linked list
    size(){ return this.size}

    //Prints out the singly linked list
    toString(){
        let result = "head → ";
        let current = this.head;
        while(current !== null){
            if(current.next !== null){
                result += current.data +" → ";
            } else {
                result += current.data;
            }
            current = current.next;
        }
        result += " ← tail"
        console.log(result);
    }
}

module.exports = SinglyLinkedList;