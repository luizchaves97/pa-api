'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClotherImageSchema extends Schema {
  up() {
    this.create('clother_images', (table) => {
      table.increments()
      table.string('file').notNullable()
      table.string('name').notNullable()
      table.string('type', 20)
      table.string('subtype', 20)
      table
        .integer('clother_id')
        .unsigned()
        .references('id')
        .inTable('clothers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('clother_images')
  }
}

module.exports = ClotherImageSchema
