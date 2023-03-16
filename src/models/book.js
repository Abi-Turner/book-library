module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Title required.'
        },
        notEmpty: {
          args: [true],
          msg: 'Title required.'
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Author required.'
        },
        notEmpty: {
          args: [true],
          msg: 'Author required.'
        },
      }
    },
    genre: {
      type: DataTypes.STRING
    },
    ISBN: {
      type: DataTypes.STRING
    },
  };
  const BookModel = connection.define('Book', schema);
  return BookModel;
};
