import React, { Component } from 'react'

export default class footer extends Component {
  render() {
    return (
      <div>
          <footer class="footer">
            <div class="container">
                <div class="row d-flex justify-content-between">
                    <div class="footer-col">
                        <h4>PRODUCT STORE</h4>
                        <ul>
                            <li><a href="/Home">Home</a></li>
                            <li><a href="#">Feedback</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        
                        <div class="social-links">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>                            
                            <a href="#"><i class="fab fa-whatsapp"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        </div>    
                             
                        
                                 
                    </div>

                    <div class="footer-col">
                    <a class="navbar-brand" href="/Home">            
          </a>
                    </div>                  
                    
                </div>
            </div>
        </footer>
      </div>
    )
  }
}
