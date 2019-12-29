import { restauranteService } from '../../../_services'
import { router } from '../../../_helpers'

export default {
  getAll ({ commit }) {
    commit('getAllRequest')
    restauranteService.getAll()
      .then(
        restaurante => commit('getAllSuccess', restaurante),
        error => commit('getAllFailure', error)
      )
  },
  getPorId ({ commit }, id) {
    commit('getPorIdRequest')
    restauranteService.getId(id)
      .then(
        restaurante => commit('getPorIdSuccess', restaurante),
        error => commit('getPorIdFailure', error)
      )
  },
  update ({ dispatch, commit }, restaurante) {
    commit('registerRequest', restaurante)
    restauranteService.update(restaurante)
      .then(
        restaurante => {
          commit('registerSuccess', restaurante)
          setTimeout(() => {
            dispatch('alert/success', 'Registration successful', { root: true })
            commit('getAllRequest')
            restauranteService.getAll()
              .then(
                restaurantes => commit('getAllSuccess', restaurantes),
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
  register ({ dispatch, commit }, restaurante) {
    commit('registerRequest', restaurante)
    restauranteService.register(restaurante)
      .then(
        restaurante => {
          commit('registerSuccess', restaurante)
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
    restauranteService.delete(id)
      .then(
        restaurante => commit('deleteSuccess', id),
        error => commit('deleteSuccess', { id, error: error.toString() })
      )
  }
}
