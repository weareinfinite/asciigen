const express = require('express')
const asciify = require('asciify')


const app = express()
app.use(express.static('public'))
app.set('view engine', 'pug')

function  getStyles() {
	return new Promise((resolve, reject) => {
		asciify.getFonts((err, styles) =>  {
			if(err) reject(err);
			resolve(styles);
		})
	})
	
}

app.get('/', async (req, res ) => {

	let string = req.query.s || 'Hello'
	let style = req.query.style || 'big';

	let fonts = await getStyles();

	let fontOptions = fonts.map(font => {
		let selected = style === font ? 'selected' :'';
		return `<option ${selected}>${font}</option>`}).toString();

	asciify(string, {font:style}, function(err, f){ console.log(f) 
	
		res.render('master.pug', { title: 'Ascii Art Generator', output: f, fonts, text: string, style})

	});
})

app.listen(4500, () => {
 console.log('Server running on port 3000')
})
