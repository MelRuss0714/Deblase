module.exports = function (sequelize, DataTypes) {
    var Giphs = sequelize.define("Giphs", {
        url: {
            type: DataTypes.STRING,
            // AllowNull is a flag that restricts a todo from being entered if it doesn't
            // have a text value
            allowNull: false,
            // len is a validation that checks that our todo is between 1 and 140 characters
            validate: {
                len: [1, 250]
            }
        }
    });
    Giphs.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Giphs.belongsTo(models.Moods, {
            foreignKey: {
                allowNull: true
            }
        });
    };
    return Giphs;
};
