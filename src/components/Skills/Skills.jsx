// src/components/Skills/Skills.jsx
import React, { useEffect, useRef, useState } from 'react'

// ─── Skill data organized by categories matching your resume ───────────────
const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#61dafb',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: ['React', 'Next.js', 'Redux', 'Tailwind', 'Bootstrap', 'jQuery', 'Shadcn/UI'],
  },
  {
    id: 'backend',
    label: 'Backend',
    color: '#5FA04E',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Prisma ORM'],
  },
  {
    id: 'database',
    label: 'Database',
    color: '#4169E1',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    id: 'devops',
    label: 'DevOps & AI',
    color: '#f0883e',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    skills: ['Docker', 'Git', 'Vercel', 'Postman', 'Gemini API', 'Vite'],
  },
]

// ─── Constellation layout on desktop (positions as % of container) ─────────
// Central hub
const CENTER = { x: 50, y: 50 }

// Category positions around the center
const CATEGORY_POSITIONS = [
  { x: 50, y: 16 },  // Frontend — top
  { x: 84, y: 50 },  // Backend — right
  { x: 50, y: 84 },  // Database — bottom
  { x: 16, y: 50 },  // DevOps & AI — left
]

// Skill node positions orbiting each category
const SKILL_ORBITS = [
  // Frontend (top) — skills fan out above and to the sides
  [
    { x: 26, y: 4 }, { x: 42, y: 2 }, { x: 58, y: 2 }, { x: 74, y: 4 },
    { x: 20, y: 14 }, { x: 80, y: 14 }, { x: 50, y: 6 },
  ],
  // Backend (right) — skills fan out to the right
  [
    { x: 92, y: 28 }, { x: 96, y: 40 }, { x: 96, y: 60 }, { x: 92, y: 72 },
    { x: 86, y: 34 },
  ],
  // Database (bottom) — skills fan out below
  [
    { x: 26, y: 96 }, { x: 42, y: 98 }, { x: 58, y: 98 }, { x: 74, y: 96 },
  ],
  // DevOps & AI (left) — skills fan out to the left
  [
    { x: 8, y: 28 }, { x: 4, y: 40 }, { x: 4, y: 60 }, { x: 8, y: 72 },
    { x: 14, y: 34 }, { x: 14, y: 66 },
  ],
]

// ─── Skill Icons Map ──────────────────────────────────────────────────────
const GenericIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
)

