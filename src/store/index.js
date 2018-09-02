import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'
import axios from 'axios'
import VuexPersist from 'vuex-persist/dist/index'

// axios.defaults.baseURL = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2';
axios.defaults.headers.post['Content-Type'] = 'application/json';

var email = 'luisfnicolau@hotmail.com'
var token = '503F25BCA32146728390BA730AA376F1'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
    key: 'vuex',
    storage: window.localStorage
})

import Constants from '../utility/constants'

// localStorage.removeItem('vuex')

export const store = new Vuex.Store({
    // plugins: [vuexLocalStorage.plugin],
    state: {
        estates: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
        // messages: [],
        // colonies: [],
        // plans: [],
        // cart: [],
        // kids: [],
        // userDirect: [],
        // userDirectAmount: null,
        // selectedColony: null,
        // colonyParticipants: [],
        // selectedPlans: '',
        // buyersCount: {},
        // cartAmount: null,

        //events
        events: [
            {
                title: 'Desafio Voltz Challenge',
                image: 'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/assets%2FVoltzChallengeBanner.jpeg?alt=media&token=f5efb8fc-e135-409e-a159-f5eb08b5d952',
                text: 'Por conseguinte, a consulta aos diversos militantes assume importantes posições no estabelecimento dos níveis de motivação departamental. As experiências acumuladas demonstram que o novo modelo estrutural aqui preconizado agrega valor ao estabelecimento do sistema de participação geral. Podemos já vislumbrar o modo pelo qual a constante divulgação das informações pode nos levar a considerar a reestruturação de alternativas às soluções ortodoxas. Evidentemente, a complexidade dos estudos efetuados nos obriga à análise das novas proposições. No mundo atual, a adoção de políticas descentralizadoras estimula a padronização do orçamento setorial. \n' +
                    '\n' +
                    '          Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a mobilidade dos capitais internacionais promove a alavancagem do sistema de formação de quadros que corresponde às necessidades. Pensando mais a longo prazo, a crescente influência da mídia auxilia a preparação e a composição do processo de comunicação como um todo. Acima de tudo, é fundamental ressaltar que a percepção das dificuldades desafia a capacidade de equalização do remanejamento dos quadros funcionais. Neste sentido, a competitividade nas transações comerciais faz parte de um processo de gerenciamento dos paradigmas corporativos. \n' +
                    '\n' +
                    '          É importante questionar o quanto o entendimento das metas propostas apresenta tendências no sentido de aprovar a manutenção dos índices pretendidos. Gostaria de enfatizar que o acompanhamento das preferências de consumo maximiza as possibilidades por conta do impacto na agilidade decisória. Por outro lado, o julgamento imparcial das eventualidades talvez venha a ressaltar a relatividade das formas de ação. O que temos que ter sempre em mente é que a valorização de fatores subjetivos não pode mais se dissociar das condições financeiras e administrativas exigidas. Percebemos, cada vez mais, que o surgimento do comércio virtual facilita a criação das posturas dos órgãos dirigentes com relação às suas atribuições. \n' +
                    '\n' +
                    '          Todavia, a necessidade de renovação processual oferece uma interessante oportunidade para verificação do retorno esperado a longo prazo. Assim mesmo, o início da atividade geral de formação de atitudes garante a contribuição de um grupo importante na determinação das diversas correntes de pensamento. Ainda assim, existem dúvidas a respeito de como o comprometimento entre as equipes afeta positivamente a correta previsão dos métodos utilizados na avaliação de resultados. Do mesmo modo, o consenso sobre a necessidade de qualificação representa uma abertura para a melhoria das direções preferenciais no sentido do progresso. \n' +
                    '\n' +
                    '          A nível organizacional, o desafiador cenário globalizado é uma das consequências dos modos de operação convencionais. Caros amigos, a estrutura atual da organização deve passar por modificações independentemente dos conhecimentos estratégicos para atingir a excelência. Não obstante, o fenômeno da Internet estende o alcance e a importância do fluxo de informações. Desta maneira, a hegemonia do ambiente político obstaculiza a apreciação da importância do levantamento das variáveis envolvidas. O empenho em analisar a revolução dos costumes ainda não demonstrou convincentemente que vai participar na mudança das regras de conduta normativas. \n' +
                    '\n' +
                    '          Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a consolidação das estruturas acarreta um processo de reformulação e modernização das condições inegavelmente apropriadas. É claro que o aumento do diálogo entre os diferentes setores produtivos cumpre um papel essencial na formulação do investimento em reciclagem técnica. A prática cotidiana prova que o desenvolvimento contínuo de distintas formas de atuação exige a precisão e a definição dos relacionamentos verticais entre as hierarquias. \n' +
                    '\n' +
                    '          O incentivo ao avanço tecnológico, assim como a contínua expansão de nossa atividade causa impacto indireto na reavaliação da gestão inovadora da qual fazemos parte. O cuidado em identificar pontos críticos na determinação clara de objetivos possibilita uma melhor visão global de todos os recursos funcionais envolvidos. A certificação de metodologias que nos auxiliam a lidar com a expansão dos mercados mundiais prepara-nos para enfrentar situações atípicas decorrentes das diretrizes de desenvolvimento para o futuro. No entanto, não podemos esquecer que a execução dos pontos do programa aponta para a melhoria dos procedimentos normalmente adotados. ',
                price: 12.99,
                firebaseBranch: 'challenge'
            },
            {
                title: 'Voltz Kids',
                image: 'https://firebasestorage.googleapis.com/v0/b/coloniaferiasvoltz.appspot.com/o/assets%2FVoltzKidsBanner.jpeg?alt=media&token=147da270-ecd6-4719-b5c1-d0e8e73c4ac2',
                text: 'Por conseguinte, a consulta aos diversos militantes assume importantes posições no estabelecimento dos níveis de motivação departamental. As experiências acumuladas demonstram que o novo modelo estrutural aqui preconizado agrega valor ao estabelecimento do sistema de participação geral. Podemos já vislumbrar o modo pelo qual a constante divulgação das informações pode nos levar a considerar a reestruturação de alternativas às soluções ortodoxas. Evidentemente, a complexidade dos estudos efetuados nos obriga à análise das novas proposições. No mundo atual, a adoção de políticas descentralizadoras estimula a padronização do orçamento setorial. \n' +
                    '\n' +
                    '          Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a mobilidade dos capitais internacionais promove a alavancagem do sistema de formação de quadros que corresponde às necessidades. Pensando mais a longo prazo, a crescente influência da mídia auxilia a preparação e a composição do processo de comunicação como um todo. Acima de tudo, é fundamental ressaltar que a percepção das dificuldades desafia a capacidade de equalização do remanejamento dos quadros funcionais. Neste sentido, a competitividade nas transações comerciais faz parte de um processo de gerenciamento dos paradigmas corporativos. \n' +
                    '\n' +
                    '          É importante questionar o quanto o entendimento das metas propostas apresenta tendências no sentido de aprovar a manutenção dos índices pretendidos. Gostaria de enfatizar que o acompanhamento das preferências de consumo maximiza as possibilidades por conta do impacto na agilidade decisória. Por outro lado, o julgamento imparcial das eventualidades talvez venha a ressaltar a relatividade das formas de ação. O que temos que ter sempre em mente é que a valorização de fatores subjetivos não pode mais se dissociar das condições financeiras e administrativas exigidas. Percebemos, cada vez mais, que o surgimento do comércio virtual facilita a criação das posturas dos órgãos dirigentes com relação às suas atribuições. \n' +
                    '\n' +
                    '          Todavia, a necessidade de renovação processual oferece uma interessante oportunidade para verificação do retorno esperado a longo prazo. Assim mesmo, o início da atividade geral de formação de atitudes garante a contribuição de um grupo importante na determinação das diversas correntes de pensamento. Ainda assim, existem dúvidas a respeito de como o comprometimento entre as equipes afeta positivamente a correta previsão dos métodos utilizados na avaliação de resultados. Do mesmo modo, o consenso sobre a necessidade de qualificação representa uma abertura para a melhoria das direções preferenciais no sentido do progresso. \n' +
                    '\n' +
                    '          A nível organizacional, o desafiador cenário globalizado é uma das consequências dos modos de operação convencionais. Caros amigos, a estrutura atual da organização deve passar por modificações independentemente dos conhecimentos estratégicos para atingir a excelência. Não obstante, o fenômeno da Internet estende o alcance e a importância do fluxo de informações. Desta maneira, a hegemonia do ambiente político obstaculiza a apreciação da importância do levantamento das variáveis envolvidas. O empenho em analisar a revolução dos costumes ainda não demonstrou convincentemente que vai participar na mudança das regras de conduta normativas. \n' +
                    '\n' +
                    '          Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a consolidação das estruturas acarreta um processo de reformulação e modernização das condições inegavelmente apropriadas. É claro que o aumento do diálogo entre os diferentes setores produtivos cumpre um papel essencial na formulação do investimento em reciclagem técnica. A prática cotidiana prova que o desenvolvimento contínuo de distintas formas de atuação exige a precisão e a definição dos relacionamentos verticais entre as hierarquias. \n' +
                    '\n' +
                    '          O incentivo ao avanço tecnológico, assim como a contínua expansão de nossa atividade causa impacto indireto na reavaliação da gestão inovadora da qual fazemos parte. O cuidado em identificar pontos críticos na determinação clara de objetivos possibilita uma melhor visão global de todos os recursos funcionais envolvidos. A certificação de metodologias que nos auxiliam a lidar com a expansão dos mercados mundiais prepara-nos para enfrentar situações atípicas decorrentes das diretrizes de desenvolvimento para o futuro. No entanto, não podemos esquecer que a execução dos pontos do programa aponta para a melhoria dos procedimentos normalmente adotados. ',
                price: 32.33,
                firebaseBranch: 'kids'
            }
        ],
        selectedEvent: {},
        //payment
        session_id: '',
        hash: null,
        payment_methods: null,
        payment_options_dialog: false,
        transaction: null,
        test: null,
    },
    mutations: {
        // addColony(state, payload) {
        //     state.colonies.push(payload)
        // },
        // setColonies(state, payload) {
        //     state.colonies = payload
        // },
        // removeColony(state, payload) {
        //     state.colonies.splice(payload, 1)
        // },
        // setSelectedColony(state, payload) {
        //     state.selectedColony = payload
        // },
        // clearSelectedColony(state, payload) {
        //     state.selectedColony = null
        // },
        // setColonyParticipants(state, payload) {
        //     state.colonyParticipants = payload
        // },
        // setSelectedPlans(state, payload) {
        //     state.selectedPlans = payload
        // },
        // addPlanToCart(state, payload) {
        //     if (state.cartAmount === null) {
        //         state.cartAmount = parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
        //     } else {
        //         state.cartAmount = state.cartAmount + parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
        //     }
        //     state.cart.push(payload)
        // },
        // setPlanToCart(state, payload) {
        //     state.cart[payload.index] = payload.data
        // },
        // removePlanFromCart(state, payload) {
        //     state.cart.splice(payload, 1)
        //     state.cartAmount = state.cartAmount - payload.price
        // },
        // setPlanUser(state, payload) {
        //     state.cart[payload.index].selectedUser = payload.user
        // },
        // addKid(state, payload) {
        //     state.kids.push(payload)
        // },
        // addPlanToUserDirect(state, payload) {
        //     if (state.userDirectAmount === null) {
        //         state.userDirectAmount = parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
        //     } else {
        //         state.userDirectAmount = state.userDirectAmount + parseFloat([payload.plan.price.slice(0, payload.plan.price.length - 2), '.', payload.plan.price.slice(payload.plan.price.length - 2)].join(''))
        //     }
        //     state.userDirect.push(payload)
        // },
        // removePlanFromUserDirect(state, payload) {
        //     state.userDirect.splice(payload, 1)
        // },
        // setBuyersCount(state, payload) {
        //     state.buyersCount = payload
        // },
        // createColonyParticipant(state, payload) {
        //     state.colonyParticipants.push(payload)
        // },
        setSelectedEvent(state, payload) {
            state.selectedEvent = payload
        },
        setSessionId(state, payload) {
            state.session_id = payload
        },
        setHash(state, payload) {
            state.hash = payload
        },
        setPaymentMethods(state, payload) {
            state.payment_methods = payload
        },
        setPaymentOptionsDialog(state, payload) {
            state.payment_options_dialog = payload
        },
        setTransactionInfo(state, payload) {
            state.transaction = payload
        },
        setTest(state, payload) {
            state.test = payload
        }
    },
    actions: {
        // CreateColony({commit, getters}, payload) {
        //     if (getters.selectedColony != null) {
        //         firebase.database().ref('Colonies').child(getters.selectedColony.id)
        //             .set(payload)
        //             .then(
        //                 (data) => {
        //
        //                 }
        //             )
        //     } else {
        //         firebase.database().ref('Colonies').push(payload)
        //             .then((data) => {
        //                 // console.log(data)
        //                 // commit('addColony', payload)
        //                 router.push('/admin')
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             })
        //     }
        // },
        //

        createEventParticipant({commit, getters}, payload) {
            payload.userData.transaction_code = payload.paymentCode
            payload.userData.transaction_status = 'aguardando confirmação'
            let path = 'events/' + getters.selectedEvent.firebaseBranch +'/' + payload.paymentCode
            firebase.database().ref(path).set(payload.userData)
        },

        // createColonyParticipantTemporary({commit, getters}, payload) {
        //     const user = {
        //         name: payload.userData.name,
        //         age: payload.userData.age,
        //         healthInsurance: payload.userData.healthInsurance,
        //         responsable: payload.userData.responsable,
        //         days: payload.userData.days,
        //         paymentCode: payload.paymentCode
        //     }
        //     let selectedColonyId = payload.userData.colonyId
        //     let string = 'colony_buyers_by_payment/' + payload.paymentCode + '/' + selectedColonyId
        //     console.log('endereco: ' + string)
        //     firebase.database().ref(string).push(user)
        //         .then((data) => {
        //             // const key = data.key
        //             // commit('createColonyParticipant', {
        //             //   ...user,
        //             //   id: key,
        //             //   temporary: true
        //             // })
        //
        //
        //             // let string_m = 'colony_buyers/' + selectedColonyId
        //             // firebase.database().ref(string_m).push(user)
        //
        //             // let string_l = 'Colonies/' + selectedColonyId + '/Days/'
        //             // user.days.forEach(turno => {//diminuir número de chamadas!!!
        //             //   firebase.database().ref(string_l + turno.day + '/' + turno.turno.replace('ã','a').toLowerCase()).push({userId: key, paymentCode: payload.paymentCode})
        //             // })
        //
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })
        //     // Reach out to firebase and store it
        // },
        // createColonyParticipant({commit, getters}, payload) {
        //     const user = {
        //         name: payload.name,
        //         age: payload.age,
        //         healthInsurance: payload.healthInsurance,
        //         responsable: payload.responsable,
        //         days: payload.days
        //     }
        //     let selectedColonyId = payload.colonyId
        //     let string = 'colony_buyers/' + selectedColonyId
        //     firebase.database().ref(string).push(user)
        //         .then((data) => {
        //             const key = data.key
        //             commit('createColonyParticipant', {
        //                 user,
        //                 id: key
        //             })
        //             let string_l = 'Colonies/' + selectedColonyId + '/Days/'
        //             user.days.forEach(turno => {
        //                 firebase.database().ref(string_l + '/' + turno.date + '/' + turno.turno.replace('ã', 'a').toLowerCase()).push(data.key)
        //             })
        //
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })
        //     // Reach out to firebase and store it
        // },
        //
        //
        // LoadColonies({commit}) {
        //     // firebase.database().ref('Colonies').on('value')
        //     firebase.database().ref('Colonies').once('value')
        //         .then(
        //             (data) => {
        //                 const colonies = []
        //                 const obj = data.val()
        //                 for (let key in obj) {
        //                     colonies.push({
        //                         id: key,
        //                         title: obj[key].title,
        //                         description: obj[key].description,
        //                         start_date: obj[key].start_date,
        //                         end_date: obj[key].end_date,
        //                         plans: obj[key].plans,
        //                         week_days: obj[key].week_days,
        //                         days: obj[key].Days,
        //                         capacity: obj[key].capacity,
        //                         active: true,
        //                         sellStart: obj[key].sellStart,
        //                         sellEnd: obj[key].sellEnd
        //                     })
        //                 }
        //                 commit('setColonies', colonies)
        //                 // .filter(new Date(sellStart) >= today && new Date(sellEnd) >= today )
        //             }
        //         )
        //         .catch(
        //             (error) => {
        //                 console.log(error)
        //             }
        //         )
        // },
        // LoadColonyParticipants({commit, getters}) {
        //     firebase.database().ref('colony_buyers').child(getters.selectedColony.id).once('value')
        //         .then(
        //             (data) => {
        //                 const colony_buyers = []
        //                 const obj = data.val()
        //                 for (let key in obj) {
        //                     let colonyParticipant = {
        //                         cpf: key,
        //                         name: obj[key].name,
        //                         age: obj[key].age,
        //                         responsable: obj[key].responsable,
        //                         days: obj[key].days
        //                     }
        //                     let days = []
        //                     for (let selectedDay in obj[key].days) {
        //                         days.push({
        //                             day: obj[key].days[selectedDay].day,
        //                             morning: obj[key].days[selectedDay].morning,
        //                             afternoon: obj[key].days[selectedDay].afternoon
        //                         })
        //                     }
        //                     colonyParticipant = {
        //                         colonyParticipant,
        //                         days
        //                     }
        //                     colony_buyers.push(
        //                         colonyParticipant)
        //                 }
        //                 commit('setColonyParticipants', colony_buyers)
        //             }
        //         )
        // },
        // selectColony({commit}, payload) {
        //     commit('setSelectedColony', payload)
        // },
        // deleteColony({commit, getters}, payload) {
        //     firebase.database().ref('Colonies')
        //         .child(payload.id)
        //         .remove()
        //         .then(
        //             (data) => {
        //                 for (let i = 0; i < getters.colonies.length; i++) {
        //                     if (payload.id === getters.colonies[i].id) {
        //                         commit('removeColony', i)
        //                     }
        //                 }
        //                 // location.reload()
        //             }
        //         )
        // },
        // clearSelectedColony({commit}) {
        //     commit('clearSelectedColony')
        // },
        // setCreatePlans({commit}, payload) {
        //     commit('setSelectedPlans', payload)
        // },
        // addPlanToCart({commit}, payload) {
        //     commit('addPlanToCart', payload)
        // },
        // setPlanToCart({commit}, payload) {
        //     commit('setPlanToCart', payload)
        // },
        // removePlanFromCart({commit}, payload) {
        //     commit('removePlanFromCart', payload)
        // },
        // setPlanUser({commit}, payload) {
        //     commit('setPlanUser', payload)
        // },
        // addKid({commit}, payload) {
        //     commit('addKid', payload)
        // },
        // addPlanToUserDirect({commit}, payload) {
        //     commit('addPlanToUserDirect', payload)
        // },
        // removePlanFromUserDirect({commit}, payload) {
        //     commit('removePlanFromUserDirect', payload)
        // },
        // LoadBuyersCount({commit}) {
        //     firebase.database().ref('colony_buyers').once('value')
        //         .then(
        //             (data) => {
        //                 const buyersCount = {}
        //                 const obj = data.val()
        //                 for (let colonia in obj) {
        //                     buyersCount[colonia] = Object.keys(obj[colonia]).length
        //                 }
        //                 console.log(buyersCount)
        //                 commit('setBuyersCount', buyersCount)
        //             })
        //         .catch(
        //             (error) => {
        //                 console.log(error)
        //             }
        //         )
        // },
        setSelectedEvent({commit}, payload) {
            commit('setSelectedEvent', payload)
        },
        requestPayPalSessionId({commit}) {
            return new Promise((resolve, reject) => {
                let url = process.env.ROOT_API + 'api/session'
                axios.get(url)
                    .then(
                        function (response) {
                            console.log(response)
                            resolve(response.data)
                            // console.log('sessionid: ' + response.data.session.id)
                        }
                    )
                    .catch(
                        function (error) {
                            reject(error)
                            console.log(error)
                        }
                    )
            })
        },
        requestPayPalBoletoTransaction({commit}, payload) {
            // let url = 'transactions' + '?Accept=application%2Fvnd.pagseguro.com.br.v3%2Bxml&email=suporte%40lojamodelo.com.br&token=57BE455F4EC148E5A54D9BB91C5AC12C'
            let url = process.env.ROOT_API + 'api/payment/boleto'
            return new Promise((resolve, reject) => {
                axios.post(url, payload)
                    .then(
                        function (response) {
                            console.log(response)
                            resolve(response.data)
                        }
                    )
                    .catch(
                        function (error) {
                            console.log(error)
                        }
                    )
            })
        },
        requestPayPalCardTransaction({commit}, payload) {
            // let url = 'transactions' + '?Accept=application%2Fvnd.pagseguro.com.br.v3%2Bxml&email=suporte%40lojamodelo.com.br&token=57BE455F4EC148E5A54D9BB91C5AC12C'
            let url = process.env.ROOT_API + 'api/payment/card'
            return new Promise((resolve, reject) => {
                axios.post(url, payload)
                    .then(
                        function (response) {
                            console.log(response)
                            resolve(response.data)
                        }
                    )
                    .catch(
                        function (error) {
                            console.log(error)
                        }
                    )
            })
        },
        getAddressByCEP({commit}, payload) {
            console.log('payload')
            console.log(payload)
            return new Promise((resolve, reject) => {
                let url = 'https://viacep.com.br/ws/' + payload + '/json/'
                axios.get(url)
                    .then(
                        function (response) {
                            resolve(response)
                        }
                    )
                    .catch(
                        function (error) {
                            reject(error)
                        }
                    )
            })
        },
        setSessionId({commit}, payload) {
            commit('setSessionId', payload)
        },
        setHash({commit}, payload) {
            commit('setHash', payload)
        },
        setPaymentMethods({commit}, payload) {
            commit('setPaymentMethods', payload)
        },
        setPaymentOptionsDialog({commit}, payload) {
            commit('setPaymentOptionsDialog', payload)
        },
        setTransactionInfo({commit}, payload) {
            commit('setTransactionInfo', payload)
        },
        setTest({commit}, payload) {
            commit('setTest', payload)
        }
    },
    getters: {
        events(state) {
            return state.events
        },
        selectedEvent(state) {
            return state.selectedEvent
        },
        // messages(state) {
        //     return state.messages.sort((messageA, messageB) => {
        //         return messageA.sent > messageB.sent
        //     })
        // },
        // selectedPlans(state) {
        //     return state.selectedPlans
        // },
        // colonies(state) {
        //     return state.colonies
        // },
        // colonyParticipants(state) {
        //     return state.colonyParticipants
        // },
        // selectedColony(state) {
        //     return state.selectedColony
        // },
        // cart(state) {
        //     return state.cart
        // },
        // cartAmount(state) {
        //     return state.cartAmount
        // },
        // userDirect(state) {
        //     return state.userDirect
        // },
        // userDirectAmount(state) {
        //     return state.userDirectAmount
        // },
        buyersCount(state) {
            return state.buyersCount
        },
        sessionId(state) {
            return state.session_id
        },
        hash(state) {
            return state.hash
        },
        peymentMethods(state) {
            return state.peyment_methods
        },
        paymentOptionsDialog(state) {
            return state.payment_options_dialog
        },
        transaction(state) {
            return state.transaction
        },
        estates(state) {
            return state.estates
        },
        // kids(state) {
        //     return state.kids
        // },
        oldBrowser() {
            var ua = window.navigator.userAgent;

            // Test values; Uncomment to check result …

            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

            // Edge 12 (Spartan)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

            // Edge 13
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                // return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                return true
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                // return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                return true;
            }

            // var edge = ua.indexOf('Edge/');
            // if (edge > 0) {
            //   // Edge (IE 12+) => return version number
            //   return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            // }

            // other browser
            return false;
        }

    }
})
