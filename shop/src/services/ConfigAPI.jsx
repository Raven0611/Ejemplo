import React from 'react'
import axios from 'axios'


export const ConfigAPI = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/user");
        console.log(response.data); // Ver el resultado en consola
    } catch (error) {
        console.error("Error type : ", error); // Manejar errores
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/user/login', {
            email,      // Se envía el email
            password,   // Se envía la contraseña
        });

        return response.data.data;
    } catch (error) {

        return error.response.data.nameError;
    }
};

export const registerUser = async (firstName, lastName, email, password) => {

    try {
        const response = await axios.post('http://localhost:8080/api/v1/user', {
            firstNameUser: firstName,
            lastNameUser: lastName,
            emailUser: email,
            passwordUser: password,
            rol: {
                id: 2,
                nombre: 'User',
                estado: '1'
            }
        });
        return true;
    } catch (error) {
        return error.response.data.nameError;
    }
};

export const getCategory = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/category");
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/category/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const updateCategory = async (id, nameCategory, statusCategory) => {

    try {
        const response = await axios.put(`http://localhost:8080/api/v1/category/${id}`, {

            nameCategory,
            statusCategory
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteCategory = async (id) => {
    console.log("id deleteFunction", id);
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/category/${id}`);
        return response;
    } catch (error) {
        console.log("error function", error);
        return error.response;
    }
}

export const addCategory = async (nameCategory, statusCategory) => {
    console.log("nameCategory", nameCategory);
    console.log("statusCategory", statusCategory);
    try {
        const response = await axios.post('http://localhost:8080/api/v1/category/', {
            nameCategory: nameCategory,
            statusCategory: statusCategory
        });
    } catch (error) {

        return error.response.data;
    }
}

export const findByLetterCategory = async (letter) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/category/nameCategory/${letter}`);
        return response.data;
    } catch (error) {

        return error;
    }

}
export const findByStatusCategory = async (status) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/category/status/${status}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const findByAllRol = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/rol");
        return response.data;
    } catch (error) {
        return error;
    }
}
export const getRolById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/rol/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const updateRol = async (id, nameRol, statusRol) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/rol/${id}`, {
            nameRol,
            statusRol
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteRol = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/rol/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const addRol = async (nameRol, statusRol) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/rol', {
            nameRol: nameRol,
            statusRol: statusRol
        });
        console.log("response", response);
    } catch (error) {
        console.log("error XD", error.response.data);
        return error.response.data;
    }
}

export const findByLetterRol = async (letter) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/rol/nameRol/${letter}`);
        console.log("ENTRA AQUI PRRO ");
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log("error", error)
        return error;
    }
}

export const findByStatusRol = async (status) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/rol/status/${status}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const findByAllUser = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/user");
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return error;
    }
}
export const findByIdUser = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/user/${id}`);
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

export const findByLetterUser = async (letter) => {
    try {

        const response = await axios.get(`http://localhost:8080/api/v1/user/name/${letter}`)
        return response.data;
    } catch (error) {
        return error.response.data;
    };
};

export const findByUserByRol = async (rol) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/user/rol/${rol}`);
        return response.data.data;
    } catch (error) {
        return error;

    }
}
export const updateUser = async (id, firstNameUser, lastNameUser, emailUser, passwordUser, rol) => {
    try {
        const reponse = await axios.put(`http://localhost:8080/api/v1/user/${id}`, {
            id,
            firstNameUser,
            lastNameUser,
            emailUser,
            passwordUser,
            rol
        }
        )
    } catch (error) {
        return error;
    }
}
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/user/${id}`);
        console.log("USUARIO ELIMINADO", response);
    } catch (error) {
        console.log("USER ERROR :", error);
        return error.response;
    }
}

export const addProduct = async (nameProduct, descriptionProduct, stockProduct, priceProduct, imageProduct, category) => {
    const formData = new FormData();

    // Agregar los datos al FormData
    formData.append("nameProduct", nameProduct);
    formData.append("descriptionProduct", descriptionProduct);
    formData.append("stockProduct", stockProduct);
    formData.append("priceProduct", priceProduct);
    formData.append("imageProduct", imageProduct); // El archivo de imagen
    formData.append("category", category);

    try {
        // Enviar el FormData como cuerpo de la solicitud
        const response = await axios.post("http://localhost:8080/api/v1/product", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Indicar que es multipart
            },
        });

    } catch (error) {

        return error;
    }
};
export const allProduct = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/product");
        console.log("RESPONSE DATA ", response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const getImageProduct = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/image/${id}`, {
            headers: {
                Accept: 'text/plain', // Indica que esperas una respuesta como texto
            },
        });


        // Si el backend envía la imagen como Base64, úsala directamente
        return response.data;
    } catch (error) {
        console.error('Image fetch error:', error);
        return null;
    }
};

export const createInvoice = async (id) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/invoice/${id}`);
        console.log("Factura creada con éxito:", response.data);
    } catch (error) {
        console.log("ERROR AL CREAR UN INVOICE:", error.response ? error.response.data : error);
    }
};

export const findInvoiceUserId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/invoice/user/${id}`);
        console.log("RESPONSE INVOICE", response);
        return response;
    } catch (error) {
        console.error("ERROR OF SHIT", error);
    }
}
