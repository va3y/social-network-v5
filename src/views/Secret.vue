<template>
    <div>
        <h4>Hello World</h4>
        <button @click="addData">Add data to Firebase DB</button>
    </div>
</template>

<script>
import "firebase/auth";
import firebase from "firebase/app";
import { db } from '../main.js'

export default {
  methods: {
  async addData() {
    const uid = await firebase.auth().currentUser.uid;
    await db.ref('users/' + uid).set({
      'uid': uid,
      'email': 'iii@gmail.com',
      'number': 42
    })
    console.log('added')
  }
}}
</script>

<style lang="scss" scoped>

</style>