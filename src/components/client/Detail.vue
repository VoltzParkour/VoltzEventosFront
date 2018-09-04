<template>
    <v-container text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <img :src="getImageByEvent(selectedEvent)">
            </v-flex>
            <v-flex xs12>
                <v-card class="mt-3">
                    <v-card-title class="display-2 grey--text">{{ selectedEvent.title }}</v-card-title>

                    <v-card-text v-html="selectedEvent.text"></v-card-text>
                </v-card>

                <v-card>
                    <!--<v-card-text>-->
                        <!--<span class="display-1">R$ </span>-->
                        <!--<span class="primary&#45;&#45;text display-1"> {{selectedEvent.price}} </span>-->
                    <!--</v-card-text>-->
                        <v-btn class="primary ma-3" @click.native="$router.push('/carrinho')">
                            Inscrever-se Aqui!!
                        </v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Detail",
        computed: {
            selectedEvent() {
                return this.$store.getters.selectedEvent
            }
        },
        methods: {
            getImageByEvent(event) {
                return event.image
            },
            goSubscribeForm() {

            },
        },
        beforeMount() {
            console.log(this.$store.getters.selectedEvent)
            if (Object.keys(this.$store.getters.selectedEvent).length === 0) {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>