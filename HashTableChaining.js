/**David Gallardo
 * File: HashTableChaining.js
 * Date: 8/9/2021
 */

var SinglyLinkedList = require('./SinglyLinkedList');

function isFloat(num){
    return Number(num) === num && num % 1 !== 0;
}

class HashEntry {
    key = null;
    value = null; 
    hash = null;

    constructor(key, value){
        this.key = key;
        this.value = value;
    }

    equals(entry){
        if(! (entry instanceof HashEntry)) return false;
        if(this.hash != entry.hash) return false;
        if(this.value != entry.value) return false;
        return this.key === entry.key;
    }

    toString(){
        return this.key + ": "+ this.value;
    }
}

class HashTableChaining {
    constructor(capacity, loadFactor){
        if(!(Number.isSafeInteger(capacity)) ||capacity < 0
            || capacity > Number.MAX_SAFE_INTEGER) {
            throw new Error(`Illegal capacity.`);
        }
        
        if(loadFactor < 0 || loadFactor > Number.MAX_SAFE_INTEGER 
            || !isFloat(loadFactor)){
            throw new Error(`Illegal load factor.`);
        }
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.threshold = capacity * loadFactor;
        this.table = new Array(capacity);
        this.table.fill(null);
        this.size = 0;
    }

    /* Doubles the capacity of the hash table whenever the threshold is met. It
     * also rehashes the keys to prevent separate chaining.*/
    resizeTable(){
        this.capacity = this.capacity * 2;
        this.threshold = this.capacity * this.loadFactor;
        let newTable = new Array(this.capacity);
        newTable.fill(null);

        for(let i = 0; i < this.table.length; i++){
            if(this.table[i] !== null){
                let node = this.table[i].head;
                while(node !== null){
                    let hash = this.hash(node.data.key);
                    if(newTable[hash] === null){
                        newTable[hash] = new SinglyLinkedList();
                        newTable[hash].add(node.data);
                    } else if(newTable[hash] instanceof SinglyLinkedList){
                        newTable[hash].add(node.data);
                    }
                    node = node.next;
                } 
                this.table[i].clear();
                this.table[i] = null;
            }  
        }
        this.table = newTable;
        console.log();
    }

    //Creates a new hash for that specific key
    hash(key){
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.capacity;
    }

    //Clears out the entire hash table
    clear(){
        this.table = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    clone(){
        let hashTableCopy = new HashTableChaining(capacity, loadFactor);
        for(let i = 0; i < copy.length; i++){
            hashTableCopy[i] = this.table[i];
        }
        return hashTableCopy;
    }

    //Checks if the value exists in the table
    containsVal(value){
        for(let i = 0; i < this.table.length; i++){
            let list = this.table[i];
            if(list !== null){
                let current = list.head;
                while(current !== null){
                    if(current.data.value === value){
                        return true;
                    }
                    current = current.next;
                }
            }
        }
        return false;
    }

    //Checks if the key exists in the hash table
    contains(key){
        let hash = this.hash(key);
        let list = this.table[hash];
        return this.table[hash] !== null;
    }

    //Returns an all the unique keys in the hash table
    keys(){
        let uniqueKeys = [];
        for(let i = 0; i < this.table.length; i++){
            let list = this.table[i];
            if(list !== null){
                let current = list.head; 
                while(current !== null){
                    if(!uniqueKeys.includes(current.data.key)){
                        uniqueKeys.push(current.data.key);
                    }   
                    current = current.next;
                }
            }
        }
        return uniqueKeys;
    }

    //Returns an all the unique values in the hash table
    values(){
        let uniqueVals = [];
        for(let i = 0; i < this.table.length; i++){
            let list = this.table[i];
            if(list !== null){
                let current = list.head;
                while(current !== null){
                    if(!uniqueVals.includes(current.data.value)){
                        uniqueVals.push(current.data.value);
                    }   
                    current = current.next;
                }
            }
        }
        return uniqueVals;
    }

    //Creates a new entry and adds it into the hash table
    put(key, value){
        if(key === null) throw new Exception("Invalid Key: The key is null.");
        if(value === null) throw new Exception("Invalid value: It is null.")
        let entry = new HashEntry(key, value);
        let hash = this.hash(key);
        entry.hash = hash;

        if(this.table[hash] === null){
            this.table[hash] = new SinglyLinkedList();
            this.table[hash].add(entry);
        } else if(this.table[hash] instanceof SinglyLinkedList){
            this.table[hash].add(entry);
        } 
        this.size++;

        if(this.size > this.threshold) this.resizeTable();
    }

    //Removes the entry from the hash table using only the key. 
    // This method returns the removed entry.
    removeEntry(key){
        if(key === null) throw new Exception("The key is null.")
        let hash = this.hash(key);
        let list = this.table[hash];

        if(list === null) return null;
        if(list instanceof SinglyLinkedList){
            let entry = this.getEntry(key);
            if(!entry) return null;
            let removed = list.remove(entry);
            this.size--;
            return removed;
        }
    }

    //Removes an entry from the hash table and returns the removed value
    remove(key, value){
        if(key === null) throw new Error("Invalid key: the key is null.")
        if(value === null) throw new Error("Invalid value: the value is null.")
        let hash = this.hash(key);
        let list = this.table[hash];
        
        if(list === null) return null;
        if(list instanceof SinglyLinkedList){
            let entry = new HashEntry(key,value);
            entry.hash = hash;
            let removed;
            if(list.size === 1 && list.peekFirst().equals(entry)){
                removed = list.removeFirst();
            } else {
                removed = list.remove(entry);
            }
            this.size--;
            return removed;
        } else return null;
    }

    //Returns the entry from this specific key of the hash table
    getEntry(key){
        let hash = this.hash(key);
        let list = this.table[hash];
        if(list === null) return null;
        let current = list.head;
        while(current !== null){
            if(current.data.key === key) return current.data;
            current = current.next;
        }
        return null;
    }

    //Returns the matching entry in the hash table
    get(key, value){
        let hash = this.hash(key);
        let list = this.table[hash];
        let matchingEntry = new HashEntry(key,value);
        matchingEntry.hash = hash;
        return list.search(matchingEntry);
    }

    //Checks if the hash table is empty. Returns true if it is empty.
    isEmpty(){ return this.size === 0}

    //Returns the number of entries in the hash table
    size(){ return this.size; }

    //Returns a string converted form of the hash table 
    toString(){
        let result = `Hash Table: `;
        result += `(Size: ${this.size}) `
        result += `(Threshold: ${this.threshold}) `;
        result += `(Max Capacity: ${this.capacity})\n`
        
        for(let i = 0; i < this.table.length; i++){
            let list = this.table[i];
            if(list === null || list === undefined){
                result += `${i}:\n`;
            } else if(list instanceof SinglyLinkedList){
                result += `${i}: `;
                let current = list.head;
                while(current !== null){
                    if(current.next !== null){
                        result += current.data.toString() +" -> ";
                    } else {
                        result += current.data.toString();
                    }
                    current = current.next;
                }
                result += "\n";
            }
        }

        return result;
    }

    //Prints out the Hash Table
    print(){
        console.log(this.toString());
    }
}

module.exports = HashTableChaining;