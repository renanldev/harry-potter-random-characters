let ultimoMovimento = 0;
let sensorAtivo = false;

// mensagem inicial
document.getElementById("personagem").innerHTML = `
<p>📱 Toque em REVELIO para ativar a magia</p>
`;

// função principal
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

// 🎤 voz
function ativarVoz() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Reconhecimento de voz não suportado nesse navegador 😢");
    return;
  }

  let recognition = new SpeechRecognition();

  recognition.lang = "pt-BR";

  document.getElementById("personagem").innerHTML = `
    <p>🎤 Diga "Revelio"...</p>
  `;

  recognition.start();

  recognition.onresult = function(event) {
    let fala = event.results[0][0].transcript.toLowerCase();

    console.log("Você disse:", fala);

    if (fala.includes("revelio")) {
      getPersonagem();
    } else {
      document.getElementById("personagem").innerHTML = `
        <p>❌ Tente novamente dizendo "Revelio"</p>
      `;
    }
  };
}

// 📱 sensor (SACUDIR)
window.addEventListener("devicemotion", function(event) {
  if (!sensorAtivo) return;

  let acc = event.accelerationIncludingGravity;

  let movimento =
    Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);

  if (movimento > 30) {
    let agora = new Date().getTime();

    if (agora - ultimoMovimento > 2000) {
      ultimoMovimento = agora;

      console.log("📱 Sacudiu!");
      ativarVoz();
    }
  }
});

// 🔓 ativar sensores (botão)
function ativarSensor() {

  // iPhone precisa disso
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          sensorAtivo = true;

          document.getElementById("personagem").innerHTML = `
            <p>✨ Sacuda o celular e diga "Revelio"</p>
          `;
        }
      })
      .catch(console.error);
  } else {
    // Android
    sensorAtivo = true;

    document.getElementById("personagem").innerHTML = `
      <p>✨ Sacuda o celular e diga "Revelio"</p>
    `;
  }
}
