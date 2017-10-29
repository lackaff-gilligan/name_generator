var namesCollection = [ 'Glacier', 'Texas', 'Factotum', 'Montgomery', 'Frances', 'Sinclair',
'Sidney', 'Rory', 'Taylor', 'Frugal', 'Exquisit', 'Majestic', 'Tranquil', 'Lee', 'Reese',
'Astute', 'Phoenix', 'Sly', 'Desire', 'Bay', 'Colonel', 'Flee', 'Cameron', 'Justice', 'Frankie',
'Jamie', 'Goodsport', 'Lake', 'Quinn', 'Wild'];

function randomNumber() {
    //works because arrays are zero-indexed and I'm using Math.floor
    return Math.floor(Math.random() * (namesCollection.length));
}

function generateNames() {
    var namePair = [];
    var first = namesCollection[randomNumber()];
    var middle = namesCollection[randomNumber()];
    namePair.push(first);
    namePair.push(middle);
    return namePair;
}

module.exports = generateNames;