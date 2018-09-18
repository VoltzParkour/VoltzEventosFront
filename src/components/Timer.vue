<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs3 class="text-xs-center">
                <span class="display-2 info--text">Tempo</span>
                <v-card @click.native="timePassed = 0" class="mt-3 transparent">
                    <v-card-text>
                        <span class="display-1">{{getTimeFiltered()}}</span>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3 class="text-xs-center">
                <span class="display-2 error--text">Atleta</span>
                <v-card class="mt-3 transparent">
                    <v-card-text>
                        <input type="text" class="display-1 text-xs-center" style="width: 300px;">
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="align-center justify-center">
            <v-spacer></v-spacer>
            <v-flex xs4 class="mr-5">
                <img src="http://voltzparkour.com/blogs/logo.png" height="250px">
            </v-flex>
            <v-spacer></v-spacer>
        </v-layout>
        <v-layout row wrap class="align-end">
            <v-flex xs3 class="text-xs-center">
                <span class="display-2 success--text">Categoria</span>
                <v-card class="mt-3 transparent">
                    <v-card-text>
                        <input type="text" class="display-1 text-xs-center" style="width: 300px;">
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3 class="text-xs-center">
                <span class="display-2 warning--text">Modalidade</span>
                <v-card class="mt-3 transparent">
                    <v-card-text>
                        <input type="text" class="display-1 text-xs-center" style="width: 300px;">
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Timer",
        data() {
            return {
                initTime: 0,
                timePassed: 0,
                stopedTime: 0,
                name: '',
                timerController: false
            }
        },
        created() {
            window.addEventListener('keyup', (e) => {
                if (e.key == '-') {
                    if (!this.timerController) {
                        this.initTime = (new Date).getTime()
                        this.timerController = true
                        this.startTimer()
                    }
                }
                if (e.key == '=') {
                    if (this.timerController) {
                        this.timerController = false
                    }
                }
            });
        },
        methods: {
            startTimer() {
                window.setTimeout((func) => {
                    if (this.timerController) {
                        this.startTimer()
                        this.timePassed = (new Date).getTime() - this.initTime
                    }
                }, 1)
            },
            getTimeFiltered() {
                return Math.floor(this.timePassed / 1000 / 60) + ':' + Math.floor(this.timePassed / 1000) % 60 + ':' + this.timePassed % 1000
            }
        }
    }
</script>

<style scoped>

</style>