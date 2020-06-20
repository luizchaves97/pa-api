'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocatorSchema extends Schema {
  up() {
    this.create('locators', (table) => {
      table.increments()
      table.string('store_title')
      table.string('store_description')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('locators')
  }
}

module.exports = LocatorSchema
