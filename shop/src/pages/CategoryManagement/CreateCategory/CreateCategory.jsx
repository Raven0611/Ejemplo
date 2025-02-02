import React, { useState } from 'react'
import { addCategory } from '../../../services/ConfigAPI';
import "./CreateCategory.css";

import { Link, useNavigate } from 'react-router-dom';
const CreateCategory = () => {

    const [nameCategory, setNameCategory] = useState("");
    const [statuscategory, setStatusCategory] = useState("1");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const createCategories = async () => {
        if (!nameCategory) {
            setError("Name category is required");
            return;
        }
        if (!statuscategory) {
            setError("Status category is required");
            return;
        }
        const response = await addCategory(nameCategory, statuscategory);
        if (response.status === 400) {
            setError(response.nameError);
            return;
        }

        navigate('/');

    };


    return (


        <section className='create-category-section'>

            <div className='create-category-div'>
                <h1 className='create-category-h1'>Create Category</h1>
                <h2 className='creaete-category-h2'>Name Category</h2>
                <input className='create-category-input' type="text" placeholder='Enter category name'
                    onChange={(e) => setNameCategory(e.target.value)} value={nameCategory} />
                <h2 className='create-category-h2'>Status Category</h2>
                <select className='create-category-select' onChange={(e) => setStatusCategory(e.target.value)} value={statuscategory}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>

            <div className='create-category-error'>
                {error && <span>{error}</span>}
            </div>
            <div className='create-category-options-buttons'>
                <Link to="/">
                    <input className='create-category-button-cancel' type="button" value="Cancel" />
                </Link>
                <input className='create-category-button-create' type="button" value="Create Category"
                    onClick={createCategories} />
            </div>
        </section>
    )
}

export default CreateCategory