import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allProduct, getImageProduct, createInvoice, findInvoiceUserId } from "../../../services/ConfigAPI";

import "./ViewProduct.css";
import ViewInvoice from "../../InvoiceManagment/ViewInvoice/ViewInvoice";

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchProductsAndImages = async () => {
            try {
                const response = await allProduct();
                setProducts(response);

                const urls = {};
                for (const product of response) {
                    const imageUrl = await getImageProduct(product.id);
                    if (imageUrl) {
                        urls[product.id] = imageUrl;
                    }
                }
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching products or images:", error);
            }
        };

        fetchProductsAndImages();
    }, []);

    const createsInvoices = async () => {
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString); // Convertir la cadena JSON en un objeto
        console.log("Usuario extraído:", user.id);
        const ids = user.id;

        await findInvoiceUserId(ids);
    }

    return (
        <section className="view-product-section">
            <div className="view-product-div">
                <h1 className="view-product-h1">Products</h1>
                <div className="view-product-option-create">
                    <Link to="/create">
                        <input
                            className="view-product-option-button-create"
                            type="button"
                            value="Create Product"
                        />
                    </Link>
                </div>

                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="view-product-container" key={product.id}>
                            <h2 className="view-product-h2">{product.nameProduct}</h2>

                            <img
                                src={imageUrls[product.id]}
                                alt={product.nameProduct}
                                style={{ width: "100px", height: "100px" }}
                            />
                            <p className="view-product-p-stock">
                                <span>Stock:</span> {product.stockProduct}
                            </p>
                            <p className="view-product-p-price">
                                <span>Price:</span> ${product.priceProduct}
                            </p>

                            <input className="view-product-button-shop" type="button" value="Buy"
                                onClick={createsInvoices} />
                        </div>
                    ))
                ) : (
                    <p>Product Not found</p>
                )}
            </div>

            {/* Aquí se muestra el panel de ViewInvoice por defecto */}
            <ViewInvoice />
        </section>
    );
};

export default ViewProduct;
