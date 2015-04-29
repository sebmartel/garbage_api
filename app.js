var request = require('request');
var parser  = require('json-parser');
var address_base_url    = 'http://www.seattle.gov/UTIL/WARP/Home/GetAddress';
var collection_base_url = 'http://www.seattle.gov/UTIL/WARP/CollectionCalendar/GetCollectionDays';

if(typeof process.argv[2] == 'undefined') {
    console.log('PLEASE INPUT TEST ADDRESS');

    return;
}

var address = process.argv[2];
console.log(address);

var get_full_address = function(rough, callback) {
    console.log('GETTING ADDRESS STARTED');

    var request_url = address_base_url + '?' + 'pAddress=' + rough + '&ActiveOnly=spu&pUnit=&pRequireSolidWasteServices=true';
    request(request_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if(body.length > 0) {
                // remove []
                var full_address = body.replace(/\[|]|\"/g,'');

                console.log(full_address);
                console.log('GETTING ADDRESS FINISHED');

                callback(full_address);
            }
        } else {
            console.log('ERROR OCCURS');
        }
    });
};

var get_garbage_data = function(full_address) {
    console.log('GETTING GARBAGE INFORMATION STARTED');

    var request_url = collection_base_url + '?' + 'pAddress=' + full_address + '&pJustChecking=&pApp=CC&pIE=&start=0';
    request(request_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('GETTING GARBAGE INFORMATION FINISHED');
            var parsed = parser.parse(body);

            console.log(parsed);
            console.log('------------------------------------------------------------');
        } else {
            console.log('ERROR OCCURS');
        }
    });
};
console.log('************************************************************');

get_full_address(address, get_garbage_data);