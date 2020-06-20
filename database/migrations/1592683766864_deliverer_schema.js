'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DelivererSchema extends Schema {
  up() {
    this.create('deliverers', (table) => {
      table.increments()
      table.string('driver_license_photo').notNullable()
      table.string('face_photo').notNullable()
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
    this.drop('deliverers')
  }
}

module.exports = DelivererSchema
