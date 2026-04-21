let tg = window.Telegram.WebApp;
tg.expand();

let user = tg.initDataUnsafe.user;

// 👤 Set PFP
const pfpEl = document.getElementById("pfp");
pfpEl.src = (user && user.photo_url)
  ? user.photo_url
  : "https://i.imgur.com/DefaultPfp.png";

// =====================
// 🔥 CHARACTER POPUP
// =====================
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

// ❌ Close character popup
document.getElementById("closePopup").onclick = () => {
  document.getElementById("popup").classList.add("hidden");
};

// =====================
// 👤 PROFILE POPUP
// =====================
async function openProfile() {
  try {
    // PFP + ID
    document.getElementById("profile-pfp").src =
      user.photo_url || "https://i.imgur.com/DefaultPfp.png";

    document.getElementById("profile-id").innerText =
      "ID: " + user.id;

    // 🔥 backend data
    let res = await fetch("https://your-backend.com/profile?user_id=" + user.id);
    let data = await res.json();

    let total = data.total || 0;
    let harem = data.harem || 0;
    let max = data.max || 100;
    let coins = data.coins || 0;

    let percent = max > 0 ? ((harem / max) * 100).toFixed(3) : 0;

    // progress bar
    let filled = Math.floor((harem / max) * 10);
    let bar = "▰".repeat(filled) + "▱".repeat(10 - filled);

    document.getElementById("profile-text").innerText =
`╒═══「 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 」
╰─➩ ᴜsᴇʀ: ${user.first_name}
╰─➩ ᴜsᴇʀ ɪᴅ: ${user.id}
╰─➩ 💰 ᴄᴏɪɴs: ${coins}
╰─➩ ᴛᴏᴛᴀʟ ᴡᴀɪғᴜ: ${total} (${total})
╰─➩ ʜᴀʀᴇᴍ: ${harem}/${max} (${percent}%)
╰─➩ ᴘʀᴏɢʀᴇss ʙᴀʀ: ${bar}
╰──────────────────`;

    document.getElementById("profilePopup").classList.remove("hidden");

  } catch (err) {
    console.log("Profile load error:", err);
  }
}

// ❌ Close profile popup
document.getElementById("closeProfile").onclick = () => {
  document.getElementById("profilePopup").classList.add("hidden");
};

// 👤 PFP click
pfpEl.onclick = () => {
  openProfile();
};

// =====================
// 📦 LOAD COLLECTION
// =====================
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

      div.onclick = () => openPopup(w);

      grid.appendChild(div);
    });

  } catch (err) {
    console.log("Error loading collection:", err);
  }
}

loadCollection();

// =====================
// 🔍 SEARCH SYSTEM
// =====================
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