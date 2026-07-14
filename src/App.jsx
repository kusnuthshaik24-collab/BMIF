/* 1. Design System & Base Setup */
:root {
  --background: #e0f2fe;
  --foreground: #0f172a;
  --primary: #0d9488;
  --primary-foreground: #ffffff;
  --card: #ffffff;
  --radius: 1rem;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  
  /* Shared Gradient Backdrops */
  --bg-gradient: linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 50%, #ddd6fe 100%);
  --form-gradient: linear-gradient(160deg, #06b6d4 0%, #059669 45%, #10b981 100%);
  --btn-gradient: linear-gradient(135deg, #ff7a18 0%, #ff5e62 100%);
  
  /* Gauge Colors */
  --c-uw: #38bdf8; --c-nw: #10b981; --c-ow: #fbdf68; --c-o1: #fb923c; --c-o2: #ef4444;
}

* { box-sizing: border-box; margin: 0; }
html { scroll-behavior: smooth; }

body {
  background: var(--bg-gradient);
  color: var(--foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 40px 20px;
}

/* 2. Layout Structure */
.app-wrapper {
  display: flex;
  gap: 40px;
  max-width: 1020px;
  width: 100%;
  justify-content: center;
}

.site-header {
  width: 100%;
  max-width: 1020px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.site-brand { display: flex; align-items: center; gap: 12px; }

.logo {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f97316 0%, #10b981 100%);
  box-shadow: 0 8px 24px rgba(16,185,129,0.18);
}

.site-title { font-size: 20px; font-weight: 800; }
.site-subtitle { font-size: 13px; color: rgba(15,23,42,0.7); font-weight: 600; }

/* 3. Panel Cards (Form & Chart Panels) */
.container, .chart-container {
  flex: 1;
  max-width: 460px;
  padding: 40px;
  border-radius: 24px;
  min-height: 520px;
  z-index: 3;
  box-sizing: border-box;
}

.container {
  background: var(--form-gradient);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--primary-foreground);
  box-shadow: 0 20px 40px rgba(13, 148, 136, 0.25);
}

.chart-container {
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-title {
  color: var(--primary);
  margin-bottom: 40px;
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
}

/* 4. Inputs & Buttons */
.input-group { margin-bottom: 22px; }
.input-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.input-group input {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  font-size: 1.05rem;
  color: #0f172a;
  outline: none;
  transition: all 200ms ease;
}
.input-group input::placeholder {
  color: rgba(15, 23, 42, 0.45);
}
.input-group input:focus { box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25); }

button[type="submit"] {
  background: var(--btn-gradient);
  color: #ffffff;
  border-radius: var(--radius);
  padding: 1.15rem 1.75rem;
  font-size: 1.05rem;
  font-weight: 800;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
  box-shadow: 0 8px 28px rgba(255, 122, 24, 0.18);
}
button[type="submit"]:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(249, 115, 22, 0.55); }

.btn-update { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important; }
.btn-cancel {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1.5px dashed rgba(255, 255, 255, 0.4);
  border-radius: 0.875rem;
  padding: 0.75rem 1.5rem;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
}

/* 5. Result & History Lists */
.result {
  margin-top: 25px;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  color: #0f172a;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  border-radius: var(--radius);
  backdrop-filter: blur(8px);
  animation: fadeInUp 0.35s ease forwards;
}

.result h4,
.result h3,
.result p {
  color: #0f172a !important;
}

.history-item {
  background: rgba(255, 255, 255, 0.95);
  color: #0f172a;
  border-radius: 0.875rem;
  padding: 1rem 1.25rem;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.history-item strong {
  color: #0f172a;
}

.history-actions { display: flex; gap: 8px; }
.edit-btn, .delete-btn {
  border-radius: 0.5rem;
  padding: 0.375rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
}
.edit-btn { background: #e0f2fe; color: #0369a1; border: 1.5px solid #bae6fd; }
.delete-btn { background: #fee2e2; color: #ef4444; border: 1.5px solid #fca5a5; }

/* 6. The Gauge Meter Graphic */
.gauge-wrapper { position: relative; width: 340px; height: 190px; margin-top: 10px; }
.gauge-body {
  position: relative;
  width: 340px;
  height: 170px;
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
  overflow: hidden;
  background: #f1f5f9;
}

.gauge-segment {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%);
  transform-origin: 50% 50%;
}
/* Rotations mapping the BMI spectrum */
.underweight { background: var(--c-uw); transform: rotate(-90deg); }
.normal      { background: var(--c-nw); transform: rotate(-64.8deg); }
.overweight  { background: var(--c-ow); transform: rotate(-18deg); }
.obese1      { background: var(--c-o1); transform: rotate(18deg); }
.obese2      { background: var(--c-o2); transform: rotate(54deg); }

.gauge-core {
  position: absolute;
  top: 35px;
  left: 35px;
  width: 230px;
  height: 230px;
  background: #ffffff;
  border-radius: 50%;
  z-index: 2;
}

.gauge-pointer-wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 24px;
  height: 140px;
  margin-left: -12px;
  transform-origin: 50% 100%;
  z-index: 5;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.gauge-pointer {
  width: 0; height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 45px solid #0f172a;
}

.gauge-value-display {
  position: absolute;
  bottom: -5px; left: 0; right: 0;
  text-align: center;
  z-index: 10;
  display: flex;
  flex-direction: column;
}
.gauge-value-num { font-size: 46px; font-weight: 800; }
.gauge-value-text { font-size: 15px; font-weight: 700; }

/* Outer Scale Labels */
.gauge-labels span { position: absolute; font-size: 12px; color: #94a3b8; font-weight: 600; }
.lbl-15 { bottom: 15px; left: -14px; }
.lbl-18 { top: 65px; left: 6px; }
.lbl-25 { top: -4px; left: 78px; }
.lbl-30 { top: -4px; right: 78px; }
.lbl-35 { top: 65px; right: 6px; }
.lbl-40 { bottom: 15px; right: -14px; }

/* Legend & Utilities */
.chart-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  margin-top: 45px;
  width: 100%;
}
.legend-item { display: flex; align-items: center; font-size: 13px; font-weight: 600; color: #475569; }
.dot { width: 11px; height: 11px; border-radius: 50%; margin-right: 10px; }

.uw-dot { background: var(--c-uw); }
.nw-dot { background: var(--c-nw); }
.ow-dot { background: var(--c-ow); }
.o1-dot { background: var(--c-o1); }
.o2-dot { background: var(--c-o2); }

/* 7. Global Animations & Media Queries */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hide default Chrome/Firefox number inputs layout */
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
input[type=number] { -moz-appearance: textfield; }

@media (max-width: 820px) {
  .app-wrapper { flex-direction: column; align-items: center; }
  .container, .chart-container { max-width: 100%; }
}
