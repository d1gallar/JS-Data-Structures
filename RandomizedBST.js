/**David Gallardo
 * File: RandomizedBST.js
 * Date:9/14/2021
 */

var Treap = require('./Treap.js');

class RandomizedBST {
    constructor(){
        this.treap = new Treap();
    }

    insertAll(arr){
        arr.forEach(key => this.insert(key));
    }

    insert(key){
        this.treap.insert(key, Math.floor(Math.random() * 100));
    }

    remove(key){
        this.treap.remove(key);
    }

    search(key){
        let found = this.treap.search(key);
        return found;
    }

    printRandomizedBST(){
        return this.treap.printTreap();
    }

    clear(){
        this.treap.clear();
        this.size = 0;
    }

    isEmpty(){return this.treap.size === 0;}

    size(){return this.treap.size; }

    toString(){
        if(this.isEmpty()) return console.log("The randomized binary", 
            "search tree is currently empty.");
        let arr = this.treap.levelOrder(this.treap.root);
        console.log("RandomizedBST: [",arr.toString(),"] Size:",this.size()); 
        console.log(this.printRandomizedBST());
    }
}

module.exports = RandomizedBST;