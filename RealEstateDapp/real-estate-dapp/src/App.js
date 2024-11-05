import React, { useEffect, useState } from 'react';
import './App.css';
import initWeb3 from './realEstate'; // Update the path if necessary

function App() {
    const [realEstateInstance, setRealEstateInstance] = useState(null);
    const [properties, setProperties] = useState([]); // State to store properties
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const loadRealEstate = async () => {
            try {
                const instance = await initWeb3(); // Call the function to get the instance
                setRealEstateInstance(instance);

                // Get property count and retrieve properties
                const count = await instance.methods.getPropertyCount().call();
                const props = [];
                for (let i = 0; i < count; i++) {
                for (let i = 0; i < count; i++) {
                    const property = await instance.methods.properties(i).call(); // Fetch properties here
                    props.push(property);
                }
                setProperties(props); // Set the fetched properties
            } catch (err) {
                setError(err.message); // Store the error message
            }
        };

        loadRealEstate();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Real Estate DApp</h1>
                {error && <p className="error">{error}</p>} {/* Display the error if it exists */}
                <h2>Properties:</h2>
                {properties.length === 0 ? (
                    <p>No properties available</p>
                ) : (
                    properties.map((property, index) => (
                        <div key={index}>
                            <p>Name: {property.name}</p>
                            <p>Location: {property.location}</p>
                            <p>Price: {property.price}</p>
                            <p>Owner: {property.owner}</p>
                            <p>For Sale: {property.forSale ? 'Yes' : 'No'}</p>
                        </div>
                    ))
                )}
            </header>
        </div>
    );
}

export default App; // Ensure this line is present
