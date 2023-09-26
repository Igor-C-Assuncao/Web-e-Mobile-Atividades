const listaPessoas = document.getElementById("listaPessoas");
const btAnterior = document.getElementById("btAnterior");
const btProxima = document.getElementById("btProxima");

const exibirLista = (lista) => {
  listaPessoas.innerHTML = "";
  for (let i = 0; i < lista.length; ++i) {
    const li = document.createElement("li");
    const text = document.createTextNode(
      `${lista[i].name} (${lista[i].birth_year}) (${lista[i].height} cm)`
    );
    li.appendChild(text);
    listaPessoas.appendChild(li);
  }
};

const ordenarPorNome = () => {
  const lista = Array.from(listaPessoas.children);
  lista.sort((a, b) => {
    const nomeA = a.textContent.split("(")[0].trim();
    const nomeB = b.textContent.split("(")[0].trim();
    return nomeA.localeCompare(nomeB);
  });
  listaPessoas.innerHTML = "";
  lista.forEach((item) => listaPessoas.appendChild(item));
};

// Função para ordenar a lista por data de nascimento
const ordenarPorDataNascimento = () => {
  const lista = Array.from(listaPessoas.children);
  lista.sort((a, b) => {
    const dataNascimentoA = a.textContent.split("(")[1].trim();
    const dataNascimentoB = b.textContent.split("(")[1].trim();
    return dataNascimentoA.localeCompare(dataNascimentoB);
  });
  listaPessoas.innerHTML = "";
  lista.forEach((item) => listaPessoas.appendChild(item));
};

// Função para ordenar a lista por altura
const ordenarPorAltura = () => {
  const lista = Array.from(listaPessoas.children);
  lista.sort((a, b) => {
    const alturaA = parseInt(a.textContent.split("(")[2], 10);
    const alturaB = parseInt(b.textContent.split("(")[2], 10);
    return alturaB - alturaA;
  });
  listaPessoas.innerHTML = "";
  lista.forEach((item) => listaPessoas.appendChild(item));
};

// Adicionar ouvintes de eventos aos botões de ordenação
document.getElementById("btnOrdenarPorNome").addEventListener("click", ordenarPorNome);
document.getElementById("btnOrdenarPorDataNascimento").addEventListener("click", ordenarPorDataNascimento);
document.getElementById("btnOrdenarPorAltura").addEventListener("click", ordenarPorAltura);

const configurarBotoes = (data) => {
  const { previous, next } = data;

  btAnterior.disabled = previous === null;
  btAnterior.onclick = () => {
    fetchAPI(previous);
    btAnterior.disabled = true;
  };

  btProxima.disabled = next === null;
  btProxima.onclick = () => {
    fetchAPI(next);
    btProxima.disabled = true;
  };
};

const fetchAPI = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      exibirLista(data.results);
      configurarBotoes(data);
    });
};

fetchAPI("https://swapi.dev/api/people/?page=1");
