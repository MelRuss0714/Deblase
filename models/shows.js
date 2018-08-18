module.exports = function(sequelize, DataTypes) {
    var Shows = sequelize.define("Shows", {
      showName: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a Shows from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our Shows is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
      },
      service: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a Shows from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our Shows is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
      },
      imageURL: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a Shows from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our Shows is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
      },
      link: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a Shows from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our Shows is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
      },
    });
    Shows.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Shows.belongsTo(models.Moods, {
        foreignKey: {
          allowNull: true
        }
      });
    };
    return Shows;
  };