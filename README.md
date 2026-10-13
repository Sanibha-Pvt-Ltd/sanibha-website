# Sanibha — Radiant iOS Utilities

A 1:1 pixel-perfect recreation of [Sanibha Studio](https://sanibha-studio.preview.emergentagent.com/) with a built-in **Admin Control Panel**.

> *"Twelve apps, one light. Pure, radiant utility apps crafted for iOS."*

---

## 🔐 Admin Control Panel

- **Access URL**: [http://localhost:3000/admin](http://localhost:3000/admin) (or click "Admin" in the footer)
- **Password**: `bharathsanibha`

### Features Managed via the Panel:
1. **Apps Visibility Controls (Live vs Offline)**:
   - Toggle individual apps between **Live** (displayed on public UI) and **Offline** (hidden from homepage showcase and collection page).
   - "Enable All" and "Disable All" bulk controls.
   - Shows live counts (e.g. `12 of 12 Live`).
2. **Hero Section Customization**:
   - Eyebrow badge, Heading Line 1, Highlight word (italic serif), Heading Line 2.
   - Description paragraph.
   - CTA button labels ("Explore our apps", "Our story").
   - Rotating badge text.
3. **Bento Grid & Media**:
   - Prismatic card title, description, and image URL (e.g., `/img/prism.jpg`).
   - 100% Swift, Tactile haptics, and Acoustic audio card texts.
4. **Manifesto & Statistics**:
   - Philosophy paragraph and 4 performance metrics (`100% Native`, `0 Trackers`, `< 15MB`, `60 FPS`).
5. **The Sanibha Method**:
   - Process titles and descriptions across all 4 steps.
6. **About Page**:
   - Hero headlines, banner image path, origin story paragraphs, and 4 core studio principles.
7. **Contact & FAQ Accordion**:
   - Email, address, and interactive FAQ manager (Add, Edit, and Delete questions/answers).
8. **Footer**:
   - Wordmark, tagline, and copyright notice.
9. **Persistence & Backups**:
   - Real-time reactivity saved in `localStorage`.
   - **Backup**: Export full configuration to `.json`.
   - **Restore**: Import `.json` backup file.
   - **Reset**: One-click restore to initial factory defaults.

---

## 📱 The 12 Interactive iOS Apps

1. **Storage Cleaner** (`01 Clarity`): Interactive pie storage ring (49% ↔ 86%), duplicate photo cleaner, and tap-to-clean simulation.
2. **Baby Tracker** (`02 Nurture`): Interactive bottle feeding stepper (`+` / `-` ml adjustments), midnight feeding logger, diaper & sleep loggers.
3. **AI Resume Builder** (`03 Career`): Target role switcher, ATS match score meter (82% → 96%), and tap *"✨ Transform Bullet with AI"* optimizer.
4. **Calorie Counter** (`04 Vitality`): Concentric calorie SVG ring (2,000 kcal goal), macronutrient distribution bars, and tap-to-add meal items.
5. **Plant Identifier** (`05 Growth`): Botanical camera viewfinder, laser scanline HUD, shutter button, instant recognition card (`Monstera Deliciosa`).
6. **Habit Tracker** (`06 Discipline`): 14-day streak flame, weekly day bubble dots, tap-to-check daily rituals, and dynamic completion bar.
7. **Fax** (`07 Swiftness`): Encrypted mobile fax transmitter, document preview, live modem handshake & raster transmission progress bar, delivery receipt `#FX-88219`.
8. **Sleep Tracker** (`08 Rest`): Circadian score gauge (`91 / 100 Optimal Rest`), hypnogram stage breakdown, smart wake window alarm, and interactive breathing sleep session toggle.
9. **Universal TV Remote** (`09 Command`): OLED TV power toggle, circular D-Pad navigation wheel (Up/Down/Left/Right/OK), Volume & Channel rockers, Mute, and streaming shortcuts.
10. **Recipe Importer** (`10 Flavor`): Ad-free recipe stripper from web URLs, dynamic serving multiplier stepper (2x, 4x servings recalculates quantities), ingredient checklist, and simmer timer.
11. **Document Scanner / PDF Toolkit** (`11 Precision`): Document camera auto-edge detection, 85% compression mode, digital e-signature stamp, and on-device OCR text extractor.
12. **Immigration Case Tracker** (`12 Journey`): Official USCIS receipt tracker (`IOE-092-481-9201`), 4-stage milestone progression line, processing center wait metrics, and interactive approval simulation.

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Available on `http://localhost:3000`.
