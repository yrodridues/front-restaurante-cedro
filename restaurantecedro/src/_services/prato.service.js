import { authHeader } from '../_helpers'
import { userService, config } from '.'

export const pratoService = {
  getAll,
  getId,
  register,
  update,
  delete: _delete
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Prato/GetAll`, requestOptions).then(handleResponse)
}
function getId (id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Prato/GetId/${id}`, requestOptions).then(handleResponse)
}
function register (Prato) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(Prato)
  }
  return fetch(`${config.apiUrl}/Prato/Create`, requestOptions).then(handleResponse)
}

function update (Prato) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(Prato)
  }
  return fetch(`${config.apiUrl}/Prato/Update/${Prato.id}`, requestOptions).then(handleResponse)
}

function _delete (id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/Prato/Delete/${id}`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout()
        location.reload(true)
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
