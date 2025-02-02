import React, { useState } from 'react'
import "./Login.css"
import { use } from 'react';
import { loginUser } from '../../../services/ConfigAPI';
import { validationInput } from '../../../components/Exceptions';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");


    const navigate = useNavigate();

    const verify = async () => {

        if (validationInput(email)) {

            setError("e-mail cannot be null");
            return;
        } else if (validationInput(password)) {

            setError("passowrd cannot be null");
            return;
        }
        const accept = await loginUser(email, password);

        if (typeof accept === "string") {
            // Manejar errores del backend como texto
            setError(accept);
            return;
        }

        if (accept) {

            setError(""); // Limpiar el error
            localStorage.setItem("user", JSON.stringify(accept));
            const user = localStorage.getItem("user");
            // navigate("/product");

        }

    }

    return (
        <section className='login-section'>
            <div className='login-div'>
                <h1 className='login-h1'>Inciar Sesion</h1>
                <h2 className='login-h2'>E-mail</h2>
                <input className='login-input' type="email" placeholder='e-mail'
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <h2 className='login-h2'>Password</h2>
                <input className='login-input' type="password" placeholder='password'
                    onChange={(e) => setPassword(e.target.value)} value={password} />

                {/* Mostrar el mensaje de error si existe */}
                {error && <p className="login-error-message">{error}</p>}

                <div className='login-buttons'>
                    <Link to="/">
                        <input type="button" className="login-button-cancel" value="Cancel" />
                    </Link>
                    <input type="button" className="login-button-accept" value="Accept"
                        onClick={verify} />
                </div>
            </div>
        </section>
    )
}

export default Login