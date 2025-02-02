import { getCategory, findByLetterCategory, findByStatusCategory } from '../../../services/ConfigAPI';
import './ViewCategory.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteCategory from '../DeleteCategory/DeleteCategory';
import { use } from 'react';

const ViewCategory = () => {

    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await getCategory();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        getCategories();



    }, []); // Solo se ejecuta al montar el componente

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedCategory(null);
    };

    const handleSearch = async () => {
        if (search === '') {

            const data = await getCategory();
            setCategories(data);
        } else {
            const data = await findByLetterCategory(search);
            setCategories(data);
        }
    }


    const handleSelectStatus = async (e) => {
        const selectedStatus = e.target.value; // Obtén el valor como string
        console.log(selectedStatus);
        setStatus(selectedStatus);
        if (selectedStatus === "") {
            const data = await getCategory();
            setCategories(data);
        } else {
            const data = await findByStatusCategory(selectedStatus);
            setCategories(data);
        }
    }


    return (
        <section className='view-category-section'>

            <div>
                <h2 className='view-category-h2'>Category Details</h2>
                <div className='view-category-header'>
                    <Link to="/createCategory">
                        <input className='view-category-button-create' type="button" value="Create new Category" />
                    </Link>
                    <input className='view-category-input-search' type="text" placeholder='search category to name'
                        value={search} onChange={(e) => setSearch(e.target.value)} />
                    <input className='view-category-butto-search' type="button" value="Search"
                        onClick={handleSearch} />
                    <div className='view-category-header-select'>
                        <h2 className='view-category-h2'>Search by status</h2>
                        <select className='view-category-select' value={status} onChange={handleSelectStatus}>
                            <option value="">all</option>
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                        </select>
                    </div>
                </div>
                <table className='view-category-table'>
                    <thead>
                        <tr>
                            <th>Options</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/edit/${category.id}`}>
                                            <input className='view-category-button-edit' type="button" value="Edit" />
                                        </Link>

                                        <input className='view-category-button-delete' type="button" value="Delete"
                                            onClick={() => handleDeleteClick(category)} />
                                    </td>
                                    <td data-label="ID">{category.id}</td>
                                    <td data-label="Name">{category.nameCategory}</td>
                                    <td data-label="Status">{category.statusCategory == 0 ? "inactive" : "active"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    No categories available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <DeleteCategory
                isOpen={modalOpen}
                onClose={handleModalClose}
                category={selectedCategory}
            />

        </section>

    )
}

export default ViewCategory