# The River Piracicaba

Site institucional do time de basquete The River, de Piracicaba. Projeto estático em **HTML, CSS e JavaScript**, preparado para publicação no GitHub Pages.

## Estrutura

```text
the_river/
├── index.html
├── quem-somos.html
├── categorias.html
├── conquistas.html
├── jogos.html
├── contato.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── jogos.json
└── img/
    ├── logo.png
    ├── favicon.png
    └── fotos das equipes
```

## Publicar no GitHub Pages

1. Extraia este ZIP.
2. Abra a pasta `the_river`.
3. Envie **o conteúdo dessa pasta** para a raiz do seu repositório GitHub (não envie apenas o ZIP).
4. No repositório, entre em **Settings → Pages**.
5. Em **Build and deployment**, selecione **Deploy from a branch**.
6. Escolha a branch `main` e a pasta `/ (root)`.
7. Clique em **Save** e aguarde a publicação.

A página inicial é `index.html`. Não é necessário configurar PHP, Node ou banco de dados.

> Para testar os jogos localmente, abra o site usando uma extensão de servidor local (por exemplo, Live Server no VS Code). O navegador pode bloquear `fetch()` de arquivos JSON quando o HTML é aberto diretamente como `file://`.

## Atualizar os jogos

Edite `data/jogos.json` e siga o formato dos registros existentes:

```json
{
  "id": "j7",
  "data": "2026-11-22T19:30",
  "categoria": "Sub21",
  "competicao": "Nome da competição",
  "adversario": "Nome do adversário",
  "river": 0,
  "adv": 0,
  "local": "Local da partida"
}
```

- Para uma partida já realizada, informe os pontos em `river` e `adv`.
- Para uma partida sem placar, use `""` nos dois campos.
- Para data ainda não confirmada, use `""` em `data`.
- Mantenha vírgulas entre os objetos e aspas duplas, pois o arquivo precisa ser JSON válido.

O GitHub Pages não executa PHP e não possui painel administrativo. As alterações são publicadas quando você envia o arquivo atualizado ao repositório.

## Páginas

- `index.html` — início e últimos resultados
- `quem-somos.html` — história do time
- `categorias.html` — equipes
- `conquistas.html` — medalhas e competições
- `jogos.html` — partidas e filtros
- `contato.html` — canais de contato

## Observações

- O projeto usa fontes do Google Fonts; sem internet, serão usadas fontes alternativas locais.
- Os jogos são carregados pelo arquivo `data/jogos.json`.
- Não há dependência de PHP nem de backend.
