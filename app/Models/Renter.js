'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Renter extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  paymentMethods() {
    return this.hasMany('App/Models/PaymentMethod')
  }

  schedules() {
    return this.hasMany('App/Models/Schedule')
  }
}

module.exports = Renter
