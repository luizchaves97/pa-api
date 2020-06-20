'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Deliverer extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  schedules() {
    return this.hasMany('App/Models/Schedule')
  }
}

module.exports = Deliverer
