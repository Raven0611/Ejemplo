import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { findByAllUser, findByLetterUser, findByAllRol, findByUserByRol } from '../../../services/ConfigAPI'
import { Link } from 'react-router-dom'

import DeleteUser from "../DeleteUser/DeleteUser.jsx"

import "./ViewUser.css"

const ViewUser = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [roles, setRoles] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectUser, setSelectedUser] = useState(null);



    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await findByAllUser();
                setUsers(response);
            } catch (error) {
                console.error("Error type : ", error); // Manejar errores
            }
        };
        const getRoles = async () => {
            try {
                const response = await findByAllRol();
                setRoles(response);
            } catch (error) {
                console.error("Error type : ", error); // Manejar errores
            }
        }
        getUsers();
        getRoles();

    }, [])

    const handleSearch = async () => {
        if (search === "") {
            const response = await findByAllUser();
            setUsers(response);
        } else {
            const response = await findByLetterUser(search);
            setUsers(response);
        }

    }

    const handleSelectRoles = async (e) => {
        const option = e.target.value;
        console.log(option);
        if (option === "") {
            const response = await findByAllUser();
            setUsers(response);
        } else {
            const response = await findByUserByRol(option);
            setUsers(response);
        }

    }

    const handleDeleteClick = async (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    }
    const handleModalCancel = async () => {
        setSelectedUser(null);
        setModalOpen(false);
    }

    return (
        <section className='view-user-section'>
            <div className='view-user-div'>
                <h1 className='view-user-h1'>View User</h1>

                <div className='view-user-div-searchs'>
                    <input className='view-user-input-button-create' type="button" value="Create User" />
                    <input className='view-user-input-search' type="text" value={search} placeholder='Search user by first name'
                        onChange={(e) => setSearch(e.target.value)} />
                    <input className='view-user-input-button-search' type="button" value="Search"
                        onClick={handleSearch} />

                    <select className='view-user-select' onChange={handleSelectRoles}>
                        <option value="">Search By Rol</option>
                        {roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>{rol.nameRol}</option>
                        ))}
                    </select>

                </div>

                <div className='view-user-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Options</th>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <Link to={`/editUser/${user.id}`}>
                                                <input className='view-user-button-edit' type="button" value="Edit" />
                                            </Link>
                                            <input className='view-user-button-delete' type="button" value="Delete"
                                                onClick={() => handleDeleteClick(user)} />
                                        </td>
                                        <td>{user.id}</td>
                                        <td>{user.firstNameUser}</td>
                                        <td>{user.lastNameUser}</td>
                                        <td>{user.emailUser}</td>
                                        <td>{user.rol.nameRol}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>No users found</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                <DeleteUser
                    isOpen={modalOpen}
                    onClose={handleModalCancel}
                    user={selectUser}
                />
            </div>
        </section>
    )
}

export default ViewUser