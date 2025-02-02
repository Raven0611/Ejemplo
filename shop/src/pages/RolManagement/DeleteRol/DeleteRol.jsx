import React from 'react'
import { deleteRol } from '../../../services/ConfigAPI';
import "./DeleteRol.css";
const DeleteRol = ({ isOpen, onClose, rol }) => {
    if (!isOpen) return null;

    const onCLickDelete = async () => {
        await deleteRol(rol.id);
        onClose();
    }

    return (
        <section className='delete-rol-section'>
            <div className='delete-rol-div'>
                <h1 className='delete-rol-h1'>Delete Rol</h1>
                <h2 className='delete-rol-h2'>Are you sure you want to delete this Rol {rol.nameRol}?</h2>
                <div className='delete-rol-buttons'>

                    <input type='button' value="Cancel" className='delete-rol-button-accept'
                        onClick={onClose} />

                    <input type='button' value="Delete" className='delete-rol-button-delete'
                        onClick={onCLickDelete} />
                </div>
            </div>
        </section>
    )
}

export default DeleteRol