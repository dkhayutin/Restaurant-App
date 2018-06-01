exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: '1'}),
        knex('users').insert({id: '2'}),
        knex('users').insert({id: '3'})
      ]);
    });
};
