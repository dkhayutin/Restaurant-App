exports.seed = function(knex, Promise) {
  return knex('karts').del()
    .then(function () {
      return Promise.all([
        knex('karts').insert({users_id: '1', dishes_id: 1, quantity: 1}),
        knex('karts').insert({users_id: '2', dishes_id: 2, quantity: 1}),
        knex('karts').insert({users_id: '1', dishes_id: 3, quantity: 1}),
        knex('karts').insert({users_id: '2', dishes_id: 3, quantity: 1}),
        knex('karts').insert({users_id: '3', dishes_id: 1, quantity: 1})
      ]);
    });
};
