<template>
  <div>
    <form @submit.prevent="pressed">
      <div>
        <input
          class="my-4 border-b-2 border-gray-100"
          type="text"
          placeholder="логин"
          v-model="email"
        />
      </div>
      <div class="password">
        <input
          class="my-4 border-b-2 border-gray-100"
          type="password"
          placeholder="пароль"
          v-model="password"
        />
      </div>
      <button>Войти</button>
    </form>
    <div class="error" v-if="error">{{ error.message }}</div>
    <div class="border-gray-300 border-2 max-w-xs p-10 m-auto my-5 cursor-pointer"
    @click="signGoogle()">
    <span>Или войдите через Google!</span>
    <img src="../assets/google.png" alt="beautiful google photo"
    class="w-16 m-auto my-4">
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

import "firebase/auth";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data);
          this.$router.replace({ name: "secret" });
        })
        .catch((err) => {
          this.error = err;
        });
    },
    signGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          console.log(token);
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // ...
        })
        .catch(function (error) {
          this.error = error.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>