/**David Gallardo
 * File: DoublyLinkedList.js
 * Date: 7/26/2021
 */


//Node class that holds data and points to the previous and next node
class DoublyNode{
    data = null;
    prev = null;
    next = null;

    constructor(data){
        this.data = data;
    }
}

//Doubly Linked List class that holds nodes that point to the previous & next node
class DoublyLinkedList {
    size = 0;
    head = null;
    tail = null;
    
    //Appends element to the end of the SLL
    add(element){
        this.addLast(element);
    }

    //Used to insert the specified element at the specified position index in a list.
    addAt(index,data){
        if(index === 0) return this.addFirst(data);
        if(index === this.size-1) return this.addLast(data);
        if(index < 0 || index > this.size-1) throw new RangeError("Index is out of bounds.");
        let current = this.head;
        for(let i = 0; i < index ; i++){
            current = current.next;
        }
        let prev = current.prev;
        let node = new DoublyNode(data);

        prev.next = node;
        current.prev = node;
        node.prev = prev;
        node.next = current;
        this.size++;
    }

    //Inserts the given element at the beginning of the Doubly Linked List
    addFirst(element){
        let node = new DoublyNode(element);
        if(this.isEmpty()){
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = null;
            this.head = node;
        }
        this.size++;
    }

    //Inserts the given element at the end of the Doubly Linked List
    addLast(element){ 
        let node = new DoublyNode(element);
        if(this.isEmpty()){
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.size++;
    }

    //Removes all the elements from the Doubly Linked List
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
            if(current.data === element) return true;
            current = current.next;
        }
        return false;
    }

    //Returns the first element of the Doubly Linked List or null if empty
    peekFirst(){
        if(this.isEmpty()){ return null}
        return this.head.data;
    }

    //Returns the last element of the Doubly Linked List or null if empty
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

    //Removes the first element of the doubly linked list
    removeFirst(){
        if(this.isEmpty()) return new Error("The linked list is empty.");
        let newHead = this.head.next;
        this.head.next = null, this.head.data = null, this.head = null;
        this.head = newHead;
        this.size--;
    }

    //Removes the last element of the doubly linked list
    removeLast(){
        if(this.isEmpty()) return new Error("The linked list is empty.");
        let newTail = this.tail.prev;
        newTail.next = null;
        this.tail.prev = null, this.tail.data = null, this.tail = null;
        this.tail = newTail;
        this.size--;
    }

    //Removes the specified element from the doubly linked list
    remove(element){
        if(this.isEmpty()) throw new Error("The linked list is empty.");
        if(this.head.data === element) return this.removeFirst();
        if(this.tail.data === element) return this.removeLast();
        let current = this.head;
        while(current !== null){
            if(current.data === element){
                let prev = current.prev;
                let next = current.next;
                prev.next = next;
                next.prev = prev;
                current.next = null, current.prev = null, current = null;
                this.size--;
                return true;
            }
            current = current.next;
        }
        throw new Error("Could not find the element in the linked list.");
    }

    //Removes the element at the specifed index from the doubly linked list
    removeAt(index){
        if(index === 0) return this.removeFirst();
        if(index === this.size-1) return this.removeLast();
        if(index < 0 || index > this.size-1) throw new RangeError("Index is out of bounds.");
        let current = this.head;
        for(var i = 0; i < index; i++){
            current = current.next;
        }
        let prev = current.prev;
        let next = current.next;
        prev.next = next;
        next.prev = prev;
        current.next = null, current.prev = null, current = null;
        this.size--;
    }

    //Returns true if the Doubly linked list is empty
    isEmpty(){ return this.size == 0; }

    //Returns the size of the Doubly linked list
    size(){ return this.size}

    //Prints out the Doubly linked list
    toString(){
        let result = "head ⇄ ";
        let current = this.head;
        while(current !== null){
            if(current.next !== null){
                result += current.data +" ⇄ ";
            } else {
                result += current.data;
            }
            current = current.next;
        }
        result += " ⇄ tail"
        console.log(result);
    }
}

module.exports = DoublyLinkedList;