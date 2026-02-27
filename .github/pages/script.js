const GITHUB_URL = 'https://github.com/joaquinpiedracueva/playwright-juiceshop';

function openSelected() {
  const sel = document.getElementById('report-select');
  if (sel.value) window.location.href = 'reports/' + sel.value + '/index.html';
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

function render(manifest) {
  document.getElementById('loading-msg').style.display = 'none';

  if (!manifest || manifest.length === 0) {
    document.getElementById('empty-msg').style.display = 'block';
    return;
  }

  document.getElementById('selector-section').style.display = 'flex';

  const select = document.getElementById('report-select');
  const tbody = document.getElementById('reports-body');

  manifest.forEach(function (r, i) {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = '#' + r.runNumber + ' \u2014 ' + r.shortSha + ' (' + r.branch + ')';
    if (i === 0) opt.selected = true;
    select.appendChild(opt);

    const tr = document.createElement('tr');
    const prInfo = r.prNumber ? ' <a href="' + GITHUB_URL + '/pull/' + r.prNumber + '">#' + r.prNumber + '</a>' : '';
    const dateStr = new Date(r.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    tr.innerHTML =
      '<td><a href="reports/' +
      r.id +
      '/index.html">Run #' +
      r.runNumber +
      '</a></td>' +
      '<td><code>' +
      r.branch +
      '</code></td>' +
      '<td><a href="' +
      GITHUB_URL +
      '/commit/' +
      r.sha +
      '">' +
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
      '</span></td>';
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
