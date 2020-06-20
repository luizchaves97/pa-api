'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
  locator() {
    return this.belongsTo('App/Models/Locator')
  }

  renter() {
    return this.belongsTo('App/Models/Renter')
  }

  deliverer() {
    return this.belongsTo('App/Models/Deliverer')
  }

  clother() {
    return this.belongsTo('App/Models/Clother')
  }

  paymentMethod() {
    return this.belongsTo('App/Models/PaymentMethod')
  }
}

module.exports = Schedule
