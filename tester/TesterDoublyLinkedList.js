const DoublyLinkedList = require("../DoublyLinkedList"); 

let list = new DoublyLinkedList();
list.addFirst(1);
list.addFirst(0);
list.addLast(2);
list.removeFirst();
list.removeLast();
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.addAt(0,25);
list.addAt(4,25);
list.addAt(6,25);
list.add(60);
list.addFirst(60);
list.removeFirst();
list.removeLast();
list.removeAt(4);
list.removeAt(0);
list.removeAt(5);
list.addAt(2,100);
list.remove(100);
list.toString();