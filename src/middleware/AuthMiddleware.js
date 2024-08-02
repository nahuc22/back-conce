function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
      console.log(next); // Log de depuración
      return next();
  } else {
      console.log('Sin sesión, redirigiendo al login'); // Log de depuración
      res.redirect('/login.html');
  }
}

module.exports = isAuthenticated;