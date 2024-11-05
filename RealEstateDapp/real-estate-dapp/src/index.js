import React, { useEffect, useState } from 'react';
import './App.css';
import initWeb3 from './realEstate'; // Update the path if necessary

function App() {
    const [realEstateInstance, setRealEstateInstance] = useState(null);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const loadRealEstate = async () => {
            try {
                const instance = await initWeb3(); // Call the function to get the instance
                setRealEstateInstance(instance);
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
                {/* You can now use realEstateInstance here */}
            </header>
        </div>
    );
}

export default App; // Ensure this line is present
