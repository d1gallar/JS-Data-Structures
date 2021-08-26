/**David Gallardo
 * File: FenwickTree.js
 * Date: 8/24/2021
 */

//Gets the LSB, isolates it and returns it as an integer
// 3 -> 0011                    0011 && 1101 = 0001 -> 1
// 3 (2's Complement) -> 1101
function lsb(n) {
    if (!Number.isInteger(n)) return new Error('The input is not an integer.')
    return n & -n;
}

class FenwickTree {
    //Constructs the Fenwick tree
    constructor(arr) {
        if (!(arr instanceof Array)) return new Error('Not an array!');
        this.tree = Array(arr.length + 1).fill(0);
        this.size = this.tree.length;
        for (let i = 1; i < this.size; i++) {
            this.add(i, arr[i - 1]);
        }
    }

    //Retrieves the Fenwick tree
    getTree() {
        return this.tree;
    }

    //Adds value into the Fenwick Tree based on index
    add(index, value) {
        while (index < this.size) {
            this.tree[index] += value;
            index += lsb(index);
        }
    }

    //Finds the prefix sum from range [1, index]
    prefixSum(index) {
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= lsb(index);
        }
        return sum;
    }

    //Performs a range query that finds the total sum between [a,b]
    rangeQuery(a, b) {
        if (a < 1 || b < 1 || b > this.tree.length || a > this.tree.length)
            return new Error("Input is out of range.")
        if (b < a) return new Error("Second input has to be greater than first.")
        return this.prefixSum(b) - this.prefixSum(a - 1);
    }


    //Finds the # of positions of the right most bit of any digit
    // 2 -> 0010  LSB @ pos 2  |  4 -> 0100 LSB @ pos 3 | 1 -> 0001 LSB @ pos 1
    static positionLSB(n) {
        if (!Number.isInteger(n)) return new Error('The input is not an integer.')
        return Math.log2(n & -n) + 1;;
    }

    //Compresses the Fenwick Tree by separating it information into an array
    // that includes: [ unique parents, # of children, and their children ]
    uniqueParents() {
        let uniqueParent = [];
        for (let i = 1; i < this.size; i++) {
            let parent = i - lsb(i);
            if (parent < this.size) {
                let entry = uniqueParent.find(x => x[0] === this.tree[parent]);
                if (entry) {
                    entry[1] += 1;
                    entry[2].push(this.tree[i]);
                } else {
                    uniqueParent.push([this.tree[parent], 1, [this.tree[i]]]);
                }
            }
        }
        return uniqueParent;
    }

    //Finds the parent of the value at the specified index
    findParent(index) {
        let parent = index - lsb(index);
        return this.tree[parent];
    }

    //Calculates how many children the value has at that specific index
    numChildren(value) {
        let found = this.uniqueParents().find(x => x[0] === value);
        if (!found) return 0;
        return found[1];
    }

    //Returns all the children at the specific index
    getChildren(value) {
        let found = this.uniqueParents().find(x => x[0] === value);
        if (!found) return 0;
        return found[2];
    }

    //Finds the maximum depth of the Fernwick Tree
    findMaxDepth() {
        let depth = 1;
        let maxDepth = 0;
        for (let i = 1; i < this.size; i++) {
            depth = this.findDepth(i);
            if (depth > maxDepth) {
                maxDepth = depth;
            }
            depth = 1;
        }
        return maxDepth;
    }

    //Finds the depth of the Fernwick Tree at the specified index
    findDepth(index) {
        let depth = 1
        let i = index;
        while (i > 0 && i < this.size) {
            let parent = i - lsb(i);
            i = parent;
            depth++;
        }
        return depth;
    }

    //Converts the Fenwick Tree to a string representation
    toString() {
        let result = "Fenwick Tree:\n[ ";
        for (let i = 0; i < this.tree.length; i++) {
            result += `${this.tree[i]}, `
        }
        result = result.substring(0, result.length - 2) + " ]";
        return result;
    }

    //Checks if the Fenwick Tree is empty
    isEmpty() {
        return this.size === 0
    }

    //Prints out the Fenwick Tree
    print() {
        console.log(this.toString())
    }
}

module.exports = FenwickTree;