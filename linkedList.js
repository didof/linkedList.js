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

  get first() {
    return this.head
  }

  get last() {
    return this.findAtPosition(this.length - 1)[0]
  }

  /**
   * Utilities
   */

  _traverse(cb = () => {}, startNode = this.head) {
    let node = startNode
    let count = 0

    while (node) {
      const stop = cb(node, count)

      if (stop) return [node, count]

      node = node.next

      count++
    }
  }

  _getNext(node, position = 1) {
    if (position < 0) return

    let nextNode = node
    for (let i = 0; i < position; i++) {
      nextNode = nextNode.next
    }

    return nextNode
  }

  _concatenate(...values) {
    const headNode = new Node(values.shift())
    let tailNode
    function hook(node) {
      if (values.length === 0) {
        tailNode = node
        return node
      }
      const nextNode = new Node(values.shift())
      node.next = nextNode
      hook(nextNode)
    }
    hook(headNode)
    return [headNode, tailNode]
  }

  /**
   * Modifiers
   */

  shift() {
    if (this.length === 0) return

    const { value, next } = this.head
    this.head = next
    this.length--

    return value
  }

  unshift(...values) {
    const backupHead = this.head

    if (values.length === 1) {
      const node = new Node(values[0], backupHead)
      this.head = node
    } else {
      const chain = this._concatenate(...values)
      this.head = chain[0]
      chain[1].next = backupHead
    }

    this.length += values.length
    return this
  }

  pop() {
    switch (this.length) {
      case 0:
        return
      case 1:
        const node = this.head
        this.head = null
        this.length--
        return node
      default:
        const penultimateNode = this.findAtPosition(this.length - 2)[0]
        const lastNode = penultimateNode.next

        penultimateNode.next = null
        this.length--

        return lastNode
    }
  }

  push(...values) {
    let output

    if (values.length === 1) {
      const node = new Node(values[0])
      this.last.next = node

      output = node
    } else {
      const chain = this._concatenate(...values)
      this.last.next = chain[0]

      output = chain[1]
    }

    this.length += values.length

    return output
  }

  insertAfter(position, ...values) {
    if (typeof position !== 'number' || position < 0) return
    if (position >= this.length) return
    if (this.length === 0) return this.unshift(...values)
    if (position === this.length - 1) return this.push(...values)

    const leftNode = this.findByPosition(position)[0]
    const rightNode = leftNode.next

    if (values.length === 1) {
      const node = new Node(values[0], rightNode)
      leftNode.next = node
    } else {
      let chain = this._concatenate(...values)
      leftNode.next = chain[0]
      chain[1].next = rightNode
    }

    this.length += values.length

    return this
  }

  insertBefore(position, ...values) {
    if (typeof position !== 'number' || position < 0) return
    if (position >= this.length) return
    if (position === 0) return this.unshift(...values)

    const leftNode = this.findByPosition(position - 1)[0]
    const rightNode = leftNode.next

    if (values.length === 1) {
      const node = new Node(values[0], rightNode)
      leftNode.next = node
    } else {
      let chain = this._concatenate(...values)
      leftNode.next = chain[0]
      chain[1].next = rightNode
    }

    this.length += values.length

    return this
  }

  delete(cb) {
    let output, previousNode
    let found = false
    this._traverse((node, position) => {
      if (cb(node, position)) {
        output = node
        found = true
        return found
      }
      if (!found) previousNode = node
    })

    previousNode.next = previousNode.next.next

    this.length--

    return output
  }

  deleteByValue(target, allRecurrences = false) {
    let output
    if (!allRecurrences) {
      let previousNode
      let shouldCut = false

      this._traverse((node, position) => {
        if (node.value === target) {
          if (position === 0) {
            output = this.shift()
          } else if (position === this.length - 1) {
            output = this.pop()
          } else {
            shouldCut = true
            output = node
          }
          return true
        }
        previousNode = node
      })

      if (shouldCut) previousNode.next = previousNode.next.next

      this.length--
    } else {
      output = []
      const previousNodes = []
      let previousNode
      this._traverse((node, position) => {
        if (node.value === target) {
          output.push([node, position])
          previousNodes.push(previousNode)
        }
        previousNode = node
      })

      previousNodes.forEach(node => {
        if (!node) {
          this.shift()
          return
        }

        node.next = node.next.next
      })

      this.length -= output.length - 1
    }
    return output
  }

  deleteAtPosition(position, amount = 1) {
    if (position === 0 && amount === 1) return this.shift()
    if (position + amount > this.length - 1) return

    let leftNode = this.findByPosition(position - 1)[0]
    let deletedNode
    if (amount === 1) {
      deletedNode = leftNode.next
      leftNode.next = deletedNode.next
    } else {
      deletedNode = this._getNext(leftNode, amount)
      leftNode.next = deletedNode.next
      position += amount - 1
    }

    this.length -= amount

    return [deletedNode, position]
  }

  clear() {
    this.head = null
    this.length = 0
    return this
  }

  /**
   * Find
   */

  find(cb) {
    return this._traverse(cb)
  }

  findByValue(target, allRecurrences = false) {
    if (!allRecurrences) return this._traverse(node => node.value === target)

    const output = []
    this._traverse((node, position) => {
      if (node.value === target) output.push([node, position])
    })
    return output
  }

  findAtPosition(position) {
    return this._traverse((_, count) => position === count)
  }

  /**
   * Loops
   */
  knotByPosition(position) {
    const knotNode = this.findAtPosition(position)[0]
    this.last.next = knotNode
    return this
  }

  detectLoopLength() {
    let output = false
    const node = this._traverse((_, position) => {
      return position > this.length
    })
    if (node) output = [node[0], node[1] - this.length]

    return output
  }

  /**
   * Converters
   */

  toArray() {
    const array = []
    this._traverse(node => {
      array.push(node.value)
    })
    return array
  }
}

const ll = new LinkedList()
ll.unshift('A', 'B', 'C')
ll.push(1, 2, 3)
console.log(ll.toArray())
