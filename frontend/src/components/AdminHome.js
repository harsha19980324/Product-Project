import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import jspdf from 'jspdf';
import "jspdf-autotable";


export default class AdminHome extends Component {
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

        console.log(this.state.products);
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/product/delete/${id}`).then((res)=>{
          swal.fire({ title: 'Are you sure?', 
          text: "You won't be able to revert this!", 
          icon: 'warning', 
          showCancelButton: true, 
          confirmButtonColor: '#3085d6', 
          cancelButtonColor: '#d33', 
          confirmButtonText: 'Yes, delete it!' 
        }).then((result) => { 
          if (result.isConfirmed) { 
            swal.fire( 'Deleted!', 
            'Your file has been deleted.', 
            'success' 
            ) 
          } 
      })
        this.retrieveProducts();
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



  generateReport = (tickets) => {
    const doc = new jspdf();
  
    const tableColumn = ["Title", "Description", "Category", "Price"];
  
    const tableRows = [];
  
    tickets.map(ticket => {
  
      const ticketData = [
  
        ticket.title,
        ticket.description,  
        ticket.category,  
        ticket.price    
  
      ];
      tableRows.push(ticketData);
    })
  
   
      doc.text("All products Report", 14, 15).setFontSize(12);
      const date = Date().split(" ");
      const dateStr = date[1] + "-" + date[2] + "-" + date[3];
  
      doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
      doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
      doc.save(`allproducts_report_.pdf`);  
  }






  render() {
    return (
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <center><h1 className="h3 mb-3 font-weight-normal">ALL Products</h1></center>

        
          {/*Search*/}
          
          <div class="d-flex justify-content-around">          
                <button className="btn btn-success">        
                    <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
                    <a href="/CreateProduct" style={{textDecoration:'none', color:'white'}}>Add Product</a>                
                </button>
                

                
                  <div className="col-lg-3 mt-2 mb-2" >
                        <input
                        className="form-control"
                        type="search"
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}/>
                </div>


                <button onClick={()=>this.generateReport(this.state.products)} className="btn btn-success" >     
                  Generate Report                
                </button>

                            
          </div>


          

          <br/>
            <table className="table container bg-light" >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">price</th>
                  <th scope="col">Image</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {this.state.products.map((products,index)=>(
                <tr>
                  <th scope="row">{index+1}</th> 

                  <td>
                    <a href={`/InventryDetails/${products._id}`}>
                      {products.title}
                    </a>
                  </td>

                  <td>{products.description}</td>
                  <td>{products.category}</td>
                  <td>{products.price}</td>
                  <div class="dropdown">
                                <img src={ "http://localhost:8000/" + products.image } alt={products.name} width="70" height="90"/>                                
                            </div>
                  <td>
                      <a className="btn btn-warning" href={`/EditProduct/${products._id}`}>
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>

                      &nbsp;

                      <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(products._id)}>
                        <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </a>
                  </td>
                </tr>
                
              ))}
            </tbody>
            </table>
            <br/> 
            <center>
              
          </center>                    
            </div>      
    )
  }
}

