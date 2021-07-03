const{App} = require('@slack/bolt');

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret:process.env.SLACK_SIGNING_SECRET
});

(async() => {
	//run web application
	await app.start(3000);
	console.log('Bolt jwave-now is running');
})();

app.command('/jwave', async({ command, ack, say}) => {
	await ack();

	const https = require('https');
	const jsdom = require('jsdom');
	const { JSDOM } = jsdom;
	const url = 'https://www.j-wave.co.jp/songlist/';
		 
	https.get(url, res => {
	  let html = '';
	  res.on('data', line => html += line);
	  res.on('end', () => {
	    const dom = new JSDOM(html);
	    let artist = dom.window.document.querySelector('.txt_artist').textContent;
	    let song = dom.window.document.querySelector('.song_info>h4').textContent;
	    let time = dom.window.document.querySelector('.time').textContent;

		say(`⏰${time} 👤${artist} 🎵${song}`);
	  });
	});
});