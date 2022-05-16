import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import M from 'materialize-css'

const EditProduct = () => {

    const [data, setData] = useState("")
    const { productId } = useParams();

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        fetch(`/product/${productId}`)
            .then(res => res.json())
            .then(result => {
                setData(result.product)

                setTitle(result.product.title)
                setPrice(result.product.price)
                setDescription(result.product.description)
                setCategory(result.product.category)
                setImage(result.product.image)
            })
    }, [])

    useEffect(() => {
        if (url) {
            fetch(`/editproduct/${productId}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    category,
                    image: url
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: 'Successfully edited!', classes: "#43a047 green darken-1" })
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [url])

    const productDetails = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'ecommerce')
        data.append('cloud_name', 'projectpics')

        fetch('https://api.cloudinary.com/v1_1/projectpics/image/upload', {
            method: 'put',
            body: data
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                M.toast({ html: "Please upload an image!", classes: "#c62828 red darken-3" })
            }
            else {
                setUrl(data.url)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="card input-field" style={{
            margin: '40px auto', maxWidth: '500px', padding: '20px',
            textAlign: 'center', marginBottom: '90px'
        }}>
            <input type="text" placeholder="Title" defaultValue={data.title || ''} onChange={(e) => setTitle(e.target.value)}/>
            <input type="number" placeholder="Price" min="0" step="0.1" defaultValue={data.price || ''} onChange={(e) => setPrice(e.target.value)}/>
            <input type="text" placeholder="Description" defaultValue={data.description || ''} onChange={(e) => setDescription(e.target.value)}/>
            <input list="products" placeholder="Category" defaultValue={data.category || ''} onChange={(e) => setCategory(e.target.value)}/>
            <datalist id="products">
                <option value="Appliances" />
                <option value="Books" />
                <option value="Clothes" />
                <option value="Hobby" />
            </datalist>

            <div className="file-field input-field">
                <div className="btn" style={{backgroundColor: '#ee6e73'}}>
                    <span>Upload image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" defaultValue={data.image || ''}/>
                </div>
            </div>
            <button className="btn waves-effect waves-light" onClick={() => productDetails()}>
                Edit
            </button>
        </div>
    )
}

export default EditProduct