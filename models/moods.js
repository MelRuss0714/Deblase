module.exports = function (sequelize, DataTypes) {
  var Moods = sequelize.define("Moods", {
    mood: {
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
  Moods.create({  
    mood: 'happy' 
  });
  Moods.create({  
    mood: 'dreamy' 
  });
  Moods.create({  
    mood: 'angry' 
  });
  Moods.create({  
    mood: 'sad' 
  });
  Moods.create({  
    mood: 'stressed' 
  });
  Moods.create({  
    mood: 'weird' 
  });
  Moods.create({  
    mood: 'bored' 
  });
  return Moods;
  
};
