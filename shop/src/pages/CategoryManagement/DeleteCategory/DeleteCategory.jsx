import React from 'react'
import { deleteCategory } from '../../../services/ConfigAPI';
import "./DeleteCategory.css";

const DeleteCategory = ({ isOpen, onClose, category }) => {
    if (!isOpen) return null;

    const onCLickDelete = async () => {
        await deleteCategory(category.id);
        onClose();
    }

    return (
        <section className='delete-category-section'>
            <div className='delete-category-div'>
                <h1 className='delete-category-h1'>Delete Category</h1>
                <h2 className='delete-category-h2'>Are you sure you want to delete this category {category.nameCategory}?</h2>
                <div className='delete-category-buttons'>

                    <input type='button' value="Cancel" className='delete-category-button-accept'
                        onClick={onClose} />

                    <input type='button' value="Delete" className='delete-category-button-delete'
                        onClick={onCLickDelete} />
                </div>
            </div>
        </section>
    )
}

export default DeleteCategory