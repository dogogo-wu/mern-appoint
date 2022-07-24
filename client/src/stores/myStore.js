import { defineStore } from 'pinia'

export const useMyStore = defineStore({
  id: 'mystore',
  state: () => {
    return { 
        products: [],
    }
  },
  actions: {
    deleteProd(tarId) {
      this.products = this.products.filter((prod)=>{
        return prod._id !== tarId
      })
    },
  },
  getters:{

  }
})