<template>
  <div class="vad-login-container">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <input type="text" placeholder="Username..." v-model="username" />
      <input type="password" placeholder="Password..." v-model="password" />
    </div>
    <div>
      <button @click="onLogin({username, password})">Login</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: state => state.username,
      password: state => state.password
    };
  },
  mounted() {
    this.username = "vyvyvy";
    this.password = "123456";
  },
  computed: {
  },
  methods: {
    ...mapActions({
      onLogin: "onLogin"
    })
  }
};
</script>

<style scoped></style>
