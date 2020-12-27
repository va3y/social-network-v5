<template>
  <div>
    <div v-if="error" class="container m-auto max-w-md break-words border-2 border-red-300">Error! {{error.message}}</div>
    <form @submit.prevent="pressed">
      <div class="m-3">
        <input type="e-mail" v-model="email" placeholder="E-mail" />
      </div>
      <div class="m-3">
        <input type="password" v-model="password" placeholder="Пароль" />
      </div>
      <button type="submit">Зарегигестриророваться</button>
    </form>
  </div>
</template>



<script>
import firebase from 'firebase/app'

import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    }
  },
  methods: {
    async pressed() {
      try {
      await firebase.auth()
      .createUserWithEmailAndPassword(this.email, this.password)

      console.log('here');
      this.$router.replace({name:"secret"});


      

      } catch (error) {
        this.error = error
      } 
    }
  }
};
</script>

<style lang="scss" scoped>
</style>