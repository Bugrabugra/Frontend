import Vue from 'vue'
import Vuex from 'vuex'
import {db} from "../firebase/config";


Vue.use(Vuex)

import * as emailjs from 'emailjs-com';
emailjs.init("user_KIkvzdd4me4V4zYuOnoCG");


export default new Vuex.Store({
  state: {
    products: [],
    situations: [],
    user: null,
    deleteDialog: false,
    deletingProduct: null,
    lastSituation: "",
    errorDialog: false
  },

  mutations: {
    realtimeListener(state) {
      db.collection("products")
        .onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            state.products.push({
              id: change.doc.id,
              ...change.doc.data()
            })
          } else if (change.type === "modified") {
            const index = state.products.findIndex(product => product.id === change.doc.id)
            state.products.splice(index, 1, {
              id: change.doc.id,
              name: change.doc.data().name,
              situation: change.doc.data().situation,
            })
          } else if (change.type === "removed") {
            const index = state.products.findIndex(product => product.id === change.doc.id)
            if (index >= 0) {
              state.products.splice(index, 1)
            }
          }
        })
      })
    },

    getProducts(state, payload) {
      state.products = payload;
    },

    deleteProduct(state) {
      db.collection("products")
        .doc(state.deletingProduct.id)
        .delete()
        .then(() => {state.deletingProduct = null})
    },

    getSituations(state) {
      db.collection("situations")
        .onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            state.situations.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      })
    },

    setSituation(state, payload) {
      state.lastSituation = payload.product.situation;

        db.collection("products")
          .doc(payload.product.id)
          .update({
            situation: payload.value
          })
          .then(() => {
            if (payload.value === "1 - Etiketler geldi" || payload.value === "4 - Ürün paketleri etiketlendi") {
              emailjs.send("service_6j6cewd","template_tovhdmn",{
                message: `${payload.product.name} adlı ürünün durumu: ${state.lastSituation} ==> ${payload.value} olarak değiştirilmiştir.` ,
              });
            }
          });
    },

    setUser(state, payload) {
      state.user = payload;
    },

    deleteDialog(state, payload) {
      state.deleteDialog = payload.open;
      state.deletingProduct = payload.product;
    },

    errorDialog(state, payload) {
      state.errorDialog = payload;
    }
  },

  actions: {
    realtimeListener({commit}) {
      commit("realtimeListener");
    },

    getProducts({commit}) {
      db.collection("products")
        .get()
        .then(querySnapshot  => {
          let tempProducts = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              ...doc.data()
            }
            tempProducts.push(data);
          })
          commit("getProducts", tempProducts);
        })
    },

    deleteProduct({commit}) {
      commit("deleteProduct");
    },

    getSituations({commit}) {
      commit("getSituations");
    },

    setSituation(context, payload) {
      if (parseInt(payload.value[0]) - parseInt(payload.product.situation[0]) !== 1) {
        context.commit("errorDialog", true);
      } else {
        context.commit("setSituation", payload);
      }
    },

    setUser({commit}, payload) {
      commit("setUser", payload);
    },

    deleteDialog({commit}, payload) {
      commit("deleteDialog", payload);
    },

    errorDialog({commit}, payload) {
      commit("errorDialog", payload);
    }
  },

})
