/**David Gallardo
 * File: AVLTree.js
 * Date: 8/30/2021
 */

 var Queue = require('./Queue.js');

class AVLNode {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.balanceFactor = 0;
    }

    //Checks if the node is a leaf (has no children)
    isLeaf(){ return this.left === null && this.right === null; }

    //Checks if the node has at least one child
    hasChild(){ return this.left !== null || this.right !== null;}

    //Checks if the node has both children
    hasChildren(){ return this.left !== null && this.right !== null; }
}

class AVLTree {
    constructor(){
        this.root = null;
        this.size = 0;
    }

    //Updates the balance factor of the AVL node
    updateBalance(node){
        if(node == null) node.balanceFactor = 0;
        node.balanceFactor = this.height(node.left) - this.height(node.right); 
    }

    balance(node, element){
        //Checks whether the node is balanced by checking all 4 cases: 
        //Left Left Case
        if(node.balanceFactor > 1 && element < node.left.data){
            return this.rotateRight(node);
        }
        
        //Right Right Case
        if(node.balanceFactor < -1 && element > node.right.data){
            return this.rotateLeft(node);
        }
        
        //Left Right Case
        if(node.balanceFactor > 1 && element > node.left.data){
           return this.leftRight(node);
        }

        //Right Left Case
        if(node.balanceFactor < -1 && element < node.right.data){
            return this.rightLeft(node);
        }

        //Doesn't need to balance the tree
        return null;
    }

    //Performs a left rotation on the current node
    rotateLeft(node){
        let rightChild = node.right;
        node.right = rightChild.left;    
        rightChild.left = node;
        return rightChild;
    }

    //Performs a right rotation on the current node
    rotateRight(node){
        let leftChild = node.left;
        node.left = leftChild.right;
        leftChild.right = node;
        return leftChild;
    }

    //Left Right Case: Performs a left rotation and then a right rotation
    leftRight(node){
        node.left = this.rotateLeft(node.left);
        return this.rotateRight(node);
    }

    //Right Left Case: Performs a right rotation and then a left rotation
    rightLeft(node){
        node.right = this.rotateRight(node.right);
        return this.rotateLeft(node);
    }

    //Inserts the element into the AVL tree
    insert(element){
        if(element === null) return;
        this.root = this.insertNode(this.root, element);
    }

    //Recursive helper function that inserts the element into the AVL tree
    insertNode(current, element){

        //If it hits the end of the tree, create a new node
        if(current === null) {
            current = new AVLNode(element);
            this.size++;
            return current;
        } 
        
        // If the element is smaller, traverse into the left subtree 
        if(element < current.data){
            current.left = this.insertNode(current.left, element);
        
        // If the element is larger, traverse into the right subtree 
        } else if(element >= current.data){
            current.right = this.insertNode(current.right, element);
        }

        //Updates the balance factor of the node
        this.updateBalance(current);

        //Balances the AVL tree through tree rotations if needed
        let balanceNode = this.balance(current,element);
        if(balanceNode) return balanceNode;
        
        return current;
    }

    //Inserts all elements from an array into a AVL Tree. 
    // Returns true if successful.
    insertAll(arr){
        if(!(arr instanceof Array)){ return false; }
        for(let i = 0; i < arr.length; i++){
            this.insert(arr[i]);
        }
        return true;
    }

    remove(element){
        if(!this.search(element)) return false;
        this.removeNode(this.root, element);
        this.size--;
        return true;
    }

