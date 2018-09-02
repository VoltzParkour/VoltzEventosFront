<template>
    <v-container fluid>
        <v-layout rwo wrap>
            <v-flex xs12>
                <v-card
                        class="pa-3 ma-3"
                >
                    <v-layout row wrap>
                        <v-flex xs2>
                            <img
                                    height="80px"
                                    :src="selectedEvent.image"/>
                        </v-flex>
                        <v-flex xs4 class="mt-2">
                            <v-flex xs12>
                        <span class="title ml-3">
                            {{ selectedEvent.title }}
                        </span>
                            </v-flex>
                            <v-flex xs12>
                            <span class="subheading ml-3">
                                1 inscrição
                            </span>
                            </v-flex>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs1 class="mt-2 subheading">
                            <span class="primary--text">R$</span>
                            <span> {{ selectedEvent.price }}</span>
                        </v-flex>
                    </v-layout>
                </v-card>

                <v-card class="pa-3">
                    <v-card-title>
                        <span class="headline">
                            Formulário de Inscrição
                        </span>
                    </v-card-title>
                    <form class="ml-4">
                        <v-text-field
                                v-validate="'required'"
                                v-model="name"
                                :counter="10"
                                :error-messages="errors.collect('name')"
                                label="Nome"
                                data-vv-name="name"
                                required
                        ></v-text-field>
                        <!--<v-text-field-->
                                <!--v-validate="'required|email'"-->
                                <!--v-model="email"-->
                                <!--:error-messages="errors.collect('email')"-->
                                <!--label="E-mail"-->
                                <!--data-vv-name="email"-->
                                <!--required-->
                        <!--&gt;</v-text-field>-->
                        <v-text-field
                                v-validate="'required'"
                                v-model="address"
                                label="Endereco"
                                data-vv-name="endereco"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-validate="'required'"
                                v-model="telephone"
                                label="Telefone"
                                mask="(##)#####-####"
                                data-vv-name="telefone"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-validate="'required'"
                                v-model="cpf"
                                label="CPF"
                                mask="###.###.###-##"
                                data-vv-name="cpf"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="questionOne"
                                label="Como conheceu o Parkour"
                                data-vv-name="questionOne"
                        ></v-text-field>
                        <v-text-field
                                v-model="questionTwo"
                                label="Você faz aula de Parkour? Onde?"
                                data-vv-name="questionTwo"
                        ></v-text-field>
                        <v-select
                                v-validate="'required'"
                                :items="items"
                                v-model="select"
                                :error-messages="errors.collect('select')"
                                label="Modalidade"
                                data-vv-name="select"
                                required
                        ></v-select>

                        <v-btn @click="submit" class="primary">Continuar</v-btn>
                    </form>
                </v-card>
            </v-flex>
            <PaymentDialogs @paymentRequested="processRequest"></PaymentDialogs>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue'
    import VeeValidate from 'vee-validate'
    import PaymentDialogs from '../models/PaymentDialogs'


    Vue.use(VeeValidate)

    export default {
        $_veeValidate: {
            validator: 'new'
        },

        name: "Cart",
        components: {
            PaymentDialogs,
        },

        computed: {
            selectedEvent() {
                return this.$store.getters.selectedEvent
            }
        },
        beforeMount() {
            console.log(this.$store.getters.selectedEvent)
            if (Object.keys(this.$store.getters.selectedEvent).length === 0) {
                this.$router.push('/')
            }
        },

        data: () => ({
            name: '',
            email: '',
            select: null,
            items: [
                'Speed'
            ],
            checkbox: null,
            dictionary: {
                attributes: {
                    email: 'E-mail Address'
                    // custom attributes
                },
                custom: {
                    name: {
                        required: () => 'Nome não pode ser vazio',
                        // custom messages
                    },
                    select: {
                        required: 'Select field is required'
                    }
                }
            },
            address: '',
            telephone: '',
            cpf: '',
            questionOne: '',
            questionTwo: ''
        }),

        mounted() {
            this.$validator.localize('pt_BR', this.dictionary)
        },

        methods: {
            submit() {
                this.$validator.validateAll().then((onFulfilled) => {
                    console.log(onFulfilled)
                    if (onFulfilled) {
                        // this.$store.dispatch('setTransactionInfo', payload)
                        this.$store.dispatch('setPaymentOptionsDialog', true)
                    }
                })
            },
            processRequest(data) {
                let responsable = {
                    name_resp: this.responsable.name,
                    cpf: this.responsable.cpf,
                    tel: this.responsable.tel,
                    celphone: this.responsable.cel,
                    email: this.responsable.email
                }
                let days = []
                let colonyId = []

                for (let j = 0; j < this.$store.getters.cart.length; j++) {//Fazer esses loops mais eficientes! Vai muitas vezes no getters!!

                    for (let i = 0; i < this.$store.getters.cart[j].dates.length; i++) {
                        let turno = ''
                        let afternoon = false
                        let morning = false

                        if (this.$store.getters.cart[j].dates[i].turno === 'Manhã') {
                            turno = 'manha'
                            morning = true
                        } else if (this.$store.getters.cart[j].dates[i].turno === 'Tarde') {
                            turno = 'tarde'
                            afternoon = true
                        }

                        let day = this.$store.getters.cart[j].dates[i].date.getUTCDate() > 9 ? this.$store.getters.cart[j].dates[i].date.getUTCDate() : '0' + this.$store.getters.cart[j].dates[i].date.getUTCDate()
                        let month = (this.$store.getters.cart[j].dates[i].date.getUTCMonth() + 1) > 9 ? (this.$store.getters.cart[j].dates[i].date.getUTCMonth() + 1) : '0' + (this.$store.getters.cart[j].dates[i].date.getUTCMonth() + 1)
                        let DateStr = this.$store.getters.cart[j].dates[i].date.getUTCFullYear() + '-' + month + '-' + day

                        days.push({
                            day: DateStr,
                            turno: turno,
                            afternoon: afternoon,
                            morning: morning
                        })
                    }
                    let userData = {
                        name: this.$store.getters.cart[j].selectedUser.name,
                        age: this.$store.getters.cart[j].selectedUser.age,
                        healthInsurance: this.$store.getters.cart[j].selectedUser.healthInsurance,
                        responsable: responsable,
                        days: days,
                        colonyId: this.$store.getters.cart[j].colonyId
                    }
                    this.$store.dispatch('createColonyParticipantTemporary', {
                        userData: userData,
                        paymentCode: data.code
                    })

                    //days.splice(0, this.$store.getters.cart[j].dates.length)

                }
            },
        }

    }
</script>

<style scoped>

</style>