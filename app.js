const express = require('express')
const asciify = require('asciify')


const port = process.env.PORT || 3000;
console.log(port)

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

function asciifyPromise(text, options) {
	return new Promise((resolve, reject) => {
		asciify(text, options, (err, art) => {
			if(err) reject(err)
			resolve(art)
		})
	})
}

app.get('/', async (req, res ) => {

	let string = req.query.s || 'Hello'
	let style = req.query.style || 'big';

	let fonts = await getStyles();


	let output = await asciifyPromise(string, {font:style})
	
	res.render('master.pug', { title: 'Ascii Art Generator', output, fonts, text: string, style})


})

app.listen(port, () => {
 console.log(`Server running on port ${port}`)
})
