import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
        products:[]
    };
  }

  componentDidMount(){
    this.retrieveProducts();
  }


  retrieveProducts(){
    axios.get("/products").then(res=>{
        if(res.data.success){
            this.setState({
              products:res.data.existingProducts
            });
            console.log(this.state.products)   
        }
    });
  }
  


  /*Search Method*/
  filterData(products,searchkey){
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(searchkey) 
    )

    this.setState({products:result})
  }


  handleSearchArea = (e) =>{
    const searchkey = e.currentTarget.value;
    axios.get("/products").then(res=>{
        if(res.data.success){
            this.filterData(res.data.existingProducts,searchkey)
        }
    });
  }


  render() {
    return (
      <div>
              <center>
                <div className="col-lg-3 mt-2 mb-2" >
                        <input
                        className="form-control"
                        type="search"
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}/>
                </div>
              </center>   



        
        <div className="row">
                            <main>
                                <div className="row center" >                                    
                                      {this.state.products.map((products,index)=>(
                                        <div className="card" >
                                          <a href={`/ProductDetails/${products._id}`}>                                          
                                          <center><img className="card-img-top" src={ "http://localhost:8000/" + products.image } alt="Card image cap"/></center>
                                          </a>

                                          <div className="card-body">
                                              <a href={`/ProductDetails/${products._id}`}>
                                                  <h6 className="card-title">{products.title}</h6>
                                              </a>

                                              <h6 className="card-price">$ {products.price}</h6>

                                              <a href={`/ProductDetails/${products._id}`}>                                                  
                                                  <center><a href={`/ProductDetails/${products._id}`} class="btn btn-primary">Buy Now</a></center>
                                              </a>
                                          </div>

                                        </div>                                            
                                    ))
                                }                           
                            </div>
                        </main>               
                    </div>                    
      </div>
    )
  }
}
