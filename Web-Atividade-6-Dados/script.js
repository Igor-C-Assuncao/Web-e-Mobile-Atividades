const dado1 = document.querySelector("#dado1");
const dado2 = document.querySelector("#dado2");
const jogar = document.querySelector("#jogar");

jogar.addEventListener("click", () => {

  const valor1 = Math.floor(Math.random() * 6) + 1;
  const valor2 = Math.floor(Math.random() * 6) + 1;
  

  dado1.src = `img/Dados-${valor1}.png`;
  dado2.src = `img/Dados-${valor2}.png`;
  var sum = valor1 + valor2;

  if (sum === 7 || sum === 11) {
    
    alert(`Voce obteve${sum}. Voce ganhou!`);
    
  } else if (sum === 2 || sum === 3 || sum === 12) {
    
    alert(`voce obteve ${sum}. Você perdeu!`);
 
  }
});
