import React, { useState, useEffect, useContext } from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../../server/keys'
import M from 'materialize-css'

const Home = () => {

    const {state, dispatch} = useContext(UserContext)
    const [data, setData] = useState([])
    const [rating, setRating] = useState(0);
    console.log(state);

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
                window.location.reload()
            })
    }

    const uncheck = () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(input => { input.className = ''; input.checked = '' })
    }

    const sortByName = () => {

        uncheck()

        const sortByName = [...data]
        sortByName.sort((a, b) => a.title > b.title ? 1 : -1)
        setData(sortByName)

        const nameCheckBox = document.getElementById('1')
        nameCheckBox.className = 'filled-in'
        nameCheckBox.checked = 'checked'
    }

    const sortByPrice = () => {

        uncheck()

        const sortByPrice = [...data]
        sortByPrice.sort((a, b) => a.price > b.price ? 1 : -1)
        setData(sortByPrice)

        const priceCheckBox = document.getElementById('2')
        priceCheckBox.className = 'filled-in'
        priceCheckBox.checked = 'checked'
    }

    const sortByCategory = () => {

        uncheck()

        const sortByCategory = [...data]
        sortByCategory.sort((a, b) => a.category > b.category ? 1 : -1)
        setData(sortByCategory)

        const categoryCheckBox = document.getElementById('3')
        categoryCheckBox.className = 'filled-in'
        categoryCheckBox.checked = 'checked'
    }

    const handleRating = (rate) => {
        setRating(rate)

        //TODO
    }

    return (
        <div className="row">
            <div className="home">
                <form action="#">
                    <p>
                        <span style={{ marginLeft: "10px", marginRight: "30px", fontSize: "20px" }}>Sort by:</span>
                        <input type="checkbox" id='1' />
                        <span style={{ marginRight: "30px" }} onClick={() => sortByName()}>Name</span>
                        <input type="checkbox" id='2' />
                        <span style={{ marginRight: "30px" }} onClick={() => sortByPrice()}>Price</span>
                        <input type="checkbox" id='3' />
                        <span onClick={() => sortByCategory()}>Category</span>
                        <span style={{ float: 'right', marginRight: "50px", fontSize: "20px" }}>Search</span>
                    </p>
                </form>
                {
                    data.map(item => {
                        return (
                            <div className="col s12 m3">
                                <div className="card" key={item._id}>
                                    <h4 className="card-title">{item.title}
                                        { state.firstName === ADMIN_USERNAME && state.password === ADMIN_PASSWORD ?
                                        <i className='material-icons' style={{ float: 'left', fontSize: '35px', color: 'blue' }}>
                                            <Link to={'/editproduct/' + item._id} state={data}>edit</Link></i> : '' }
                                        { state.firstName === ADMIN_USERNAME && state.password === ADMIN_PASSWORD ?
                                        <i className='material-icons' style={{ float: 'right', fontSize: '35px', color: 'red' }}
                                            onClick={() => deleteProduct(item._id)}>delete_forever</i> : '' }
                                    </h4>
                                    <div className="card-image">
                                        <Link to={'/productitem/' + item._id}>
                                            <img src={item.image} alt="Not available." />
                                        </Link>
                                    </div>
                                    <div className="card-content">
                                        <p style={{ fontWeight: "bold" }}>{item.price}$</p>
                                        <p><i>{item.category}</i></p>
                                        <p>{item.description}</p>
                                        <p>Rating: <Rating onClick={handleRating} ratingValue={rating} /></p>
                                    </div>
                                    <div className="card-action">
                                        <a href='/' className="waves-effect waves-light btn" color='red'>
                                            <i className="material-icons right">add_shopping_cart</i>
                                            Add to cart
                                        </a>
                                    </div>
                                    <p></p>
                                    {
                                        // item.comments.map(record => {
                                        //     return (<h6>
                                        //         <span style={{ fontWeight: '500' }}>{record.commentedBy.firstName}</span> {record.text}
                                        //     </h6>)
                                        // })
                                        <h6 style={{ marginLeft: '15px' }}>
                                            <span style={{ fontWeight: '500' }}> {item.comments[0] ? item.comments[0].commentedBy.firstName : ''} </span> {item.comments[0] ? item.comments[0].text : ''}
                                            <Link to={'/productitem/' + item._id}><p>Read more ...</p></Link>
                                        </h6>
                                    }
                                    <form onSubmit={(e) => {
                                        //if you are submitting a form (prevents page reload)
                                        e.preventDefault()
                                        makeComment(e.target[0].value, item._id)
                                        e.target[0].value = ''
                                    }}>
                                        <input type='text' placeholder='Add a comment...' id='input-comments' />
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