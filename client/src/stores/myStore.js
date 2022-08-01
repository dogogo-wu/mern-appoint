import { defineStore } from 'pinia'

export const useMyStore = defineStore({
  id: 'mystore',
  state: () => {
    return {
      products: [],
      appoints:[],
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
    }
  },
  getters: {

  }
})