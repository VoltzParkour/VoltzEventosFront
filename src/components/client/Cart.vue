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
                            Dados do Participante
                        </span>
                    </v-card-title>
                    <form class="ml-4">
                        <v-flex xs12
                                v-for="(prop, key) in selectedEvent.props"
                        >
                            <v-text-field
                                    v-if="prop.type === 'text'"
                                    :v-validate="prop.required"
                                    v-model="prop.value"
                                    :error-messages="errors.collect(key)"
                                    :data-vv-name=key
                                    :label="prop.label"
                                    :mask="prop.mask"
                                    :required="prop.required != '' ? true : false"
                            ></v-text-field>
                            <v-select
                                    v-if="prop.type === 'list'"
                                    v-validate="prop.required"
                                    :items="prop.options"
                                    v-model="prop.value"
                                    :error-messages="errors.collect(key)"
                                    :label="prop.label"
                                    :data-vv-name="key"
                                    :required="prop.required != '' ? true : false"
                            ></v-select>
                        </v-flex>

                        <!--<v-text-field-->
                        <!--v-validate="'required'"-->
                        <!--v-model="name"-->
                        <!--:counter="10"-->
                        <!--:error-messages="errors.collect('name')"-->
                        <!--label="Nome"-->
                        <!--data-vv-name="name"-->
                        <!--required-->
                        <!--&gt;</v-text-field>-->
                        <!--<v-text-field-->
                        <!--v-validate="'required|email'"-->
                        <!--v-model="email"-->
                        <!--:error-messages="errors.collect('email')"-->
                        <!--label="E-mail"-->
                        <!--data-vv-name="email"-->
                        <!--required-->
                        <!--&gt;</v-text-field>-->
                        <!--<v-text-field-->
                        <!--v-validate="'required'"-->
                        <!--v-model="address"-->
                        <!--label="Endereco"-->
                        <!--data-vv-name="endereco"-->
                        <!--required-->
                        <!--&gt;</v-text-field>-->
                        <!--<v-text-field-->
                        <!--v-validate="'required'"-->
                        <!--v-model="telephone"-->
                        <!--label="Telefone"-->
                        <!--mask="(##)#####-####"-->
                        <!--data-vv-name="telefone"-->
                        <!--required-->
                        <!--&gt;</v-text-field>-->
                        <!--<v-text-field-->
                        <!--v-validate="'required'"-->
                        <!--v-model="cpf"-->
                        <!--label="CPF"-->
                        <!--mask="###.###.###-##"-->
                        <!--data-vv-name="cpf"-->
                        <!--required-->
                        <!--&gt;</v-text-field>-->
                        <!--<v-text-field-->
                        <!--v-model="questionOne"-->
                        <!--label="Como conheceu o Parkour"-->
                        <!--data-vv-name="questionOne"-->
                        <!--&gt;</v-text-field>-->
                        <!--<v-text-field-->
                        <!--v-model="questionTwo"-->
                        <!--label="Você faz aula de Parkour? Onde?"-->
                        <!--data-vv-name="questionTwo"-->
                        <!--&gt;</v-text-field>-->
                        <!--<v-select-->
                        <!--v-validate="'required'"-->
                        <!--:items="items"-->
                        <!--v-model="select"-->
                        <!--:error-messages="errors.collect('select')"-->
                        <!--label="Modalidade"-->
                        <!--data-vv-name="select"-->
                        <!--required-->
                        <!--&gt;</v-select>-->

                        <h5 class="grey--text">*Campos Obrigatórios</h5>
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
            // name: '',
            // email: '',
            // select: null,
            // items: [
            //     'Speed'
            // ],
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
                    modality: {
                        required: 'Escolha a modalidade'
                    }
                }
            },
            // address: '',
            // telephone: '',
            // cpf: '',
            // questionOne: '',
            // questionTwo: ''
        }),

        mounted() {
            this.$validator.localize('pt_BR', this.dictionary)
        },

        methods: {
            submit() {
                this.$validator.validateAll().then((onFulfilled) => {
                    if (onFulfilled) {
                        let payload = {}
                        for (let prop in this.selectedEvent.props) {
                            payload[prop] = this.selectedEvent.props[prop].value
                        }
                        console.log(payload)
                        this.$store.dispatch('setTransactionInfo', payload)
                        this.$store.dispatch('setPaymentOptionsDialog', true)
                    }
                })
            },
            processRequest(data) {
                let userData = {}
                for (let prop in this.selectedEvent.props) {
                    userData[prop] = this.selectedEvent.props[prop].value
                }
                this.$store.dispatch('createEventParticipant', {userData: userData, paymentCode: data.code})
            },
        }

    }
</script>

<style scoped>

</style>