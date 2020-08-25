<template>
     <div>
        <h1>Events for {{ user.user.name }}</h1>
         <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
        <template v-if="page != 1">
          <router-link :to="{name: 'Event-List', query: { page: page-1 } }" rel="prev">
          Prev Page
          </router-link>|
        </template>
        <template v-if="hasNextPage">
        <router-link :to="{name: 'Event-List', query: { page: page+1 } }" rel="next">
        Next Page
        </router-link>
        </template>
    </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import {mapState} from 'vuex'
import store from '@/store'

function getPageEvents(to, next) {
    const currentpage = parseInt(to.query.page) || 1
    store.dispatch('event/fetchEvents',{
      page: currentpage
    })
    .then(nomoreevent => {
      console.log(nomoreevent)
      if (nomoreevent) {
        //  next({ name: 'Network-Issue'})
         next({ name: '404', params: {resource : 'events'}})  
      }else{
        to.params.page = currentpage
        next();
      }
      // to.params.page = currentpage
      // next()
    })
}
export default {
  props: {
    //this page refer to the method getPageEvents that has " to.params.page = 
    //currentpage " that correspond to the currentPage taken by the router
    //before rendering this page
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next)
  },
  computed: {
    hasNextPage(){
      return this.event.totalEvents > this.page * this.event.perPage
    },
    ...mapState(['event','user'])
  }
}
</script>