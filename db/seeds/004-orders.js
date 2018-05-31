
exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders').insert({id: 1, users_id: '1', karts_id: 1,total: 21.20, payed: 'true'}),
        knex('orders').insert({id: 2, users_id: '2', karts_id: 2,total: 52.90, payed: 'true'}),
        knex('orders').insert({id: 3, users_id: '3', karts_id: 3,total: 12.20, payed: 'true'})
      ]);
    });
};
