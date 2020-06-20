'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up() {
    this.create('addresses', (table) => {
      table.increments()
      table.string('cep', 254).notNullable()
      table.string('address', 254).notNullable()
      table.integer('number', 254).notNullable()
      table.string('complement', 254)
      table.string('neighborhood', 254).notNullable()
      table.string('city', 254).notNullable()
      table.string('state', 254).notNullable()
      table.string('reference_point', 254)
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
    this.drop('addresses')
  }
}

module.exports = AddressSchema
