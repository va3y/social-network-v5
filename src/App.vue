<template>
  <div id="nav" class="bg-gray-300 text-xl">
    <h1 class="text-2xl font-black pt-5">Социальная сеть 5.0</h1>
    <h2 class="pb-5 text-sm">Я изучаю firebase</h2>

    <div class="flex justify-around md:px-60">
      <router-link to="/">О Сайте</router-link> |
      <router-link to="/login">Войти</router-link> |
      <router-link to="/register">Регистрация</router-link> |
      <router-link v-if="isLogged" to="/secret">ЧАТ</router-link>
    </div>

    <div v-if="isLogged">
      <div class="text-right">
        {{ this.eMail }}
        <button @click="signOut" class="text-red-700">выйти</button>
      </div>
    </div>
    <div v-else class="text-right">not logged in</div>
    {{ error }}
  </div>

  <router-view />
</template>


<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  setup() {
    //return { uid: useState() };
  },
  data() {
    return {
      eMail: "not logged in",
      isLogged: false,
      error: "",
    };
  },
  mounted() { 
    this.setFirebase();
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.replace({ name: "login" });
    },
    setFirebase() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          console.log("USER IS", user);
          this.isLogged = true;
          this.eMail = user.email;
        } else {
          // No user is signed in.
          this.isLogged = false;
          console.log("signed out", this.isLogged);
        }
      });
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
