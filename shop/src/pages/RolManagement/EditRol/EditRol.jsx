import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getRolById, updateRol } from '../../../services/ConfigAPI';
import { Link, useNavigate } from 'react-router-dom';
import { validationInput } from '../../../components/Exceptions';

import './EditRol.css';

const EditRol = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [nameRol, setNameRol] = useState('');
    const [statusRol, setStatusRol] = useState('');

    const [error, setError] = useState('');


    useEffect(() => {
        const getRol = async () => {
            try {
                const data = await getRolById(id);
                setNameRol(data.nameRol);
                setStatusRol(data.statusRol);
            } catch (error) {
                console.error('Error fetching rol:', error);
            }
        };
        getRol();
    }, []);

    const handleSave = async () => {
        if (validationInput(nameRol)) {
            setError("The name is required");
            return;
        }
        await updateRol(id, nameRol, statusRol);

        setError("");
        navigate("/");
    };

    return (
        <section className='edit-rol-section'>
            <div className='edit-rol-div'>
                <h1 className='edit-rol-h1'>Edit Rol</h1>


                <label className='edit-rol-label'>Name Rol</label>
                <input className='edit-rol-input' type="text" value={nameRol}
                    onChange={(e) => setNameRol(e.target.value)} />

                <label className='edit-rol-label'>Status Rol</label>

                <select className='edit-rol-select' value={statusRol}
                    onChange={(e) => setStatusRol(e.target.value)}>
                    <option value="0">Inactive</option>
                    <option value="1">Active</option>
                </select>
                <div className="edit-rol-buttons">
                    <Link to="/">
                        <input className='edit-rol-button-cancel' type="button" value="Cancel" />
                    </Link>
                    <input className='edit-rol-button-accept' type="button" value="Accept"
                        onClick={handleSave} />
                </div>

            </div>
        </section>
    )
}

export default EditRol