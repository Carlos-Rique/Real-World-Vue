import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventShow from "../views/EventShow.vue";
import EventList from "../views/EventList.vue";
import User from "../views/User.vue";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
import Example from "../views/Example.vue";
import NProgress from 'nprogress'
import store from "@/store"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Event-List",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "Event-Show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event
        next()
      }).catch(error => {
        if (error.response && error.response.status == 404) {
          next({ name: '404', params: {resource : 'event'}})  
        } else {
           next({ name: 'Network-Issue'})
        }
      })
      }
  },
  {
    path: "/event/Create",
    name: "Event-Create",
    component: EventCreate 
   },
   {
    path: "/example",
    name: "Example",
    component: Example 
   },
  {
    path: "/about",
    redirect: { name: "About"}
  },
  {
    path: "/user/:username",
    name: "user",
    component: User, 
    props: true  //set the $route.params as a prop, so it send the route parameters as prop to the component
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: { name: '404', params: {resource : 'page'}},
  },
  {
    path: '/network-issue',
    name: 'Network-Issue',
    component: NetworkIssue
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
