export default {

  getAllRequest (state) {
    state.all = {
      items: []
    }
  },
  getAllSuccess (state, Prato) {
    state.all = { items: Prato }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  getPorIdRequest (state) {
    state.all = { loading: true }
  },
  getPorIdSuccess (state, Prato) {
    state.all = { items: Prato }
  },
  getPorIdFailure (state, error) {
    state.all = { error }
  },

  registerRequest (state, Prato) {
    state.status = { registering: true }
  },
  registerSuccess (state, Prato) {
    state.status = {}
  },
  registerFailure (state, Prato) {
    state.status = {}
  },
  deleteRequest (state, id) {
    state.all.items = state.all.items.map(Prato =>
      Prato.id === id
        ? { ...Prato, deleting: true }
        : Prato
    )
  },
  deleteSuccess (state, id) {
    state.all.items = state.all.items.filter(Prato => Prato.id !== id)
  },
  deleteFailure (state, { id, error }) {
    state.all.items = state.items.map(Prato => {
      if (Prato.id === id) {
        const { deleting, ...PratoCopy } = Prato
        return { ...PratoCopy, deleteError: error }
      }
      return Prato
    })
  }
}
