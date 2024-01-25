//helpers.js
module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
};
Handlebars.registerHelper('debug', function(options) {
  console.log('Debug Helper:', options);
});
