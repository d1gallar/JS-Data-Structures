/**David Gallardo
 * File: Queue.js
 * Date: 7/30/2021
 */

//Creates a Queue using a dynamic array
class Queue {

    constructor(){
        this.queue = [];
        this.front = null;
        this.back = null;
    }

    //Inserts the element at the back of the queue. Returns true if successful
    offer(element){
        if(element === null) return false;
        this.queue.push(element);
        if(this.queue.length === 1){
            this.front = this.queue[0];
            this.back = this.queue[0];
        } else {
            this.back = this.queue[this.queue.length-1];
        }
        return true;
    }

    //Adds all the elements inside the array and inserts them into the queue
    addAll(arr){
        for(let i = 0; i < arr.length; i++){
            this.queue.push(arr[i]);
        }
        this.front = this.queue[0];
        this.back = this.queue[this.queue.length-1];
    }

    //Returns the element at the front of the queue
    peek(){
        return this.front;
    }

    //Removes and returns the element at the front of the queue. Returns null
    // if queue is empty
    poll(){
        if(this.isEmpty()) return null;
        let removed = this.queue.shift();
        if(this.isEmpty()){
            this.front = null;
            this.back = null;
        } else {
            this.front = this.queue[0];
        }
        
        return removed;
    }

    //Removes one instance of the specified element from the queue, if present
    remove(element){
        if(element === null) return false;
        if(!this.queue.includes(element)) return false;
        var index = this.queue.indexOf(element);
        this.queue.splice(index,1);
        if(index === this.queue.length-1){
            this.back = this.queue[this.queue.length-1];
        } else if(index === 0){
            this.front = this.queue[0];
        }
        return true;
    }

    //Checks if the element is in the queue
    contains(element){
        return this.queue.includes(element);
    } 

    //Returns the number of elements in the queue
    size(){ return this.queue.length }

    //Removes all the elements from the queue
    clear(){ 
        this.queue = [];
        this.front = null;
        this.back = null;
    }
    
    isEmpty(){ return this.queue.length === 0; }

    //Prints out all of the elements from the queue
    toString(){
        console.log(this.queue.toString());
        if(this.queue.length !== 0){
            console.log("Front:",this.front);
            console.log("Back:",this.back);
        }
    }
}

module.exports = Queue;