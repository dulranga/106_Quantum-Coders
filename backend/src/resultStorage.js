// resultStorage.js
import fs from 'fs';

function storeResultsInJSON(analyzedResults) {
    const jsonFilePath = './analyzedResults.json';
    fs.writeFileSync(jsonFilePath, JSON.stringify(analyzedResults, null, 2));
    console.log(`Results stored in ${jsonFilePath}`);
}

export {
    storeResultsInJSON
};