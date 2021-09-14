/**David Gallardo
 * File: Treap.js
 * Date: 9/12/2021
 */

var Queue = require('./Queue.js');

/**Each Treap Node has a left, a right, and a parent pointer and 
 * holds the key-priority pair*/
class TreapNode {
    constructor(key, priority){
        this.key = key;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    //Checks if the node is a leaf (has no children)
    isLeaf(){ return this.left === null && this.right === null; }

    //Checks if the node has at least one child
    hasChild(){ return this.left !== null || this.right !== null;}

    //Checks if the node has both children
    hasChildren(){ return this.left !== null && this.right !== null; }
}

class Treap {
    constructor(){
        this.size = 0;
        this.root = null;
    }

    /**Inserts key from an object array: where each index contains an object
     *  that includes an key and a priority.
      * and a priority.
      * [ { key: x, priority: y }...] */
    insertAll(arr){
        if(!(arr instanceof Array)) {
            throw new Error("The input is not an array.");
        }
        arr.forEach(pair => this.insert(pair['key'],pair['priority']));
    }

    //Inserts a key-priority pair into the Treap
    insert(key, priority){
        if(key === null || key === undefined || priority === null  
            || priority === undefined) {
            throw new Error("Cannot add null or undefined"+ 
                "value into the treap.")
        }

        this.root = this.insertNode(this.root, key, priority);
    }

    /**Recursive helper function that finds the correct position to insert the
     * key-priority pair.*/
    insertNode(current, key, priority){
        if(current === null){
            let newNode = new TreapNode(key,priority);
            this.size++;
            return newNode;
        }

        if(key > current.key){
            let rightChild = this.insertNode(current.right, key, priority);
            current.right = rightChild;
            rightChild.parent = current;
            
        } else if(key < current.key){
            let leftChild = this.insertNode(current.left, key, priority);
            current.left = leftChild;
            leftChild.parent = current;
        } else if(key === current.key){
            throw new Error("Treap cannot add a duplicate",key);
        }
        
        let bubbleUp = this.bubbleUp(current);
        if(bubbleUp) return bubbleUp;
        return current;
    }

    bubbleUp(node){
        if(!node) return node;
        if(node.left && node.left.priority > node.priority){
            node = this.rotateRight(node);
        } else if(node.right && node.right.priority > node.priority){
            node = this.rotateLeft(node);
        }
        return node; 
    }

    //Removes the matching key-priority pair from the Treap
    remove(key){
        if(key === null || key === undefined) {
            throw new Error("Cannot add null or undefined"+ 
                "value into the treap.")
        }
        this.root = this.removeNode(this.root,key);
        if(this.root.parent instanceof TreapNode) this.root.parent = null;
    }

    /**Recursive helper function that finds the correct position to remove the
     * key-priority pair.*/
    removeNode(node,key){
        if(node === null) return node;
        
        //Traverses to find the matching node
        if(key < node.key){
            node.left = this.removeNode(node.left,key);
        } else if(key > node.key){
            node.right = this.removeNode(node.right,key);

        //If it is equal, then you found a match and remove that node!
        } else {

            //Case 1: If the node is a leaf, just remove it
            if(node.isLeaf()){
                if(node.parent && node.parent.left === node){
                    node.parent.left = null;
                } else if(node.parent && node.parent.right === node){
                    node.parent.right = null;
                }
                node.key = null;
                node.priority = null, node = null;
                this.size--;

            //Case 2: If the node's right child exists, connect it to the right 
            // subtree's root and remove it
            } else if(!node.left){
                if(node.parent) node.parent.right = null;
                node.key = null;
                node.priority = null;
                node = node.right;
                this.size--;

            //Case 3: If the node's left child exists, connect it to the left 
            // subtree's root and remove it
            } else if(!node.right){
                if(node.parent) node.parent.right = null;
                node.key = null;
                node.priority = null;
                node = node.left;
                this.size--;

            //Case 4: The node has both children so connect it to the 
            // right's minimum value and remove it
            } else if(node.hasChildren()){
                if(node.right.priority > node.left.priority){
                    node = this.rotateLeft(node);
                    node.left = this.removeNode(node.left,key);
                } else if(node.left.priority > node.right.priority){
                    node = this.rotateRight(node);
                    node.right = this.removeNode(node.right, key);
                }
            }    
        }

        return node;
    }

