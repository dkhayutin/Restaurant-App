exports.seed = function(knex, Promise) {
  return knex('kartsitems').del()
    .then(function () {
      return Promise.all([
        knex('kartsitems').insert({id: 1, karts_id: '1', dishes_id: 1, quantity: 1}),
        knex('kartsitems').insert({id: 2, karts_id: '2', dishes_id: 1, quantity: 1}),
        knex('kartsitems').insert({id: 3, karts_id: '1', dishes_id: 3, quantity: 1}),
        knex('kartsitems').insert({id: 4, karts_id: '2', dishes_id: 3, quantity: 1}),
        knex('kartsitems').insert({id: 5, karts_id: '3', dishes_id: 1, quantity: 1})
      ]);
    });
};