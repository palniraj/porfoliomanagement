import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const options = [
  {
    label: "Buy",
    value: "buy",
  },
  {
    label: "Sell",
    value: "sell",
  },
];

export default class CreateStock extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTransactionType = this.onChangeTransactionType.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    // this.onChangeCurrentValue = this.onChangeCurrentValue.bind(this);
    this.onChangeTransactionDate = this.onChangeTransactionDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      transaction_type: '',
      quantity: 0,
      amount: 0,
      // current_value: 0,
      transaction_date: new Date(),
      users: []
    }
  }

  
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    })
  }

  // onChangeCurrentValue(e) {
  //   this.setState({
  //     current_value: e.target.value
  //   })
  // }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }

  onChangeTransactionType(e) {
    this.setState({
      transaction_type: e.target.value
    })
  }


  onChangeTransactionDate(date) {
    this.setState({
      transaction_date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const stock = {
      username: this.state.username,
      quantity: this.state.quantity,
      amount: this.state.amount,
      // current_value: this.state.current_value,
      transaction_type: this.state.transaction_type,
      transaction_date: this.state.transaction_date
    }

    console.log(stock);

    axios.post('http://localhost:5000/stocks/add', stock)
      .then(res => console.log(res.data));

    window.location = '/';
  }


  

  render() {
    return (
    <div>
      <h3>Create New Stock Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Stock Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Transaction Type: </label>
          <select ref="transactionTypeInput"
              required
              className="form-control"
              value={this.state.transaction_type}
              onChange={this.onChangeTransactionType}>
             {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Quantity: </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
              />
        </div>
        <div className="form-group">
          <label>Price Rate: </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
              />
        </div>
        <div className="form-group">
          <label>Transaction Date: </label>
          <div>
            <DatePicker
              selected={this.state.transaction_date}
              onChange={this.onChangeTransactionDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Add Stock Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}