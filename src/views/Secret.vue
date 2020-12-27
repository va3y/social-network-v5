<template>
  <div>
    <h4>Пожалуйста не материтесь</h4>
    <form v-on:submit.prevent="addData(message)"
    :class="{ 'text-red-600 transition-all duration-700': banned}">
    <input
      type="text"
      placeholder="your message"
      class="border-b-2"
      v-model="message"
    /><br />
    <input type="submit" value="Написать в чат">
    </form>
    <div
      v-for="(m, index) in gotMessages.slice().reverse()"
      :key="index"
      class="flex border-2 border-gray-400 max-w-sm m-auto my-4"
    >
      <div class="flex flex-col text-left text-xs items-start w-1/3">

      {{ m.email }}<br>
      {{ m.date }}
      <button v-if="m.email == currEmail" 
      @click="deletePost(m.key, index)"
      class="align-left">
        Удалить
      </button>
      </div>
      <div class="text-xl m-5">
        {{ m.message }}
      </div>
    </div>
  </div>
</template>

<script>
import "firebase/auth";
import firebase from "firebase/app";
import { db } from "../main.js";
import filterWords from "../filter";

export default {
  data() {
    return {
      message: "",
      gotMessages: [],
      currEmail: "",
      banned: false
    };
  },
  mounted() {
    this.getMessages();
    this.getEmail();
  },
  methods: {
    async addData(message) {
      console.log('lets try')
      try {
        const user = await firebase.auth().currentUser;

      if (filterWords(message)) {
        const key = await db.ref("messages").push().getKey();
        await db.ref("messages/" + key).set({
          uid: user.uid,
          email: user.email,
          date: new Date().toDateString(),
          message: "Пользователь был забанен за мат🤥😬",
          key: key,
        });
        await db.ref("banned/" + user.uid).set({ banned: true });
        return;
      }

      const key = await db.ref("messages").push().getKey();
      await db.ref("messages/" + key).set({
        uid: user.uid,
        email: user.email,
        date: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        message: message,
        key: key,
      });
      console.log("added");
      this.message = ''
      } catch (error) {
        this.message = 'Вы в бане!!',
        this.banned = true
        this.gotMessages.pop();
        return
      }
      
    },

    async getMessages() {
      const user = await firebase.auth().currentUser;

      if (user) {
        const messages = firebase.database().ref("messages").limitToLast(50);
        messages.on("child_added", (data) => {
          let msg = data.val();
          console.log(data);

          this.gotMessages.push(msg);
          console.log("DATA IS ", data.val());
        });
      }
    },
    getEmail() {
      this.currEmail = firebase.auth().currentUser.email;
    },
    async deletePost(uid, index) {
      await db.ref("messages/" + uid).set(null);
      this.gotMessages.pop(index);
      console.log("deleted");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>