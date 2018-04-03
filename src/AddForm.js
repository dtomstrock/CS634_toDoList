import React, { Component } from 'react';

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
                      quantity: '',
                      unit: ''};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
        this.handleChangeUnit = this.handleChangeUnit.bind(this)
      }

    handleSubmit(event) {
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeQuantity(event) {
        this.setState({quantity: event.target.value});
    }

    handleChangeUnit(event) {
        this.setState({unit: event.target.value});
    }

    render() {
        return (
            <div className="Item">
            <form id="Create Shopping Item" onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChangeName} value={this.state.name} name="Item name" id="Item name" placeholder="Item"/>
                <input type="text" onChange={this.handleChangeQuantity} value={this.state.quantity} name="quantity" id="quantity" placeholder="quantity"/>
                <input type="text" onChange={this.handleChangeUnit} value={this.state.unit} name="unit" id="unit" placeholder="unit"/>
                <input type="submit" value="Add" />
            </form>
            </div>
        );
    }
}

export default AddForm;
