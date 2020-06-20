'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Clother extends Model {
  locator() {
    return this.belongsTo('App/Models/Locator')
  }

  clotherImages() {
    return this.hasMany('App/Models/ClotherImage')
  }

  schedules() {
    return this.hasMany('App/Models/Schedule')
  }
}

module.exports = Clother
