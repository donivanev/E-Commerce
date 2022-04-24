import React, { useState, useEffect } from 'react'

const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/allproducts')
            .then(res => res.json())
            .then(result => {
                setData(result.products)
            })
    }, [])

    return (
        <div className="row">
            <div className="home">
                {
                    data.map(item => {
                        return (
                            <div className="col s12 m3">
                                <div className="card">
                                <h4 className="card-title">{item.title}</h4>
                                    <div className="card-image">
                                        <img src={item.image} alt="Not available." />
                                    </div>
                                    <div className="card-content">
                                        <p style={{fontWeight: "bold"}}>{item.price}$</p>
                                        <p>{item.category}</p>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="card-action">
                                        <a href='/' className="waves-effect waves-light btn" color='red'>
                                            <i className="material-icons right">add_shopping_cart</i>
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home