    //Searches the treap for the any matching pairs that have the similar keys
    search(key){
        if(key === null || key === undefined) return null;
        let current = this.root;
        while(current !== null && current !== undefined){
            if(key > current.key){
                current = current.right;
            } else if (key < current.key){
                current = current.left;
            } else if(key === current.key){
                return current;
            }
        }
        return null;
    }

    //Returns the ancestor lineage for the matching key-priority pair
    getAncestors(key){
        if(key === null || key === undefined) return null;
        let arr = [];
        let matchPair = this.search(key);
        while(matchPair !== null){
            arr.push(matchPair.key);
            matchPair = matchPair.parent;
        }
        return arr;
    }

    //Finds the successor of a node in the Treap
    successor(node){ 
        if(node.right){
            node = node.right;
            while(node.left !== null){
                node = node.left;
            }
            return node;
        } else {
            while(node.parent !== null){
                if(node.parent.left.key === node.key) return node;
                node = node.parent;
            }
        }
    }

    //Performs a left rotation on the treap
    rotateLeft(node){
        let rightChild = node.right;
        rightChild.parent = node.parent;
        if(rightChild.left){
            node.right = rightChild.left;
            rightChild.left = node;
            node.right.parent = node;
            node.parent = rightChild;
        } else {
            node.parent = rightChild;
            node.right = null;
            rightChild.left = node
        } 

        return rightChild;
    }

    //Performs a right rotation on the treap
    rotateRight(node){
        let leftChild = node.left;
        leftChild.parent = node.parent;
        if(leftChild.right){
            node.left = leftChild.right;
            node.left.parent = node;
            leftChild.right = node;
            node.parent = leftChild;
        } else {
            leftChild.parent = node.parent;
            leftChild.right = node;
            node.left = null;
            node.parent = leftChild;
        }

        return leftChild;
    }

    //Checks if the Treap is empty
    isEmpty(){ return this.size === 0; }

    //Returns the number of key-priority pairs in the Treap
    size() { return this.size; }

    //Removes all key-priority pairs from the Treap
    clear(){ this.size = 0, this.root = null;}

    //Performs a Level Order Traversal through all key-priority pairs
    levelOrder(node){
        //console.log(node)
        if(node === null || node === undefined) return;
        let queue = new Queue();
        queue.offer(node);
        let arr = [];
        while(!queue.isEmpty()){
            let node = queue.poll();
            arr.push(node.key);
            if(node.left !== null) queue.offer(node.left);
            if(node.right !== null) queue.offer(node.right);
        }
        return arr;
    }

    //Prints the Treap
    printTreap(){
        if(this.isEmpty()) return null;
        let tree = this.printTreapNode(this.root,"","");
        return tree;
    }

    //Recursively prints out each key-priority pair in the Treap
    printTreapNode(node, prefix, children){
        let result = prefix +"(" +node.key + ","+ node.priority +")"+ "\n";
        if(node.hasChildren()){
            result += this.printTreapNode(node.right, 
                children + "  ├── ", children + "  │   ");
            result += this.printTreapNode(node.left, 
                children + "  └── ", children + "    ");
        } else if(node.left !== null){
            result += this.printTreapNode(node.left, 
                children + " └── ", children + "    ");
        } else if(node.right !== null){
            result += this.printTreapNode(node.right, 
                children + "  └── ", children + "      ");
        }
        return result;
    }

    //Converts the Treap data into a string representation
    toString(){
        if(this.isEmpty()) return console.log("The treap is currently empty.");
        let arr = this.levelOrder(this.root);
        console.log("Treap: [",arr.toString(),"] Size:",this.size); 
        console.log(this.printTreap());
    }
}

module.exports = Treap;