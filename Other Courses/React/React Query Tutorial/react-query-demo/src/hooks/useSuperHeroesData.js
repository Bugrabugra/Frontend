import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils.js";


const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // staleTime: 0, // default
      // refetchOnMount: true, // default
      // refetchOnWindowFocus: true, // default
      // refetchInterval: false, // default
      // refetchIntervalInBackground: false // default
      // enabled: true // default
      onSuccess,
      onError
      // select: (data) => {
      //   const superHeroNames = data.data.map((hero) => hero.name);
      //   return superHeroNames;
      // }
    }
  )
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data]
    //     }
    //   })
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }
          ]
        }
      })
      return {
        previousHeroData
      };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("super-heroes");
    }
  });
};
