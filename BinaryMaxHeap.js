/**David Gallardo
 * File: BinaryMaxHeap.js
 * Date: 7/30/2021
 */

//A binary heap that has the root node as the max element
class BinaryMaxHeap {
    constructor() {
        this.heap = [];
    }

    //Finds the max element of the binary heap
    findMax() { 
        if(this.isEmpty()) return Number.MAX_VALUE;
        return this.heap[0];
    }

    //Returns the max element and removes it from the heap
    extractMax() {
        if (this.isEmpty()) return Number.MAX_VALUE();
        let max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.maxHeapify(this.heap, 0);
        return max;
    }

    //Removes the root and pushes a new node/element
    replace(element) {
        this.heap[0] = element;
        this.maxHeapify(this.heap, 0);
    }

    //Adding a new node/element to the heap [need to fix]
    insert(element) {
        this.heap.push(element);
        for (let i = this.size() - 1; i > 0; i--) {
            let parent = (i - 1) / 2;
            if (this.heap[parent] < this.heap[i]) {
                let temp = this.heap[i];
                this.heap[i] = this.heap[parent];
                this.heap[parent] = temp;
            }
        }
    }

    //Deletes the element from the max heap if it exists
    remove(element){
        let index = this.heap.indexOf(element);
        if(index === -1) return null;
        let temp = this.heap[this.size()-1];
        this.heap[this.size()-1] = this.heap[index];
        this.heap[index] = temp;
        let removed = this.heap.pop();
        for (let i = this.size() - 1; i > 0; i--) {
            let parent = (i - 1) / 2;
            if (this.heap[parent] < this.heap[i]) {
                let temp = this.heap[i];
                this.heap[i] = this.heap[parent];
                this.heap[parent] = temp;
            }
        }
        return removed;
    }

    /* Helper function that arranges the nodes in the correct to 
     * satisfy the max-heap property */
    maxHeapify(arr, i) {
        let largest = i;
        let left = 2 * i;
        let right = 2 * i + 1;

        if (left < arr.length && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < arr.length && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            let temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            this.maxHeapify(arr, largest);
        }
    }

    //Creates a binary heap out of given array of elements
    buildMaxHeap(arr) {
        for (let i = arr.length / 2 - 1; i >= 0; i--) {
            this.maxHeapify(arr, i);
        }
        this.heap = arr;
    }

    // //Merges two binary heaps to form a new heap containing elements of both
    // // and preserves both original heaps
    static merge(first, second){
        if(!first instanceof BinaryMaxHeap || 
            !second instanceof BinaryMaxHeap){
            return null;
        }

        let merged = new BinaryMaxHeap();
        let arr = [];
        for(let i = 0; i < first.size(); i++){
            arr.push(first.heap[i]);
        }
        for(let i = 0; i < second.size(); i++){
            arr.push(second.heap[i]);
        }
        merged.buildMaxHeap(arr);
        return merged;
    }

    //Returns true if the binary heap is empty
    isEmpty()  { return this.heap.length === 0; }

    //Returns the number of elements in the binary heap
    size() {return this.heap.length; }

    //Prints out the heap binary tree
    toString() {
        let level = 0;
        let nodesAtLevel = 1;
        let nodesPrinted = 0;
        let spaces = Math.ceil(Math.log2(this.size()));
        let result = `Heap: [${this.heap.toString()}]\n`;
        for(let i = 0; i < this.size(); i++){
            if(i === 0) result += " ".repeat(spaces+2);
            result += `${this.heap[i]} `;
            nodesPrinted++;    

            if(nodesPrinted === nodesAtLevel/2){
                result += " ".repeat((spaces/2));
            }

            if(nodesPrinted === nodesAtLevel){
                level++;
                nodesAtLevel *= 2;
                nodesPrinted = 0;
                result  += `\n`;
                result += " ".repeat(spaces);
                spaces--;
            }
        }
        console.log(result)
    }
}

module.exports = BinaryMaxHeap;