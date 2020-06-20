'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClotherSchema extends Schema {
  up() {
    this.create('clothers', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.float('price').notNullable()
      table.float('discount_price')
      table.string('size').notNullable()
      table.string('color').notNullable()
      table.text('description')
      table
        .integer('locator_id')
        .unsigned()
        .references('id')
        .inTable('locators')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('clothers')
  }
}

module.exports = ClotherSchema