const SKILL_ICONS = {
  'React': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 00-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 00-3.107-.534A23.892 23.892 0 0010.831 4.8a8.569 8.569 0 011.562-.542c.51-.197 1.013-.302 1.48-.302zm-7.26 1.59c.213 0 .437.034.668.1a8.48 8.48 0 011.562.542 23.657 23.657 0 00-2.184 1.963 23.641 23.641 0 00-3.107.536 11.25 11.25 0 01-.248-1.43c-.23-1.874.06-3.33.73-3.712a.8.8 0 01.58-.147v.148zm9.212 4.535a24.283 24.283 0 011.08 1.52 24.28 24.28 0 011.086 1.52 20.938 20.938 0 01-2.19.28 23.644 23.644 0 00.024-3.32zm-2.17-.617a24.85 24.85 0 011.24 2.053 24.906 24.906 0 011.24 2.054 24.66 24.66 0 01-2.479.117 24.66 24.66 0 01-2.479-.117 24.85 24.85 0 011.24-2.054 24.85 24.85 0 011.237-2.053zm-5.082 2.67a23.644 23.644 0 00.024 3.32 20.938 20.938 0 01-2.19-.28 24.28 24.28 0 011.086-1.52 24.283 24.283 0 011.08-1.52zm2.866-1.013a24.906 24.906 0 00-1.24 2.053 24.85 24.85 0 00-1.24 2.054 24.66 24.66 0 002.479.117 24.66 24.66 0 002.479-.117 24.906 24.906 0 00-1.24-2.054 24.85 24.85 0 00-1.238-2.053zM4.534 15.14a11.17 11.17 0 01.25-1.439 23.476 23.476 0 003.107.534 23.892 23.892 0 002.177 1.975 8.569 8.569 0 01-1.562.542c-.51.197-1.013.302-1.48.302-.213 0-.437-.034-.668-.1-.666-.382-.955-1.835-.73-3.704zm14.93 1.46c.226 1.87-.064 3.32-.73 3.705a.8.8 0 01-.58.147c-.213 0-.437-.034-.668-.1a8.48 8.48 0 01-1.562-.542 23.657 23.657 0 002.184-1.963 23.641 23.641 0 003.107-.536c.11.49.197.97.25 1.43v-.14zm-12.748.44a23.892 23.892 0 01-2.177-1.974 23.476 23.476 0 003.107-.534 11.17 11.17 0 01.25 1.439c.225 1.868-.065 3.32-.73 3.703a.8.8 0 01-.58.147c-.213 0-.437-.034-.668-.1z" /></svg>),
  'Next.js': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14.435 15.655l-4.49-7.234H8.02v8.52h1.69v-6.3l4.08 6.54h1.7v-8.76h-1.69v7.234z" /><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-1.5 0c0-4.694-3.806-8.5-8.5-8.5S3.5 7.306 3.5 12 7.306 20.5 12 20.5 20.5 16.694 20.5 12z" /></svg>),
  'Bootstrap': (<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z" /></svg>),
  'MongoDB': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.996 23.996s-5.61-4.81-6.142-12.217c0 0-.25-2.905 1.637-5.592 0 0 3.86-5.875 4.14-6.185.253-.284.512-.047.512-.047s4.444 5.922 4.545 6.47c0 0 1.542 3.033 1.282 5.545-.487 4.707-5.974 11.96-5.974 11.96z" /></svg>),
  'SQL': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c0 1.66-4 3-9 3S3 6.66 3 5s4-3 9-3 9 1.34 9 3z" /><path d="M3 7v3c0 1.66 4 3 9 3s9-1.34 9-3V7c0 1.66-4 3-9 3S3 8.66 3 7z" /><path d="M3 12v3c0 1.66 4 3 9 3s9-1.34 9-3v-3c0 1.66-4 3-9 3S3 13.66 3 12z" /><path d="M3 17v3c0 1.66 4 3 9 3s9-1.34 9-3v-3c0 1.66-4 3-9 3S3 18.66 3 17z" /></svg>),
  'PostgreSQL': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" /></svg>),
  'Node.js': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" /></svg>),
  'Express.js': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" /></svg>),
  'MySQL': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z" /></svg>),
  'Tailwind': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /></svg>),
  'Docker': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" /></svg>),
  'Vercel': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg>),
  'Git': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.738 2.739c.642-.22 1.386-.076 1.903.442.716.716.716 1.876 0 2.592-.716.716-1.876.716-2.592 0-.52-.52-.663-1.266-.442-1.907l-2.716-2.717v5.617c.222.215.365.518.365.852 0 .666-.54 1.206-1.206 1.206-.667 0-1.207-.54-1.207-1.206 0-.334.143-.637.365-.852V9.123c-.222-.215-.365-.518-.365-.852 0-.33.14-.627.356-.842L5.808 4.67 .455 10.024c-.604.604-.604 1.584 0 2.189l10.478 10.477c.604.604 1.582.604 2.188 0l10.425-10.424c.604-.605.604-1.585 0-2.189z" /></svg>),
  'Redux': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm-1.583-16.71c1.558-1.558 4.085-1.558 5.643 0l1.127 1.127c1.558 1.558 1.558 4.085 0 5.643l-5.643 5.643-6.77-6.77 5.643-5.643Z" /></svg>),
  'Shadcn/UI': (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2l10 10-10 10L2 12Z" /></svg>),
  'jQuery': (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="12" rx="10" ry="10" /><path d="M12 7v7a2 2 0 01-2 2h-.5" /></svg>),
  'Prisma ORM': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 18H2L12 2Zm0 3.8L5.5 17.5h13L12 5.8Z" /></svg>),
  'REST APIs': (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M6.5 6.5l4 4" /><path d="M17.5 6.5l-4 4" /><path d="M6.5 17.5l4-4" /><path d="M17.5 17.5l-4-4" /></svg>),
  'JWT Auth': (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>),
  'Gemini API': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z" /></svg>),
  'Vite': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 22h8l-2-6h9l-6-14z" /></svg>),
  'Postman': (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 19.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm.75-11.25H9v7.5h3.75c1.65 0 3-1.35 3-3s-1.35-3-3-3v-1.5zM12 14.25H9v-3h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" /></svg>)
};

// ─── SVG line component ───────────────────────────────────────────────────
function ConstellationLine({ x1, y1, x2, y2, color, opacity = 0.25, phase }) {
  // Use useMemo to prevent re-randomizing on every component render
  const { delay, duration, direction } = React.useMemo(() => ({
    delay: Math.random() * -10,
    duration: 2 + Math.random() * 2.5,
    direction: Math.random() > 0.5 ? 'alternate' : 'alternate-reverse'
  }), []);

  let animationStyle = '';
  let animDelay = '0s';
  let pulseOpacity = 0.8;

  if (phase === 'charging') {
    animationStyle = 'chargeInAcc 2.5s cubic-bezier(0.5, 0, 1, 1) forwards';
  } else if (phase === 'blast') {
    animationStyle = 'none';
    pulseOpacity = 0;
  } else if (phase === 'expanding') {
    animationStyle = 'blastOut 1.2s ease-out forwards';
  } else if (phase === 'idle') {
    animationStyle = `currentFlow ${duration}s linear infinite ${direction}`;
    animDelay = `${delay}s`;
  } else {
    animationStyle = 'none';
    pulseOpacity = 0;
  }

  return (
    <g>
      {/* Base faint dashed line */}
      <line
        x1={`${x1}%`} y1={`${y1}%`}
        x2={`${x2}%`} y2={`${y2}%`}
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity={opacity}
        strokeDasharray="4 4"
      />
      {/* Animated current line passing back and forth */}
      <line
        x1={`${x1}%`} y1={`${y1}%`}
        x2={`${x2}%`} y2={`${y2}%`}
        stroke={color}
        strokeWidth="1.2"
        pathLength="100"
        strokeDasharray="15 85"
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 6px ${color})`,
          animation: animationStyle,
          animationDelay: animDelay,
          opacity: pulseOpacity,
        }}
      />
    </g>
  )
}

// ─── Central hub node ─────────────────────────────────────────────────────
function CenterNode({ phase, spinDirection }) {
  return (
    <div
      className="absolute z-20 flex flex-col items-center gap-1"
      style={{
        left: `${CENTER.x}%`,
        top: `${CENTER.y}%`,
        transform: 'translate(-50%, -50%)',
        animation: `constellationCounterSpin 120s linear infinite ${spinDirection}`
      }}
    >
      <div 
        className="w-[72px] h-[72px] rounded-full bg-bg-secondary border-2 border-accent flex items-center justify-center shadow-glow relative"
        style={{
          animation: phase === 'charging' ? 'brainCharge 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none',
        }}
      >
        {/* Brain icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00e5b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
          <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
          <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
          <path d="M6 18a4 4 0 0 1-1.967-.516" />
          <path d="M19.967 17.484A4 4 0 0 1 18 18" />
        </svg>
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-20" />
        {/* Blast ring */}
        {phase === 'blast' && (
          <div className="absolute inset-0 rounded-full border-accent border-solid" style={{ animation: 'centerBlastRing 0.3s ease-out forwards' }} />
        )}
      </div>
      <span className="text-xs font-display text-accent tracking-wider bg-bg-primary/80 px-2 py-[2px] rounded-sm border border-accent-border">
        Surya
      </span>
    </div>
  )
}

// ─── Category node ────────────────────────────────────────────────────────
function CategoryNode({ category, position, index, spinDirection }) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        animation: `constellationCounterSpin 120s linear infinite ${spinDirection}`
      }}
    >
      <div 
        className="flex flex-col items-center gap-1"
        style={{ animation: `bubbleFloat ${3 + index * 0.5}s ease-in-out infinite` }}
      >
        <div
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-default bg-bg-primary relative overflow-hidden"
          style={{
            border: `2px solid ${category.color}55`,
            color: category.color,
            boxShadow: `0 0 20px ${category.color}15`,
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: `${category.color}20` }} />
          <div className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none">
            {category.icon}
          </div>
        </div>
        <span
          className="text-[11px] font-display tracking-wider px-2 py-[1px] rounded-sm whitespace-nowrap bg-bg-primary relative overflow-hidden"
          style={{
            color: category.color,
            border: `1px solid ${category.color}30`,
          }}
        >
          <span className="absolute inset-0 pointer-events-none" style={{ background: `${category.color}15` }} />
          <span className="relative z-10 pointer-events-none">{category.label}</span>
        </span>
      </div>
    </div>
  )
}

// ─── Skill node (small orbiting node) ─────────────────────────────────────
function SkillNode({ name, color, position, delay, spinDirection }) {
  const icon = SKILL_ICONS[name] || GenericIcon;

  return (
    <div
      className="absolute z-[5] cursor-default group"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        animation: `constellationCounterSpin 120s linear infinite ${spinDirection}`
      }}
    >
      <div 
        className="flex items-center gap-[6px] px-[6px] py-[3px] rounded-full bg-bg-primary"
        style={{ animation: `bubbleFloat ${4 + delay * 0.3}s ease-in-out ${delay * 0.2}s infinite` }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center transition-all duration-300 group-hover:scale-125"
          style={{
            color: color,
            filter: `drop-shadow(0 0 4px ${color}60)`
          }}
        >
          {icon}
        </div>
        {/* Label */}
        <span
          className="text-[13px] font-display tracking-wide whitespace-nowrap transition-all duration-300 group-hover:text-text-primary text-white"
        >
          {name}
        </span>
      </div>
    </div>
  )
}

// ─── Mobile skill card (used on small screens) ───────────────────────────
function MobileCategoryCard({ category }) {
  return (
    <div className="border border-white/[0.07] bg-bg-card rounded-md p-5 transition-all duration-300 hover:-translate-y-1">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `${category.color}18`,
            border: `2px solid ${category.color}55`,
            color: category.color,
          }}
        >
          {category.icon}
        </div>
        <h3
          className="text-sm font-semibold font-display tracking-wide"
          style={{ color: category.color }}
        >
          {category.label}
        </h3>
      </div>
      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="text-[13px] text-white font-display tracking-wide px-3 py-[5px] rounded-pill transition-all duration-200 hover:scale-105 flex items-center"
            style={{
              background: `${category.color}10`,
              border: `1px solid ${category.color}30`,
            }}
          >
            {SKILL_ICONS[skill] ? (
              <span className="mr-2 opacity-80" style={{ color: category.color }}>
                {SKILL_ICONS[skill]}
              </span>
            ) : (
              <span
                className="inline-block w-[5px] h-[5px] rounded-full mr-[6px]"
                style={{ background: category.color }}
              />
            )}
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Main Skills Component ────────────────────────────────────────────────
export default function Skills() {
  const [isMobile, setIsMobile] = useState(false)
  const [animPhase, setAnimPhase] = useState('waiting')
  const containerRef = useRef(null)
  const hasAnimated = useRef(false)

  // Decide rotation direction once on mount
  const spinDirection = React.useMemo(() => Math.random() > 0.5 ? 'normal' : 'reverse', [])

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setAnimPhase('charging')
          setTimeout(() => setAnimPhase('blast'), 2500)
          setTimeout(() => setAnimPhase('expanding'), 2800)
          setTimeout(() => setAnimPhase('idle'), 4000)
        }
      },
      { threshold: 0.5 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="topo-bg bg-bg-primary py-[100px] relative">
      {/* Keyframes for constellation float & current flow */}
      <style>{`
        @keyframes constellationSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes constellationCounterSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes bubbleFloat {
          0% { transform: translate(0px, 0px); }
          33% { transform: translate(4px, -6px); }
          66% { transform: translate(-4px, 3px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes currentFlow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes chargeInAcc {
          0% { stroke-dashoffset: 0; opacity: 0; }
          5% { opacity: 1; }
          100% { stroke-dashoffset: 400; opacity: 1; }
        }
        @keyframes blastOut {
          0% { stroke-dashoffset: 100; opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        @keyframes centerBlastRing {
          0% { transform: scale(1); opacity: 1; border-width: 4px; }
          100% { transform: scale(5); opacity: 0; border-width: 0px; }
        }
        @keyframes brainCharge {
          0% { transform: translate(0, 0) scale(1); filter: drop-shadow(0 0 2px #00e5b0); }
          50% { transform: translate(-1px, 1px) scale(1.05); filter: drop-shadow(0 0 8px #00e5b0); }
          75% { transform: translate(2px, -2px) scale(1.1); filter: drop-shadow(0 0 15px #00e5b0); }
          85% { transform: translate(-3px, 3px) scale(1.15); filter: drop-shadow(0 0 20px #00e5b0); }
          90% { transform: translate(3px, -3px) scale(1.18); filter: drop-shadow(0 0 25px #00e5b0); }
          95% { transform: translate(-4px, 4px) scale(1.2); filter: drop-shadow(0 0 30px #00e5b0); }
          100% { transform: translate(0, 0) scale(1.25); filter: drop-shadow(0 0 40px #00e5b0); }
        }
      `}</style>

      {/* Section connector */}
      <div className="flex flex-col items-center max-w-7xl mx-auto mb-4 px-6 md:pl-[84px]">
        <div className="w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_12px_#00e5b0]" />
        <div className="w-[2px] h-[60px] bg-gradient-to-b from-transparent to-accent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:pl-[84px]">
        {/* Header */}
        <div className="text-center mb-2">
          <span className="font-display text-[36px] text-accent opacity-80">&lt;/&gt;</span>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold text-text-primary mb-[10px]">Skills</h2>
          <p className="text-sm text-text-muted">Technologies I work with every day</p>
        </div>

        {/* ── Desktop: Constellation Graph ── */}
        {!isMobile && (
          <div
            className="relative w-full mx-auto hidden md:block"
            style={{ maxWidth: '800px', aspectRatio: '1 / 1', animation: `constellationSpin 120s linear infinite ${spinDirection}` }}
          >
            {/* Observer Target exactly in the center */}
            <div ref={containerRef} className="absolute left-1/2 top-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 0 }} />

            {/* SVG connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {/* Lines from center to each category */}
              {CATEGORY_POSITIONS.map((pos, i) => (
                <ConstellationLine
                  key={`center-${i}`}
                  x1={CENTER.x} y1={CENTER.y}
                  x2={pos.x} y2={pos.y}
                  color="#00e5b0"
                  opacity={0.2}
                  phase={animPhase}
                />
              ))}
              {/* Lines from each category to its skills */}
              {CATEGORIES.map((cat, ci) =>
                cat.skills.map((_, si) => {
                  if (!SKILL_ORBITS[ci][si]) return null
                  return (
                    <ConstellationLine
                      key={`skill-${ci}-${si}`}
                      x1={CATEGORY_POSITIONS[ci].x}
                      y1={CATEGORY_POSITIONS[ci].y}
                      x2={SKILL_ORBITS[ci][si].x}
                      y2={SKILL_ORBITS[ci][si].y}
                      color={cat.color}
                      opacity={0.15}
                      phase={animPhase}
                    />
                  )
                })
              )}
            </svg>

            {/* Central hub */}
            <CenterNode phase={animPhase} spinDirection={spinDirection} />

            {/* Category nodes */}
            {CATEGORIES.map((cat, i) => (
              <CategoryNode
                key={cat.id}
                category={cat}
                position={CATEGORY_POSITIONS[i]}
                index={i}
                spinDirection={spinDirection}
              />
            ))}

            {/* Skill nodes */}
            {CATEGORIES.map((cat, ci) =>
              cat.skills.map((skill, si) => {
                if (!SKILL_ORBITS[ci][si]) return null
                return (
                  <SkillNode
                    key={`${cat.id}-${skill}`}
                    name={skill}
                    color={cat.color}
                    position={SKILL_ORBITS[ci][si]}
                    delay={si}
                    spinDirection={spinDirection}
                  />
                )
              })
            )}

            {/* Background decorative particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full bg-accent/10"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animation: `constellationFloat ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* ── Mobile: Card-based layout ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {CATEGORIES.map((cat) => (
            <MobileCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
