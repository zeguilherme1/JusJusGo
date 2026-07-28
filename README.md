# 🧑‍⚖️ JusJusGo

O JusJusGo é uma aplicação web que simula um buscador com autocomplete, inspirada na interface do DuckDuckGo.

## Tecnologias Utilizadas

O projeto foi dividido em duas partes (Frontend e Backend) e conteinerizado para facilitar a execução em qualquer ambiente.

**Frontend:**
- React.js
- TypeScript


**Backend:**
- Node.js
- TypeScript

**Infraestrutura:**
- Docker
---

## Testando o Autocomplete (Banco de Palavras)

Para testar o buscador e ver a funcionalidade de sugestões (autocomplete), você pode checar o arquivo `backend/sugestoes.json` para ver quais palavras estão disponíveis. 

---

## Baixando e executando o projeto


```
   git clone https://github.com/zeguilherme1/JusJusGo
   cd JusJusGo
   docker compose up --build
```

Você pode checar o Frontend em localhost:3000 e o Backend em localhost:4000
