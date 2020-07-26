'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Env = use('Env')

class ClotherImage extends Model {
  static get computed() {
    return ['url']
  }

  getUrl({ id, clother_id: clotherId }) {
    return `${Env.get('APP_URL')}/clothers/${clotherId}/images/${id}`
  }

  clother() {
    return this.belongsTo('App/Models/Clother')
  }
}

module.exports = ClotherImage
