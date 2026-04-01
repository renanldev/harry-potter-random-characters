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

document.getElementById("personagem").innerHTML = `
<p>🎤 Diga "Revelio"...</p>
`;

function ativarVoz() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = "pt-BR";

  recognition.start();

  recognition.onresult = function(event) {
    let fala = event.results[0][0].transcript.toLowerCase();

    console.log("Você disse:", fala);

    if (fala.includes("revelio")) {
      console.log("✨ Revelio ativado!");
      getPersonagem();
    }
  };
}

let ultimoMovimento = 0;

window.addEventListener("devicemotion", function(event) {
  let acc = event.accelerationIncludingGravity;

  let movimento =
    Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);

  if (movimento > 30) {
    let agora = new Date().getTime();

    if (agora - ultimoMovimento > 2000) {
      ultimoMovimento = agora;

      console.log("Sacudiu! Agora diga 'REVELIO'!");
      ativarVoz();
    }
  }

  function ativarSensor() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          console.log("Voz ativada! Sacuda o dispositivo e diga 'REVELIO'!");
        }
      })
      .catch(console.error);
  }
}
});
