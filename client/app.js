let tg = window.Telegram.WebApp;
tg.expand();

let user = tg.initDataUnsafe.user;

// 👤 Set PFP
if (user && user.photo_url) {
  document.getElementById("pfp").src = user.photo_url;
} else {
  document.getElementById("pfp").src =
    "https://i.imgur.com/DefaultPfp.png";
}

// 📦 Load collection from backend
async function loadCollection() {
  let res = await fetch("https://your-backend.com/collection?user_id=" + user.id);
  let data = await res.json();

  let grid = document.getElementById("grid");
  grid.innerHTML = "";

  data.forEach(w => {
    let div = document.createElement("div");
    div.className = "card";
    div.style.backgroundImage = `url(${w.image})`;

    div.onclick = () => {
      alert(w.name);
    };

    grid.appendChild(div);
  });
}

loadCollection();

// 🔍 Search
document.getElementById("search").addEventListener("input", async (e) => {
  let q = e.target.value;

  let res = await fetch(`https://your-backend.com/search?q=${q}`);
  let data = await res.json();

  let grid = document.getElementById("grid");
  grid.innerHTML = "";

  data.forEach(w => {
    let div = document.createElement("div");
    div.className = "card";
    div.style.backgroundImage = `url(${w.image})`;
    grid.appendChild(div);
  });
});