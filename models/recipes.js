module.exports = function(sequelize, DataTypes) {
  var Recipes = sequelize.define("Recipes", {
    recipeName: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: true,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [1, 250]
      }
    },
    link: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: true,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [1, 250]
      }
    }
  });
  Recipes.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Recipes.belongsTo(models.Moods, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Recipes;
};
