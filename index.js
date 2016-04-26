var Crawler = require("crawler");
var url = require('url');

var cheerio = require("cheerio");

var fs = require('fs');
var os = require("os");

var array = [];
var c = new Crawler({
	maxConnections: 10,
	// This will be called for each crawled page
	callback: function(error, result, $) {


		// console.log(result);
		$('p').each(function(index, el) {

			var key = $(el).children().html();
			var text = $(el).html();

			var index = text.lastIndexOf('</i>');
			var value = text.substring(index + 6, text.length);


			array[key] = value;

			// console.log(key);
			// console.log(value);
		})

		for (var k in array) {
			if (array.hasOwnProperty(k)) {
				if (array[k].length < 200) {
					fs.appendFileSync('dictA.txt', k + '@', 'utf8', (err) => {
						if (err) throw err;
					});

					fs.appendFileSync('dictA.txt', array[k] + '@' + os.EOL, 'utf8', (err) => {
						if (err) throw err;
					});
				}
			}
		}

		for (var k in array) {
			if (array.hasOwnProperty(k)) {
				if (array[k].length < 200) {
					fs.appendFileSync('dictB.txt', k + os.EOL, 'utf8', (err) => {
						if (err) throw err;
					});

					fs.appendFileSync('dictB.txt', array[k] + os.EOL, 'utf8', (err) => {
						if (err) throw err;
					});
				}
			}
		}


	}
});

// Queue a list of URLs
c.queue('http://www.mso.anu.edu.au/~ralph/OPTED/v003/wb1913_v.html');
c.queue('http://www.mso.anu.edu.au/~ralph/OPTED/v003/wb1913_w.html');
c.queue('http://www.mso.anu.edu.au/~ralph/OPTED/v003/wb1913_x.html');
c.queue('http://www.mso.anu.edu.au/~ralph/OPTED/v003/wb1913_y.html');
c.queue('http://www.mso.anu.edu.au/~ralph/OPTED/v003/wb1913_z.html');
