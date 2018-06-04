exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({id: 1, name: 'Pizza Pizza', phone: '+16472033511'}),
        knex('restaurants').insert({id: 2, name: 'Teriyaki Express', phone: '+14165693279'}),
        knex('restaurants').insert({id: 3, name: 'Banh mi Boys', phone: '+12893394716'})
      ]);
    });
};
