---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<h1>Npc Search</h1>
<form class="input-group" method="get">
  <span class="input-group-text">Search</span>
  <input type="text" class="form-control" id="search-box" name="query">
  <button type="submit" class="btn btn-dark" value="search">
    <i class="bi bi-search ms-2 me-2"></i>
  </button>
</form>

<div class="container mt-2">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody id="search-results"></tbody>
  </table>
</div>

<script src="assets/js/lunr.js"></script>
<script src="assets/js/search.js"></script>