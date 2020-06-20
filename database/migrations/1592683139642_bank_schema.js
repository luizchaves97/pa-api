'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankSchema extends Schema {
  up() {
    this.create('banks', (table) => {
      table.increments()
      table.integer('bank_number').notNullable()
      table.integer('agency').notNullable()
      table.integer('account').notNullable()
      table.integer('account_digit').notNullable()
      table.string('account_type').notNullable()
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
    this.drop('banks')
  }
}

module.exports = BankSchema
