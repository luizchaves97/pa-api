'use strict'

const ClotherImage = use('App/Models/ClotherImage')
const Helpers = use('Helpers')
const CLOTHER_IMAGE_FOLDER = 'clother-images'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clotherimages
 */
class ClotherImageController {
  /**
   * Show a list of all clotherimages.
   * GET clotherimages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params }) {
    const images = await ClotherImage.query()
      .where('clother_id', params.clothers_id)
      .fetch()

    return images
  }

  /**
   * Create/save a new clotherimage.
   * POST clotherimages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '5mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath(CLOTHER_IMAGE_FOLDER), {
        name: fileName,
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await ClotherImage.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        clother_id: params.clothers_id,
      })

      return file
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Erro no upload de arquivo',
        },
      })
    }
  }

  /**
   * Display a single clotherimage.
   * GET clotherimages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ response, params }) {
    const file = await ClotherImage.findOrFail(params.id)

    return response.download(
      Helpers.tmpPath(`${CLOTHER_IMAGE_FOLDER}/${file.file}`)
    )
  }

  /**
   * Delete a clotherimage with id.
   * DELETE clotherimages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const file = await ClotherImage.findOrFail(params.id)

    file.delete()
  }
}

module.exports = ClotherImageController
