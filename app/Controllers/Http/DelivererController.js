'use strict'

const Deliverer = use('App/Models/Deliverer')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with deliverers
 */
class DelivererController {
  /**
   * Show a list of all deliverers.
   * GET deliverers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const deliverer = await Deliverer.query().with('user').fetch()

    return deliverer
  }

  /**
   * Create/save a new deliverer.
   * POST deliverers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(['driver_license_photo', 'face_photo'])

    const deliverer = await Deliverer.create({ ...data, user_id: auth.user.id })

    return deliverer
  }

  /**
   * Display a single deliverer.
   * GET deliverers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const deliverer = await Deliverer.findOrFail(params.id)

    await deliverer.load('user')

    return deliverer
  }

  /**
   * Update deliverer details.
   * PUT or PATCH deliverers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const deliverer = await Deliverer.findOrFail(params.id)

    await deliverer.load('user')

    const data = request.only(['driver_license_photo', 'face_photo'])
    deliverer.merge(data)

    await deliverer.save()

    return deliverer
  }

  /**
   * Delete a deliverer with id.
   * DELETE deliverers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const deliverer = await Deliverer.findOrFail(params.id)

    await deliverer.delete()
  }
}

module.exports = DelivererController
