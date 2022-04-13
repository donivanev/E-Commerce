import React from 'react'

const CreateProduct = () => {
    return (
        <div className="card input-field" style={{
            margin: '10px auto', maxWidth: '500px', padding: '20px',
            textAlign: 'center'
        }}>
            <input type="text" placeholder="title" />
            <input type="number" placeholder="price" min="0" />
            <input type="text" placeholder="description" />
            <input list="products"/>
            <datalist id="products">
                <option value="Appliances" />
                <option value="Books" />
                <option value="Clothes" />
                <option value="Hobby" />
            </datalist> 

            <div className="file-field input-field">
                <div className="btn" style={{backgroundColor: '#ee6e73'}}>
                    <span>Upload image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light">Create</button>
        </div>
    )
}

export default CreateProduct