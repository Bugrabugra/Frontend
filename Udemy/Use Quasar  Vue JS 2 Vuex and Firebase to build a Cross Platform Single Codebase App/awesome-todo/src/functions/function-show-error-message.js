import {Dialog, Loading} from "quasar";


export const showErrorMessage = (errorMessage) => {
  Loading.hide();
  Dialog.create({
    title: "Error",
    message: errorMessage
  })
}
