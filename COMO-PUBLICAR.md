# Caderno da Roça: como colocar o app no ar

O app é um site que o celular instala e que abre sem internet. Para os produtores
usarem, ele precisa estar hospedado num endereço na internet (https). O jeito
gratuito mais simples é o **GitHub Pages**.

## Arquivos desta pasta

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app inteiro (telas, cálculos, guias) |
| `manifest.json` | Nome, cores e ícone para o celular instalar |
| `sw.js` | Guarda o app no celular para abrir sem internet |
| `icons/` | Ícones do app |

Envie **todos** os arquivos, mantendo a pasta `icons`.

## Publicar no GitHub Pages (uns 10 minutos)

1. Crie uma conta grátis em **github.com**.
2. Clique em **New repository**. Nome sugerido: `caderno-da-roca`. Marque **Public** e clique em **Create repository**.
3. Na página do repositório, clique em **uploading an existing file**.
4. Arraste para a página os arquivos `index.html`, `manifest.json`, `sw.js` e a pasta `icons`. Clique em **Commit changes**.
5. Vá em **Settings → Pages**. Em *Branch*, escolha **main** e a pasta **/(root)**. Clique em **Save**.
6. Espere 1 ou 2 minutos. O endereço do app aparece no topo da página, parecido com:
   `https://SEU-USUARIO.github.io/caderno-da-roca/`

Esse é o link para divulgar (WhatsApp, Instagram, grupos de produtores).

## Como o produtor instala

- **Android (Chrome):** abrir o link → três pontinhos ⋮ → **Instalar app** (ou *Adicionar à tela inicial*).
- **iPhone (Safari):** abrir o link → botão Compartilhar → **Adicionar à Tela de Início**.

Depois de aberto uma vez com internet, o app funciona sem sinal.

## Coisas importantes

- **Os dados ficam no celular de cada produtor.** Ninguém mais vê, nem você. Por isso, oriente a usar
  **Mais → Salvar cópia** de vez em quando e mandar o arquivo para o próprio WhatsApp.
  Para recuperar num celular novo: **Restaurar cópia**.
- **Para atualizar o app:** troque os arquivos no GitHub e, no `sw.js`, mude
  `caderno-da-roca-v1` para `caderno-da-roca-v2` (e assim por diante). Sem essa troca, os
  celulares continuam com a versão antiga guardada.
- **Testar no computador:** abrir o `index.html` direto com dois cliques funciona para ver as telas,
  mas o modo sem internet e o botão de instalar só funcionam depois de publicado.

## Próximo passo: Play Store (opcional)

Com o app publicado no GitHub Pages, entre em **pwabuilder.com**, cole o link e gere o
pacote para Android. Para publicar na Play Store é preciso uma conta de desenvolvedor do
Google (taxa única) e passar pela revisão da loja.
