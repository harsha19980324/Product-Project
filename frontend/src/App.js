
import React, { Component } from 'react'; 
import {BrowserRouter,Route} from 'react-router-dom';



import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/ProductDetails';
import AdminHome from './components/AdminHome';
import Footer from './components/footer';













import "./index.css"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      
        

      <NavBar/>
      <Route path="/" exact component={Home}></Route>
      <Route path="/CreateProduct" exact component={CreateProduct}></Route>
      <Route path="/EditProduct/:id" exact component={EditProduct}></Route>
      <Route path="/ProductDetails/:id" exact component={ProductDetails}></Route>
      <Route path="/AdminHome" exact component={AdminHome}></Route>

      
      <br/><br/><br/><br/>
      <Footer/>
      
      

      </BrowserRouter>
    )
  }
}
