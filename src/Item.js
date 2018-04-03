import React, { Component } from 'react';


function Items(props) {
    const items = props.items;
    const listItems = items.map((item, index) =>
    <li key={index}>{item.name + ',' + item.quantity + ',', + item.unit}</li>
    );
    return (
    <ul>{listItems}</ul>
    );
}

export default Items;
