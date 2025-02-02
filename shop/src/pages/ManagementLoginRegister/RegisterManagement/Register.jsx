import React, { useState } from 'react'
import { validationInput } from '../../../components/Exceptions';
import { registerUser } from '../../../services/ConfigAPI';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();


    const createdRegister = async () => {

        if (validationInput(firstName)) {
            setError("First name cannot be null");
            return;
        } else {
            if (validationInput(lastName)) {
                setError("Last name cannot be null");
                return;
            } else {
                if (validationInput(email)) {
                    setError("E-mail cannot be null");
                    return;
                } else {
                    if (validationInput(password)) {
                        setError("passowrd cannot be null");
                        return;
                    }
                }
            }
        }
        const verify = await registerUser(firstName, lastName, email, password);
        // Cambia la comparación a verify === true si es lo que esperas
        if (verify !== true) {
            setError(verify); // Establece el error en caso de que la verificación no sea exitosa
            return;
        }
        setError("");
        navigate('/login');
    }

    return (
        <section className='register-section'>
            <div className='register-div'>
                <h1 className='register-h1'>Register</h1>

                <h2 className='register-h2'>First name</h2>
                <input className='register-input' type="text" placeholder='First name'
                    onChange={(e) => setFirstName(e.target.value)} value={firstName} />

                <h2 className='register-h2'>Last name</h2>
                <input className='register-input' type="text" placeholder='Last name'
                    onChange={(e) => setLastName(e.target.value)} value={lastName} />

                <h2 className='register-h2'>E-mail</h2>
                <input className='register-input' type="email" placeholder='e-mail'
                    onChange={(e) => setEmail(e.target.value)} value={email} />

                <h2 className='register-h2'>Password</h2>
                <input className='register-input' type="password" placeholder='password'
                    onChange={(e) => setPassword(e.target.value)} value={password} />

                {/* Mostrar el mensaje de error si existe */}
                {error && <p className="register-error-message">{error}</p>}

                <div className='register-button'>
                    <Link to="/">
                        <input className='register-button-cancel' type="button" value="Cancel" />

                    </Link>

                    <input className='register-button-accept' type="button" value="Accept" onClick={createdRegister} />

                </div>

            </div>

        </section>
    )
}


export default Register