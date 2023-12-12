interface HasID {
  id: number
}

function addIdToValue<T>(val: T): T & HasID {
  const id = Math.random()

  return { ...val, id }
}

interface Post {
  title: string
  thumbsUp: number
}

const post = addIdToValue<Post>({ title: "Mario Rules", thumbsUp: 250 })
console.log(post)
