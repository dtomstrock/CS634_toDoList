var mongoose = require('mongoose'),
    TodoItem = mongoose.model('TodoItem'),
    BoughtItem = mongoose.model('BoughtItem');

exports.get_all_items = function (req, res) {
    TodoItem.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    })
};

exports.get_all_bought_items = function (req, res) {
    BoughtItem.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    })
}

exports.create_item = function (req, res) {
    var item = new TodoItem(req.body);
    item.save(function(err, task) {
        if (err) 
            res.send(err);
        res.json(task);
    });
}

exports.update_item = function (req, res) {
    TodoItem.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
        if (err)
          res.send(err);
        res.json(task);
    });
};

exports.set_bought = function (req, res) {
    var boughtItem = new BoughtItem(req.body);
    TodoItem.findByIdAndRemove({_id: req.params.id}, function(err, task) {
        if (!err)
            boughtItem.save(function(err, task) {
                if (err)
                    res.send(err)
                res.json(task)
            })
        else
            res.send(err);
    })
}

exports.delete_item = function (req, res) {
    BoughtItem.remove({_id: req.params.id}, function(err, task) {
        if (err)
          res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};