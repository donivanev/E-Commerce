import React, { useState, useEffect, useContext } from "react"
import { useParams, Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { UserContext } from "../../App"
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "../../../../server/keys"
import M from 'materialize-css'

const ProductItem = () => {

    const {state, dispatch} = useContext(UserContext)
    const [data, setData] = useState("")
    const { productId } = useParams();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch(`/allproducts/${productId}`)
            .then(res => res.json())
            .then(result => {
                setData(result.product)
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

    const handleRating = (rate) => {
        setRating(rate)

        //TODO
    }

    return (
        <div>
            <a href='/' className="waves-effect waves-light btn" color='red' style={{marginTop: '50px', marginLeft: '50px'}}>
                <i className="material-icons right" style={{fontSize: '40px', marginRight: '15px'}}>arrow_back</i>
            </a>
            <div className="card" key={data._id} id="productCard" style={{ marginTop: '25px',
                marginLeft: 'auto', marginRight: 'auto', marginBottom: '70px'
            }}>
                <h4 className="card-title">{data.title}
                    { state.firstName === ADMIN_USERNAME && state.password === ADMIN_PASSWORD ?
                    <i className='material-icons' style={{ float: 'left', fontSize: '35px', color: 'blue' }}>
                        <Link to={'/editproduct/' + data._id}>edit</Link></i> : '' }
                    { state.firstName === ADMIN_USERNAME && state.password === ADMIN_PASSWORD ?
                    <i className='material-icons' style={{ float: 'right', fontSize: '35px', color: 'red' }}
                        onClick={() => deleteProduct(data._id)}>delete_forever</i> : '' }
                </h4>
                <div className="card-image">
                    <img src={data.image} alt="Not available." />
                </div>
                <div className="card-content">
                    <p style={{ fontWeight: "bold" }}>{data.price}$</p>
                    <p><i>{data.category}</i></p>
                    <p>{data.description}</p>
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
                    data.comments ? data.comments.map(record => {
                        return (<h6>
                            <span style={{ fontWeight: '500' }}>{record.commentedBy.firstName}</span> {record.text}
                        </h6>)
                    }) : <span style={{ fontWeight: '500' }}>Loading comments...</span>
                }
                <form onSubmit={(e) => {
                    //if you are submitting a form (prevents page reload)
                    e.preventDefault()
                    makeComment(e.target[0].value, data._id)
                    e.target[0].value = ''
                }}>
                    <input type='text' placeholder='Add a comment...' id='input-comments' />
                </form>
            </div>
        </div>
    )
}

export default ProductItem