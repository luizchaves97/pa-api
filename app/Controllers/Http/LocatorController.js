'use strict'

const Locator = use('App/Models/Locator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with locators
 */
class LocatorController {
  /**
   * Show a list of all locators.
   * GET locators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const locators = await Locator.query().with('user').fetch()

    return locators
  }

  /**
   * Create/save a new locator.
   * POST locators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(['store_title', 'store_description'])

    const locator = await Locator.create({ ...data, user_id: auth.user.id })

    return locator
  }

  /**
   * Display a single locator.
   * GET locators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const locator = await Locator.findOrFail(params.id)

    await locator.load('user')

    return locator
  }

  /**
   * Update locators details.
   * PUT or PATCH locators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const locator = await Locator.findOrFail(params.id)

    await locator.load('user')

    const data = request.only(['store_title', 'store_description'])
    locator.merge(data)

    await locator.save()

    return locator
  }

  /**
   * Delete a locators with id.
   * DELETE locators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const locator = await Locator.findOrFail(params.id)

    await locator.delete()
  }
}

module.exports = LocatorController
