/* eslint-disable */
<template>
  <v-img src="./img/wallpaper.jpg">
    <div>
      <v-app-bar
        color="deep-purple darken-4"
        dark >
        <div class="flex-grow-2"/>
        <v-spacer/>
        <v-spacer/>
        <v-btn
          icon
          href="/publicos"> Gerenciar Pratos
          <v-icon>mdi-send</v-icon>
        </v-btn>
        <div class="flex-grow-2"/>
        <v-spacer/>
        <v-spacer/>
      </v-app-bar>
    </div>
    <v-parallax
      height="300"
      dark
      src="/img/bg.png"/>
      <v-flex
        md12
        sm12
        lg12>
        <material-card
          color="deep-purple"
          title="Cadastrar Restaurante:">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <strong>
              Informe o Nome do Restaurante:
            </strong>
            <v-text-field
              v-model="restaurante.nomeRestaurante"
              :rules="nomRules"
              required />
          </v-form>
          <v-btn
            :disable="!valid"
            color="success"
            @click="handleSubmit">
            <v-icon left>
              mdi-plus-circle
            </v-icon>
            Cadastrar
          </v-btn>
        </material-card>

        <material-card
          color="deep-purple"
          title="Gesrenciar Restaurantes Cadastrados: ">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar..."
              single-line
              hide-details/>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="restaurantes"
            :search="search"
            :options.sync="pagination"
            :items-per-page-text="textoPaginacao"
            hide-default-footer
            class="elevation-1">
            <template v-slot:item.autor="{ item }">
                {{ item.nomeRestaurante }}
            </template>
            <template v-slot:item.edit="{ item }">
              <v-btn
                color="info"
                @click="openModalEdit(item.idRestaurante, item.nomeRestaurante)">
                <v-icon left>mdi-pencil-circle</v-icon>
                Editar
              </v-btn>
            </template>
            <template v-slot:item.delete="{ item }">
              <v-btn
                color="error"
                @click="openModalDelete(item.idRestaurante, item.nomeRestaurante)">
                <v-icon left>mdi-delete-circle</v-icon>
                Excluir
              </v-btn>
            </template>
            <template v-slot:item.view="{ item }">
              <v-btn
                text
                icon
                large
                color="purple darken-4"
                @click="openModalDetalhe(item.idRestaurante, item.nomeRestaurante)">
                <v-icon>mdi-share</v-icon>
              </v-btn>
            </template>
            <template v-slot:no-data>
              <v-alert
                :value="true"
                color="error"
                icon="mdi-alert">
                Não há restaurantes cadastradas! :(
              </v-alert>
            </template>
            <template v-slot:no-results>
                <v-alert
                  :value="true"
                  color="error"
                  icon="mdi-alert">
                  Você pesquisou por "{{ search }}", porém nenhum resultado foi encontrado.
                </v-alert>
              </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination
              v-model="pagination.page"
              :length="pages"
              :total-visible="20"
              circle />
          </div>
          <v-snackbar
            :timeout="timeout"
            v-model="snackbarDeleteError"
            color="warning"
            top>
            {{ textoDeleteError }}
            <v-btn
              flat
              @click="snackbarDeleteError = false">
              <v-icon left>mdi-close-circle</v-icon>
            </v-btn>
          </v-snackbar>
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            color="success"
            top>
            {{ textoCadastro }}
            <v-btn
              flat
              @click="snackbar = false">
              <v-icon left>
                mdi-close-circle
              </v-icon>
            </v-btn>
          </v-snackbar>
          <v-snackbar
            :timeout="timeout"
            v-model="snackbarError"
            color="error"
            top>
            {{ textoError }}
            <v-btn
              flat
              @click="snackbarError = false">
              <v-icon left>mdi-close-circle</v-icon>
            </v-btn>
          </v-snackbar>
        </material-card>
      </v-flex>
       <v-dialog
          v-model="modalDelete"
          persistent
          max-width="600">
          <v-card>
            <v-card-title
              class="headline">
              O restaurante será excluido!
            </v-card-title>
            <v-card-text>
              Tem certeza que deseja excluir o restaurante: {{ restaurante.nomeRestaurante }}?
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="green darken-1"
                text
                @click="deletarRestaurante(restaurante.idRestaurante)">
                Sim
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="modalDelete = false">
                Não
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="modalEdit"
          persistent
          max-width="600">
          <v-card>
            <v-card-title class="headline">Editar Restaurante</v-card-title>
            <v-container grid-list-md>
              <v-form
                ref="formEdit"
                v-model="valid"
                lazy-validation>
                <strong>
                  Nome do Restaurante:
                </strong>
                <v-text-field
                  v-model="restaurante.nomeRestaurante"
                  :rules="nomRules"
                  required />
              </v-form>
            </v-container>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                :disable="!valid"
                color="blue darken-1"
                text
                @click="editarRestaurante(restaurante.idRestaurante, restaurante.nomeRestaurante)">
                Salvar
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="modalEdit = false">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="modalDetalhe"
          persistent
          max-width="600">
          <v-card>
            <v-card-title class="headline">Detalhar Pratos do Restaurante: {{ restaurante.nomeRestaurante }}</v-card-title>
            <v-container grid-list-md>
              <v-form
                ref="formEdit"
                v-model="valid"
                lazy-validation>
                  <material-card
                    color="deep-purple"
                    title="Pratos do Restaurante: ">
                    <v-card-title>
                      <v-text-field
                        v-model="search2"
                        append-icon="mdi-magnify"
                        label="Pesquisar..."
                        single-line
                        hide-details/>
                    </v-card-title>
                    <v-data-table
                      :headers="headers2"
                      :items="pratos"
                      :search="search2"
                      :options.sync="pagination"
                      :items-per-page-text="textoPaginacao"
                      hide-default-footer
                      class="elevation-1">
                      <template v-slot:item.delete="{ item }">
                          {{ item.idRestaurante }}
                      </template>
                      <template v-slot:item.autor="{ item }">
                          {{ item.nomePrato }}
                      </template>
                      <template v-slot:item.view="{ item }">
                        {{ item.precoPrato }}
                      </template>
                      <template v-slot:no-data>
                        <v-alert
                          :value="true"
                          color="error"
                          icon="mdi-alert">
                          Não há pratos cadastrados neste Restaurante! :(
                        </v-alert>
                      </template>
                      <template v-slot:no-results>
                          <v-alert
                            :value="true"
                            color="error"
                            icon="mdi-alert">
                            Você pesquisou por "{{ search2 }}", porém nenhum resultado foi encontrado.
                          </v-alert>
                        </template>
                    </v-data-table>
                    <v-snackbar
                      :timeout="timeout"
                      v-model="snackbarDeleteError"
                      color="warning"
                      top>
                      {{ textoDeleteError }}
                      <v-btn
                        flat
                        @click="snackbarDeleteError = false">
                        <v-icon left>mdi-close-circle</v-icon>
                      </v-btn>
                    </v-snackbar>
                    <v-snackbar
                      v-model="snackbar"
                      :timeout="timeout"
                      color="success"
                      top>
                      {{ textoCadastro }}
                      <v-btn
                        flat
                        @click="snackbar = false">
                        <v-icon left>
                          mdi-close-circle
                        </v-icon>
                      </v-btn>
                    </v-snackbar>
                    <v-snackbar
                      :timeout="timeout"
                      v-model="snackbarError"
                      color="error"
                      top>
                      {{ textoError }}
                      <v-btn
                        flat
                        @click="snackbarError = false">
                        <v-icon left>mdi-close-circle</v-icon>
                      </v-btn>
                    </v-snackbar>
                  </material-card>
              </v-form>
            </v-container>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="red darken-1"
                text
                @click="closeModal()">
                Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <v-container
      fill-height
      fluid
      grid-list-xl>
      <v-layout
        align-center
        column>
        <v-container
          grid-list-md
          text-xs-center>
          <v-footer>
            <div class="d-flex pa-2"/>
            <div class="cor">&copy; Restaurante Cedro -{{ new Date().getFullYear() }}</div>
          </v-footer>
        </v-container>
      </v-layout>
    </v-container>
  </v-img>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      textoPaginacao: 'Exibir',
      textoCadastro: 'Cadastrado com sucesso!',
      modalEdit: false,
      modalDelete: false,
      modalDetalhe: false,
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 20,
        totalItems:0
      },
      timeout: 5000,
      valid: true,
      snackbar: false,
      snackbarError: false,
      snackbarDeleteError: false,
      textoError: 'Já existe um Restaurante com esse nome!',
      textoDeleteError: 'Ação não permitida!',
      search: '',
      search2: '',
      verificaExiste: '',
      restaurante: {
        idRestaurante: 0,
        nomeRestaurante: ''
      },
      prato: {
        idPrato: 0,
        nomePrato: '',
        precoPrato: 0,
        idRestaurante: 0,
        nomeRestaurante: ''
      },
      headers: [
        { text: 'Nome Restaurante', align: 'left', value: 'nomeRestaurante' },
        { text: 'Editar', align: 'center', value: 'edit', sortable: false},
        { text: 'Excluir', align: 'center', value: 'delete', sortable: false },
        { text: 'Detalhar', align: 'center', value: 'view', sortable: false }
      ],
      headers2: [
        { text: 'Id Restaurante', align: 'left', value: 'idRestaurante' },
        { text: 'Nome Prato', align: 'left', value: 'nomePrato' },
        { text: 'Preco Prato', align: 'left', value: 'precoPrato' }
      ],
      nomRules: [v => !!v || 'O campo nome do restaurante é obrigatório!']
    }
  },
  computed: {
    ...mapState('account', ['status']),
    ...mapState({
      account: state => state.account
    }),
    ...mapState({
      pratos: state => state.pratos.all.items
    }),
    ...mapState({
      restaurantes: state => state.restaurantes.all.items
    }),
    pages () {
      try {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.pagination.totalItems = this.restaurantes.length
        if (this.pagination.totalItems !== undefined) {
          if (this.pagination.rowsPerPage == null || this.pagination.totalItems === null) {
            return 0
          }
          return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        }
      } catch (e) {
      }
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    ...mapActions('restaurantes', {
      getAll: 'getAll',
      update: 'update',
      register: 'register',
      delete: 'delete'
    }),
    ...mapActions('pratos', {
      getAllPrato: 'getAll'
    }),
    handleSubmit () {
      if (this.$refs.form.validate()) {
        const resultado = this.validaRestauranteExistente()
        if (resultado === true) {
          this.snackbar = true
          this.register(this.restaurante)
            .then(
              this.snackbar = true,
              this.$refs.form.reset()
            )
        }
      }
    },
    validaRestauranteExistente () {
      let restaurantesExistentes = this.restaurante
      for (let i = 0; i < restaurantesExistentes.length; i++) {
        if (
          this.restaurante.nomeRestaurante ===
          restaurantesExistentes[i].nomeRestaurante
        ) {
          this.snackbarError = true
          return false
        }
      }
      return true
    },
    openModalEdit (idRestaurante, nomeRestaurante) {
      this.restaurante.idRestaurante = idRestaurante
      this.restaurante.nomeRestaurante = nomeRestaurante
      this.modalEdit = true
    },
    editarRestaurante(idRestaurante, nomeRestaurante) {
      this.update(this.restaurante)
      this.$refs.form.reset()
      this.getAll()
      this.modalEdit = false
    },
    openModalDelete (idRestaurante, nomeRestaurante) {
      this.restaurante.idRestaurante = idRestaurante
      this.restaurante.nomeRestaurante = nomeRestaurante
      this.modalDelete = true
    },
    deletarRestaurante (idRestaurante) {
      this.delete(idRestaurante)
      this.$refs.form.reset()
      this.getAll()
      this.modalDelete = false
    },
    openModalDetalhe (idRestaurante, nomeRestaurante) {
      this.restaurante.idRestaurante = idRestaurante
      this.restaurante.nomeRestaurante = nomeRestaurante
      this.modalDetalhe = true
      this.getAllPrato()
    },
    closeModal () {
      this.$refs.form.reset()
      this.getAll()
      this.modalDetalhe = false
    }
  }
}
</script>
<style>
.theme--light.v-timeline:before {
  color: white
}
h2  {
  font-family:Poppins !important
}
.theme--light.v-timeline:before {
  background: white
}
.cor {
  color: white;
  font-weight: bold
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
