import React, { useEffect, useState } from 'react'
import { findByAllRol, findByLetterRol, findByStatusRol } from '../../../services/ConfigAPI';

import { Link } from 'react-router-dom';
import "./ViewRol.css";

import DeleteRol from '../DeleteRol/DeleteRol';
const ViewRol = () => {
    const [roles, setRoles] = useState([]);

    const [search, setSearch] = useState('');

    const [status, setStatus] = useState('');

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedRol, setSelectedRol] = useState(null);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const data = await findByAllRol();
                console.log(data);
                setRoles(data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        getRoles();
    }, []);


    const handleSearch = async () => {
        console.log("search", search);
        if (search === '') {
            const data = await findByAllRol();
            setRoles(data);
        } else {
            const data = await findByLetterRol(search);
            setRoles(data);
        }
    }
    const handleSelectStatus = async (e) => {
        const selectedStatus = e.target.value; // Obtén el valor como string

        setStatus(selectedStatus);
        try {
            if (selectedStatus == "") {
                // Si está vacío, carga todas las categorías
                const data = await findByAllRol();
                setRoles(data);
            } else {
                const data = await findByStatusRol(selectedStatus);
                setRoles(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }


    const handleDeleteClick = (rol) => {
        setSelectedRol(rol);
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRol(null);
    };

    return (
        <section className='view-rol-section'>
            <div className='view-rol-div'>
                <h1>Roles</h1>
                <div className='view-rol-div-search'>
                    <Link to={"/create"}>
                        <input className='view-rol-input-create' type="button" value="Create" />
                    </Link>

                    <input type="text" placeholder="Search" value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <input type="button" value="Search"
                        onClick={handleSearch} />
                </div>

                <div className='view-rol-div-select'>
                    <h2 className='view-rol-h2'>Search by status</h2>
                    <select className='view-rol-select' value={status} onChange={handleSelectStatus}>
                        <option value="">All</option>
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                    </select>

                </div>
                <div className='view-rol-div-table'>
                    <table className='view-rol-table'>
                        <thead>
                            <tr>
                                <th>Acciones</th>
                                <th>Id</th>
                                <th>Name Rol</th>
                                <th>Status Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.length > 0 ? (
                                roles.map((rol) => (
                                    <tr key={rol.id}>
                                        <td>
                                            <Link to={`/edit/${rol.id}`}>
                                                <input className='view-rol-button-edit' type="button" value="Edit" />
                                            </Link>

                                            <input className='view-rol-button-delete' type="button" value="Delete"
                                                onClick={() => handleDeleteClick(rol)} />
                                        </td>
                                        <td>{rol.id}</td>
                                        <td>{rol.nameRol}</td>
                                        <td>{rol.statusRol == 0 ? "Inactive" : "Active"}</td>
                                    </tr>
                                )
                                )) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <DeleteRol
                    isOpen={modalOpen}
                    onClose={handleModalClose}
                    rol={selectedRol} />
            </div>

        </section>
    )
}

export default ViewRol