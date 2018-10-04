<template>
    <v-container class="text-xs-center" fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field
                        v-model="name"
                label="Nome"></v-text-field>
                <v-text-field
                        v-model="email"
                label="Email"></v-text-field>
                <v-text-field
                        v-model="phone_code"
                label="Codigo de Área do telefone"></v-text-field>
                <v-text-field
                        v-model="phone"
                label="Telefone"></v-text-field>
                <v-text-field
                        v-model="cpf"
                label="CPF"></v-text-field>

                <v-btn @click.native="generateLink">Gerar</v-btn>
            </v-flex>
            <v-flex xs12>
                <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
            </v-flex>
            <v-flex xs12>
                <span>{{erro}}</span>
            </v-flex>
            <v-flex xs12 v-if="boletoLink != ''">
                <v-btn @click.native="goBoleto">Boleto</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "BoletoPage",
        data() {
            return {
                amount: 80.00,
                email: '',
                name: '',
                phone_code: '',
                phone: '',
                cpf: '',
                boletoLink: '',
                loading: false,
                erro: null
            }
        },
        created() {
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
            //sandbox
            // recaptchaScript.setAttribute('src', 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js')
            document.head.appendChild(recaptchaScript)

        },
        mounted() {
            console.log(this.$route.query.amount)
        },
        methods: {
            generate() {
                let cartAmountString = '' + this.amount
                let payload = {
                    hash: this.$store.getters.hash,
                    email: this.email,
                    name: this.name,
                    phone_code: this.phone_code,
                    phone: this.phone,
                    cpf: this.cpf,
                    amount: cartAmountString
                }

                this.$store.dispatch('requestPayPalBoletoTransaction', payload).then(
                    response => {
                        this.loading = false
                        this.boletoLink = response.paymentLink
                        console.log(this.boletoLink)
                        // this.paymentCode = response.transactionCode
                        // this.$emit('paymentRequested', {code: this.paymentCode})
                    }
                ).catch(error => {
                    this.error = 'Ocorreu um erro, carregue a pagina e tente novamente'
                })
            },
            goBoleto() {
              window.location = this.boletoLink
            },
            generateLink() {
                this.loading = true
                this.$store.dispatch('requestPayPalSessionId')
                    .then(response => {
                        // if (this.$store.getters.sessionId === '') {
                        // console.log('Veio setar session id: ' + response.id)
                        PagSeguroDirectPayment.setSessionId(response.id)
                        // this.$store.dispatch('setSessionId', response.id)
                        // } else {
                        //   PagSeguroDirectPayment.setSessionId(this.$store.getters.sessionId)
                        // }
                        this.$store.dispatch('setSessionId', response.id)
                        var self = this
                        PagSeguroDirectPayment.onSenderHashReady(function (response) {
                            if (response.status == 'error') {
                                console.log(response.message);
                                    this.error = 'Ocorreu um erro, carregue a pagina e tente novamente'
                                return false;
                            }

                            var hash = response.senderHash//Hash estará disponível nesta variável.

                            let cartAmountString = '' + self.$route.query.amount
                            let payload = {
                                hash: hash,
                                email: self.email,
                                name: self.name,
                                phone_code: self.phone_code,
                                phone: self.phone,
                                cpf: self.cpf,
                                amount: cartAmountString
                            }

                            self.$store.dispatch('requestPayPalBoletoTransaction', payload).then(
                                response => {
                                    // this.loading = false
                                    self.boletoLink = response.paymentLink
                                    console.log(self.boletoLink)
                                    self.loading = false
                                }
                            ).catch(error => {
                                this.error = 'Ocorreu um erro, carregue a pagina e tente novamente'
                            })
                        });
                    })
                    .catch(error => {
                    this.error = 'Ocorreu um erro, carregue a pagina e tente novamente'
                        })

            }
        }
    }
</script>

<style scoped>

</style>