var bs58 = require("bs58");
const Buffer = require('safe-buffer').Buffer;
var polycrc = require('polycrc');

var toEthAddress = function (address) {
    let addrTemp = address.split('.')[1];
    return '0x' + (bs58.decode(addrTemp.substring(0, addrTemp.length - 1))).toString('hex');
};
var toManAddress = function (address) {
    var prefix = address.substring(0, 2);
    if (prefix === '0x' || prefix === '0X') {
        address = address.substring(2);
    }
    let crc8 = polycrc.crc(8, 0x07, 0x00, 0x00, false);
    const bytes = Buffer.from(address, 'hex');
    const manAddress = bs58.encode(bytes);
    let arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    return ('MAN.' + manAddress) + arr[crc8('MAN.' + manAddress) % 58];
};
module.exports = {
    toEthAddress:toEthAddress,
    toManAddress:toManAddress
}
