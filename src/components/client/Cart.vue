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
                        <v-text-field
                                v-validate="'required|email'"
                                v-model="email"
                                :error-messages="errors.collect('email')"
                                label="E-mail"
                                data-vv-name="email"
                                required
                        ></v-text-field>
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

                        <v-btn @click="submit" class="primary">Continuar para o Pagamento</v-btn>
                    </form>
                </v-card>
            </v-flex>
            <PaymentDialogs @paymentRequested="processRequest" :amount="selectedEvent.price"></PaymentDialogs>
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
                    if (onFulfilled) {
                        let payload = {
                            email: this.email,
                            name: this.name,
                            cel: this.telephone,
                            cpf: this.cpf
                        }
                        this.$store.dispatch('setTransactionInfo', payload)
                        this.$store.dispatch('setPaymentOptionsDialog', true)
                    }
                })
            },
            processRequest(data) {
                let userData = {
                    email: this.email,
                    name: this.name,
                    telephone: this.telephone,
                    cpf: this.cpf,
                    address: this.address,
                    questionOne: this.questionOne,
                    questionTwo: this.questionTwo
                }
                this.$store.dispatch('createEventParticipant', {userData: userData, paymentCode: data.code})
            },
        }

    }
</script>

<style scoped>

</style>