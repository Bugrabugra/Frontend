<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!--status message-->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-at-light-green">
        {{statusMsg}}
      </p>
      <p class="text-red-500">
        {{errorMsg}}
      </p>
    </div>

    <!--create-->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!--form-->
      <form @submit.prevent="createWorkout" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-2xl text-at-light-green">Record Workout</h1>
        <!--workout name-->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green">
            Workout Name
          </label>
          <input
              type="text"
              id="workout-name"
              required
              class="p-2 text-gray-500 focus:outline-none"
              v-model="workoutName"
          />
        </div>

        <!--workout type-->
        <div class="flex flex-col">
          <label class="mb-1 text-sm text-at-light-green">
            Workout Type
          </label>
          <select
              @change="workoutChange"
              id="workout-type"
              class="p-2 text-gray-500 focus:outline-none"
              v-model="workoutType"
          >
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <!--strength training inputs-->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div
              class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
              v-for="(item, index) in exercises"
              :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                Exercise
              </label>
              <input
                  type="text"
                  required
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  id="exercise-name"
                  v-model="item.exercise"
              />
            </div>

            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Sets
              </label>
              <input
                  type="text"
                  required
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  id="sets"
                  v-model="item.sets"
              />
            </div>

            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Reps
              </label>
              <input
                  type="text"
                  required
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  id="reps"
                  v-model="item.reps"
              />
            </div>

            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                Weight (LB's)
              </label>
              <input
                  type="text"
                  required
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  id="weight"
                  v-model="item.weight"
              />
            </div>

            <img
                @click="deleteExercise(item.id)"
                src="../assets/images/trash-light-green.png"
                class="h-4 w-auto absolute -left-5 cursor-pointer" alt=""
            >
          </div>

          <button
              @click="addExercise"
              type="button"
              class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green
                duration-200 border-solid border-2 border-transparent
                hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add Exercise
          </button>
        </div>

        <!--cardio inputs-->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div
              class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
              v-for="(item, index) in exercises"
              :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                Type
              </label>
              <select
                  id="cardio-type"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.cardioType"
              >
                <option value="#">Select Type</option>
                <option value="run">Runs</option>
                <option value="walk">Walk</option>
              </select>
            </div>

            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                Distance
              </label>
              <input
                  type="text"
                  required
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  id="distance"
                  v-model="item.distance"
              />
            </div>

            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                Duration
              </label>
              <input
                  type="text"
                  required
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  id="duration"
                  v-model="item.duration"
              />
            </div>

            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                Pace
              </label>
              <input
                  type="text"
                  required
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  id="pace"
                  v-model="item.pace"
              />
            </div>

            <img
                @click="deleteExercise(item.id)"
                src="../assets/images/trash-light-green.png"
                class="h-4 w-auto absolute -left-5 cursor-pointer" alt=""
            >
          </div>

          <button
              @click="addExercise"
              type="button"
              class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green
                duration-200 border-solid border-2 border-transparent
                hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add Exercise
          </button>
        </div>

        <button
            type="submit"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green
                duration-200 border-solid border-2 border-transparent
                hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Record Workout
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {uid} from "uid";
  import {supabase} from "@/supabase/init";


  // Create data
  const workoutName = ref("");
  const workoutType = ref("select-workout");
  const exercises = ref([]);
  const statusMsg = ref(null);
  const errorMsg = ref(null);

  // Add exercise
  const addExercise = () => {
    if (workoutType.value === "strength") {
      exercises.value.push({
        id: uid(),
        exercise: "",
        sets: "",
        reps: "",
        weight: ""
      });
      return;
    } else if (workoutType.value === "cardio") {
      exercises.value.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: ""
      });
      return;
    }
  };

  // Delete exercise
  const deleteExercise = (id) => {
    if (exercises.value.length > 1) {
      exercises.value = exercises.value.filter(exercise => exercise.id !== id);
      return;
    }
    errorMsg.value = "Error: Cannot remove, need to have at least one exercise";
    setTimeout(() => {
      errorMsg.value = false;
    }, 3000);
  };

  // Listens for changing of workout type input
  const workoutChange = () => {
    exercises.value = [];
    addExercise();
  };

  // Create workout
  const createWorkout = async () => {
    try {
      const {error} = await supabase.from("workouts").insert([
        {
          workoutName: workoutName.value,
          workoutType: workoutType.value,
          exercises: exercises.value
        }
      ]);
      if (error) {
        throw error;
      }
      statusMsg.value = "Success: Workout Created!";
      workoutName.value = null;
      workoutType.value = "select-workout";
      exercises.value = [];
      setTimeout(() => {
        statusMsg.value = false;
      }, 3000);
    } catch(error) {
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = false;
      }, 3000);
    }
  }
</script>
