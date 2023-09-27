"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function Home() {
  const form = useForm<{
    name: string;
    email: string
  }>()

  return (
    <main className="max-w-lg p-6 mx-auto">
      <Form {...form}>
        <FormField
          name="name"
          control={form.control}
          render={
            ({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )
          }
        />
      </Form>
    </main>
  )
}
