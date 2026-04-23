const username = "s4d0x-dev";

const featuredRepos = [
  "tabaar_numa",
  "ganjena",
  "SafeBox",
  "LOCKit_Decryptor"
];


function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  menu.classList.toggle("active");
  overlay.classList.toggle("active");
}

function openGitHub() {
  window.open(`https://github.com/${username}`, "_blank");
}

function icon(lang) {
  const map = {
    JavaScript: "🟨",
    Python: "🐍",
    HTML: "🌐",
    CSS: "🎨",
    PHP: "🐘"
  };
  return map[lang] || "📦";
}

function repoIcon() {
  return "📁"; // main repo icon
}

async function loadRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  let repos = await res.json();

  const featured = repos.filter(r => featuredRepos.includes(r.name));
  const others = repos.filter(r => !featuredRepos.includes(r.name));

  render(featured, "featured-list", true);
  render(others, "projects-list", false);
}

function render(list, containerId, isFeatured) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  list.forEach(repo => {

    const a = document.createElement("a");
    a.href = repo.html_url;
    a.target = "_blank";
    a.className = "card-link";

    a.innerHTML = `
      <div class="card ${isFeatured ? "featured-card" : ""}">
        <h3>
          ${repoIcon()} ${isFeatured ? "⭐ " : ""}${repo.name}
        </h3>

        <p>${icon(repo.language)} ${repo.language || "Unknown"}</p>

        <p>${repo.description || ""}</p>
      </div>
    `;

    container.appendChild(a);
  });
}

loadRepos();