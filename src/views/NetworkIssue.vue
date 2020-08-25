<template>
    <div>
        <h1>UH-OH!</h1>
        <h3>It looks like you're experiencing some network issues, please click the back button and try again!</h3>
        <router-link :to="{ name: 'Event-List'}">Or go back to the Home Page </router-link>
    </div>
</template>

