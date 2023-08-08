import React, { useState } from 'react';
import InputComponent from './Components/InputComponent';
import ResultComponent from './Components/ResultComponent';
import { orderSteelBeams } from './Hooks/CutlistOptimizer'; 

function App() {
    const [results, setResults] = useState(null);

    const calculateOrder = (desiredLengths, availableLengths, kerf) => {
        const orderResults = orderSteelBeams(desiredLengths, availableLengths, kerf);
        setResults(orderResults);
    }

    return (
        <div className="App">
            <h1>Steel Order Calculator</h1>
            <InputComponent onCalculate={calculateOrder} />
            {results && <ResultComponent data={results} />}
        </div>
    );
}

export default App;
