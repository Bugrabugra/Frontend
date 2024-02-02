import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";

import listingDataGeo from "@/assets/data/airbnb-listings.geo.json";
import listingData from "@/assets/data/airbnb-listings.json";
import ExploreHeader from "@/components/ExploreHeader";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import ListingsMap from "@/components/ListingsMap";
import { Listing } from "@/types/listing";
import { ListingsGeo } from "@/types/listingGeo";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingData as Listing[], []);
  const geoItems = useMemo(() => listingDataGeo as ListingsGeo, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/*<Listings listings={items} category={category} />*/}
      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Page;
