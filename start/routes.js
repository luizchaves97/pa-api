'use strict'

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sessions', 'SessionController.store')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('addresses', 'AddressController').apiOnly()

  Route.resource('deliverers', 'DelivererController').apiOnly()

  Route.resource('renters', 'RenterController').apiOnly()
  Route.resource('renters.payments', 'PaymentMethodController').apiOnly()

  Route.resource('locators', 'LocatorController').apiOnly()
  Route.resource('locators.banks', 'BankController').apiOnly()
  Route.resource('locators.clothers', 'ClotherController').apiOnly()

  Route.resource('clothers.images', 'ClotherImageController').apiOnly()

  Route.get('schedules/locators_id/:id', 'ScheduleController.locators')
  Route.get('schedules/renters_id/:id', 'ScheduleController.renters')
  Route.get('schedules/:id', 'ScheduleController.show')
  Route.post('schedules', 'ScheduleController.store')
  Route.delete('schedules/:id', 'ScheduleController.destroy')
}).middleware(['auth'])
