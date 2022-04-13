import React from 'react'

const Home = () => {
    return (
        <div class="row">
            <div class="col s12 m3">
                <div class="card">
                    <div class="card-image">
                        <img src="https://www.pngitem.com/pimgs/m/325-3256461_our-product-range-icon-vector-shopping-cart-hd.png" 
                             alt="Not available."/>
                        <span className="card-title">Card Title</span>
                    </div>
                    <div class="card-content">
                        <p>I am a very simple card.</p>
                    </div>
                    <div class="card-action">
                        <a href='/' class="waves-effect waves-light btn" color='red'>
                            <i class="material-icons right">add_shopping_cart</i>
                            Add to cart
                        </a>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home