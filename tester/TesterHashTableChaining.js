var HashTableChaining = require('../HashTableChaining');

let hashTable = new HashTableChaining(10,0.75);
hashTable.put("cow",10);
hashTable.put("cat",2);
hashTable.put("dog",7);
hashTable.put("fish",3);
hashTable.put("eel",11);
hashTable.put("pig",25);
hashTable.put("bird",43);
hashTable.print();
hashTable.put("mouse",20);
hashTable.print();
console.log(hashTable.contains("mouse"))
hashTable.clear();
hashTable.print();
hashTable.put("pig",25);
hashTable.put("fish",3);
console.log(hashTable.keys(),hashTable.values());
hashTable.remove("eel",11);
hashTable.removeEntry("pig");
hashTable.print();
hashTable.remove("fish",3);
hashTable.print();
console.log(hashTable.get("pig",25))