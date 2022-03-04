import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import StocksList from "./components/stocks-list.component";
import EditStock from "./components/edit-stock.component";
import ShowStock from "./components/show-stock.component";
import CreateStock from "./components/create-stock.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={StocksList} />
      <Route path="/edit/:id" component={EditStock} />
      <Route path="/show/:id" component={ShowStock} />
      <Route path="/create" component={CreateStock} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
