import React, { useState } from 'react';

function InputComponent({ onCalculate }) {
    const [length, setLength] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [kerf, setKerf] = useState(0.075);
    const [availableLengths, setAvailableLengths] = useState('');
    const [desiredLengths, setDesiredLengths] = useState([]);

    const handleAdd = () => {
        const updatedDesiredLengths = [...desiredLengths];
        for (let i = 0; i < quantity; i++) {
            updatedDesiredLengths.push(parseFloat(length));
        }
        setDesiredLengths(updatedDesiredLengths);
    }

    const handleSubmit = () => {
        const available = availableLengths.split(',').map(l => parseFloat(l.trim()));
        onCalculate(desiredLengths, available, parseFloat(kerf));
    }

    return (
        <div>
            <div>
                <label>Desired Length: </label>
                <input value={length} onChange={e => setLength(e.target.value)} />
            </div>
            <div>
                <label>Quantity: </label>
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <button onClick={handleAdd}>Add</button>
            <div>
                <label>Kerf: </label>
                <input value={kerf} onChange={e => setKerf(e.target.value)} />
            </div>
            <div>
                <label>Available Lengths (comma separated): </label>
                <input value={availableLengths} onChange={e => setAvailableLengths(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Calculate</button>
        </div>
    );
}

export default InputComponent;
