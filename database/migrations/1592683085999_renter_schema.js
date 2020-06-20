'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RenterSchema extends Schema {
  up() {
    this.create('renters', (table) => {
      table.increments()
      table.string('biography')
      table.string('born_date')
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
    this.drop('renters')
  }
}

module.exports = RenterSchema
