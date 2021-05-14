# Linked List

> language: JavaScript

## Currently Avaiable features

- getters
  - first element
  - last element
- modifiers

  - add:
    - unshift: insert one or more nodes before the head node
    - push: append one or more nodes after the tail node
    - insertAfter: insert one or more nodes after the indicated node
    - insertBefore: insert one or more nodes before the indicated node
  - remove:
    - shift: remove and return the head node
    - pop: remove and return the tail node
    - delete:
      - by position: remove the indicated node
        - it takes a second parameter to remove an amount of following nodes; only the last one it's returned
    - clear: empty the list (keep the same memory address)

- search
  - find: returns the node identified by the provided callback
  - by value: returns the first occurrence of the provided target
    - it takes a second parameter to find all occurrences
  - by position: returns the node at the indicated position
- converters
  - to Array
