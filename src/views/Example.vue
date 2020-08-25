<template>
  <div>
      <form @submit.prevent="submit">
        <input type="email" v-model="email" @blur="$v.email.$touch()" :class="{error : $v.email.$error}">
        <div v-if="$v.email.$error">
            <p v-if="!$v.email.email" class="errorMessage">Email invalid</p>
            <p v-if="!$v.email.required" class="errorMessage">email needed</p>
        </div>
        <button type="submit" :disabled="$v.email.$invalid">Submit</button>
        <div v-if="$v.email.$anyError">
            <p class="errorMessage">Please fill out the required fields</p>
        </div>
      </form>
  </div>
</template>

<script>

import { required, email} from 'vuelidate/lib/validators'

export default {
    data() {
        return{
            email: null
        }
    },
    validations: {
        email: {
            required,
            email
        }
    },
    methods: {
        submit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                console.log(this.$v)
            }
        }
    }
}
</script>

<style>

</style>