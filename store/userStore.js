const userStore = defineStore('userStore', {
  state: () => {
    return {
      userInfo: {}
    }
  },
  getters: {
    userInfoValue(state) {
      return state.userInfo;
    }
  },
  actions: {
    setInfo(data) {
      this.userInfo = Object.assign(this.userInfo, data);
    },
  },
  persist: {
    storage: localStorage,
    paths: ['userInfo'],
  },
})
export default userStore;
