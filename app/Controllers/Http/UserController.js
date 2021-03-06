'use strict'

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserController {
  async store({ request }) {
    const data = request.only([
      'name',
      'email',
      'phone',
      'password',
      'cpf',
      'image',
    ])

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
