import { Input } from '#/components/ui/input.tsx'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '#/components/ui/button.tsx'
import { LoadingSwap } from '#/components/ui/loading-swap.tsx'
import { PlusIcon } from 'lucide-react'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '#/db'
import { todos } from '#/db/schema.ts'
import { redirect } from '@tanstack/react-router'
import { eq } from 'drizzle-orm'

const addTodo = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    await db.insert(todos).values({ ...data, isCompleted: false })

    throw redirect({ to: '/' })
  })

const updateTodo = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string().min(1), name: z.string().min(1) }))
  .handler(async ({ data }) => {
    await db.update(todos).set(data).where(eq(todos.id, data.id))

    throw redirect({ to: '/' })
  })

export function TodoForm({ todo }: { todo?: { id: string; name: string } }) {
  const nameRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const addTodoFn = useServerFn(addTodo)
  const updateTodoFn = useServerFn(updateTodo)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const name = nameRef.current?.value

    if (!name) {
      return
    }

    setIsLoading(true)

    if (todo == null) {
      await addTodoFn({ data: { name } })
    } else {
      await updateTodoFn({ data: { id: todo.id, name } })
    }

    setIsLoading(false)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        autoFocus
        ref={nameRef}
        placeholder="Enter your todo..."
        className="flex-1"
        defaultValue={todo?.name}
      />
      <Button type="submit" disabled={isLoading} className="ml-2">
        <LoadingSwap isLoading={isLoading} className="flex gap-2 items-center">
          {todo == null ? (
            <>
              <PlusIcon /> Add
            </>
          ) : (
            'Update'
          )}
        </LoadingSwap>
      </Button>
    </form>
  )
}
