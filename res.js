exports.ok = function(values, res) {
  res.json(values);
  res.end();
};

exports.lis = function(values, res) {
  var data = {
      'Sejarah': values
  };
  res.json(data);
  res.end();
};

exports.indeks = function(values, res) {
  var data = {
      'Indeks': values
  };
  res.json(data);
  res.end();
};

exports.kategori = function(values, res) {
  var data = {
      'Kategori': values
  };
  res.json(data);
  res.end();
};
