exports.seed = function(knex, Promise) {
  return knex('karts').del()
    .then(function () {
      return Promise.all([
        knex('karts').insert({id: 1, users_id: '1', dishes_id: 1, quantity: 1}),
        knex('karts').insert({id: 2, users_id: '2', dishes_id: 2, quantity: 1}),
        knex('karts').insert({id: 3, users_id: '1', dishes_id: 3, quantity: 1}),
        knex('karts').insert({id: 4, users_id: '2', dishes_id: 3, quantity: 1}),
        knex('karts').insert({id: 5, users_id: '3', dishes_id: 1, quantity: 1})
      ]);
    });
};
