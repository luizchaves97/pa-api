'use strict'

const Bank = use('App/Models/Bank')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with banks
 */
class BankController {
  /**
   * Show a list of all banks.
   * GET banks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params }) {
    const banks = await Bank.query()
      .where('locator_id', params.locators_id)
      .fetch()

    return banks
  }

  /**
   * Create/save a new bank.
   * POST banks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, params }) {
    const data = request.only([
      'bank_number',
      'agency',
      'account',
      'account_digit',
      'account_type',
    ])

    const bank = await Bank.create({ ...data, locator_id: params.locators_id })

    return bank
  }

  /**
   * Display a single bank.
   * GET banks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const bank = await Bank.findOrFail(params.id)

    return bank
  }

  /**
   * Update bank details.
   * PUT or PATCH banks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const bank = await Bank.findOrFail(params.id)

    const data = request.only([
      'bank_number',
      'agency',
      'account',
      'account_digit',
      'account_type',
    ])

    bank.merge(data)

    await bank.save()

    return bank
  }

  /**
   * Delete a bank with id.
   * DELETE banks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const bank = await Bank.findOrFail(params.id)

    await bank.delete()
  }
}

module.exports = BankController
