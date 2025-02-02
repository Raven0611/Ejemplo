import React, { useState } from 'react';
import "./ViewInvoice.css";

const ViewInvoice = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            <button
                className="toggle-invoice-button"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? 'Hide Invoice' : 'Show Invoice'}
            </button>
            {isVisible && (
                <section className='view-invoice-section'>
                    <h1 className="view-invoice-h1">Products Select</h1>
                    <div>
                        <p>Products selected</p>
                        <input className='view-invoice-button-delete' type="button" value="Delete" />
                    </div>
                    <div>
                        <input className='view-invoice-button-shop' type="button" value="Buy all" />
                    </div>
                    <footer className='view-invoice-footer'>Total Price</footer>
                </section>
            )}
        </>
    );
};

export default ViewInvoice;
