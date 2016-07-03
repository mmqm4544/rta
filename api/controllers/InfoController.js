module.exports = {
  getInfo: function(req, res) {
    Info.find().then(function(info) {
      return res.json(info);
    }).catch(function(err) {
      return res.negotiate(err);
    });
  }
}
