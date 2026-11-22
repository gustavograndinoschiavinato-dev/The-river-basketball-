"use strict";

/* =========================================================
   THE RIVER — interações do site
   Menu responsivo e exibição dos jogos via arquivo JSON.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  configurarMenu();
  carregarJogos();
});

/**
 * Abre e fecha o menu em telas menores.
 */
function configurarMenu() {
  const botao = document.querySelector(".hamb");
  const navegacao = document.getElementById("nav");

  if (!botao || !navegacao) return;

  botao.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  navegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navegacao.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    });
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && navegacao.classList.contains("aberto")) {
      navegacao.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
      botao.focus();
    }
  });
}

/**
 * Busca os jogos cadastrados em data/jogos.json.
 * O caminho relativo permite publicar o projeto em um repositório
 * de usuário ou em um repositório de projeto no GitHub Pages.
 */
async function carregarJogos() {
  const listaJogos = document.getElementById("lista-jogos");
  const ultimosJogos = document.getElementById("ultimos-jogos");

  if (!listaJogos && !ultimosJogos) return;

  try {
    const resposta = await fetch("./data/jogos.json", { cache: "no-store" });

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar jogos: ${resposta.status}`);
    }

    const jogos = await resposta.json();

    if (!Array.isArray(jogos)) {
      throw new Error("O arquivo de jogos precisa conter uma lista.");
    }

    jogos.sort((a, b) => (b.data || "").localeCompare(a.data || ""));

    configurarFiltros(jogos, listaJogos);
    renderizarUltimosResultados(jogos, ultimosJogos);
  } catch (erro) {
    console.error(erro);

    const mensagem = `
      <p class="vazio">
        Não foi possível carregar os jogos. Tente novamente mais tarde.
      </p>
    `;

    if (listaJogos) listaJogos.innerHTML = mensagem;
    if (ultimosJogos) ultimosJogos.innerHTML = mensagem;
  }
}

/**
 * Evita que textos do JSON sejam interpretados como HTML.
 */
function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (caractere) => {
    const entidades = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entidades[caractere];
  });
}

/**
 * Formata datas sem deslocamento de fuso horário.
 */
function formatarData(valor) {
  if (!valor) return "Data a confirmar";

  const [data, horario] = valor.split("T");
  const partes = data.split("-");

  if (partes.length !== 3) return "Data a confirmar";

  const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

  if (!horario) return dataFormatada;

  return `${dataFormatada} às ${horario.slice(0, 5)}`;
}

/**
 * Cria o cartão visual de uma partida.
 */
function criarCartaoJogo(jogo) {
  const temPlacar =
    jogo.river !== "" &&
    jogo.adv !== "" &&
    jogo.river !== null &&
    jogo.adv !== null &&
    jogo.river !== undefined &&
    jogo.adv !== undefined;

  let resultado = "aberto";
  let rotulo = "Placar a informar";

  if (temPlacar) {
    const pontosRiver = Number(jogo.river);
    const pontosAdversario = Number(jogo.adv);

    if (pontosRiver > pontosAdversario) {
      resultado = "vitoria";
      rotulo = "Vitória";
    } else if (pontosRiver < pontosAdversario) {
      resultado = "derrota";
      rotulo = "Derrota";
    } else {
      resultado = "empate";
      rotulo = "Empate";
    }
  }

  const pontosRiver = temPlacar ? Number(jogo.river) : "–";
  const pontosAdversario = temPlacar ? Number(jogo.adv) : "–";

  return `
    <article class="jogo ${resultado}">
      <div class="jogo-info">
        <strong>${escaparHTML(jogo.categoria || "Categoria")}</strong>
        <span>${escaparHTML(jogo.competicao || "Competição")}</span>
        <span>${formatarData(jogo.data)}</span>
      </div>

      <div class="jogo-placar" aria-label="Placar da partida">
        <span class="time">The River</span>
        <span class="num">${pontosRiver}</span>
        <span class="x">x</span>
        <span class="num">${pontosAdversario}</span>
        <span class="time">${escaparHTML(jogo.adversario || "Adversário")}</span>
      </div>

      <div class="jogo-fim">
        <span class="selo">${rotulo}</span>
        ${jogo.local ? `<span class="local">${escaparHTML(jogo.local)}</span>` : ""}
      </div>
    </article>
  `;
}

/**
 * Configura os filtros da página de jogos.
 */
function configurarFiltros(jogos, elementoLista) {
  const filtros = document.getElementById("filtros-jogos");

  if (!elementoLista) return;

  let categoriaSelecionada = "";

  function renderizar() {
    const filtrados = jogos.filter((jogo) => {
      return !categoriaSelecionada || jogo.categoria === categoriaSelecionada;
    });

    elementoLista.innerHTML = filtrados.length
      ? filtrados.map(criarCartaoJogo).join("")
      : '<p class="vazio">Nenhum jogo cadastrado nesta categoria por enquanto.</p>';
  }

  if (filtros) {
    filtros.addEventListener("click", (evento) => {
      const link = evento.target.closest("a[data-cat]");
      if (!link) return;

      evento.preventDefault();
      categoriaSelecionada = link.dataset.cat || "";

      filtros.querySelectorAll("a[data-cat]").forEach((item) => {
        const selecionado = item === link;
        item.classList.toggle("ativo", selecionado);

        if (selecionado) {
          item.setAttribute("aria-current", "true");
        } else {
          item.removeAttribute("aria-current");
        }
      });

      renderizar();
    });
  }

  renderizar();
}

/**
 * Mostra até três resultados com placar na página inicial.
 */
function renderizarUltimosResultados(jogos, elemento) {
  if (!elemento) return;

  const resultados = jogos
    .filter((jogo) => {
      return (
        jogo.river !== "" &&
        jogo.adv !== "" &&
        jogo.river !== null &&
        jogo.adv !== null &&
        jogo.river !== undefined &&
        jogo.adv !== undefined
      );
    })
    .slice(0, 3);

  elemento.innerHTML = resultados.length
    ? resultados.map(criarCartaoJogo).join("")
    : '<p class="vazio">Nenhum resultado cadastrado.</p>';
}
