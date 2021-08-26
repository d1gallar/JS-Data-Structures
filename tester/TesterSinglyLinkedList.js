var SinglyLinkedList = require('../SinglyLinkedList');

let list = new SinglyLinkedList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.addAt(2,0);
list.addAt(0,0);
list.addLast(100);
list.removeFirst();
list.removeLast();
list.removeAt(2);
list.toString();