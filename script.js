const GITHUB_URL = 'https://github.com/joaquinpiedracueva/playwright-juiceshop';

function resultClass(result) {
  if (result === 'success') return 'badge badge-passed';
  if (result === 'failure') return 'badge badge-failed';
  return 'badge badge-cancelled';
}

function resultLabel(result) {
  if (result === 'success') return 'Passed';
  if (result === 'failure') return 'Failed';
  return 'Cancelled';
}

function badgeClass(event) {
  if (event === 'pull_request') return 'badge badge-pr';
  if (event === 'workflow_dispatch') return 'badge badge-manual';
  return 'badge badge-push';
}

function badgeLabel(event) {
  if (event === 'pull_request') return 'PR';
  if (event === 'workflow_dispatch') return 'Manual';
  return 'Push';
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function render(manifest) {
  document.getElementById('loading-msg').style.display = 'none';

  if (!manifest || manifest.length === 0) {
    document.getElementById('empty-msg').style.display = 'block';
    return;
  }

  var tbody = document.getElementById('reports-body');

  manifest.forEach(function (r) {
    var tr = document.createElement('tr');
    var prInfo = r.prNumber ? ' <a href="' + GITHUB_URL + '/pull/' + r.prNumber + '">#' + r.prNumber + '</a>' : '';
    var dateStr = new Date(r.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    var author = escapeHtml(r.commitAuthor);
    var authorLink = r.actorLogin
      ? '<a href="https://github.com/' + encodeURIComponent(r.actorLogin) + '">' + author + '</a>'
      : author;

    var commitTooltip = r.commitMessage ? ' title="' + escapeHtml(r.commitMessage).replace(/"/g, '&quot;') + '"' : '';

    tr.innerHTML =
      '<td><a href="' +
      GITHUB_URL +
      '/actions/runs/' +
      r.runId +
      '">#' +
      r.runNumber +
      '</a></td>' +
      '<td><span class="' +
      resultClass(r.result) +
      '">' +
      resultLabel(r.result) +
      '</span></td>' +
      '<td>' +
      authorLink +
      '</td>' +
      '<td><code>' +
      r.branch +
      '</code></td>' +
      '<td><a href="' +
      GITHUB_URL +
      '/commit/' +
      r.sha +
      '"' +
      commitTooltip +
      '>' +
      r.shortSha +
      '</a>' +
      prInfo +
      '</td>' +
      '<td>' +
      dateStr +
      '</td>' +
      '<td><span class="' +
      badgeClass(r.event) +
      '">' +
      badgeLabel(r.event) +
      '</span></td>' +
      '<td><a class="btn btn-sm" href="reports/' +
      r.id +
      '/index.html">Open</a></td>';
    tbody.appendChild(tr);
  });
}

fetch('reports/manifest.json')
  .then(function (res) {
    return res.json();
  })
  .then(render)
  .catch(function () {
    render([]);
  });
