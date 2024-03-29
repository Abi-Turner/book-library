const { Book, Reader, Genre, Author } = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader,
        genre: Genre,
        author: Author,
    };

    return models[model];
};

const getOptions = (model) => {
    if (model === 'book') return { include: Genre, Author, };

    if (model === 'genre') return { include: Book, Author, };

    if (model === 'author') return { include: Book, Genre, };

    return {};
};

const removePassword = (obj) => {
    if (obj.hasOwnProperty('password')) {
        delete obj.password;
    }

    return obj;
};

const getAllItems = async (res, model) => {
    const Model = getModel(model);

    const items = await Model.findAll();
    
    const itemsWithoutPassword = items.map((item) => {
        return removePassword(item.dataValues);
    });

    res.status(200).json(itemsWithoutPassword);
};

const createItem = async (res, model, item) => {
    const Model = getModel(model);

    try {
        const newItem = await Model.create(item);
        const itemWithoutPassword = await removePassword(newItem.get());

        res.status(201).json(itemWithoutPassword);
    } catch (err) {
        const errorMessages = err.errors?.map((e) => e.message);

        res.status(400).json({ errors: errorMessages });
    }
};

const updateItem = async (res, model, item, id) => {
    const Model = getModel(model);

    const [itemsUpdated] = await Model.update(item, { where: { id } });

    if(!itemsUpdated) {
        res.status(404).json(get404Error(model));
    } else {
        const updatedItem = await Model.findByPk(id);
        const itemWithoutPassword = removePassword(updatedItem.get());
        res.status(200).json(itemWithoutPassword);
    }
};

const getItemById = async (res, model, id) => {
    const Model = getModel(model);


    const item = await Model.findByPk(id);

    if (!item) {
        res.status(404).json(get404Error(model));
    } else {
        const itemWithoutPassword = removePassword(item.dataValues);
        res.status(200).json(itemWithoutPassword);
    }
};

const getAllBooks = (res, model) => {
    const Model = getModel(model);

    return Model.findAll({ include: Book }).then((items) => {
        res.status(200).json(items);
    });
}

const deleteItem = async (res, model, id) => {
    const Model = getModel(model);

    const itemsDeleted = await Model.destroy({ where: { id } });

    if (!itemsDeleted) {
        res.status(404).json(get404Error(model));
    } else {
        res.status(204).send();
    }
};

module.exports = {
    getAllItems,
    createItem,
    updateItem,
    getItemById,
    deleteItem,
    getAllBooks,
};
