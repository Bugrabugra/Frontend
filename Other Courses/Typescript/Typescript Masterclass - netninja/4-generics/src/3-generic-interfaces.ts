interface Collection<T> {
  data: T[]
  name: string
}

const collectionOne: Collection<string> = {
  data: ["mario", "luigi", "peach"],
  name: "mario characters"
}

const collectionTwo: Collection<number> = {
  data: [1, 2, 3],
  name: "lottery numbers"
}

function randomCollectionItem<T>(c: Collection<T>): T {
  const i = Math.floor(Math.random() * c.data.length)
  console.log(c.data[i])
  return c.data[i]
}

// @ts-ignore
const resultOne = randomCollectionItem(collectionOne)

