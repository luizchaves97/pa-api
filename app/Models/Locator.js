'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Locator extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  banks() {
    return this.hasMany('App/Models/Bank')
  }

  clothers() {
    return this.hasMany('App/Models/Clother')
  }

  schedules() {
    return this.hasMany('App/Models/Schedule')
  }
}

module.exports = Locator
