export default {

  getAllRequest (state) {
    state.all = {
      items: []
    }
  },
  getAllSuccess (state, restaurante) {
    state.all = { items: restaurante }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  getPorIdRequest (state) {
    state.all = { loading: true }
  },
  getPorIdSuccess (state, restaurante) {
    state.all = { items: restaurante }
  },
  getPorIdFailure (state, error) {
    state.all = { error }
  },

  registerRequest (state, restaurante) {
    state.status = { registering: true }
  },
  registerSuccess (state, restaurante) {
    state.status = {}
  },
  registerFailure (state, restaurante) {
    state.status = {}
  },
  deleteRequest (state, id) {
    state.all.items = state.all.items.map(restaurante =>
      restaurante.id === id
        ? { ...restaurante, deleting: true }
        : restaurante
    )
  },
  deleteSuccess (state, id) {
    state.all.items = state.all.items.filter(restaurante => restaurante.id !== id)
  },
  deleteFailure (state, { id, error }) {
    state.all.items = state.items.map(restaurante => {
      if (restaurante.id === id) {
        const { deleting, ...restauranteCopy } = restaurante
        return { ...restauranteCopy, deleteError: error }
      }
      return restaurante
    })
  }
}
