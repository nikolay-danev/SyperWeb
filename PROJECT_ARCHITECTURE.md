# Архитектура на Проекти - SyperWeb

## 📋 Обща Информация

Този документ описва стандартизираната архитектура, правила и процес на работа за всички проекти, които SyperWeb разработва. Целта е да осигурим консистентност, качество и лесна поддръжка на всички наши проекти.

---

## 🏗️ Структура на Проект

### Основна Директорна Структура

```
project-name/
│
├── index.html              # Главна HTML страница
├── README.md               # Документация на проекта
├── PROJECT_ARCHITECTURE.md # Този документ (копие)
│
├── assets/                 # Статични ресурси
│   ├── images/            # Изображения
│   │   ├── logo.svg
│   │   ├── hero/
│   │   ├── icons/
│   │   └── backgrounds/
│   │
│   ├── fonts/             # Шрифтове (ако има локални)
│   └── videos/            # Видео файлове
│
├── css/                   # Стилове
│   ├── main.css          # Основни стилове
│   ├── variables.css     # CSS променливи (цветове, размери)
│   ├── components/       # Стилове за компоненти
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── buttons.css
│   │   └── cards.css
│   └── responsive.css    # Media queries
│
├── js/                   # JavaScript файлове
│   ├── main.js          # Главна логика
│   ├── components/      # JS за компоненти
│   │   ├── navigation.js
│   │   ├── forms.js
│   │   └── animations.js
│   └── utils/           # Помощни функции
│       ├── validation.js
│       └── helpers.js
│
└── docs/                # Допълнителна документация
    ├── design-system.md
    └── deployment.md
```

---

## 📐 Правила за Разработка

### 1. HTML Правила

