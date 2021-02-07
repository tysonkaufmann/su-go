// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/controllers/auth.js

// import models
// NO MODELS TO IMPORT YET

exports.createRoute = async (req, res) => {

  try {
      res.json({
        msg: 'Middleware test successful'
      })
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server error');
  }
}
