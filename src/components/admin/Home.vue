<template>
    <v-slide-y-transition mode="out-in">
        <v-container fluid>
            <v-card>
                <v-expansion-panel>
                    <v-expansion-panel-content v-for="date in ArrayOfDays" @click="$refs[modal.ref].open()" :key="date">
                        <div slot="header">{{ date.substring(7, date.length) }} de {{ dateGetMonth(date) |
                            monthNameFilter }} de {{
                            date.substring(0, 4)}}
                        </div>
                        <v-card>
                            <v-card-text>
                                <v-data-table
                                        :headers="headers"
                                        :items="getParticipantByDate(date)"
                                        hide-actions
                                        item-key="cpfPart"
                                        class="elevation-1"
                                        no-data-text="Ninguem para este dia"
                                >
                                    <template slot="items" slot-scope="props">
                                        <tr @click="props.expanded = !props.expanded">
                                            <td>{{ props.item.participant.name }}</td>
                                            <td>{{ props.item.participant.responsable.name_resp }}</td>
                                            <td>{{ props.item.participant.age }}</td>
                                            <td>{{ props.item.period }}</td>
                                        </tr>
                                    </template>
                                    <template slot="expand" slot-scope="props">
                                        <v-card flat>
                                            <v-card-text>
                                                <span>Responsável: {{props.item.participant.responsable.name_resp }}</span><br>
                                                <span>CPF: {{props.item.participant.responsable.cpf }}</span><br>
                                                <span>E-mail: {{props.item.participant.responsable.email }}</span><br>
                                                <span>Celular: {{props.item.participant.responsable.celphone }}</span><br>
                                                <span>Telefone: {{props.item.participant.responsable.tel}}</span>
                                            </v-card-text>
                                        </v-card>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-container>
    </v-slide-y-transition>

</template>

<script>

    import firebase from 'firebase'

    export default {
        data() {
            return {}
        },
        computed: {
            participants() {
                return this.$store.getters.participants
            },
        },
        methods: {
            logout() {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('login')
                })
            },
        },
        beforeMount() {
            this.$store.dispatch('LoadEventsParticipants')
        }
    }
</script>

<style lang="stylus" scoped>
    .main_text {
        padding: 0
        margin: 0
        margin-left 4px
        color: grey
        font-size: 300%
        font-weight: 500;
    }

    .top_right_header {
        top: 0px
        left: 0px
        position: absolute
        max-width 36px
        max-height 36px
        z-index 2
    }

    .top_left_header {
        top: 6px
        left: 16px
        position: absolute
        max-width 36px
        max-height 36px
        z-index 2
    }
</style>
