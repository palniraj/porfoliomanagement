import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const name = ['buy', 'sell'];

// const res = names.find(findBuy);
// function findBuy(item){
//   return item === 'Buy';
// }

export default class ShowStock extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTransactionType = this.onChangeTransactionType.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeCurrentValue = this.onChangeCurrentValue.bind(this);
    this.onChangeTransactionDate = this.onChangeTransactionDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      transaction_type: "",
      quantity: 0,
      amount: 0,
      current_value: 0,
      transaction_date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/stocks/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          transaction_type: response.data.transaction_type,
          quantity: response.data.quantity,
          amount: response.data.amount,
          current_value: response.data.current_value,
          transaction_date: new Date(response.data.transaction_date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeTransactionType(e) {
    this.setState({
      transaction_type: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  onChangeCurrentValue(e) {
    this.setState({
      current_value: e.target.value,
    });
  }

  onChangeTransactionDate(date) {
    this.setState({
      transaction_date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const stock = {
      username: this.state.username,
      quantity: this.state.quantity,
      amount: this.state.amount,
      current_value: this.state.current_value,
      transaction_type: this.state.transaction_type,
      transaction_date: this.state.transaction_date,
    };

    console.log(stock);

    axios
      .post(
        "http://localhost:5000/stocks/update/" + this.props.match.params.id,
        stock
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  
  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        <form>
          <div className="form-group">
            <label>Username: {this.state.username} </label>
          </div>
          <div className="form-group">
            <label>Transaction Type: {this.state.transaction_type} </label>
          </div>
          <div className="form-group">
            <label>Quantity: {this.state.quantity}</label>
          </div>
          <div className="form-group">
            <label>{this.state.transaction_type} Rate: {this.state.amount}</label>
          </div>
          <div className="form-group">
            <label>Current Value: {this.state.current_value}</label>
          </div>
          <div className="form-group">
            <label>Overall Profit/Loss: </label>
          </div>
          <div className="form-group">
            <label>Sold Value: </label>
          </div>
          <div className="form-group">
            <label>Total Investment: </label>
          </div>
          
          <div className="form-group">
            <label>
              Transaction Date:
              <DatePicker
                disabled
                selected={this.state.transaction_date}
                onChange={this.onChangeTransactionDate}
              />{" "}
            </label>
          </div>
        </form>
      </div>
      
    );
  }
}
