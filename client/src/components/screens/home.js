import React, { useState, useEffect } from 'react'
import M from 'materialize-css'

const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/allproducts')
            .then(res => res.json())
            .then(result => {
                setData(result.products)
            })
    }, [])

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })

                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteProduct = (productId) => {
        fetch(`/deleteproduct/${productId}`, {
            method: 'delete',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(result => {
                M.toast({ html: 'Successfully deleted!', classes: "#43a047 green darken-1" })
                const newData = data.filter(item => {
                    return item._id !== result
                })

                setData(newData)
            })
    }

    return (
        <div className="row">
            <div className="home">
                <form action="#">
                    <p>
                        <span style={{marginLeft: "10px", marginRight: "30px", fontSize: "20px"}}>Sort by:</span>
                        <input type="checkbox" />
                        <span style={{marginRight: "30px"}}>Name</span>
                        <input type="checkbox" />
                        <span style={{marginRight: "30px"}}>Price</span>
                        <input type="checkbox" class="filled-in" checked="checked"/>
                        <span>Category</span>
                    </p>
                </form>
                {
                    data.map(item => {
                        return (
                            <div className="col s12 m3">
                                <div className="card" key={item._id}>
                                    <h4 className="card-title">{item.title}
                                        <i className='material-icons' style={{ float: 'right', fontSize: '35px', color: 'red' }}
                                            onClick={() => deleteProduct(item._id)}>delete_forever</i>
                                    </h4>
                                    <div className="card-image">
                                        <img src={item.image} alt="Not available." />
                                    </div>
                                    <div className="card-content">
                                        <p style={{ fontWeight: "bold" }}>{item.price}$</p>
                                        <p>{item.category}</p>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="card-action">
                                        <a href='/' className="waves-effect waves-light btn" color='red'>
                                            <i className="material-icons right">add_shopping_cart</i>
                                            Add to cart
                                        </a>
                                    </div>
                                    <p></p>
                                    {
                                        item.comments.map(record => {
                                            return (<h6>
                                                <span style={{ fontWeight: '500' }}>{record.commentedBy.firstName}</span> {record.text}
                                            </h6>)
                                        })
                                    }
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        makeComment(e.target[0].value, item._id)
                                    }}>
                                        <input type='text' placeholder='Add a comment...' />
                                    </form>
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