    removeNode(node, element){
        if(node === null) return node;

        //Traverses to find the matching node
        if(element < node.data){
            node.left = this.removeNode(node.left,element);
        } else if(element > node.data){
            node.right = this.removeNode(node.right,element);

        //If it is equal, then you found a match and remove that node!
        } else {

            //Case 1: If the node is a leaf, just remove it
            if(node.isLeaf()){
                node.data = null, node = null;

            //Case 2: If the node's right child exists, connect it to the right 
            // subtree's root and remove it
            } else if(!node.left){
                node.data = null;
                node = node.right;

            //Case 3: If the node's left child exists, connect it to the left 
            // subtree's root and remove it
            } else if(!node.right){
                node.data = null;
                node = node.left;

            //Case 4: The node has both children so connect it to the 
            // right's minimum value and remove it
            } else {
                let temp = this.findMin(node.right.data);  
                node.data = temp.data;
                node.right = this.removeNode(node.right, node.data);
            }
        }

        if(this.root === null) return this.root;
        else {

            //Updates the balance factor of the node
            this.updateBalance(this.root);

            //Balances the AVL tree through tree rotations if needed
            let balanceNode = this.balance(this.root,element);
            if(balanceNode) return balanceNode;
        }

        return node;
    }

    search(element){
        if(element === null || this.isEmpty()) return null;
        let current = this.root;
        while(current !== null && current.data !== element){
            if(current.data > element){
                current = current.left;
            } else if(current.data < element){
                current = current.right;
            }
        }   
        return current;
    }

    //Removes all nodes from the AVL Tree
    clear(){ this.root = null, this.size = 0;}

    //Finds the smallest element (left most element from input)
    findMin(element){
        if(element === null || this.isEmpty()) return null;
        let node = this.search(element);
        while(node.left !== null){
            node = node.left;
        }
        return node;
    }

    //Finds the largest element (right most element from input)
    findMax(element){
        if(element === null || this.isEmpty()) return null;
        let node = this.search(element);
        while(node.right !== null){
            node = node.right;
        }
        return node;
    }

    //Sums up the total amount of leaves in the AVLTree
    getLeafCount(node){
        if(node === null) return 0;
        if(node.isLeaf()){ return 1;
        } else {
            return this.getLeafCount(node.left) + this.getLeafCount(node.right);
        }
    }

    //Checks if the AVLTree is empty. Returns true if the tree is empty.
    isEmpty(){
        return this.size === 0;
    }

    //Finds maximum height of the AVLTree
    findMaxHeight(){
        return this.height(this.root);
    }

    //Recursive helper function that finds the height of the current node
    height(node){
        if(node === null) return 0;
        return Math.max(this.height(node.left),this.height(node.right))+1;
    }

    //Prints out the entire AVL Tree
    printAVL() {
        let tree = this.printAVLNode(this.root,"","");
        return tree;
    }

    //Recursive helper function that prints out each node
    printAVLNode(node, prefix, children){
        let result = prefix + node.data + "\n";
        if(node.hasChildren()){
            result += this.printAVLNode(node.right, 
                children + "├── ", children + "│   ");
            result += this.printAVLNode(node.left, 
                children + "└── ", children + "    ");
        } else if(node.left !== null){
            result += this.printAVLNode(node.left, 
                children + "└── ", children + "    ");
        } else if(node.right !== null){
            result += this.printAVLNode(node.right, 
                children + "└── ", children + "    ");
        }
        return result;
    }

    //Performs a Level Order Traversal through all elements in BST
    levelOrder(node){
        if(node === null) return;
        let queue = new Queue();
        queue.offer(node);
        let arr = []
        while(!queue.isEmpty()){
            let node = queue.poll();
            arr.push(node.data);
            if(node.left !== null) queue.offer(node.left);
            if(node.right !== null) queue.offer(node.right);
        }
        return arr;
    }

    //Prints out the all data from the AVL Tree
    toString(){
        let arr = this.levelOrder(this.root);
        console.log("AVL:", arr.toString());
        console.log(`\tSize: ${this.size}`);
        let leaves = this.getLeafCount(this.root); 
        console.log(`\tLeaf Count: ${leaves}`);
        console.log(`\tMax Height: ${this.findMaxHeight(this.root)}\n`);
        console.log(this.printAVL());
    }
}

module.exports = AVLTree;