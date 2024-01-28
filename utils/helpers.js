module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  compare: function (v1, comparator, v2) {
    if (eval(v1 + comparator + v2)) {
      return true;
    } else {
      return false;
    }
  }
};