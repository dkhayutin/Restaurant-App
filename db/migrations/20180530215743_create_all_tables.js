exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema

    .createTable('users', function(table) {
      table.string('id').notNullable().primary();
      table.string('name');
      table.string('phone');
    })

    .createTable('restaurants', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('phone');
    })

    .createTable('dishes', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('photo');
      table.string('description');
      table.string('time_to_done');
      table.string('type');
      table.float('price', 8, 2);
      table.integer('restaurants_id').references('id').inTable('restaurants');
    })

    .createTable('karts', function(table) {
      table.increments('id').primary();
      table.string('users_id').references('id').inTable('users');
    })

    .createTable('orders', function(table) {
      table.increments('id').primary();
      table.string('users_id').references('id').inTable('users');
      table.integer('karts_id').references('id').inTable('karts');
      table.float('total', 8, 2);
      table.timestamp('time_order').defaultTo(knex.raw('now()'));
      table.boolean('payed');
    })

    .createTable('kartsitems', function(table) {
      table.increments('id').primary();
      table.integer('dishes_id').references('id').inTable('dishes');
      table.integer('karts_id').references('id').inTable('karts');
      table.integer('quantity');
    })
  ]);
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .dropTable('kartsitems')
    .dropTable('orders')
    .dropTable('karts')
    .dropTable('dishes')
    .dropTable('restaurants')
    .dropTable('users')
  ])
};
