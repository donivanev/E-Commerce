import React from 'react'

const Home = () => {
    return (
        <div className="row">
            <div className="col s12 m3">
                <div className="card">
                    <div className="card-image">
                        <img src="https://www.pngitem.com/pimgs/m/325-3256461_our-product-range-icon-vector-shopping-cart-hd.png" 
                             alt="Not available."/>
                        <span className="card-title">Card Product</span>
                    </div>
                    <div className="card-content">
                        <p>10</p>
                        <p>Book</p>
                        <p>Description</p>
                    </div>
                    <div className="card-action">
                        <a href='/' className="waves-effect waves-light btn" color='red'>
                            <i className="material-icons right">add_shopping_cart</i>
                            Add to cart
                        </a>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home