module.exports = {
  format_date: function (date) {
    
    if (date && typeof date.toLocaleDateString === 'function') {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    } else {
     
      return 'Invalid Date';
    }
  },
};