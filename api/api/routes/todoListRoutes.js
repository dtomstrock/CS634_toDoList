module.exports = function(app) {
    var todoList = require('../controllers/todoListController');

    app.route('/AllItems')
        .get(todoList.get_all_items);
    app.route('/AllBoughtItems')
        .get(todoList.get_all_bought_items);
    app.route('/createItem')
        .post(todoList.create_item);
    app.route('/item/:id')
        .delete(todoList.delete_item)
        .put(todoList.update_item);
    app.route('/bought/:id')
        .post(todoList.set_bought);
}