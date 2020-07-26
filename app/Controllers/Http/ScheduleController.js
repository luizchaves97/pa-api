'use strict'

const Schedule = use('App/Models/Schedule')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  async locators({ params }) {
    const schedules = await Schedule.query()
      .where('locator_id', params.id)
      .fetch()

    return schedules
  }

  async renters({ params }) {
    const schedules = await Schedule.query()
      .where('renter_id', params.id)
      .fetch()

    return schedules
  }

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only([
      'start_date',
      'due_date',
      'price',
      'renter_id',
      'locator_id',
      'deliverer_id',
      'clother_id',
      'payment_method_id',
    ])

    const schedule = await Schedule.create(data)

    return schedule
  }

  /**
   * Display a single schedule.
   * GET schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const schedule = await Schedule.findOrFail(params.id)

    return schedule
  }

  /**
   * Delete a schedule with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const schedule = await Schedule.findOrFail(params.id)

    await schedule.delete()
  }
}

module.exports = ScheduleController
