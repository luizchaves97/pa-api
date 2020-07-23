'use strict'

const Renter = use('App/Models/Renter')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with renters
 */
class RenterController {
  /**
   * Show a list of all renters.
   * GET renters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const renters = await Renter.query().with('user').fetch()

    return renters
  }

  /**
   * Create/save a new renter.
   * POST renters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request }) {
    const data = request.only(['biography', 'born_date'])

    const renter = await Renter.create({ ...data, user_id: auth.user.id })

    return renter
  }

  /**
   * Display a single renter.
   * GET renters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const renter = await Renter.findOrFail(params.id)

    await renter.load('user')

    return renter
  }

  /**
   * Update renter details.
   * PUT or PATCH renters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const renter = await Renter.findOrFail(params.id)

    await renter.load('user')

    const data = request.only(['biography', 'born_date'])
    renter.merge(data)

    await renter.save()

    return renter
  }

  /**
   * Delete a renter with id.
   * DELETE renters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const renter = await Renter.findOrFail(params.id)

    await renter.delete()
  }
}

module.exports = RenterController
