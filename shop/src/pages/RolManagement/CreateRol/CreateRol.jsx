import React, { useState } from 'react'
import { validationInput } from '../../../components/Exceptions';

import { addRol } from '../../../services/ConfigAPI';
import { useNavigate, Link } from 'react-router-dom';


const CreateRol = () => {
    const [nameRol, setNameRol] = useState('');
    const [statusRol, setStatusRol] = useState('0');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const saveHandler = async () => {
        console.log("nameRol", nameRol);
        console.log("statusRol", statusRol);
        if (validationInput(nameRol)) {
            setError("The name is required");
            return;
        }
        const data = await addRol(nameRol, statusRol);
        if (data != null) {
            setError(data.nameError);
            return;
        }
        setError("")
        navigate('/');
    }

    return (
        <section className='create-rol-section'>
            <div className='create-rol-div'>
                <h1 className="create-rol-h1">Create Rol</h1>
                <label className='create-rol-label'>Name Rol</label>
                <input className='create-rol-input' type="text" placeholder='Name Rol'
                    value={nameRol} onChange={(e) => setNameRol(e.target.value)} />
                <label className='create-rol-label'>Status Rol</label>
                <select className='create-rol-select'>
                    <option value="0">Inactive</option>
                    <option value="1">Active</option>
                </select>
                {error && <p className='create-rol-error'>{error}</p>}

                <div className="create-rol-buttons">
                    <Link to="/">

                        <input className='create-rol-input-button-cancel' type="button" value="Cancel" />
                    </Link>

                    <input className='create-rol-input-button-accept' type="button" value="Create"
                        onClick={saveHandler} />
                </div>
            </div>
        </section>
    )
}

export default CreateRol