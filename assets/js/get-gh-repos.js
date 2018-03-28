var GH_API_URI = "https://api.github.com";
var REPOS_PER_ROW = 3;
var repos = [ ];
var nonOrg_repo_sources = [
  {
    "user": "gringoireDM",
    "repo": "LNZCollectionLayouts"
  }
];

$(document).ready(function() {
  loadRepos(1);
});

function loadRepos(page) {
  $.getJSON(GH_API_URI + "/orgs/gilt/repos?per_page=100&page=" + page,
    function(result) {
      if (result && result.length > 0) {
        repos = repos.concat(result);
        loadRepos(page + 1);
      }
      else if(nonOrg_repo_sources[0]) {
        loadNonGiltRepos();
      } else {
        addRepos(repos);
      }
    }).fail(function(xhr,textStatus,error) {
      $("#loading").addClass("networkError").text("An error occurred while communicating with GitHub.");
      if (xhr.responseJSON && xhr.responseJSON["message"]) {
        $("<div>").text("(" + xhr.responseJSON["message"] + ")").appendTo($("#loading"));
      }
      $("#fallback").removeClass("hidden");
      //getResponseHeader("X-RateLimit-Remaining"
      //getResponseHeader("X-RateLimit-Limit")
    });
}

// add open source repos from other sources to the repos array
function loadNonGiltRepos() {
  var repoCount = 0;
  nonOrg_repo_sources.forEach((element,index) => {
    $.getJSON(GH_API_URI + '/repos/' + nonOrg_repo_sources[index].user + '/' +  nonOrg_repo_sources[index].repo,
    (result) => {
        repos = repos.concat(result);
          repoCount++;
          if (repoCount === nonOrg_repo_sources.length) {
            addRepos(repos);
          }
    }).fail((xhr,textStatus,error) => {
      $("#loading").addClass("networkError").text("An error occurred while communicating with GitHub.");
      if (xhr.responseJSON && xhr.responseJSON["message"]) {
        $("<div>").text("(" + xhr.responseJSON["message"] + ")").appendTo($("#loading"));
      }
      $("#fallback").removeClass("hidden");
    });
  });
}

function addRepos(repos) {
  var starWeight = 9; // repo watchers
  var forkWeight = 3; // forks of the repo
  var giltWeight = 1000000;  // if the gilt repo is actually a fork

  repos = repos.filter(starFilter);

  // Sort weight priority: gilt repo, starred, watched, activity
  $.each(repos, function(i,repo) { // assign weights
    var weight =
      (repo.stargazers_count * starWeight) +
      (repo.forks_count * forkWeight) +
      (!repo.fork * giltWeight);
    repo["gilt_weight"] = weight;
  });
  // console.log(repos);

  repos = repos.sort(function(a,b) {
    var aw = a["gilt_weight"];
    var bw = b["gilt_weight"];
    if (aw == bw) {
      return 0;
    } else if (aw < bw) {
      return 1;
    }
    else {
      return -1;
    }
  });

  $("#loading").addClass("hidden");

  $.each(repos, function(i,repo) {
    addRepo(i, repo);
  });

  // show repo stats
  var stats = $("#repo-stats").text("Providing ");
  $("<a>").attr("href", "https://github.com/gilt").text(repos.length + " public repositories").appendTo(stats);
  stats.removeClass("hidden");
}

function starFilter(repo) {
  return repo.stargazers_count >= 5;
}

function addRepo(i, repo) {
  var row = $("#all-repos").children().last();
  row = $("<div>").addClass("repo-row");
  row.appendTo("#all-repos");

  var r = $("<div>").addClass("repo");
  var a = $("<a>").attr("href", repo.html_url).appendTo(r);

  $("<i>").addClass("icon-star repo-icon").appendTo(a);
  $("<span>").addClass("count").text(repo.watchers_count).appendTo(a);

  $("<i>").addClass("icon-code-fork repo-icon").appendTo(a);
  $("<span>").addClass("count").text(repo.forks_count).appendTo(a);

  if (repo.private) {
    $("<i>").addClass("icon-lock").appendTo(a);
  }

  var lang = repo.language;
  if (lang) {
    $("<span>").addClass("lang " + lang.toLowerCase()).text(lang).appendTo(a);
  }

  $("<h4>").addClass("name").text(repo.name).appendTo(a);
  $("<p>").addClass("description").text(repo.description).appendTo(a);

  r.appendTo(row);
}
