import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
    events: [],
    event: {},
    totalEvents : 0,
    perPage: 3
}

export const mutations = {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events){
      state.events = events
    },
    SET_EVENT(state, event){
      state.event = event
    },
    SET_TOTAL_EVENTS(state, total){
      state.totalEvents = total
    }
    
}

export const  actions = {
    createEvent({commit, dispatch}, event){
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT',event)
        const notification = {
            type : 'success',
            message : 'Your event has been created!'
        }
        dispatch('notification/add', notification, {root: true})
      }).catch(error => {
        const notification = {
            type : 'error',
            message : 'There is a problem creating your event - ' + error.message
        }
        dispatch('notification/add', notification, {root: true})
        throw error
     })
    },
    
    fetchEvents({commit, dispatch, state}, {page}){
      
        return EventService
        .getEvents(state.perPage, page)
        .then(response => {
          console.log('Total of events: ' + response.headers['x-total-count'])
          console.log(page * state.perPage)
          commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
          var paginasporevento  = 2 + parseInt(state.totalEvents)
          if( paginasporevento > (page * state.perPage))
          {
            commit('SET_EVENTS', response.data)
          }else{

            return 1
          }

          
        })
        .catch(error => {
            const notification = {
                type : 'error',
                message : 'There is a problem fetching events - ' + error.message
            }
            dispatch('notification/add', notification, {root: true})
        })
    },

    fetchEvent({commit, getters}, id) {
      var event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
        return event
      }else{
        return EventService
        .getEvent(id)
        .then(response => {
            commit('SET_EVENT', response.data) 
            return response.data
        })
      }
    }
}

export const  getters = {
    eventsLength(state){
      return state.events.length
    },
    doneTodos: (state) => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
    catLength: state => {
      return state.categories.length
    },
    getEventById: (state) => (id) => {
      return state.events.find(event => event.id === id)
    }
}