export function orderSteelBeams(desired, available, kerf = 0) {
    desired.sort((a, b) => b - a); // descending order

    const results = {};
    const breakdown = {};
    let stockUsed = [];
    let waste = {};

    for (const d of desired) {
        let foundFit = false;

        // Try to fit in existing chosen stocks
        for (let i = 0; i < stockUsed.length; i++) {
            let remainingSpace = available[available.length - 1] - stockUsed[i].length;
            let requiredSpace = d + (stockUsed[i].items.length * kerf); // Space required with kerf

            if (remainingSpace >= requiredSpace) { 
                stockUsed[i].length += d + kerf; // Add the desired length and kerf
                stockUsed[i].items.push(d);
                foundFit = true;
                break;
            }
        }

        // If not fit in any existing stock, start a new one
        if (!foundFit) {
            stockUsed.push({ length: d, items: [d] });
        }
    }

    // Count the number of stocks used, calculate waste, and prepare breakdown
    for (const s of stockUsed) {
        const bestFit = available.find(av => av >= s.length);
        if (bestFit) {
            results[bestFit] = (results[bestFit] || 0) + 1;
            waste[bestFit] = (waste[bestFit] || 0) + bestFit - s.length;
            
            if (!breakdown[bestFit]) {
                breakdown[bestFit] = [];
            }
            breakdown[bestFit].push(s.items);
        } else {
            throw new Error("Cannot fit desired lengths with available sizes.");
        }
    }

    return {
        order: results,
        waste: waste,
        breakdown: breakdown
    };
}

const desiredLengths = [];
const availableLengths = [];
const kerfThickness = 0;

console.log(JSON.stringify(orderSteelBeams(desiredLengths, availableLengths, kerfThickness), null, 2));
