import React from 'react'
import { deleteUser } from '../../../services/ConfigAPI';
import "./DeleteUser.css";

const DeleteUser = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    const onCLickDelete = async () => {
        await deleteUser(user.id);
        onClose();
    }

    return (
        <section className="delete-user-section">
            <div className="delete-user-div">
                <h1 className="delete-user-h1">Do you want to delete user {user.firstNameUser}  {user.lastNameUser}</h1>
                <p>The user will be eliminated  permantly </p>
                <div className="delete-user-option-buttons">
                    <input className='delete-user-button-cancel' type="button" value="Cancel"
                        onClick={onClose} />
                    <input className='delete-user-button-accept' type="button" value="Accept"
                        onClick={onCLickDelete} />
                </div>
            </div>
        </section>
    )
}

export default DeleteUser