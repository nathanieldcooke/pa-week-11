/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */

const {HairColor, Person} = require('./models')

const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const express = require('express')

// setup route middlewares
const csrfProtection = csrf({ cookie: true })
const parseForm = express.urlencoded({ extended: false })

// create express app
const app = express()
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())
app.set('view engine', 'pug')

const port = 8080;

app.get('/', asyncHandler(async (req, res) => {
  const people = await Person.findAll({
    include: HairColor
  })
  console.log(people[0].HairColor.color)
  res.render('index', {people})
}))

app.get('/new-person', csrfProtection, async (req, res) => {
  // console.log("HR", HairColor)
  const hairColors = await HairColor.findAll()
  // console.log(hairColors[0].color)
  res.render('new-person', { hairColors, csrfToken: req.csrfToken() })
})

app.post('/new-person', parseForm, csrfProtection, asyncHandler( async (req, res) => {
  const {firstName, lastName, age, biography, hairColorId} = req.body
  // console.log(req.body)
  const newPerson = await Person.create({firstName, lastName, age, biography, hairColorId})
  // console.log('NP: ', newPerson)

  res.redirect('/')
}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch(e) {
  exports.app = null;
}
