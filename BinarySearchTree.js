/**David Gallardo
 * File: BinarySearchTree.js
 * Date: 8/8/2021
 */

var Queue = require('./Queue.js');

//Class that holds the nodes for the Binary Search Tree
class BinaryTreeNode {
    constructor(value){
        this.value = value;
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

/*Creates a binary search tree that is filled with nodes 
 * and respects the BST property (smaller nodes on the left and larger nodes
 * on the right side) at every node*/
class BinarySearchTree {
    constructor(){
        this.size = 0;
        this.root = null;
    }

    //Inserts the element into the BST and respects the BST property
    insert(element){
        if(element === null) return;
        this.root = this.insertNode(this.root, element);
    }

    //Recursive helper function that looks where to insert the element
    insertNode(current, element){
        //If it hits the end of the tree, create a new node
        if(current === null) {
            current = new BinaryTreeNode(element);
            this.size++;
            return current;
        } 
        
        // If the element is smaller, traverse into the left subtree 
        if(element < current.value){
            current.left = this.insertNode(current.left, element);
        
        // If the element is larger, traverse into the right subtree 
        } else if(element > current.value){
            current.right = this.insertNode(current.right, element);
        }
        return current;
    }

    //Searches for the element and removes it from the BST
    remove(element){
        if(!this.search(element)) return false;
        this.removeNode(this.root, element);
        this.size--;
        return true;
    }

    //Recursive helper function that searches for the node to remove
    removeNode(node, element){
        if(node === null) return node;

        //Traverses to find the matching node
        if(element < node.value){
            node.left = this.removeNode(node.left,element);
        } else if(element > node.value){
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
                let temp = this.findMin(node.right.value);  
                node.value = temp.value;
                node.right = this.removeNode(node.right, node.value);
            }
        }
        return node;
    }

    //Searches for the element in the BST and returns null when not found
    search(element){
        if(element === null || this.isEmpty()) return null;
        let current = this.root;
        while(current !== null && current.value !== element){
            if(current.value > element){
                current = current.left;
            } else if(current.value < element){
                current = current.right;
            }
        }   
        return current;
    }

    //Inserts all elements from an array into a BST. Returns true if successful.
    insertAll(arr){
        if(!(arr instanceof Array)){ return false; }
        for(let i = 0; i < arr.length; i++){
            this.insert(arr[i]);
        }
        return true;
    }

    //Removes all nodes from the BST
    clear(){ this.root = null, this.size = 0;}

    //Finds the smallest element in the BST
    findMin(element){
        if(element === null || this.isEmpty()) return null;
        let node = this.search(element);
        while(node.left !== null){
            node = node.left;
        }
        return node;
    }

    //Finds the largest element in the BST
    findMax(element){
        if(element === null || this.isEmpty()) return null;
        let node = this.search(element);
        while(node.right !== null){
            node = node.right;
        }
        return node;
    }

    //Finds the parent of the element and returns null when not found
    findParent(element){
        if(element === null || this.isEmpty()) {
            return `Can't find parent of ${element}!`;
        }
        let parent = this.root;
        let current = this.root; 
        while(current !== null && current.value !== element){
            if(current.value > element){
                parent = current;
                current = current.left;
            } else if(current.value < element){
                parent = current;
                current = current.right;
            }
        }
        return parent.value;
    }

    //Performs a Preorder Traversal through all elements in BST
    preorder(node){
        if(node === null) return null;
        console.log(`${node.value}`);
        this.preorder(node.left);
        this.preorder(node.right);
    }

    //Performs a Inorder Traversal through all elements in BST
    inorder(node){
        if(node === null) return null;
        this.inorder(node.left);
        console.log(`${node.value}`);
        this.inorder(node.right);
    }

    //Performs a Postorder Traversal through all elements in BST
    postorder(node){
        if(node === null) return null;
        this.postorder(node.left);
        this.postorder(node.right);
        console.log(`${node.value}`);
    }
    
    //Performs a Level Order Traversal through all elements in BST
    levelOrder(node){
        if(node === null) return;
        let queue = new Queue();
        queue.offer(node);
        let arr = []
        while(!queue.isEmpty()){
            let node = queue.poll();
            arr.push(node.value);
            if(node.left !== null) queue.offer(node.left);
            if(node.right !== null) queue.offer(node.right);
        }
        return arr;
    }

    //Sums up the total amount of leaves in the BST
    getLeafCount(node){
        if(node === null) return 0;
        if(node.isLeaf()){ return 1;
        } else {
            return this.getLeafCount(node.left) + this.getLeafCount(node.right);
        }
    }

    //Returns how many elements are in the BST
    size(){ return this.size; }

    //Checks if the BST is empty. Returns true if it's empty.
    isEmpty() { return this.size === 0 || this.root === null; }

    //Prints out the entire BST
    printBST() {
        let tree = this.printBSTNode(this.root,"","");
        return tree;
    }

    //Recursive helper function that prints out each node
    printBSTNode(node, prefix, children){
        let result = prefix + node.value + "\n";
        if(node.hasChildren()){
            result += this.printBSTNode(node.right, 
                children + "├── ", children + "│   ");
            result += this.printBSTNode(node.left, 
                children + "└── ", children + "    ");
        } else if(node.left !== null){
            result += this.printBSTNode(node.left, 
                children + "└── ", children + "    ");
        } else if(node.right !== null){
            result += this.printBSTNode(node.right, 
                children + "└── ", children + "    ");
        }
        return result;
    }

    //Finds the maximum depth of the BST
    findMaxDepth(node){
        if(this.isEmpty()) {
            return 0;
        } else {
            let leftDepth = 0;
            let rightDepth = 0;
            if(node.left) leftDepth = this.findMaxDepth(node.left);
            if(node.right) rightDepth = this.findMaxDepth(node.right);
            if(leftDepth > rightDepth){
                return leftDepth + 1;
            } else {
                return rightDepth + 1;
            }
        }
    }

    //Finds maximum height of the BST
    findMaxHeight(){
        return this.height(this.root);
    }

    //Recursive helper function that finds the height of the current node
    height(node){
        if(node === null) return 0;
        return Math.max(this.height(node.left),this.height(node.right))+1;
    }

    //Prints out the all data from the BST
    toString(){
        let arr = this.levelOrder(this.root);
        console.log("BST:", arr.toString());
        console.log(`\tSize: ${this.size}`);
        let leaves = this.getLeafCount(this.root); 
        console.log(`\tLeaf Count: ${leaves}`);
        console.log(`\tMax Height: ${this.findMaxHeight(this.root)}\n`);
        console.log(this.printBST());
    }
}

module.exports = BinarySearchTree;