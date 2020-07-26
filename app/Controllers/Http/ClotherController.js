'use strict'

const Clother = use('App/Models/Clother')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clothers
 */
class ClotherController {
  /**
   * Show a list of all clothers.
   * GET clothers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params }) {
    const clothers = await Clother.query()
      .where('locator_id', params.locators_id)
      .fetch()

    return clothers
  }

  /**
   * Create/save a new clother.
   * POST clothers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, params }) {
    const data = request.only([
      'name',
      'price',
      'discount_price',
      'size',
      'color',
      'description',
    ])

    const clother = await Clother.create({
      ...data,
      locator_id: params.locators_id,
    })

    return clother
  }

  /**
   * Display a single clother.
   * GET clothers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const clother = await Clother.findOrFail(params.id)

    return clother
  }

  /**
   * Update clother details.
   * PUT or PATCH clothers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const clother = await Clother.findOrFail(params.id)

    const data = request.only([
      'name',
      'price',
      'discount_price',
      'size',
      'color',
      'description',
    ])

    clother.merge(data)

    clother.save()

    return clother
  }

  /**
   * Delete a clother with id.
   * DELETE clothers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const clother = await Clother.findOrFail(params.id)

    await clother.delete()
  }
}

module.exports = ClotherController
