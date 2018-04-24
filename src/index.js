import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Todo from './Todo'

const Title = () => {
      return (<div>
         <div>
            <h3>Shopping List</h3>
         </div>
      </div>)
};
  
const SubTitleToBuy = ({toBuyCount}) => {
    return (
      <div>
         <div>
            <h4>To buy ({toBuyCount})</h4>
         </div>
      </div>
    );
  }
  
const SubTitleBought = ({boughtCount}) => {
    return (
      <div>
         <div>
            <h4>Bought ({boughtCount})</h4>
         </div>
      </div>
    );
  }

const TodoForm = ({addItem}) => {
    // Input Tracker
    let input;
    let inputNumber;
    let inputUnit;
    // Return JSX
    return (
      <form onSubmit={(e) => {
          e.preventDefault();
          var shoppingItem = {name: input.value,
                          quantity: inputNumber.value,
                          unit: inputUnit.value}
          addItem(shoppingItem);
          input.value = '';
          inputNumber.value = '';
        }}>
        <input placeholder="Item name" ref={node => {
          input = node;
        }} />
        <input placeholder="Quantity" type="number" ref={node => {
          inputNumber = node;
        }} />
        <select className="form-control-inline" id="sel1" ref={node => {
          inputUnit = node;
            }}>
            <option>grams</option>
            <option>kilograms</option>
            <option>pounds</option>
            <option>unit</option>
            </select>
        <input type="submit" value="Add" />
        <br />
      </form>
    );
  };
  
  const BoughtItem = ({bought, remove}) => {
    // Each Todo
    //return (<a href="#" className="list-group-item" onClick={() => {remove(todo.id)}}>{todo.text}</a>);
    return (<button className="list-group-item" onClick={() => {remove(bought._id)}}>{bought.name + ',' + bought.quantity + ',' + bought.unit}</button>);
  }
  
  const TodoList = ({todos, moveToBought, edit}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
      return (<Todo todo={todo} key={todo._id} moveToBought={moveToBought} handleChange={edit}/>)
    });
    return (<div className="list-group" style={{marginTop:'10px'}}>{todoNode}</div>);
  }

  const BoughtList = ({boughtItems, remove}) => {
      const boughtNode = boughtItems.map((bought) => {
        return (<BoughtItem bought={bought} key={bought._id} remove={remove}/>)
      });
      return (<div className="list-group" style={{marginTop:'10px'}}>{boughtNode}</div>);
  }
  
  // Container Component
  // Todo Id
  window.id = 0;
  class TodoApp extends React.Component{
    constructor(props){
      // Pass props to parent class
      super(props);
      // Set initial state
      this.state = {
        data: [],
        dataBought: [],
        editing: false
      }
    }
    // Lifecycle method
    componentDidMount(){
      // Make HTTP reques with Axios
      fetch('http://155.41.101.75:3000/AllItems/', {
        mode: 'cors',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          this.setState({data: myJson})
        }.bind(this));
      fetch('http://155.41.101.75:3000/AllBoughtItems/', {
        mode: 'cors',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          this.setState({dataBought: myJson})
        }.bind(this));
    }
    // Add todo handler
    addItem(val){
      // Assemble data
      if (val.name != "" && val.quantity != "" && val.unit != "") {
        //const todo = {text: val}
        fetch("http://155.41.101.75:3000/createItem/", {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify(val),
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          }
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          this.state.data.push(myJson);
          this.setState({data: this.state.data})
        }.bind(this));
        // val.id = createGuid();
        // // Update data
        // this.state.data.push(val)
        // this.setState({data: this.state.data})
        
      }
    }
    // Handle remove
    handleRemove(id){
      // Filter all todos except the one to be removed
      const remainder = this.state.dataBought.filter((boughtItem) => {
        if (boughtItem._id !== id) return boughtItem;
      });
      // Update state with filter
      fetch("http://155.41.101.75:3000/item/" + id + "/", {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        this.setState({dataBought: remainder});
      }.bind(this));
    }

    handleMoveToBought(todo) {
      const remainder = this.state.data.filter((todo2) => {
          if (todo2._id !== todo._id) return todo;
      });
      var bought = {
        name: todo.name,
        quantity: todo.quantity,
        unit: todo.unit
      };
      fetch("http://155.41.101.75:3000/bought/" + todo._id + "/", {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(bought),
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        this.state.dataBought.push(myJson);
        this.setState({data: remainder, dataBought: this.state.dataBought});
      }.bind(this));
    }

    handleEdit(todo) {
      fetch("http://155.41.101.75:3000/item/" + todo._id + "/", {
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        var i = 0
        let todo2
        for(todo2 in this.state.data) {
          if (todo2.id === todo.id) {
            this.state.data[i] = myJson;
            return
          }
          i++
        }
      }.bind(this));
    }
   
    render(){
      // Render JSX
      return (
        <div>
          <Title />
          <TodoForm addItem={this.addItem.bind(this)}/>
          <SubTitleToBuy toBuyCount={this.state.data.length}/>
          <TodoList 
            todos={this.state.data} 
            moveToBought={this.handleMoveToBought.bind(this)}
            edit={this.handleEdit.bind(this)}
          />
          <SubTitleBought boughtCount={this.state.dataBought.length}/>
          <BoughtList
            boughtItems={this.state.dataBought}
            remove={this.handleRemove.bind(this)}
            />
        </div>
      );
    }
  }
ReactDOM.render(<TodoApp />, document.getElementById('container'));
registerServiceWorker();
