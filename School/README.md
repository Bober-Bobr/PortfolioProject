# Школа №51 - Официальный сайт

Официальный сайт школы №51, разработанный с использованием TypeScript и Tailwind CSS.

## Технологии

- TypeScript
- Tailwind CSS
- HTML5
- CSS3

## Установка

1. Клонируйте репозиторий:
```bash
git clone [url-репозитория]
cd school-n51
```

2. Установите зависимости:
```bash
npm install
```

## Разработка

Для запуска проекта в режиме разработки выполните:

```bash
# Запуск TypeScript компилятора в режиме наблюдения
npm run dev

# Запуск Tailwind CSS в режиме наблюдения
npm run watch
```

## Сборка

Для сборки проекта выполните:

```bash
npm run build
```

Это создаст оптимизированные файлы в директории `dist/`.

## Структура проекта

```
school-n51/
├── src/
│   ├── css/
│   │   └── input.css
│   ├── ts/
│   │   └── main.ts
│   ├── index.html
│   ├── about.html
│   ├── news.html
│   └── contacts.html
├── dist/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Лицензия

MIT 