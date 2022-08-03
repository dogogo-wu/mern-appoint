import { defineStore } from 'pinia'

export const useMyStore = defineStore({
  id: 'mystore',
  state: () => {
    return {
      products: null,
      appoints:null,
      user: null
    }
  },
  actions: {
    deleteProd(tarid) {
      this.products = this.products.filter((prod) => {
        return prod._id !== tarid
      })
    },
    deleteAppo(tarid) {
      this.appoints = this.appoints.filter((appo) => {
        return appo._id !== tarid
      })
    },
    updateAppo(tarid, newStatus){
      this.appoints = this.appoints.map((appo) => {
        if (appo._id === tarid) {
          appo.status = newStatus
        }
        return appo
      })
    },
    async fetchProds(){
      const response = await fetch(
        process.env.VUE_APP_BACKEND_LOCAL + "/api/products"
      );
      const json = await response.json();
      if (response.ok) {
        this.products = json;
      }
      if (!response.ok) {
        console.log(json.error);
      }
    },
    async fetchAppos(){
      const response = await fetch(
        process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints"
      );
      const json = await response.json();
      if (response.ok) {
        this.appoints = json;
      }
      if (!response.ok) {
        console.log(json.error);
      }
    }
  },
  getters: {

  }
})