import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default class CreateInventry extends Component {
        constructor(props){
          super(props);

          this.state={
            title:"",
            description:"",
            category:"",
            price:"",              
            image:"",

            titleError:"",
            descriptionError:"",
            categoryError:"",
            priceError:"",
            imageError:""

          };
      }


      handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })

      }


      onSubmit = (e) =>{   

        e.preventDefault();
        this.validation();
        
        if (this.state.title && this.state.description && this.state.category && this.state.price && this.state.image){

        const{title,description,category,price,image} = this.state;

        const data ={
            title:title,
            description:description,
            category:category,
            price:price,
            image:image
        }  
        console.log(data);

        axios.post("/product/save",data).then((res)=>{
                  if(res.data.success){
                    swal({
                      icon: 'success',
                      title: "product Successfully added !",
                      type: "success"
                    }).then(function() {
                      window.location = "/AdminHome";
                    });
                      
                      this.setState({
                          title:"",
                          description:"",
                          category:"",
                          price:"",
                          image:""
                      });
                      
                  }
          });

      
        }

      }


      onChangeImage=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        }, () => {
            const data = new FormData()
            data.append('file', this.state.selectedFile)
            axios.post("/product/upload", data, {
            }).then(res => {
                this.setState({image:res.data.filename})
            })
        })
    }


    


    validation = () => {
      let titleError="";
      let descriptionError="";
      let categoryError="";
      let priceError="";
      let imageError="";
 
      if(!this.state.title){
        titleError="(Book Title Required!)"
      }
      
      if(!this.state.description){
        descriptionError="(Price Required!)"
      }

      if(!this.state.category){
        categoryError="(Language Required!)"
      } 

      if(!this.state.price){
        priceError="(Price Required!)"
      }       


      if(!this.state.image){
        imageError="(Image Required!)"
      }
      


      if ( titleError | descriptionError | categoryError | priceError | imageError  ) {

        this.setState({titleError , descriptionError , categoryError , priceError , imageError  });

        return false;

      } else {

        this.setState({titleError  , descriptionError , categoryError , priceError , imageError  });

      }

      return true;

    }  




    render() {
      return (
        <div className="col-md-8 mt-4 mx-auto"> <h1 className="h3 mb-3 font-weight-normal"><center>Create Product</center></h1>
          <form className='form-group'>
            <div className='row'>
              <div className="col-lg-6" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Title</label>&nbsp;
                <span style={{color : "red"}}>{this.state.titleError}</span>
                <input type="text"
                className="form-control"
                name="title"
                placeholder="Enter Title"
                value={this.state.title}
                onChange={this.handleInputChange}/>
              </div>
  
              <div className="col-lg-6" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Description</label>&nbsp;
                <span style={{color : "red"}}>{this.state.descriptionError}</span>
                <input type="text"
                className="form-control"
                name="description"
                placeholder="Enter description"
                value={this.state.description}
                onChange={this.handleInputChange}/>
              </div>
            </div>
  
            <div className='row'>
  
              <div className="col-lg-6" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Category</label>&nbsp;
                <span style={{color : "red"}}>{this.state.categoryError}</span>
                <input type="text"
                className="form-control"
                name="category"
                placeholder="Enter Category"
                value={this.state.category}
                onChange={this.handleInputChange}/>
              </div>
  
              <div className="col-lg-6" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Price</label>&nbsp;
                <span style={{color : "red"}}>{this.state.priceError}</span>
                <input type="number"
                className="form-control"
                name="price"
                placeholder="Enter Price"
                value={this.state.price}
                onChange={this.handleInputChange}/>
              </div>
            </div>
            
            <div className='row'>           
  
              <div className="col-lg-6" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Image</label>&nbsp;
                <span style={{color : "red"}}>{this.state.imageError}</span>
                <input type="file"
                className="form-control"
                name="image"
                onChange={this.onChangeImage}/>
              </div>
            </div>
            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                <i className="fa fa-upload"></i>
                &nbsp; Upload Product Details
              </button>           
  
          </form>
        </div>
      )
    }
  }
  

