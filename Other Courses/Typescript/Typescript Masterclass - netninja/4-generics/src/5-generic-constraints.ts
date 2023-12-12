interface HasId {
  id: number
}

class DataCollection<T extends HasId> {
  constructor(private data: T[]) {}

  loadOne(): T {
    const i = Math.floor(Math.random() * this.data.length)
    return this.data[i]
  }

  loadAll(): T[] {
    return this.data
  }

  add(val: T): T[] {
    this.data.push(val)
    return this.data
  }

  deleteOne(id: number): void {
    this.data = this.data.filter((item) => item.id !== id)
  }
}

interface User {
  name: string
  score: number
  id: number
}

const users = new DataCollection<User>([
  { name: "shaun", score: 125, id: 3 },
  { name: "mario", score: 100, id: 1 },
  { name: "peach", score: 150, id: 2 }
])

users.add({ name: "luigi", score: 50, id: 4 })

console.log("delete - ", users.deleteOne(1))
console.log("load one - ", users.loadOne())
console.log("load all - ", users.loadAll())
