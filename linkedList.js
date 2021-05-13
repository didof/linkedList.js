class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  //   _traverse(cb, startNode = this.head) {
  //     function readNext(node) {
  //       const { value, next } = node
  //       cb(value)
  //       if (next) readNext(next)
  //     }
  //     readNext(startNode)
  //   }

  get last() {
    let last
    this._traverse(node => {
      if (node) last = node
    })
    return last
  }

  _traverse(cb = () => {}, startNode = this.head) {
    let node = startNode
    let count = 0

    let debug = Math.random()

    while (node) {
      // console.count(debug)

      const stop = cb(node, count)
      if (stop) {
        // item found based on cb logic
        return node
      }
      node = node.next
      count++
    }
  }

  shift() {
    if (this.length === 0) return

    const { value, next } = this.head
    this.head = next
    this.length--

    return value
  }

  unshift(value) {
    const node = new Node(value, this.head)
    this.head = node
    this.length++
    return this
  }

  pop() {
    const penultimateNode = this.findByPosition(this.length - 2)
    const lastNode = penultimateNode.next

    penultimateNode.next = null

    return lastNode
  }

  push(value) {
    const node = new Node(value)

    const lastNode = this.findByPosition(this.length - 1)

    lastNode.next = node

    return node
  }

  findByValue(target) {
    return this._traverse(node => node.value === target)
  }

  findByPosition(position) {
    return this._traverse((_, count) => position === count)
  }

  toArray() {
    const array = []
    this._traverse(node => {
      array.push(node.value)
    })

    return array
  }
}

const ll = new LinkedList()
ll.unshift('ciao').unshift('hello').unshift('ni-hao').unshift('oui')
console.log(ll.toArray())
