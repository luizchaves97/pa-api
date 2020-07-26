'use strict'

const PaymentMethod = use('App/Models/PaymentMethod')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with paymentmethods
 */
class PaymentMethodController {
  /**
   * Show a list of all paymentmethods.
   * GET paymentmethods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params }) {
    const paymentMethod = await PaymentMethod.query()
      .where('renter_id', params.renters_id)
      .fetch()

    return paymentMethod
  }

  /**
   * Create/save a new paymentmethod.
   * POST paymentmethods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, params }) {
    const data = request.only([
      'card_number',
      'validity',
      'cvv',
      'cardholder_name',
      'holder_cpf',
    ])

    const paymentMethod = await PaymentMethod.create({
      ...data,
      renter_id: params.renters_id,
    })

    return paymentMethod
  }

  /**
   * Display a single paymentmethod.
   * GET paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const paymentMethod = await PaymentMethod.findOrFail(params.id)

    return paymentMethod
  }

  /**
   * Update paymentmethod details.
   * PUT or PATCH paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const paymentMethod = await PaymentMethod.findOrFail(params.id)

    const data = request.only([
      'card_number',
      'validity',
      'cvv',
      'cardholder_name',
      'holder_cpf',
    ])

    paymentMethod.merge(data)

    await paymentMethod.save()

    return paymentMethod
  }

  /**
   * Delete a paymentmethod with id.
   * DELETE paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const paymentMethod = await PaymentMethod.findOrFail(params.id)

    await paymentMethod.delete()
  }
}

module.exports = PaymentMethodController
