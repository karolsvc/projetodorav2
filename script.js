document.addEventListener("DOMContentLoaded", () => {

  /* Menu mobile */
  const menuBotao = document.getElementById("menuBotao");
  const menuLista = document.getElementById("menuLista");

  if (menuBotao && menuLista) {
    menuBotao.addEventListener("click", () => {
      const aberto = menuLista.classList.toggle("aberto");
      menuBotao.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    menuLista.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuLista.classList.remove("aberto");
        menuBotao.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Galeria: setas controlam a rolagem horizontal do trilho */
  const trilho = document.getElementById("galeriaTrilho");
  const botaoAnterior = document.getElementById("galeriaAnterior");
  const botaoProxima = document.getElementById("galeriaProxima");

  function distanciaDeRolagem() {
    const figura = trilho.querySelector("figure");
    if (!figura) return 300;
    const estilo = getComputedStyle(trilho);
    const espaco = parseFloat(estilo.gap || "0");
    return figura.getBoundingClientRect().width + espaco;
  }

  if (trilho && botaoAnterior && botaoProxima) {
    botaoAnterior.addEventListener("click", () => {
      trilho.scrollBy({ left: -distanciaDeRolagem(), behavior: "smooth" });
    });
    botaoProxima.addEventListener("click", () => {
      trilho.scrollBy({ left: distanciaDeRolagem(), behavior: "smooth" });
    });
  }

  /* Revelar seções suavemente ao rolar a página */
  const elementosParaRevelar = document.querySelectorAll(
    ".sobre, .galeria, .inscricao"
  );

  elementosParaRevelar.forEach((el) => el.classList.add("surgir"));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementosParaRevelar.forEach((el) => observador.observe(el));

  /* Botão "Fazer inscrição": placeholder até existir um formulário real */
  const botaoInscricao = document.getElementById("botaoInscricao");
  if (botaoInscricao) {
    botaoInscricao.addEventListener("click", (evento) => {
      evento.preventDefault();
      alert(
        "Em breve este botão levará ao formulário de inscrição. Por enquanto, escolha um dos centros abaixo para saber como se inscrever."
      );
      document.getElementById("endereco").scrollIntoView({ behavior: "smooth" });
    });
  }

});