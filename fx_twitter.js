const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const cheerio = require("cheerio")

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }
});

client.on('message', msg => {
  if (msg.content.includes('https://twitter.com') && !msg.author.bot) {
  	var raw_twitter_link = "";
  	var side_message = "";
  	const msg_tab = msg.content.split(' ');
  	for (let i = 0; i < msg_tab.length; i++) {
  		if (msg_tab[i].startsWith('https://twitter.com')) {
  			raw_twitter_link = msg_tab[i];
  		}
		else if (msg_tab[i].includes('https://twitter.com')) {
	  		var index = msg_tab[i].search('https://twitter.com');
	  		console.log(index);
	  		console.log(msg_tab);
	  		raw_twitter_link = msg_tab[i].substr(index);
	  		msg_tab_glued_msg = msg_tab[i].split('https://twitter.com');
	  		side_message = side_message.concat(msg_tab_glued_msg[0], " ");
	  		console.log(raw_twitter_link);
	  	}
	  	else {
	  		side_message = side_message.concat(msg_tab[i], " ");
	  	}
  	}
  	/*var index = msg.content.indexOf('https');
  	const raw_twitter_link = msg.content.substr(index);*/

  	var options = {
	  url: raw_twitter_link,
	  headers: {
	    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
	  }
	};

	function callback(error, response, body) {
		const $ = cheerio.load(body);
		const description = $("meta[property='og:description']")[0];
		if (description.attribs.content.includes('https://t.co')) {
		  	msg.delete();
			msg.channel.send("<@" + msg.author.id + "> : " + side_message + "\n" + raw_twitter_link.substr(0,8) + 'fx' + raw_twitter_link.substr(8));
		} 
	}

	request(options, callback);

  }
});


client.login('ODY2NDEzNjY1NDY4NTQ3MTIz.YPSMmw.CunRrJ1irvUZcrdfnCJT0EkkLY4');