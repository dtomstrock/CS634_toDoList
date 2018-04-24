import React from 'react'

export default class Todo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            todo: {
                _id: this.props.todo._id,
                name: this.props.todo.name,
                quantity: this.props.todo.quantity,
                unit: this.props.todo.unit
            }
        }
        this.handleEditOnClick = this.handleEditOnClick.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
        this.handleChangeUnit = this.handleChangeUnit.bind(this)
    }

    handleEditOnClick() {
        this.setState({editing: true})
    }

    handleEdit(todo) {
        this.setState({ editing: false, todo })
        this.props.handleChange(todo)
    }

    handleChangeName(event) {
        const todo = this.state.todo
        todo.name = event.target.value
        this.setState({ todo: todo})
    }

    handleChangeQuantity(event) {
        const todo = this.state.todo
        todo.quantity = event.target.value
        this.setState({ todo: todo})
    }

    handleChangeUnit(event) {
        const todo = this.state.todo
        todo.unit = event.target.value
        this.setState({ todo: todo})
    }

    render() {
        if (this.state.editing) {
    // Return JSX
            return (
            <form onSubmit={(e) => {
                e.preventDefault();
                var shoppingItem = {
                                _id: this.state.todo._id,
                                name: this.state.todo.name,
                                quantity: this.state.todo.quantity,
                                unit: this.state.todo.unit};
                this.handleEdit(shoppingItem);
                    }}>
                <input value={this.state.todo.name} onChange={this.handleChangeName}/>
                <input type="number" value={this.state.todo.quantity} onChange={this.handleChangeQuantity} />
                <select className="form-control-inline" id="sel1" value={this.state.todo.unit} onChange={this.handleChangeUnit}>
                    <option value="grams">grams</option>
                    <option value="kilograms">kilograms</option>
                    <option value="pounds">pounds</option>
                    <option value="unit">unit</option>
                    </select>
                <input type="submit" value="edit" />
                <br />
            </form>)
        }
        else {
            return (
                <div>
                <button className="list-group-item" style={{marginBottom:'5px'}} onClick={() => {this.props.moveToBought(this.state.todo)}}>{this.state.todo.name + ',' + this.state.todo.quantity + ',' + this.state.todo.unit}</button>
                <button onClick={this.handleEditOnClick}>Modify</button>
                </div>
            );
        }
    }
}
