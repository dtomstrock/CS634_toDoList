import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Todo from './Todo'

function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

const Title = () => {
      return (<div>
         <div>
            <h1>Shopping List</h1>
         </div>
      </div>)
};
  
const SubTitleToBuy = ({toBuyCount}) => {
    return (
      <div>
         <div>
            <h2>To buy ({toBuyCount})</h2>
         </div>
      </div>
    );
  }
  
const SubTitleBought = ({boughtCount}) => {
    return (
      <div>
         <div>
            <h2>Bought ({boughtCount})</h2>
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
        <input ref={node => {
          input = node;
        }} />
        <input type="number" ref={node => {
          inputNumber = node;
        }} />
        <select class="form-control-inline" id="sel1" ref={node => {
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
    return (<a href="#" className="list-group-item" onClick={() => {remove(bought.id)}}>{bought.name + ',' + bought.quantity + ',' + bought.unit}</a>);
  }
  
  const TodoList = ({todos, moveToBought, edit}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
      return (<Todo todo={todo} key={todo.name} moveToBought={moveToBought} handleChange={edit}/>)
    });
    return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
  }

  const BoughtList = ({boughtItems, remove}) => {
      const boughtNode = boughtItems.map((bought) => {
        return (<BoughtItem bought={bought} key={bought.name} remove={remove}/>)
      });
      return (<div className="list-group" style={{marginTop:'30px'}}>{boughtNode}</div>);
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
    }
    // Add todo handler
    addItem(val){
      // Assemble data
      if (val.name != "" && val.quantity != "" && val.unit != "") {
        const todo = {text: val}
        val.id = createGuid();
        // Update data
        this.state.data.push(val)
        this.setState({data: this.state.data})
      }
    }
    // Handle remove
    handleRemove(id){
      // Filter all todos except the one to be removed
      const remainder = this.state.dataBought.filter((boughtItem) => {
        if (boughtItem.id !== id) return boughtItem;
      });
      // Update state with filter
      this.setState({dataBought: remainder});
    }

    handleMoveToBought(todo) {
      const remainder = this.state.data.filter((todo2) => {
          if (todo2.id !== todo.id) return todo;
      });
      this.setState({data: remainder});
      this.state.dataBought.push(todo)
      this.setState({dataBough: this.state.dataBought})
    }

    handleEdit(todo) {
      var i = 0
      let todo2
      for(todo2 in this.state.data) {
        if (todo2.id === todo.id) {
          this.state.data[i] = todo
          return
        }
        i++
      }
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
