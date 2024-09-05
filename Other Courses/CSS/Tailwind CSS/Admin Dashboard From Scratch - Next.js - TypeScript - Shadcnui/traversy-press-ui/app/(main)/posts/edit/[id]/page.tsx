"use client";

import BackButton from "@/components/BackButton";
import { z } from "zod";
import posts from "@/data/posts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
  body: z.string().min(1, { message: "Body cannot be empty" }),
  author: z.string().min(1, { message: "Author cannot be empty" }),
  date: z.string().min(1, { message: "Date cannot be empty" })
});

type PostsEditPageProps = {
  params: {
    id: string;
  };
};

const PostsEditPage = ({ params }: PostsEditPageProps) => {
  const post = posts.find((post) => post.id === params.id);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title,
      body: post?.body,
      author: post?.author,
      date: post?.date
    }
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    toast({
      title: "Post has been updated successfully",
      description: `Updated by ${post?.author} on ${post?.date}`
    });
  };

  return (
    <>
      <BackButton text="Back to posts" link="/posts" />
      <h3 className="mb-4 text-2xl">Edit Post</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-slate-100 dark:bg-slate-500 text-black dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Body
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-0 bg-slate-100 dark:bg-slate-500 text-black dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Body"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-slate-100 dark:bg-slate-500 text-black dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Author"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                  Date
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-slate-100 dark:bg-slate-500 text-black dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full dark:bg-slate-800 dark:text-white">
            Update post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostsEditPage;
