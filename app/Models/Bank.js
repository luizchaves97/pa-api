'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bank extends Model {
  locator() {
    return this.belongsTo('App/Models/Locator')
  }
}

module.exports = Bank
