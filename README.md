# Linked List

> language: JavaScript

## Currently Avaiable features

- getters
  - first element
  - last element
- modifiers

  - add
    - unshift: insert one or more nodes before the head node
    - push: append one or more nodes after the tail node
    - insertAfter: insert one or more nodes after the indicated node
    - insertBefore: insert one or more nodes before the indicated node
  - remove
    - shift: remove and return the head node
    - pop: remove and return the tail node
    - delete
      - by cb: remove and returns the node identified by the provided callback
      - by value: remove and return the first occurrence of the provided target
        - it takes a second paramter to remove and return an array of all the occurrences
      - by position: remove the indicated node
        - it takes a second parameter to remove an amount of following nodes; only the last one it's returned
    - clear: empty the list (keep the same memory address)

- find

  - by cb: returns the node identified by the provided callback
  - by value: returns the first occurrence of the provided target
    - it takes a second parameter to find all occurrences
  - by position: returns the node at the indicated position

- knot

  - by position: join the tail to the node at the indicated position

- loop detect

  - by length: iterates in search of a loop comparing the count of the element read with the length of the linked list. Returns false if loop is not found, otherwise it returns the nodeKnot and the position
  - Floyd's Cycle-Finding Algorithm: two pointers interate along the linked list at different speeds. The former moving one by one whilst the latter by two. If the the pointers coincide on the same node it means that a loop exists. Returns (see loop detect by length)

- converters
  - to Array
