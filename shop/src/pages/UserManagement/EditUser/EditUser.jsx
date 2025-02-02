import React, { useEffect, useState } from 'react';
import { findByAllRol, findByIdUser, updateUser, getRolById } from '../../../services/ConfigAPI';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { validationInput } from '../../../components/Exceptions';

import "./EditUser.css";



const EditUser = () => {
    const [roles, setRoles] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState(""); // Guardaremos solo el ID del rol

    const [error, setError] = useState("");

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await findByIdUser(id);
                setFirstName(response.firstNameUser);
                setLastName(response.lastNameUser);
                setEmail(response.emailUser);
                setRol(response.rol); // Asignar el ID del rol
                setPassword(response.passwordUser);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const getRoles = async () => {
            try {
                const response = await findByAllRol();
                setRoles(response);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        getRoles();
        getUser();
    }, [id]);

    const handleAccept = async () => {
        if (validationInput(firstName)) {
            setError("First name cannot be empty");
            return;
        }
        if (validationInput(lastName)) {
            setError("Last name cannot be empty")
            return;
        }
        if (validationInput(email)) {
            setError("e-mail cannot be empty")
            return;
        }
        if (validationInput(password)) {
            setError("Password cannot be empty")
            return;
        }
        console.log("ROLLLLLLLLLLL", rol);
        setError("");
        await updateUser(id, firstName, lastName, email, password, rol);
        navigate("/");

    };

    const findByRolId = async (e) => {
        const response = await getRolById(e.target.value);
        console.log("RESPONSE ROL", response)
        setRol(response);
    }

    return (
        <section className='edit-user-section'>
            <div className='edit-user-div'>
                <h1 className='edit-user-h1'>Edit User</h1>
                <label className='edit-user-label'>First name</label>
                <input
                    className='edit-user-input'
                    type="text"
                    placeholder='first name'
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
                <label className='edit-user-label'>Last name</label>
                <input
                    type="text"
                    className="edit-user-input"
                    placeholder='last name'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
                <label className="edit-user-label">e-mail</label>
                <input
                    type="text"
                    className='edit-user-input'
                    placeholder='e-mail'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label className="edit-user-label">password</label>
                <input
                    type="password"
                    className='edit-user-input'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <label className='edit-user-label'>Rol</label>
                <select
                    className='edit-user-select'
                    value={rol.id}
                    onChange={findByRolId} // Actualizamos el estado del ID del rol
                >
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.nameRol}
                        </option>
                    ))}
                </select>
                {error ? <p>{error}</p> : ""}
                <div className='edit-user-option-buttons'>
                    <Link to="/">
                        <input
                            className='edit-user-button-cancel'
                            type="button"
                            value="Cancel"

                        />
                    </Link>
                    <input
                        className='edit-user-button-accept'
                        type="button"
                        value="Accept"
                        onClick={handleAccept}
                    />
                </div>
            </div>
        </section>
    );
};

export default EditUser;
