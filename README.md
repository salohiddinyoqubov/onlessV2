# Onless.uz - Haydovchilik Nazariy Imtihoni

O'zbekiston Respublikasi haydovchilik nazariy imtihoni platformasi. Next.js 15, React 19, TypeScript va TailwindCSS yordamida qurilgan.

## Xususiyatlar

- ✅ 50 savoldan iborat savollar bazasi (Uzbekcha)
- ✅ Har bir imtihonda tasodifiy 20 savol tanlanadi
- ✅ 40 daqiqalik taymerni (sekund-sekund hisoblanadi)
- ✅ F1-F4 klaviatura tugmalari orqali javob tanlash
- ✅ Barcha 50 savol ko'rinishida navigatsiya grid
- ✅ Real vaqtda javob berish holati
- ✅ Batafsil natijalar sahifasi
- ✅ 70% o'tish darajasi
- ✅ Pixel-perfect dizayn

## Texnologiyalar

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** Custom hooks with React hooks
- **Animation:** Framer Motion (optional)

## O'rnatish

### 1. Loyihani klonlash

```bash
cd onless
```

### 2. Bog'liqliklarni o'rnatish

```bash
npm install
```

### 3. Ishga tushirish

```bash
npm run dev
```

Brauzerda ochish: [http://localhost:3000](http://localhost:3000)

## Loyiha Strukturasi

```
onless/
├── app/
│   ├── globals.css                   # Global CSS va Tailwind direktivalar
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   ├── test/
│   │   ├── page.tsx                  # Test sahifasi (asosiy imtihon)
│   │   ├── result/
│   │   │   └── page.tsx             # Natijalar sahifasi
│   │   └── components/
│   │       ├── TestHeader.tsx        # Header (logo, timer, progress)
│   │       ├── QuestionDisplay.tsx   # Savol matn va rasm
│   │       ├── OptionsPanel.tsx      # Javob variantlari (F1-F4)
│   │       ├── QuestionNavigationGrid.tsx  # 50 savollik grid
│   │       └── ResultDisplay.tsx     # Natijalar ko'rinishi
│   └── lib/
│       ├── test-logic.ts             # Biznes logika funksiyalari
│       └── hooks/
│           ├── useTimer.ts           # Taymerni boshqarish hook
│           ├── useKeyboardShortcuts.ts  # F-keys uchun hook
│           └── useTestSession.ts     # Test sessiya holatini boshqarish
├── types/
│   └── test.types.ts                 # TypeScript type definitions
├── data/
│   └── questions.ts                  # 50 ta mock savol
├── config/
│   └── test.config.ts                # Test konfiguratsiyasi
├── public/
│   └── images/
│       └── scenarios/                # Yo'l holati rasmlari
├── tailwind.config.ts                # Tailwind konfiguratsiyasi
├── tsconfig.json                     # TypeScript konfiguratsiyasi
└── package.json                      # Loyiha bog'liqliklari
```

## Foydalanish

### Imtihonni boshlash

1. Bosh sahifadan **"Imtihonni boshlash"** tugmasini bosing
2. 50 ta savoldan tasodifiy 20 ta savol tanlanadi
3. 40 daqiqalik taymer avtomatik boshlanadi

### Imtihon davomida

- **Javob tanlash:** F1, F2, F3, F4 tugmalari yoki sichqoncha bilan bosish
- **Savollar orasida harakatlanish:** Pastdagi grid tugmalarini bosish
- **Imtihonni yakunlash:** "Imtihonni yakunlash" tugmasini bosing

### Klaviatura yorliqlari

- `F1` - Birinchi variant
- `F2` - Ikkinchi variant
- `F3` - Uchinchi variant
- `F4` - To'rtinchi variant (agar mavjud bo'lsa)

### Natijalar

- ✅ **O'tdingiz:** 70% va undan yuqori
- ❌ **O'tmadingiz:** 70% dan past
- Batafsil natijalar sahifasida barcha savollar bo'yicha ko'rsatma

## Konfiguratsiya

Imtihon parametrlarini `config/test.config.ts` faylida o'zgartirish mumkin:

```typescript
export const TEST_CONFIG = {
  TOTAL_QUESTIONS: 50,          // Jami savollar
  QUESTIONS_PER_SESSION: 20,    // Har bir imtihonda savollar
  TEST_DURATION_SECONDS: 2400,  // 40 daqiqa
  PASSING_THRESHOLD: 70,        // O'tish %
  GRID: {
    COLUMNS: 10,                // Grid ustunlar soni
    ROWS: 5,                    // Grid qatorlar soni
  },
};
```

## Yangi savollar qo'shish

`data/questions.ts` faylida yangi savollar qo'shish:

```typescript
{
  id: 51,
  text: "Savol matni o'zbek tilida?",
  imagePath: '/images/scenarios/new-scenario.png', // ixtiyoriy
  options: [
    { id: 'F1', text: "Birinchi variant" },
    { id: 'F2', text: "Ikkinchi variant" },
    { id: 'F3', text: "Uchinchi variant" },
  ],
  correctOptionId: 'F2',
  category: 'traffic-rules',
}
```

## Build va Deploy

### Production build

```bash
npm run build
```

### Production serverni ishga tushirish

```bash
npm start
```

### Vercel'ga deploy qilish

```bash
npm install -g vercel
vercel
```

## Rang palitrasi

```typescript
colors: {
  primary: {
    DEFAULT: '#1a3a52',  // Asosiy ko'k
    dark: '#0d2436',     // To'q ko'k (header)
    light: '#2a4a62',    // Och ko'k (kartalar)
  },
  success: '#2ecc71',    // Yashil (to'g'ri javoblar)
  danger: '#e74c3c',     // Qizil (noto'g'ri javoblar)
  warning: '#f39c12',    // Sariq (ogohlantirish)
  neutral: {
    DEFAULT: '#34495e',  // Kulrang-ko'k
    light: '#bdc3c7',    // Och kulrang
  },
}
```

## Litsenziya

Bu loyiha Onless.uz kompaniyasi uchun ishlab chiqilgan.

## Muallif

Loyiha Next.js 15, React 19, TypeScript va TailwindCSS texnologiyalari yordamida qurilgan.

---

**Eslatma:** Bu loyiha demo maqsadda ishlab chiqilgan. Real ishlab chiqarish uchun backend integratsiyasi, foydalanuvchi autentifikatsiyasi va boshqa xususiyatlar qo'shilishi kerak.
