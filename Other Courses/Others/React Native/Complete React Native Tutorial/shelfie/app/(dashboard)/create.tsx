import { StyleSheet, Text } from "react-native";

import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useBooks } from "../../hooks/useBook";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedButton from "../../components/ThemedButton";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { createBook } = useBooks();
  const router = useRouter();

  async function handleSubmit() {
    if (!title.trim() || !author.trim() || !description.trim()) return;

    setLoading(true);

    // create the book
    await createBook({ title, author, description });

    // reset fields
    setTitle("");
    setAuthor("");
    setDescription("");

    // redirect
    router.replace("/books");

    // reset loading state
    setLoading(false);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText title style={styles.heading}>
        Add a New Book
      </ThemedText>

      <Spacer />

      <ThemedTextInput
        style={styles.input}
        placeholder="Book Title"
        value={title}
        onChangeText={setTitle}
      />
      <Spacer />

      <ThemedTextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <Spacer />

      <ThemedTextInput
        style={styles.multiline}
        placeholder="Book Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <Spacer />

      <ThemedButton onPress={handleSubmit} disabled={loading}>
        <Text style={{ color: "#fff" }}>
          {loading ? "Saving..." : "Create Book"}
        </Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
});
