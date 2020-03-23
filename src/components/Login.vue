<template>
  <div class="vad-login">
    <div class="vad-login-box">
      <img alt="Vue logo" src="../assets/logo.png" />
      <div class="form-group">
        <input
          class="form-control"
          type="text"
          placeholder="Username"
          name="username"
          v-model="username"
          :class="{ 'is-invalid': isInvalid('username') }"
          v-validate="'required'"
        />
        <span class="invalid-feedback" v-if="isInvalid('username')">
          {{ errors.first("username") }}</span>
      </div>
      <div class="form-group">
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
          :class="{ 'is-invalid': isInvalid('password') }"
          v-validate="'required'"
        />
        <div class="invalid-feedback" v-if="isInvalid('password')">
          {{ errors.first("password") }}
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-success" @click="login({ username, password })">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import {isFieldInvalid} from "../shared/validate"

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
  methods: {
    ...mapActions({
      login: "login"
    }),

    isInvalid(fieldName) {
      return isFieldInvalid(this.fields, fieldName, this.errors);
    }
  },
};
</script>

<style scoped>
.vad-login {
  text-align: center;
  height: 100%;
  background-image: linear-gradient(to bottom right, gray, #052b4c);
}

.vad-login-box {
  position: absolute;
  width: 18rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
