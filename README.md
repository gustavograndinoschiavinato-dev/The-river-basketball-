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

A página inicial é `index.html`. Não é necessário configurar PHP, Node ou banco de dados.

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

## Páginas

- `index.html` — início e últimos resultados
- `quem-somos.html` — história do time
- `categorias.html` — equipes
- `conquistas.html` — medalhas e competições
- `jogos.html` — partidas e filtros
- `contato.html` — canais de contato

## Observações

- Os jogos são carregados pelo arquivo `data/jogos.json`.

## Alunos
Alyson Victor; Gustavo Grandino; Murilo Matana; Rafael Passos; Vinicius Mendes
