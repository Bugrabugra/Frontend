import { createContext, ReactNode, useEffect, useState } from "react";
import { client, databases } from "../lib/appwrite";
import {
  ID,
  Models,
  Permission,
  Query,
  RealtimeResponseEvent,
  Role,
} from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "6827034100373a326ade";
const COLLECTION_ID = "6827035900111a80c4b6";

type BookType = {
  title: string;
  author: string;
  description: string;
  userId: string;
};

export type BookCreateType = Omit<BookType, "userId">;

type BooksContextType = {
  books: Models.Document[];
  fetchBooks: () => Promise<void>;
  fetchBook: (
    id: string,
  ) => Promise<(Models.Document & BookCreateType) | undefined>;
  createBook: (data: BookCreateType) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
};

export const BooksContext = createContext<BooksContextType>({
  books: [],
  fetchBooks: async () => {},
  fetchBook: async (id: string) => {
    return {
      $id: "",
      $collectionId: "",
      $databaseId: "",
      $createdAt: "",
      $updatedAt: "",
      $permissions: [],
      title: "",
      author: "",
      description: "",
    };
  },
  createBook: async (data) => {},
  deleteBook: async (id: string) => {},
});

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Models.Document[]>([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", user?.$id!)],
      );
      setBooks(response.documents);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  async function fetchBook(id: string) {
    try {
      const response = await databases.getDocument<
        Models.Document & BookCreateType
      >(DATABASE_ID, COLLECTION_ID, id);

      console.log(response);

      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  async function createBook(data: BookCreateType) {
    try {
      const newBook = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          ...data,
          userId: user?.$id,
        },
        [
          Permission.read(Role.user(user?.$id!)),
          Permission.update(Role.user(user?.$id!)),
          Permission.delete(Role.user(user?.$id!)),
        ],
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  async function deleteBook(id: string) {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id.toString());
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    let unsubscribe = null;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();
      unsubscribe = client.subscribe(
        channel,
        (response: RealtimeResponseEvent<Models.Document>) => {
          const { payload, events } = response;

          if (events[0].includes("create")) {
            setBooks((prevBooks) => [...prevBooks, payload]);
          }

          if (events[0].includes("delete")) {
            setBooks((prevBooks) =>
              prevBooks.filter((book) => book.$id !== payload.$id),
            );
          }
        },
      );
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBook, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
