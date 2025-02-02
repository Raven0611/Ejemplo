import React from 'react'
import { Link } from 'react-router-dom'
const Main = () => {
    return (
        <div>

            <Link to="/login">
                <input type="button" value="Login" />
            </Link>

            <Link to="/register">
                <input type="button" value="Sig in" />
            </Link>
        </div>
    )
}

export default Main