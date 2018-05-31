exports.seed = function(knex, Promise) {
  return knex('karts').del()
    .then(function () {
      return Promise.all([
        knex('karts').insert({id: 1, users_id: '1'}),
        knex('karts').insert({id: 2, users_id: '2'}),
        knex('karts').insert({id: 3, users_id: '3'})
      ]);
    });
};