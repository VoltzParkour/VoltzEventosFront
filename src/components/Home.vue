<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-container v-bind="{ [`grid-list-xl`]: true }" fluid class="text-md-center">
                <v-layout row wrap class="justify-center">
                    <v-card ripple
                            class="ma-3"
                            v-for="event in events"
                            width="600px"
                            @click.native="onEventClick(event)"
                    >
                        <v-flex xs12>
                            <!--<plan-card :colony="colony" :plan="plan"></plan-card>-->
                            <v-card-media>
                                <img height="300px" width="600px" :src="event.image"/>
                            </v-card-media>
                            <v-card-title class="headline">{{ event.title }}</v-card-title>
                        </v-flex>
                    </v-card>
                </v-layout>
            </v-container>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
    export default {
        computed: {
            events() {
                return this.$store.getters.events
            }
        },
        methods: {
            onEventClick(event) {
                if (event.title === 'Desafio Voltz') {
                    window.location.href = 'https://docs.google.com/forms/d/1ewSEZdP34jgvA4GG6sUrLJZ0ukEDsn_BFsIkZgOtbeo';
                    return;
                }
                this.$store.dispatch('setSelectedEvent', event)
                this.$router.push('/detalhes')
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    header {
        color: gray;
        font-size: 150px;
    }

</style>
