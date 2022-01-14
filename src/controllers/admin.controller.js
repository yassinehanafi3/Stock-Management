exports.logout = (req, res) =>{
      req.logout();
      res.send("Disconnected");
    }

exports.login = (req, res) => {
  res.redirect("/dashboard");
};
exports.renderHtml = (req, res) => {
  res.render("admin");
}