- **Семантичен HTML**: Използвай `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Достъпност (Accessibility)**:
  - Всички изображения трябва да имат `alt` атрибут
  - Използвай ARIA атрибути където е необходимо
  - Осигури keyboard navigation
- **SEO оптимизация**:
  - Meta tags за description, keywords, og:tags
  - Правилна структура на заглавия (H1 → H6)
  - Structured data където е приложимо
- **Валидация**: Кодът трябва да преминава W3C валидация

### 2. CSS Правила

- **Организация**:
  - Използвай CSS променливи за цветове, размери, шрифтове
  - Следвай Mobile-First подход
  - Групирай свързани стилове заедно
  
- **Naming Convention**: BEM (Block Element Modifier)
  ```css
  .block {}
  .block__element {}
  .block--modifier {}
  ```

- **Responsive Design**:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
  
- **Performance**:
  - Минимизирай вложени селектори (max 3 нива)
  - Избягвай !important (освен крайна необходимост)
  - Оптимизирай анимации (използвай transform и opacity)

### 3. JavaScript Правила

- **Код Стандарти**:
  - Използвай модерен ES6+ синтаксис
  - Константи с UPPER_CASE, променливи с camelCase
  - Функции - ясни, описателни имена
  
- **Организация**:
  - Разделяй кода на модули/компоненти
  - Избягвай глобални променливи
  - Използвай event delegation където е възможно

- **Performance**:
  - Debounce и throttle за scroll/resize events
  - Lazy loading за изображения
  - Минимизирай DOM манипулации

### 4. Общи Правила за Код

- **Коментари**: 
  - Пиши ясни коментари за сложна логика
  - Документирай функции с описание, параметри и връщани стойности
  
- **Форматиране**:
  - Indentation: 2 spaces
  - Празни редове между логически групи
  - Консистентен стил в целия проект

- **Git Commit Messages**:
  ```
  feat: добавена нова функционалност
  fix: поправен бъг
  style: промени в стиловете
  refactor: рефакториране на код
  docs: промени в документацията
  ```

---

## 🎨 Дизайн Стандарти

### Цветова Палитра

Всеки проект трябва да има дефинирана цветова схема в `css/variables.css`:

```css
:root {
  /* Primary Colors */
  --color-primary: #FF6B35;
  --color-primary-dark: #E55A2B;
  --color-primary-light: #FF8555;
  
  /* Secondary Colors */
  --color-secondary: #2C3E50;
  --color-secondary-light: #34495E;
  
  /* Neutral Colors */
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-gray-light: #F5F5F5;
  --color-gray: #CCCCCC;
  --color-gray-dark: #666666;
  
  /* Status Colors */
  --color-success: #27AE60;
  --color-error: #E74C3C;
  --color-warning: #F39C12;
  --color-info: #3498DB;
}
```

### Типография

```css
:root {
  /* Font Families */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-heading: 'Poppins', sans-serif;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 2rem;      /* 32px */
  --font-size-4xl: 2.5rem;    /* 40px */
  --font-size-5xl: 3rem;      /* 48px */
}
```

### Spacing System

```css
:root {
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
  --spacing-4xl: 6rem;     /* 96px */
}
```

---

## 🔄 Работен Процес

### 1. Планиране

- [ ] Събиране на изисквания от клиента
- [ ] Създаване на wireframes/mockups
- [ ] Одобрение на дизайн от клиента
- [ ] Техническо планиране (структура, технологии)

### 2. Разработка

- [ ] Създаване на базова структура (папки, файлове)
- [ ] HTML разметка (семантична, достъпна)
- [ ] CSS стилизиране (Mobile-First)
- [ ] JavaScript функционалност
- [ ] Тестване на различни устройства/браузъри

### 3. Оптимизация

- [ ] Минификация на CSS/JS
- [ ] Оптимизация на изображения (WebP формат)
- [ ] Performance проверка (Lighthouse, PageSpeed)
- [ ] SEO одит
- [ ] Accessibility проверка (WAVE, axe)

### 4. Тестване

- [ ] Cross-browser тестване (Chrome, Firefox, Safari, Edge)
- [ ] Responsive тестване (mobile, tablet, desktop)
- [ ] Функционално тестване (форми, линкове, навигация)
- [ ] Performance тестване (време за зареждане)

### 5. Deployment

- [ ] Финална проверка на кода
- [ ] Backup на текущия сайт (ако има)
- [ ] Upload на файловете
- [ ] DNS/SSL конфигурация
- [ ] Финално тестване на живия сайт

### 6. Поддръжка

- [ ] Monitoring за грешки
- [ ] Редовни актуализации
- [ ] Backup на сайта
- [ ] Отговор на feedback от клиента

---

## 🛠️ Инструменти и Технологии

### Задължителни за Всеки Проект

- **HTML5**: Семантична структура
- **CSS3**: Модерни стилове, Grid, Flexbox
- **Vanilla JavaScript**: Чист ES6+ код
- **Git**: Version control

### Препоръчителни

- **Google Fonts**: За типография
- **Font Awesome / Heroicons**: За икони
- **AOS (Animate On Scroll)**: За анимации при scroll
- **Swiper.js**: За слайдери/карусели
- **EmailJS**: За контактни форми без backend

### Тестване

- **W3C Validator**: HTML валидация
- **CSS Validator**: CSS валидация
- **Lighthouse**: Performance и SEO
- **BrowserStack**: Cross-browser тестване

---

## 📝 Документация

Всеки проект трябва да има:

1. **README.md**: 
   - Описание на проекта
   - Как да се стартира локално
   - Структура на проекта
   - Използвани технологии

2. **Коментари в кода**:
   - Обяснение на сложна логика
   - TODO за бъдещи подобрения
   - Документация на функции

3. **Design System документ**:
   - Цветова палитра
   - Типография
   - Компоненти и техния стил

---

## ✅ Качествен Checklist

Преди да се счита проектът за завършен:

### Функционалност
- [ ] Всички функционалности работят според изискванията
- [ ] Няма JavaScript грешки в конзолата
- [ ] Формите валидират и изпращат данни правилно
- [ ] Всички линкове работят

### Дизайн
- [ ] Responsive на всички устройства
- [ ] Консистентна типография
- [ ] Правилно използване на цветовата схема
- [ ] Smooth анимации (60fps)

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Total Blocking Time < 300ms
- [ ] Оптимизирани изображения

### SEO & Accessibility
- [ ] Meta tags попълнени
- [ ] Alt атрибути на изображения
- [ ] ARIA атрибути където е нужно
- [ ] Keyboard navigation работи
- [ ] Color contrast ratio > 4.5:1

### Код Качество
- [ ] Валиден HTML/CSS
- [ ] Няма console.log() в production код
- [ ] Коментиран и документиран код
- [ ] Консистентно форматиране

---

## 🚀 Бъдещи Подобрения

- Интеграция с CMS (WordPress, Strapi)
- Progressive Web App (PWA) функционалност
- Автоматизирано тестване
- CI/CD pipeline
- Component library

---

## 📞 Контакт за Въпроси

При въпроси относно архитектурата или стандартите, свържете се с tech lead на екипа.

---

**Версия**: 1.0  
**Последна актуализация**: Декември 2025  
**Създаден от**: SyperWeb Team
