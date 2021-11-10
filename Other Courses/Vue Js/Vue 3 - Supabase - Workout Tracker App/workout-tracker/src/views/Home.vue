<template>
  <div v-if="dataLoaded" class="container mt-10 px-4">
    <!--no data-->
    <div v-if="data.length === 0" class="w-full flex flex-col items-center">
      <h1 class="text-2xl text-white">Looks empty here...</h1>
      <router-link
          :to="{name: 'Create'}"
          class="mt-6 py-2 px-6 rounded-sm text-sm text-white bg-at-light-green
                duration-200 border-solid border-2 border-transparent
                hover:border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        Create Workout
      </router-link>
    </div>

    <!--data-->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <router-link
          :to="{name: 'ViewWorkout', params: {workoutId: workout.id}}"
          class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
          v-for="(workout, index) in data"
          :key="index"
      >
        <!-- cardio img-->
        <img v-if="workout.workoutType === 'cardio'" src="../assets/images/running-light-green.png" class="h-24 w-auto" alt="">
        
        <!--strength training-->
        <img v-else src="../assets/images/dumbbell-light-green.png" class="h-24 w-auto" alt="">
        
        <p class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg">
          {{workout.workoutType}}
        </p>
        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
          {{workout.workoutName}}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {supabase} from "@/supabase/init";


  // Create data / vars
  const data = ref([]);
  const dataLoaded = ref(null);

  // Get data
  const getData = async () => {
    try {
      const {data: workouts, error} = await supabase
          .from("workouts")
          .select("*")
      if (error) {
        throw error;
      }
      data.value = workouts;
      dataLoaded.value = true;
    } catch(error) {
      console.warn(error.message);
    }
  };

  // Run data function
  getData();

</script>
