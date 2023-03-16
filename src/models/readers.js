module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Name cannot be null.',
        },
        notEmpty: {
          args: [true],
          msg: 'Name cannot be empty.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: 'Please enter a valid email.',
        },
        notNull: {
          args: [true],
          msg: 'Email cannot be null.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password needs to be at least 8 characters.',
        },
        notNull: {
          args: [true],
          msg: 'Password cannot be null.',
        },
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
};
