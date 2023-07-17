module.exports = (connection, DataTypes) => {
    const schema = {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: 'Author required.',
                },
                notEmpty: {
                    args: [true],
                    msg: 'Author required.',
                },
            },
        },
    };
    
    const AuthorModel = connection.define('Author', schema);
    return AuthorModel;
}