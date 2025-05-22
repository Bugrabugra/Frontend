import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// themed components
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { useBooks } from "../../../hooks/useBook";
import Spacer from "../../../components/Spacer";
import ThemedCard from "../../../components/ThemedCard";
import { BookCreateType } from "../../../contexts/BooksContext";
import ThemedLoader from "../../../components/ThemedLoader";
import ThemedButton from "../../../components/ThemedButton";
import { Colors } from "../../../constants/Colors";

const BookDetails = () => {
  const [book, setBook] = useState<
    (Models.Document & BookCreateType) | undefined
  >();
  const { id } = useLocalSearchParams();
  const { fetchBook, deleteBook } = useBooks();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteBook(id.toString());
    setBook(undefined);
    router.replace("/books");
  };

  useEffect(() => {
    async function loadBook() {
      const bookData = await fetchBook(id.toString());
      setBook(bookData);
    }

    loadBook();
  }, [id]);

  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText>Written by {book.author}</ThemedText>
        <Spacer />

        <ThemedText title={true}>Book description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>

      <ThemedButton onPress={handleDelete} style={styles.delete}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Delete Book</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20,
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
});
