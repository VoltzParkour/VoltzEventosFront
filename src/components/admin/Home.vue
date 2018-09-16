<template>
    <v-slide-y-transition mode="out-in">
        <v-container fluid>
            <v-card class="ma-3" v-for="(event, index) in participants">
                <v-card-title>{{index.toUpperCase()}}</v-card-title>
                <v-expansion-panel>
                    <v-expansion-panel-content v-for="(participant, index) in event" @click="$refs[modal.ref].open()" :key="index">
                        <div slot="header">{{ participant.name}}
                        </div>
                        <v-card flat>
                            <v-card-text>
                                <v-data-table
                                        :headers="headers"
                                        :items="getParticipantArray(participant)"
                                        hide-actions
                                >
                                    <template slot="items" slot-scope="props">
                                        <tr @click="props.expanded = !props.expanded">
                                            <td>{{ props.item.email }}</td>
                                            <td>{{ props.item.cpf }}</td>
                                            <td>{{ props.item.address }}</td>
                                            <td>{{ props.item.modality }}</td>
                                            <td>{{ props.item.questionOne }}</td>
                                            <td>{{ props.item.questionTwo }}</td>
                                            <td>{{ props.item.telephone }}</td>
                                            <td>{{ props.item.transaction_code }}</td>
                                            <td>{{ props.item.transaction_status }}</td>
                                        </tr>
                                    </template>
                                    <template slot="expand" slot-scope="props">
                                        <v-card flat>
                                            <v-card-text>
                                                <!--<span>Responsável: {{props.item.participant.responsable.name_resp }}</span><br>-->
                                                <!--<span>CPF: {{props.item.participant.responsable.cpf }}</span><br>-->
                                                <!--<span>E-mail: {{props.item.participant.responsable.email }}</span><br>-->
                                                <!--<span>Celular: {{props.item.participant.responsable.celphone }}</span><br>-->
                                                <!--<span>Telefone: {{props.item.participant.responsable.tel}}</span>-->
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
            return {
                headers: [
                    {
                        text: 'Email',
                        align: 'left',
                        value: 'email'
                    },
                    { text: 'CPF', value: 'cpf' },
                    { text: 'Endereço', value: 'address' },
                    { text: 'Modalidade', value: 'modality' },
                    { text: 'Questão 1', value: 'questionOne' },
                    { text: 'Questão 2', value: 'questionTwo' },
                    { text: 'Telefone', value: 'telephone' },
                    { text: 'Código da transação no PagSeguro', value: 'transaction_code' },
                    { text: 'Estado da transação', value: 'transaction_status' },

                ],
            }
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
            getParticipantArray(participant) {
                let array = [participant]
                return array
            }
        },
        beforeMount() {
            this.$store.dispatch('LoadEventsParticipants').then((data) => {
                // this.participants = data
            })
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
