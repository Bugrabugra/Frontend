import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    isLoading: areTrendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    isLoading: areMoviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({ query: "" }));

  const errorOrView =
    moviesError || trendingError ? (
      <Text>Error: ${moviesError?.message ?? trendingError?.message}</Text>
    ) : (
      <View className="flex-1 mt-5">
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
        />

        {trendingMovies && (
          <View className="mt-10">
            <Text className="text-lg text-white font-bold mb-3">
              Trending Movies
            </Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 mt-3"
              data={trendingMovies}
              contentContainerStyle={{
                gap: 26
              }}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
              )}
              keyExtractor={(item) => item.movie_id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
          </View>
        )}

        <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Latest Movies
          </Text>

          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 20
            }}
            className="mt-2 pb-32"
            scrollEnabled={false}
          />
        </>
      </View>
    );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {areMoviesLoading || areTrendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : (
          errorOrView
        )}
      </ScrollView>
    </View>
  );
}
