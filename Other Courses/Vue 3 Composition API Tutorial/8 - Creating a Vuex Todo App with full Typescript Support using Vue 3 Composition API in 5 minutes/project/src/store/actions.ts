import {ActionContext, ActionTree} from "vuex";
import {Mutations, MutationType} from "@/store/mutations";
import {State} from "@/store/state";


export enum ActionTypes {
  GetTodoItems = "GET_ITEMS"
}

type ActionArguments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.GetTodoItems](context: ActionArguments): void
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTodoItems]({commit}) {
    commit(MutationType.SetLoading, true);

    await sleep(1000);

    commit(MutationType.SetLoading, false);
    commit(MutationType.SetItems, [
      {
        id: 1,
        text: "Create awesome Vue 3 with Vuex 4 video!",
        completed: false
      }
    ])
  }
}