import React, { useEffect, useState } from 'react'

import { validationInput } from '../../../components/Exceptions';

import { getCategory, getCategoryById, addProduct } from '../../../services/ConfigAPI';

import { Link, useNavigate } from 'react-router-dom';

import "./CreateProduct.css"


const CreateProduct = () => {

    const navigate = useNavigate();

    const [nameProduct, setNameProduct] = useState("");
    const [descriptionProduct, setDescriptionProduct] = useState("");
    const [stockProduct, setStockProduct] = useState("");
    const [priceProduct, setPriceProduct] = useState("");
    const [categoryProduct, setCategoryProduct] = useState("");
    const [imageProduct, setImageProduct] = useState([]);

    const [error, setError] = useState("");

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const allCategory = async () => {
            const response = await getCategory();
            setCategories(response);
            setCategoryProduct(response[0].id);
            console.log(response[0]);

        }
        allCategory();
    }, [])



    const createProduct = async () => {

        if (validationInput(nameProduct)) {
            setError("Name product cannot be null");
            return;
        } else {
            if (validationInput(stockProduct)) {
                setError("Stock cannot be null or < 0")
                return;
            } else {
                if (validationInput(priceProduct)) {
                    setError("Price Product cannot be empty")
                    return;
                } else {
                    if (imageProduct.length === 0) {
                        setError("Images cannot be empty")
                        return;
                    }
                }
            }
        }
        setError("");
        await addProduct(nameProduct, descriptionProduct, stockProduct, priceProduct, imageProduct, categoryProduct);
        navigate("/");

    }

    const selectCategory = async (e) => {
        const options = e.target.value;
        if (options === "") {
            setCategoryProduct("");
        } else {
            const response = await getCategoryById(options);
            setCategoryProduct(response);


        }

    }


    return (
        <section className="create-product-section">
            <div className="create-product-div">
                <h1 className="create-product-h1">Create Product</h1>

                <label className="crete-product-label">Name product</label>
                <input className='create-product-input' type="text" value={nameProduct}
                    onChange={(e) => setNameProduct(e.target.value)} />

                <label className="crete-product-label">Description</label>
                <input className='create-product-input' type="text" value={descriptionProduct}
                    onChange={(e) => setDescriptionProduct(e.target.value)} />

                <label className="crete-product-label">Stock</label>
                <input className='create-product-input' type="number" value={stockProduct}
                    onChange={(e) => setStockProduct(e.target.value)} />

                <label className="crete-product-label">price to unit</label>
                <input className='create-product-input' type="number" value={priceProduct}
                    onChange={(e) => setPriceProduct(e.target.value)} />

                <label className="crete-product-label">Category product</label>
                <select className="create-product-select" onChange={selectCategory}>
                    {categories.length > 0
                        && categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.nameCategory}
                            </option>
                        ))
                    }
                </select>

                <label className="crete-product-label">Image product</label>
                <input className='create-product-input' type="file" accept=".jpg, .jpeg, .png"

                    onChange={(e) => {
                        setImageProduct(e.target.files[0]);
                        console.log(e.target.files[0]);
                    }} />

                {error && <p>{error}</p>}


                <div className="create-product-option-buttons">
                    <Link to="/">
                        <input className='create-product-option-button-cancel' type="button" value="Cancel" />
                    </Link>

                    <input className='create-product-option-button-accept' type="button" value="Accept"
                        onClick={createProduct} />
                </div>

            </div>
        </section>
    )
}

export default CreateProduct