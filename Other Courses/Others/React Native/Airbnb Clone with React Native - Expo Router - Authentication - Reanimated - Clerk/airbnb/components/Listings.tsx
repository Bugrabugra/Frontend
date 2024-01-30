import { useEffect } from "react";
import { Text, View } from "react-native";

import { Listing } from "@/types/listing";

interface Props {
  listings: Listing[];
  category: string;
}

const Listings = ({ listings, category }: Props) => {
  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <View>
      <Text>Listings</Text>
    </View>
  );
};

export default Listings;
