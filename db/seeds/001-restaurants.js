exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({id: 1, name: 'Pizza Pizza', phone: '6472033511'}),
        knex('restaurants').insert({id: 2, name: 'Teriyaki Express', phone: '4165693279'}),
        knex('restaurants').insert({id: 3, name: 'Banh mi Boys', phone: '2893394716'})
      ]);
    });
};
