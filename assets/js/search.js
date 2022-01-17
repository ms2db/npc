function displaySearchResults(results, store) {
  var searchResults = document.getElementById('search-results');

  if (results.length) {
    var appendString = '';
    for (var i = 0; i < results.length; i++) {
      var id = results[i].ref
      appendString += '<tr><th>' + id + '</th><td><a href="' + id + '">' + store[id].name + '</a><td></tr>'
    }

    searchResults.innerHTML = appendString;
  } else {
    searchResults.innerHTML = '<tr><th>No results found</th><th></th></tr>';
  }
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }
}

function buildLunrIndex() {
  return fetch('assets/index.json')
    .then(response => response.json())
    .then(data => {
      var index = lunr(function () {
        this.field('id');
        this.field('name');

        // Add the data to lunr
        for (var key in data) {
          this.add({
            'id': key,
            'name': data[key].name
          });
        }
      });
      var index_json = JSON.stringify(index);
      
      // hack to download by text
      // https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(index_json));
      element.setAttribute('download', 'lunr_index.json');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    })
}

(function() {
  var searchTerm = getQueryVariable('query');
  if (searchTerm) {
    document.getElementById('search-box').setAttribute('value', searchTerm);

    Promise.all([
      fetch('assets/lunr_index.json').then(response => response.json()),
      fetch('assets/index.json').then(response => response.json()),
    ]).then(data => {
      var index = lunr.Index.load(data[0]);
      var results = index.search(searchTerm);
      displaySearchResults(results, data[1]);
    })
  }
})();