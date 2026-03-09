# 📱 App Vida em M — PRD

**Produto:** Vida em M — Cognitive Learning Engine
**Missão:** Consolidação do conhecimento guiado pelas verdades do evangelho da graça de Jesus Cristo.

---

## Problema

Pessoas estudam muito mas retêm pouco. Falta sistema que una repetição espaçada + active recall + métricas + fé cristocêntrica.

## Solução

Plataforma SaaS de superaprendizagem bíblica com:
- Flashcards organizados
- Algoritmo SM-2
- Gamificação
- Gerador de sermões e estudos
- Motor cristocêntrico

---

## MVP — Funcionalidades

- [ ] Autenticação
- [ ] Biblioteca de conteúdo (categorias)
- [ ] Flashcards
- [ ] Sessão de estudo (active recall)
- [ ] Algoritmo SM-2
- [ ] Dashboard (XP + streak + retenção)
- [ ] Missões semanais

---

## Algoritmo SM-2

```python
def calcular_proximo_revisao(dificuldade, intervalo, fator_facilidade):
    if dificuldade < 3:
        return 1  # reiniciar
    fator_facilidade += 0.1 - (5 - dificuldade) * 0.08
    fator_facilidade = max(1.3, fator_facilidade)
    return round(intervalo * fator_facilidade)
```

| Avaliação | XP | Próxima revisão |
|-----------|-----|----------------|
| Fácil (5) | +10 | intervalo × fator |
| Médio (3) | +5 | intervalo × 1.3 |
| Difícil (1) | +2 | reinicia em 1 dia |

---

## Stack Técnica

**Frontend:** React 19 · TypeScript · Zustand · Tailwind
**Backend:** Node.js · NestJS · Prisma · PostgreSQL · Redis
**Infra:** Docker · GitHub Actions · Vercel + Railway

---

## Gamificação

| XP | Nível |
|----|-------|
| 0–500 | Discípulo |
| 500–1500 | Estudante |
| 1500–5000 | Obreiro |
| 5000+ | Mestre |

**Missões exemplo:**
- Revisar 50 cards esta semana
- 7 dias consecutivos de estudo
- Memorizar 5 versículos

---

## Roadmap

| Sprint | Entregável |
|--------|-----------|
| 1 | Auth + CRUD conteúdo |
| 2 | Flashcards + sessão de estudo |
| 3 | Algoritmo SRS + dashboard |
| 4 | XP + missões + métricas |
| 5+ | Gerador de sermões + grafo do evangelho |

---

## KPIs

| Métrica | Meta |
|---------|------|
| Retenção média | > 75% |
| Sessões semanais | ≥ 4 |
| Tempo médio/sessão | ≥ 12 min |
| Retenção mês 1 | ≥ 70% |

---

## Módulos do Sistema

```
Motor do Evangelho (Grafo)
        ↓
Gerador de Sermões
        ↓
Gerador de Estudos
        ↓
Treinador de Memorização (SM-2)
        ↓
Chat Teológico
        ↓
Biblioteca + Dashboard
```
