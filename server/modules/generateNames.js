var namesCollection = [ 'Glacier', 'Texas', 'Factotum', 'Montgomery', 'Frances', 'Sinclair',
'Grass', 'Rory', 'Blizzard', 'Frugal', 'Exquisit', 'Majestic', 'Tranquil', 'Lee', 'Reese',
'Astute', 'Phoenix', 'Sly', 'Desire', 'Bay', 'Colonel', 'Flee', 'Cameron', 'Justice', 'Frankie',
'Jamie', 'Snap', 'Goodsport', 'Lake', 'Quinn', 'Wild', 'Tube', 'Shadow', 'Flash', 'Zeitgeist', 'Pop'];

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