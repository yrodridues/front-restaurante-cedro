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
          href="/landingPage"> Gerenciar Restaurantes
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
          title="Cadastrar Prato:">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <strong>
              Informe o Nome do Prato:
            </strong>
            <v-text-field
              v-model="prato.nomePrato"
              :rules="nomRules"
              required />
            <strong>
              Informe o Preco do Prato:
            </strong>
            <v-text-field
              v-model="prato.precoPrato"
              type="number"
              required />
              <strong>
              Informe o Restaurante:
            </strong>
            <v-autocomplete
              v-model="prato.idRestaurante"
              :items="restaurantes"
              :no-data-text="'Não Encontrado'"
              :rules="idRestRules"
              :item-text="nomeRestau"
              item-value="idRestaurante"
              placeholder="Selecione o Restaurante"
              required/>
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
          title="Gerenciar Pratos Cadastrados: ">
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
            :items="pratos"
            :search="search"
            :options.sync="pagination"
            :items-per-page-text="textoPaginacao"
            hide-default-footer
            class="elevation-1">
            <template v-slot:item.autor="{ item }">
                {{ item.nomePrato }}
            </template>
            <template v-slot:item.view="{ item }">
              {{ item.precoPrato }}
            </template>
            <template v-slot:item.edit="{ item }">
              <v-btn
                color="info"
                @click="openModalEdit(item.idPrato, item.nomePrato, item.precoPrato, item.idRestaurante)">
                <v-icon left>mdi-pencil-circle</v-icon>
                Editar
              </v-btn>
            </template>
            <template v-slot:item.delete="{ item }">
              <v-btn
                color="error"
                @click="openModalDelete(item.idPrato, item.nomePrato, item.precoPrato, item.idRestaurante)">
                <v-icon left>mdi-delete-circle</v-icon>
                Excluir
              </v-btn>
            </template>
            <template v-slot:no-data>
              <v-alert
                :value="true"
                color="error"
                icon="mdi-alert">
                Não há pratos cadastrados! :(
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
              O prato será excluido!
            </v-card-title>
            <v-card-text>
              Tem certeza que deseja excluir o prato: {{ prato.nomePrato }}?
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="green darken-1"
                text
                @click="deletarPrato(prato.idPrato)">
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
            <v-card-title class="headline">Editar Prato</v-card-title>
            <v-container grid-list-md>
              <v-form
                ref="formEdit"
                v-model="valid"
                lazy-validation>
                <strong>
                Informe o Nome do Prato:
                </strong>
                <v-text-field
                  v-model="prato.nomePrato"
                  :rules="nomRules"
                  required />
                <strong>
                  Informe o Preco do Prato:
                </strong>
                <v-text-field
                  v-model="prato.precoPrato"
                  type="number"
                  required />
              </v-form>
            </v-container>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                :disable="!valid"
                color="blue darken-1"
                text
                @click="editarPrato(prato.idPrato, prato.nomePrato, prato.precoPrato, prato.idRestaurante)">
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
        { text: 'Nome Prato', align: 'left', value: 'nomePrato' },
        { text: 'Preco Prato', align: 'left', value: 'precoPrato' },
        { text: 'Editar', align: 'center', value: 'edit', sortable: false},
        { text: 'Excluir', align: 'center', value: 'delete', sortable: false }
      ],
      nomRules: [v => !!v || 'O campo nome do prato é obrigatório!'],
      idRestRules: [v => !!v || 'É obrigatorio a selecao de um Restaurante']
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
        this.pagination.totalItems = this.pratos.length
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
    this.getAllRestau()
  },
  methods: {
    ...mapActions('pratos', {
      getAll: 'getAll',
      update: 'update',
      register: 'register',
      delete: 'delete'
    }),
    ...mapActions('restaurantes', {
      getAllRestau: 'getAll',
    }),
    handleSubmit () {
      if (this.$refs.form.validate()) {
        const resultado = this.validaPratoExistente()
        if (resultado === true) {
          this.snackbar = true
          this.register(this.prato)
            .then(
              this.snackbar = true,
              this.$refs.form.reset()
            )
        }
      }
    },
    nomeRestau: item => 'Restaurante => ' + item.nomeRestaurante,
    validaPratoExistente () {
      let pratosExistentes = this.prato
      for (let i = 0; i < pratosExistentes.length; i++) {
        if (
          this.prato.nomePrato ===
          pratosExistentes[i].nomePrato
        ) {
          this.snackbarError = true
          return false
        }
      }
      return true
    },
    openModalEdit (idPrato, nomePrato, precoPrato, idRestaurante) {
      this.prato.idPrato = idPrato
      this.prato.nomePrato = nomePrato
      this.prato.precoPrato = precoPrato
      this.prato.idRestaurante = idRestaurante
      this.modalEdit = true
    },
    editarPrato(idPrato, nomePrato, precoPrato, idRestaurante) {
      this.update(this.prato)
      this.modalEdit = false
      this.$refs.form.reset()
      this.getAll()
    },
    openModalDelete (idPrato, nomePrato, precoPrato, idRestaurante) {
      this.prato.idPrato = idPrato
      this.prato.nomePrato = nomePrato
      this.prato.precoPrato = precoPrato
      this.prato.idRestaurante = idRestaurante
      this.modalDelete = true
    },
    deletarPrato (idPrato) {
      this.delete(idPrato)
      this.getAll()
      this.modalDelete = false
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
