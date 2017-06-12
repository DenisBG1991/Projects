function home(req, res) {
    res.render('error.html', { error: 'Not found' });
}

module.exports = home;