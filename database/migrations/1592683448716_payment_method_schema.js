'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentMethodSchema extends Schema {
  up() {
    this.create('payment_methods', (table) => {
      table.increments()
      table.bigInteger('card_number').notNullable().unique()
      table.string('validity').notNullable()
      table.integer('cvv').notNullable()
      table.string('cardholder_name').notNullable()
      table.string('holder_cpf')
      table
        .integer('renter_id')
        .unsigned()
        .references('id')
        .inTable('renters')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('payment_methods')
  }
}

module.exports = PaymentMethodSchema
