"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  name: "",
  email: "",
  message: ""
}

export default function Feedback() {
  const [data, setData] = useState(initState)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { name, email, message } = data

    // Send data to API route
    const res = await fetch('http://localhost:3000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, message
      })
    })

    const result = await res.json()
    console.log(result)

    // Navigate to thank you
    router.push(`/thank-you/`)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const name = e.target.name

    setData(prevData => ({
      ...prevData,
      [name]: e.target.value
    }))
  }

  const canSave = [...Object.values(data)].every(Boolean)

  const content = (
    <form onSubmit={handleSubmit}>

      <h1>Contact Us</h1>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Jane"
        pattern="([A-Z])[\w+.]{1,}"
        value={data.name}
        onChange={handleChange}
        autoFocus
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Jane@yoursite.com"
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        value={data.email}
        onChange={handleChange}
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        placeholder="Your message here..."
        rows={5}
        cols={33}
        value={data.message}
        onChange={handleChange}
      />

      <button
        disabled={!canSave}
      >Submit
      </button>

    </form>
  )

  return content
}
