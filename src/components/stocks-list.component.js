import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Stock = props => (
  <tr>
    <td>{props.stock.username}</td>
    <td>{props.stock.transaction_type}</td>
    <td>{props.stock.quantity}</td>
    <td>{props.stock.amount}</td>
    <td>{props.stock.current_value}</td>
    <td>{props.stock.transaction_date.substring(0,10)}</td>
    <td>
    <Link to={"/show/"+props.stock._id}>show</Link> | <Link to={"/edit/"+props.stock._id}>edit</Link> | <a href="#" onClick={() => { props.deleteStock(props.stock._id) }}>delete</a>
    </td>
  </tr>
)

export default class StocksList extends Component {
  constructor(props) {
    super(props);

    this.deleteStock = this.deleteStock.bind(this)

    this.state = {stocks: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/stocks/')
      .then(response => {
        this.setState({ stocks: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteStock(id) {
    axios.delete('http://localhost:5000/stocks/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      stocks: this.state.stocks.filter(el => el._id !== id)
    })
  }

  stockList() {
    return this.state.stocks.map(currentstock => {
      return <Stock stock={currentstock} deleteStock={this.deleteStock} key={currentstock._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Stocks</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Stock Name</th>
              <th>Transaction Type</th>
              <th>Quantity</th>
              <th>Price Rate</th>
              <th>Current Value</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tfoot className="tfoot-light">
            <tr>
              <th></th>
              <th>Total Profit/Loss: </th>
              <th>Total Units: </th>
              <th>Total Investment: </th>
              <th>Sold Value:</th>
              <th>Current Value: </th>
              <th></th>
            </tr>
          </tfoot>
          <tbody>
            { this.stockList() }
          </tbody>
        </table>
      </div>
    )
  }
}