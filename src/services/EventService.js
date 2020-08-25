import axios from 'axios'
// import NProgress from 'nprogress'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout : 10000
})

// apiClient.interceptors.request.use(config => {
//     NProgress.start()
//     console.log(config)
//     return config
// })

// apiClient.interceptors.response.use(response => {
//     NProgress.done()
//     console.log(response)
//     return response
// })

export default {
    getEvents(perPage, page){
        return apiClient.get('/events?_limit='+ perPage + '&_page=' + page); 
        //vai pegar http://localhost:3000/events por causa da Baseurl
    },
    getEvent(id){
        return apiClient.get('/events/'+id)
    },
    postEvent(event){
        return apiClient.post('/events/', event)
    }
}