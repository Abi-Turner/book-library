module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Title required.',
        },
        notEmpty: {
          args: [true],
          msg: 'Title cannot be empty.',
        },
      },
    },
    ISBN: {
      type: DataTypes.STRING,
    },
  };
  
  const BookModel = connection.define('Book', schema);
  return BookModel
};
