# Cardápio Digital — Sesc Acre

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/license-private-lightgrey?style=for-the-badge)

Aplicação web do **cardápio da lanchonete** do Sesc Acre: catálogo público com preços diferenciados, painel de gestão de categorias/itens e modo TV para slideshow.

Os dados e a autenticação vêm da **API Central** (`clientId=cardapio`).

---

# Visão Geral

```text
Público          →  /        catálogo
Gestão           →  /painel  categorias e itens
TV               →  /tv      slideshow
Autenticação     →  /login   API Central
```

O cardápio público consome `/api/menu/public`. O painel e a TV exigem sessão e módulos liberados (`controle`, `tv`).

---

# Funcionalidades

## Catálogo público

- Listagem de categorias e itens ativos
- Preços **comerciário** e **público**
- Experiência pensada para consulta rápida no salão / mobile

## Painel de gestão

- CRUD de categorias
- CRUD de itens (visibilidade, preços, vínculo à categoria)
- Configurações relacionadas ao modo TV
- Acesso restrito a usuários com módulo de controle

## Modo TV

- Slideshow autenticado para monitores
- Conteúdo baseado nos itens/configurações do cardápio

---

# Arquitetura

```text
Server Component / Server Action
  → app/data/* (auth, menuItem, menuCategory, apiClient)
  → centralFetch
  → API Central (/api/menu/*, /api/auth/*)
```

- Sem banco local: toda persistência na API Central
- Cookie de sessão `sessionId` + header `X-Api-Key`
- UI própria com CSS Modules e identidade Sesc

---

# Tecnologias Utilizadas

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **CSS Modules**
- **ESLint**

---

# Instalação

Pré-requisito: **API Central** com seed de auth e menu.

```bash
cd cardapio
npm install
cp .env.example .env
```

Configure:

```env
API_CENTRAL_URL=http://localhost:3000
API_CENTRAL_KEY=           # key do app cardapio
CARDAPIO_CLIENT_ID=cardapio
```

Sugestão de porta local (seed usa redirect `:3001`):

```bash
npx next dev -p 3001
```

### Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | ESLint |

### Docker

```bash
docker build -t cardapio .
docker run -p 3000:3000 --env-file .env cardapio
```

---

# Roadmap

- Upload de imagens dos itens
- Token/display mode para TV sem login prolongado
- Cache / revalidate do catálogo público
- Melhorias de acessibilidade e desempenho mobile

---

# Objetivo do Projeto

Digitalizar o cardápio da lanchonete do Sesc Acre, permitindo:

- consulta pública clara de preços
- gestão centralizada de itens e categorias
- exibição contínua em monitores (TV)

---

# Autor

Desenvolvido para o **Sesc — Departamento Regional do Acre**.

---

# Licença

Uso interno do Sesc Acre.
