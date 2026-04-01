function tocarSom() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.4);
}

async function getPersonagem() {
  let response = await fetch(
    "https://hp-api.onrender.com/api/characters"
  );

  let data = await response.json();

  let personagensComImagem = data.filter(p => p.image);

  let randomIndex = Math.floor(Math.random() * personagensComImagem.length);
  let personagem = personagensComImagem[randomIndex];

  let divPersonagem = document.getElementById("personagem");

  divPersonagem.innerHTML = `
    <h3>${personagem.name}</h3>
    <img src="${personagem.image}">
    <p><strong>Casa:</strong> ${personagem.house || "Desconhecida"}</p>
    <p><strong>Ator:</strong> ${personagem.actor}</p>
  `;
}
