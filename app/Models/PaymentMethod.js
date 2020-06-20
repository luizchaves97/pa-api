'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PaymentMethod extends Model {
  renter() {
    return this.belongsTo('App/Models/Renter')
  }
}

module.exports = PaymentMethod
