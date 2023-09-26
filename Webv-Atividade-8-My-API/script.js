const detalhesLancamento = document.getElementById("detalhesLancamento");
const btnAnterior = document.getElementById("btnAnterior");
const btnProxima = document.getElementById("btnProxima");

let currentMissionIndex = 0;
let missions = [];

const fetchMissions = () => {
  fetch("https://api.spacexdata.com/v5/launches")
    .then((response) => response.json())
    .then((data) => {
      missions = data;
      displayMission(currentMissionIndex);
    })
    .catch((error) => {
      console.error("Erro ao buscar missões:", error);
      detalhesLancamento.innerHTML = "<p>Erro ao buscar missões.</p>";
    });
};

const displayMission = (index) => {
  const mission = missions[index];
  if (mission) {
    const {
      name,
      date_utc,
      details,
      links: { patch, presskit, webcast, wikipedia },
    } = mission;

    const missionHTML = `
      <h2>${name}</h2>
      <p>Data de Lançamento: ${date_utc}</p>
      <p>Detalhes: ${details}</p>
      <img src="${patch.large}" alt="Patch do Lançamento">
     
    `;

    detalhesLancamento.innerHTML = missionHTML;
  }
};

btnAnterior.addEventListener("click", () => {
  if (currentMissionIndex > 0) {
    currentMissionIndex--;
    displayMission(currentMissionIndex);
  }
});

btnProxima.addEventListener("click", () => {
  if (currentMissionIndex < missions.length - 1) {
    currentMissionIndex++;
    displayMission(currentMissionIndex);
  }
});

// Chame a função fetchMissions quando a página carregar
fetchMissions();
