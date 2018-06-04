exports.seed = function(knex, Promise) {
  return knex('dishes').del()
    .then(function () {
      return Promise.all([
        knex('dishes').insert({id: 1, name: 'Peperoni', photo: 'https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/honey-citrus-chicken-minors-nestle-professional-food-service-recipe-540x400.jpg?itok=O987jk8X', restaurants_id: 1}),
        knex('dishes').insert({id: 2, name: 'Teriyaki Soy', photo: 'https://qandme.net/images/report97.png', restaurants_id: 2}),
        knex('dishes').insert({id: 3, name: 'Hamburguer', photo: 'https://themunchandtattle.files.wordpress.com/2014/12/20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus.jpg', restaurants_id: 3}),
        knex('dishes').insert({id: 4, name: 'Peperoni', photo: 'https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/toasted-bay-scallop-mac-and-cheese-stouffers-nestle-professional-food-service-recipe-540x400.jpg?itok=1-pLu3qr', restaurants_id: 1}),
        knex('dishes').insert({id: 5, name: 'Teriyaki Soy', photo: 'https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/red-curry-samosa-maggi-nestle-professional-food-service-recipe-540x400.jpg?itok=xCbiTWCh', restaurants_id: 2}),
        knex('dishes').insert({id: 6, name: 'Hamburguer', photo: 'https://www.nestleprofessional.co.uk/sites/g/files/gfb191/f/styles/recipe/public/media/5.1-tuna-sweetcorn-ciabatta-pizza.jpg?itok=mxmWlXA8', restaurants_id: 3}),
        knex('dishes').insert({id: 7, name: 'Peperoni', photo: 'https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/honey-citrus-chicken-minors-nestle-professional-food-service-recipe-540x400.jpg?itok=O987jk8X', restaurants_id: 1}),
        knex('dishes').insert({id: 8, name: 'Teriyaki Soy', photo: 'https://qandme.net/images/report97.png', restaurants_id: 2}),
        knex('dishes').insert({id: 9, name: 'Hamburguer', photo: 'https://themunchandtattle.files.wordpress.com/2014/12/20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus.jpg', restaurants_id: 3}),
        knex('dishes').insert({id: 10, name: 'Peperoni', photo: 'https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/toasted-bay-scallop-mac-and-cheese-stouffers-nestle-professional-food-service-recipe-540x400.jpg?itok=1-pLu3qr', restaurants_id: 1}),
        knex('dishes').insert({id: 11, name: 'Teriyaki Soy', photo: 'https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/red-curry-samosa-maggi-nestle-professional-food-service-recipe-540x400.jpg?itok=xCbiTWCh', restaurants_id: 2}),
        knex('dishes').insert({id: 12, name: 'Hamburguer', photo: 'https://www.nestleprofessional.co.uk/sites/g/files/gfb191/f/styles/recipe/public/media/5.1-tuna-sweetcorn-ciabatta-pizza.jpg?itok=mxmWlXA8', restaurants_id: 3})
      ]);
    });
};
