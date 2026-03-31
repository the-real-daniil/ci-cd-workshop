# CI/CD Воркшоп — Todo List App

Учебный проект для воркшопа по CI/CD в GitHub Actions.

---

## Стек

- **React 18** + **TypeScript**
- **Vite** — сборка
- **Vitest** + **Testing Library** — тесты
- **ESLint** — линтинг

---

## Быстрый старт

### Требования

- Node.js 20+
- npm 9+

### Установка и запуск

```bash
# Клонировать репозиторий
git clone git@github.com:the-real-daniil/ci-cd-workshop.git
cd cicd-workshop

# Установить зависимости
npm install

# Запустить в dev-режиме
npm run dev
```

Приложение будет доступно на `http://localhost:5173`

### Команды


| Команда                 | Что делает                |
| ----------------------- | ------------------------- |
| `npm run dev`           | Запустить dev-сервер      |
| `npm run build`         | Собрать продакшн-сборку   |
| `npm run lint`          | Проверить код линтером    |
| `npm run type-check`    | Проверить типы TypeScript |
| `npm run test`          | Запустить тесты           |
| `npm run test:watch`    | Тесты в watch-режиме      |
| `npm run test:coverage` | Тесты с отчётом покрытия  |


---

## Структура проекта

```
src/
├── components/
│   ├── TodoItem.tsx          # Компонент одной задачи
│   ├── TodoItem.test.tsx     # Тесты компонента
│   ├── TodoList.tsx          # Список задач
│   ├── AddTodoForm.tsx       # Форма добавления
│   └── FilterButtons.tsx     # Кнопки фильтрации
├── utils/
│   ├── filterTodos.ts        # Логика фильтрации (основа для тестов)
│   └── filterTodos.test.ts   # Unit-тесты
├── types/
│   └── todo.ts               # TypeScript типы
└── App.tsx                   # Корневой компонент
```

---

## План воркшопа

### Часть 1: CI — Continuous Integration (~60 мин)

#### Итерация 1 — Hello Pipeline (15 мин)

**Файл:** `.github/workflows/ci-1-hello-pipeline.yml`

Цель: понять структуру workflow и запустить первый пайплайн.

Изучим:

- Структура `.yml` файла: `on` → `jobs` → `steps`
- Что такое runner и где он запускается
- `uses` vs `run` — готовые экшены vs bash-команды

**Задание:** сломать сборку намеренно → увидеть ❌ → починить.

---

#### Итерация 2 — Полный CI (20 мин)

**Файл:** `.github/workflows/ci-2-full-ci.yml`

Цель: добавить реальные проверки и защитить main ветку.

Изучим:

- Триггер на `pull_request` — проверки при каждом PR
- `npm ci` vs `npm install` — почему в CI всегда `npm ci`
- Принцип Fail Fast: порядок шагов имеет значение

**Задание:** создать PR с ошибкой линтера → убедиться что мерж заблокирован.

---

#### Итерация 3 — Оптимизация (20 мин)

**Файл:** `.github/workflows/ci-3-optimized.yml`

Цель: ускорить пайплайн и подготовить артефакт для деплоя.

Изучим:

- Параллельные jobs — lint и test запускаются одновременно
- `needs` — граф зависимостей между job'ами
- `upload-artifact` — сохраняем dist для CD пайплайна

**Задание:** сравнить время выполнения Итерации 2 и 3.

---

### Часть 2: CD — Continuous Delivery (~50 мин)

#### Итерация 1 — GitHub Pages (15 мин)

**Файл:** `.github/workflows/cd-1-github-pages.yml`

Цель: первый автодеплой без собственного сервера.

Изучим:

- `GITHUB_TOKEN` — встроенный секрет
- `permissions` — зачем нужны права на запись
- Как работает `peaceiris/actions-gh-pages`

**Задание:** задеплоить приложение → открыть по ссылке `username.github.io/repo`.

---

#### Итерация 2 — Деплой на VPS (20 мин)

**Файл:** `.github/workflows/cd-2-vps-deploy.yml`

Цель: реальный деплой на собственный сервер.

Подготовка:

1. Сгенерировать SSH-ключ: `ssh-keygen -t ed25519 -C "github-actions"`
2. Добавить публичный ключ на сервер
3. Добавить секреты в репозиторий:
  - `SSH_PRIVATE_KEY` — приватный ключ
  - `SERVER_HOST` — IP сервера
  - `SERVER_USER` — имя пользователя

Изучим:

- Как работают `secrets` — где хранятся и как используются
- `appleboy/ssh-action` — подключение и выполнение команд на сервере
- PM2 — зачем нужен process manager

**Задание:** настроить секреты → задеплоить → открыть на сервере.

---

#### Итерация 3 — Staging + Production (20 мин)

**Файл:** `.github/workflows/cd-3-staging-production.yml`

Цель: production-ready пайплайн с двумя окружениями.

Подготовка:

1. Создать окружение `staging` в Settings → Environments
2. Создать окружение `production` + добавить Required reviewers

Изучим:

- `if:` — условный запуск job'а по ветке
- `environment:` — изолированные секреты для каждого окружения
- Required reviewers — ручное подтверждение перед продакшном
- `download-artifact` — переиспользуем dist из CI job'а

**Итоговая архитектура:**

```
feature/* → PR → CI (lint + test + build)
                  ↓
develop   → push → CI + Deploy: STAGING (авто)
                  ↓
main      → push → CI + Deploy: PRODUCTION (с подтверждением)
```

**Задание:** пройти полный цикл: feature → develop (staging) → main (production с approve).

---

## Структура пайплайнов


| Файл                          | Итерация | Новые концепции                       |
| ----------------------------- | -------- | ------------------------------------- |
| `ci-1-hello-pipeline.yml`     | CI-1     | workflow, job, step, runner, uses/run |
| `ci-2-full-ci.yml`            | CI-2     | PR триггер, npm ci, Fail Fast         |
| `ci-3-optimized.yml`          | CI-3     | параллельные jobs, needs, artifact    |
| `cd-1-github-pages.yml`       | CD-1     | GITHUB_TOKEN, permissions             |
| `cd-2-vps-deploy.yml`         | CD-2     | secrets, SSH, process manager         |
| `cd-3-staging-production.yml` | CD-3     | if, environments, approval            |


---

## Полезные ссылки

- [GitHub Actions документация](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Vitest документация](https://vitest.dev/)
- [PM2 документация](https://pm2.keymetrics.io/)

