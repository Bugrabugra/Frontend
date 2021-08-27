<template>
  <div id="app" class="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen">
    <!--Header-->
    <SiteHeader class="xl:flex-shrink-0"/>

    <div class="xl:flex-1 xl:flex xl:overflow-y-hidden">
      <!--Search and filters-->
      <SearchFilters/>

      <!--Main-->
      <main class="py-6 xl:flex-1 xl:overflow-x-hidden">
        <div class="px-4">
          <h3 class="text-gray-900 text-xl">
            Los Angeles
          </h3>

          <p class="text-gray-600">
            Live like the stars in these luxurious Southern California estates.
          </p>
        </div>


        <div class="mt-6 sm:overflow-x-auto">
          <!--Cards-->
          <div class="px-4 sm:inline-flex sm:pb-8">
            <div v-for="(property, i) in properties" :class="{'mt-10 sm:ml-4': i > 0}" class="sm:mt-0 sm:w-80 sm:flex-shrink-0">
              <PropertyCard :property="property"/>
            </div>
          </div>
        </div>

      </main>
    </div>

  </div>
</template>

<script>
  import SiteHeader from "./components/SiteHeader";
  import SearchFilters from "./components/SearchFilters";
  import PropertyCard from "./components/PropertyCard";

  export default {
    name: 'App',
    components: {
      PropertyCard,
      SearchFilters,
      SiteHeader
    },
    data() {
      return {
        properties: [
          {
            imageURL: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            beds: 3,
            baths: 2,
            title: "Modern home in city center",
            price: 140000,
            reviewCount: 34,
            rating: 4
          },
          {
            imageURL: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            beds: 3,
            baths: 1,
            title: "Modern home in city center",
            price: 120000,
            reviewCount: 22,
            rating: 5
          },
          {
            imageURL: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            beds: 2,
            baths: 1,
            title: "Modern home in city center",
            price: 110000,
            reviewCount: 11,
            rating: 3
          },
          {
            imageURL: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            beds: 4,
            baths: 2,
            title: "Modern home in city center",
            price: 190000,
            reviewCount: 56,
            rating: 5
          }
        ]
      }
    },
  }
</script>

<style src="./assets/css/tailwind.css"></style>
