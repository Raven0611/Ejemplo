import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { validationInput } from '../../../components/Exceptions';

import { getCategoryById, updateCategory } from '../../../services/ConfigAPI';

import './EditCategory.css'

const EditCategory = () => {
    const [category, setCategory] = useState({});
    const [statusCategory, setStatusCategory] = useState("");
    const [nameCategory, setNameCategory] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const viewCategory = async () => {
            try {
                const categoryData = await getCategoryById(id);
                setCategory(categoryData);
                setNameCategory(categoryData.nameCategory);
                setStatusCategory(categoryData.statusCategory);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        viewCategory();
    }, [id]);

    const onEditCategory = async () => {
        const updateCategories = await updateCategory(id, nameCategory, statusCategory);
        if (validationInput(nameCategory)) {
            setError("The name is required");
            return;

        }
        setError("");
        navigate("/");
    }

    return (
        <section className='section-edit-category'>
            <div className='edit-category-div'>
                <h1 className='edit-category-h1'>Edit Category</h1>
                <h2 className='edit-category-h2'>Name category</h2>
                <input onChange={(e) => setNameCategory(e.target.value)} className='edit-category-innput' type="text" placeholder='Name category' value={nameCategory} />
                <h2 className='edit-category-h2'>Status category</h2>
                <select
                    className='edit-category-select'
                    value={statusCategory}
                    onChange={(e) => setStatusCategory(e.target.value)}>
                    <option value="0">Inactive</option>
                    <option value="1">Active</option>
                </select>
                {error && <p className='edit-category-error'>{error}</p>}
                <div className="edit-category-buttons">
                    <Link to="/">
                        <input className='edit-category-button-cancel' type="button" value="Cancel" />
                    </Link>

                    <input className='edit-category-button-accept' type="button" value="Accept" onClick={onEditCategory} />
                </div>
            </div>
        </section>
    )
}

export default EditCategory