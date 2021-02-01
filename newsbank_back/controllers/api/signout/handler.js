function handler(req, res) {
    res.json({
        username: req.session.username,
        email: req.session.email
    });
}

export default handler