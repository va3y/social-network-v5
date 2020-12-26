<template>
  <div>
    <form @submit.prevent="pressed">
      <div>
        <input class="my-4 border-b-2 border-gray-100" type="text" placeholder="login" v-model="email" />
      </div>
      <div class="password">
        <input class="my-4 border-b-2 border-gray-100" type="password" placeholder="password" v-model="password" />
      </div>
      <button>Login</button>
    </form>
    <div class="error" v-if="error">{{error.message}}</div>
  </div>
</template>

<script>
import firebase from 'firebase/app'

import "firebase/auth";

export default {
    setup () {

        return {}
    },
    data() {
        return {
            email: "",
            password: "",
            error: ""
        }
    },
    methods: {
        pressed() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then (data => {
                console.log(data);
                this.$router.replace({name: 'secret'});

            }).catch(err => {
            this.error = err;
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>