<template>
    <div>
        <h1>Oopss!</h1>
        <h3>The {{resource}} you're looking for is not here</h3>
        <router-link :to="{ name: 'Event-List'}">Back to the Home Page </router-link>
    </div>
</template>

<script>
export default {
    props: {
        resource: {
            type: String,
            required: true
        }
    }
}
</script>