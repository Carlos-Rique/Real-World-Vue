<template>
  <div>
    <form @submit.prevent="createEvent">

      <BaseSelect 
      class="field" 
      label="Select a category" 
      :options="categories" 
      :class="{error : $v.event.category.$error}"
      v-model="event.category" 
      @blur="$v.event.category.$touch()" 
      />
      <template v-if="$v.event.category.$error">
        <p class="errorMessage" v-if="!$v.event.category.required">Category is required</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput 
      class="field" 
      :class="{error : $v.event.title.$error}"
      label="Title" 
      type="text" 
      placeholder="Add a title" 
      v-model="event.title"
      @blur="$v.event.title.$touch()" 
      />
      <template v-if="$v.event.title.$error">
        <p class="errorMessage" v-if="!$v.event.title.required">title is required</p>
      </template>

      <BaseInput 
      class="field" 
      :class="{ error : $v.event.description.$error}"
      label="Description" 
      type="text" 
      placeholder="Add a Description" 
      v-model="event.description" 
      @blur="$v.event.description.$touch()" 
      />
      <template v-if="$v.event.description.$error">
        <p class="errorMessage" v-if="!$v.event.description.required">description is required</p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput 
      class="field" 
      :class="{ error : $v.event.location.$error}"
      label="Location" 
      type="text" 
      placeholder="Add a Location" 
      v-model="event.location" 
      @blur="$v.event.location.$touch()" 
      />
      <template v-if="$v.event.location.$error">
        <p class="errorMessage" v-if="!$v.event.location.required">location is required</p>
      </template>
      
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label> 
        <Datepicker 
        v-model="event.date" 
        :input-class="{ error : $v.event.date.$error}"
        placeholder="Select a date"
        @closed="$v.event.date.$touch()"
        />
      </div> 
      <template v-if="$v.event.date.$error">
        <p class="errorMessage" v-if="!$v.event.date.required">date is required</p>
      </template>

      <BaseSelect 
      class="field" 
      label="Select a time" 
      :options="times"
      :class="{ error : $v.event.time.$error}"
      v-model="event.time"
      @blur="$v.event.time.$touch()" 
      />
      <template v-if="$v.event.time.$error">
        <p class="errorMessage" v-if="!$v.event.time.required">time is required</p>
      </template>
    
      <!-- <input type="submit" class="button -fill-gradient" value="Submit"/>  -->
      <BaseButton 
      type="submit"
      buttonClass="-fill-gradient"
      :disabled="$v.$anyerror"> 
      Submit </BaseButton>
      <p v-if="$v.$anyerror" class="errorMessage">Please fill out the required fields</p>

    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
    components: {
         Datepicker      
    },
    validations: {
      event : {
        category: {required},
        title: {required},
        description: {required},
        location: {required},
        date: {required},
        time: {required},
      }
    },
    data() {
        const times = []
        for (let i = 0; i <= 24; i++) {
          times.push(i + ':00')
        }
         return {
          event: this.createFreshEvent(),
          times,
          categories: this.$store.state.categories,
        }
    },
    methods: {
        createEvent(){

          this.$v.$touch()
          if (!this.$v.$invalid) {
            
            NProgress.start()
            this.$store
            .dispatch('event/createEvent', this.event)
            .then(() => {
                this.$router.push({
                    name : 'Event-Show',
                    params : {id : this.event.id}
                })
                this.event = this.createFreshEvent()
            })
            .catch(() => {
              NProgress.done()
            })
          }

        },
        teste(){
          console.log('heyy')
        },
        createFreshEvent() {
          const user = this.$store.state.user.user
          const id = Math.floor(Math.random() * 10000000)
          return {
            id: id,
            organizer: user,
            category: '',
            title: '',
            description: '',
            location: '',
            date: '',
            time: '',
            attendees: []
          }
        }
    }

}
</script>

<style scoped>
.field {
    margin-bottom: 24px;
}
</style>