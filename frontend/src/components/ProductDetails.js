import React, { Component } from 'react'
import axios from 'axios';

export default class InventryDetails extends Component {
  constructor(props){
    super(props);

    this.state={
      product:{}
    };
}


componentDidMount(){
  const id = this.props.match.params.id;
  axios.get(`/product/${id}`).then((res)=>{
      if(res.data.success){
          this.setState({
            product:res.data.product
          });
          console.log(this.state.product);
      }
  });
}


  render() {
    const {title,description,category,price,image}=this.state.product;

    return (

      <div>

<center>
      <table className="table-medium">
        <th>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <dt></dt><dd><img className="inventry-medium" id="Details-Image" src={ "http://localhost:8000/" + image } alt="gjgjgj" /></dd>
        </th>
        <th>
        <dl>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h4>{title}</h4>
        <hr/>
          <dd><h4>Price : $ {price}</h4></dd>
            {/* <button className="btn btn-success">
              <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
              <a href="/CreateOrder" style={{textDecoration:'none', color:'white'}}>ORDER</a>                
            </button> */}
            <hr/>         
            <dd>Category : {category}</dd>
          <dd>Description : {description}</dd>
                    <hr/>
                                    
        </dl>
        </th>        
      </table>

      </center>     
        
      </div>
    )
  }
}
