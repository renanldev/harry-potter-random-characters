async function getPersonagem() {

  let response = await fetch(
    "https://hp-api.onrender.com/api/characters"
  );

  let data = await response.json();

  // filtra personagens com imagem
  let personagensComImagem = data.filter(p => p.image);

  // sorteia
  let randomIndex = Math.floor(Math.random() * personagensComImagem.length);
  let personagem = personagensComImagem[randomIndex];

  let divPersonagem = document.getElementById("personagem");

  divPersonagem.innerHTML = `
    <h3>${personagem.name}</h3>
    <img src="${personagem.image}" width="300">
    <p><strong>Casa:</strong> ${personagem.house}</p>
    <p><strong>Ator:</strong> ${personagem.actor}</p>
  `;
}