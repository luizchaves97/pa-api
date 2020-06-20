'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up() {
    this.create('schedules', (table) => {
      table.increments()
      table.timestamp('start_date').notNullable()
      table.timestamp('due_date').notNullable()
      table.float('price').notNullable()
      table
        .integer('renter_id')
        .unsigned()
        .references('id')
        .inTable('renters')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('locator_id')
        .unsigned()
        .references('id')
        .inTable('locators')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('deliverer_id')
        .unsigned()
        .references('id')
        .inTable('deliverers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('clother_id')
        .unsigned()
        .references('id')
        .inTable('clothers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('payment_method_id')
        .unsigned()
        .references('id')
        .inTable('payment_methods')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
