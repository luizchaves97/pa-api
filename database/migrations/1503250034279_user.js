'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 20).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('cpf', 14).unique()
      table.string('image', 254)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
