'use strict'

const Address = use('App/Models/Address')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
  /**
   * Show a list of all addresses.
   * GET addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const addreess = await Address.query()
      .where('user_id', auth.user.id)
      .fetch()

    return addreess
  }

  /**
   * Create/save a new address.
   * POST addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only([
      'cep',
      'address',
      'number',
      'complement',
      'neighborhood',
      'city',
      'state',
      'reference_point',
    ])

    const address = await Address.create({ ...data, user_id: auth.user.id })

    return address
  }

  /**
   * Display a single address.
   * GET addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const address = await Address.findOrFail(params.id)

    return address
  }

  /**
   * Update address details.
   * PUT or PATCH addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const address = await Address.findOrFail(params.id)

    const data = request.only([
      'cep',
      'address',
      'number',
      'complement',
      'neighborhood',
      'city',
      'state',
      'reference_point',
    ])
    address.merge(data)

    await address.save()

    return address
  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const address = await Address.findOrFail(params.id)

    address.delete()
  }
}

module.exports = AddressController
