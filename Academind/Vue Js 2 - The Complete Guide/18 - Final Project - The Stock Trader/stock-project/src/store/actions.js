import Vue from "vue";
import response from "vue-resource/src/http/response";

export const loadData = ((context) => {
 Vue.http.get("data.json")
   .then(response => response.json())
   .then(data => {
     if (data) {
       const stocks = data.stocks;
       const funds = data.funds;
       const stockPortfolio = data.stockPortfolio;

       const portfolio = {
         stockPortfolio,
         funds
       };

       context.commit("SET_STOCKS", stocks);
       context.commit("SET_PORTFOLIO", portfolio);
     }
   })
})