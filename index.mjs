import express from 'express';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let img = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar%20system");
    let imgData = await img.json();
    let imgUrl = imgData.hits[0].previewURL;
    res.render('home.ejs', { imgUrl })
});

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();
    console.log(planetInfo);
    res.render('planet.ejs', { planetInfo, planet })
});

app.get('/nasa', (req, res) => {
    res.render('nasa.ejs', {})
});

app.listen(3000, () => {
    console.log('server started');
});