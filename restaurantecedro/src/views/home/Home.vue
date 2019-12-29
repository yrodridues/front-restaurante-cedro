<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      align-center
      column
    >
      <v-container
        grid-list-md
        text-xs-center
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            xl12
            lg12
            md12
            sm12
            xs12
          >
            <v-card
              dark
              color="deep-purple "
            >
              <v-card-text>
                <v-list-item-title
                  class="subtitle-1"
                  style="color: white; text-align: center;"
                >
                  Bem vindo(a)!
                </v-list-item-title>
                <v-list-item-title
                  class="subtitle-2"
                  style="color: white; text-align: center;"
                >
                  {{ nomeUsuario }}
                </v-list-item-title>
              </v-card-text>
            </v-card>
            <v-parallax
              height="300"
              src="../img/teamWork.jpg"/>
          </v-flex>
        </v-layout>
        <v-container
          grid-list-md
          text-xs-center>
          <v-layout
            row
            wrap>
            <v-flex xs12>
              <v-card
                class="mx-auto"
                height="200"
                style="background: #EDEBEE;">
                <v-card-title style="color: black; text-align: center"></v-card-title>
                <v-card-actions>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                    xl6
                  >
                    <div class="my-2">
                      <v-hover v-slot:default="{ hover }">
                        <v-btn
                          :elevation="hover ? 12 : 2"
                          x-large
                          width="600px"
                          style="background:linear-gradient(to left, #9b62c0, #8a66c3, #796ac5, #666dc5, #526fc4);" >
                          Criar um Restaurante
                        </v-btn>
                      </v-hover>
                    </div>
                  </v-flex>
                  <v-spacer/>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                    xl6
                  >
                    <div class="my-2">
                      <v-hover v-slot:default="{ hover }">
                        <v-btn
                          :elevation="hover ? 12 : 2"
                          x-large
                          width="600px"
                          href="meusProjetos"
                          style="background-image:linear-gradient(to right, #9b62c0, #8a66c3, #796ac5, #666dc5, #526fc4);"
                          dark>
                          Restaurantes
                        </v-btn>
                      </v-hover>
                    </div>
                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
      <v-footer>
        <div class="flex-grow-1"/>
        <div>&copy; Restaurante Cedro -{{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      show: false,
      nomeUsuario: '',
      idUsuario: '',
      flat: false,
      media: true,
      loading: false,
      actions: true,
      outlined: false,
      elevation: undefined,
      raised: false,
      width: 344,
      height: undefined
    }
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  created () {
    this.NomeDoUsuario()
    this.getUsuarioStorage()
  },
  methods: {
    getUsuarioStorage () {
      let usuario = JSON.parse(localStorage.getItem('usuario'))
      this.usuario = usuario.value
    },
    NomeDoUsuario () {
      if (
        this.account !== null ||
        this.account.user !== null ||
        this.account !== '' ||
        this.account.user !== ''
      ) {
        this.account.user = JSON.parse(localStorage.getItem('usuario'))
        this.nomeUsuario = this.account.user.value.nome
      }
    }
  }
}
</script>

<style scoped>
  .v-input__slider {
    width: 100%;
  }
.container {
}
</style>
