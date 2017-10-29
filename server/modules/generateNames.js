var namesCollection = [ 'Glacier', 'Texas', 'Factotum', 'Montgomery', 'Frances', 'Sinclair',
'Sidney', 'Rory', 'Taylor', 'Frugal', 'Exquisit', 'Majestic', 'Tranquil', 'Lee', 'Reese',
'Astute', 'Phoenix', 'Sly', 'Addison', 'Bay', 'Avery', 'Bailey', 'Cameron', 'Devin', 'Frankie',
'Jamie', 'Goodsport', 'Lake', 'Quinn', 'Wild'];

function randomNumber() {
    return Math.floor(Math.random() * 30);
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