import express from 'express';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let n = Math.floor(Math.random() * (49))
    let img = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar%20system");
    let imgData = await img.json();
    let imgUrl = imgData.hits[n].webformatURL;
    res.render('home.ejs', { imgUrl })
});

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();
    console.log(planetInfo);
    res.render('planet.ejs', { planetInfo, planet })
});

app.get('/nasa', async (req, res) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    let img = await fetch(`https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${year}-${month}-${day}`);
    let imgData = await img.json();
    let imgUrl = imgData.url;
    res.render('nasa.ejs', { imgUrl })
});

app.get('/asteroid', async (req, res) => {
    let img = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=asteroids");
    let imgData = await img.json();
    let imgUrl = imgData.hits[0].webformatURL;
    res.render('asteroid.ejs', { imgUrl })
})

app.get('/comet', async (req, res) => {
    let img = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=comets");
    let imgData = await img.json();
    let imgUrl = imgData.hits[0].webformatURL;
    res.render('comet.ejs', { imgUrl })
})


app.listen(3000, () => {
    console.log('server started');
});