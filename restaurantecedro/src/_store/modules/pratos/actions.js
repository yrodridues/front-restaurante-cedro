import { pratoService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    pratoService.getAll()
      .then(
        Prato => commit('getAllSuccess', Prato),
        error => commit('getAllFailure', error)
      )
  },
  getPorId ({ commit }, id) {
    commit('getPorIdRequest')
    pratoService.getId(id)
      .then(
        Prato => commit('getPorIdSuccess', Prato),
        error => commit('getPorIdFailure', error)
      )
  },
  update ({ dispatch, commit }, Prato) {
    commit('registerRequest', Prato)
    pratoService.update(Prato)
      .then(
        Prato => {
          commit('registerSuccess', Prato)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            pratoService.getAll()
              .then(
                Pratos => commit('getAllSuccess', Pratos),
                error => commit('getAllFailure', error)
              )
          })
        },
        error => {
          commit('registerFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  register ({ dispatch, commit }, Prato) {
    commit('registerRequest', Prato)
    pratoService.register(Prato)
      .then(
        Prato => {
          commit('registerSuccess', Prato)
          router.push('/meusProjetos')
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
          })
        },
        error => {
          commit('registerFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  delete ({ commit }, id) {
    commit('deleteRequest', id)
    pratoService.delete(id)
      .then(
        Prato => commit('deleteSuccess', id),
        error => commit('deleteSuccess', { id, error: error.toString() })
      )
  }
}
