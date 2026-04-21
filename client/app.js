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

// 🔥 POPUP FUNCTION
function openPopup(w) {
  document.getElementById("popup-img").src = w.image;

  document.getElementById("popup-text").innerText =
`╭─〔🔥 CHARACTER INFO 🔥〕─╮
│ 🌀 ID: ${w.id}
│ 🦊 Name: ${w.name}
│ 🎴 Anime: ${w.anime}
│ 🔱 Rarity: ${w.rarity}
╰───────────────╯`;

  document.getElementById("popup").classList.remove("hidden");
}

// ❌ Close popup
document.getElementById("closePopup").onclick = () => {
  document.getElementById("popup").classList.add("hidden");
};

// 📦 Load collection
async function loadCollection() {
  try {
    let res = await fetch("https://your-backend.com/collection?user_id=" + user.id);
    let data = await res.json();

    let grid = document.getElementById("grid");
    grid.innerHTML = "";

    data.forEach(w => {
      let div = document.createElement("div");
      div.className = "card";
      div.style.backgroundImage = `url(${w.image})`;

      // 🔥 click → popup
      div.onclick = () => openPopup(w);

      grid.appendChild(div);
    });

  } catch (err) {
    console.log("Error loading collection:", err);
  }
}

loadCollection();

// 🔍 Search system
document.getElementById("search").addEventListener("input", async (e) => {
  let q = e.target.value;

  if (q.length === 0) {
    loadCollection();
    return;
  }

  try {
    let res = await fetch(`https://your-backend.com/search?q=${q}`);
    let data = await res.json();

    let grid = document.getElementById("grid");
    grid.innerHTML = "";

    data.forEach(w => {
      let div = document.createElement("div");
      div.className = "card";
      div.style.backgroundImage = `url(${w.image})`;

      div.onclick = () => openPopup(w);

      grid.appendChild(div);
    });

  } catch (err) {
    console.log("Search error:", err);
  }
});