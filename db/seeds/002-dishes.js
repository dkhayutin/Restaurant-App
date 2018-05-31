exports.seed = function(knex, Promise) {
  return knex('dishes').del()
    .then(function () {
      return Promise.all([
        knex('dishes').insert({id: 1, name: 'Peperoni', photo: '123123.jpg', restaurants_id: 1}),
        knex('dishes').insert({id: 2, name: 'Teriyaki Soy', photo: '123123.jpg', restaurants_id: 2}),
        knex('dishes').insert({id: 3, name: 'Hamburguer', photo: '123123.jpg', restaurants_id: 3})
      ]);
    });
};