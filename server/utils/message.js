const moment = require('moment');

var generateMessage = (from, text) => {
	return {
		from,
		text,
		created: moment().valueOf
	};
}

module.exports = {generateMessage};