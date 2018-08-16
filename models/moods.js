module.exports = function(sequelize, DataTypes) {
    var Moods = sequelize.define("Moods", {
      mood: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        // len is a validation that checks that our todo is between 1 and 140 characters
        // validate: {
        //   len: [1, 250]
        // }
      }
    });
    
    return Moods;
  };
  