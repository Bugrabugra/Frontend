import {createStore} from "vuex";


const store = createStore({
  state() {
    return {
      memories: [
        {
          id: "m1",
          image: "https://www.getyourguide.com/magazine/wp-content/migrated-content/uploads/2019/09/Header-2019.09.25-5-underrated-hiking-trails-in-Eastern-Europe-GetYourGuide.jpg",
          title: "A trip into the mountains",
          description: "It was a really nice trip!"
        },
        {
          id: "m2",
          image: "https://cdn.cnn.com/cnnnext/dam/assets/200311093607-jeff-divine-surf-70s-1-full-169.jpg",
          title: "Surfing the sea side",
          description: "Feeling the cool breeze!"
        },
        {
          id: "m3",
          image: "https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg",
          title: "Good eating",
          description: "Really tasty!"
        }
      ]
    }
  },

  getters: {
    memories(state) {
      return state.memories;
    },

    memory(state) {
      return (memoryId) => {
        return state.memories.find(memory => memory.id === memoryId);
      }
    }
  },

  mutations: {
    addMemory(state, memoryData) {
      const newMemory = {
        id: new Date().toISOString(),
        title: memoryData.title,
        image: memoryData.imageUrl,
        description: memoryData.description
      }

      state.memories.unshift(newMemory);
    }
  },

  actions: {
    addMemory(context, memoryData) {
      context.commit("addMemory", memoryData);
    }
  }
});

export default store;