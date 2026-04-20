# Design System Specification: The Clinical Aesthetic

## 1. Overview & Creative North Star
### Creative North Star: "The Pristine Curator"
This design system moves away from the cluttered, utility-first look of traditional CRM software. Instead, it adopts a high-end editorial approach termed "The Pristine Curator." The goal is to evoke the feeling of a high-end laboratory or a luxury spa—environments where hygiene is paramount and care is intentional.

To break the "template" look, we utilize **intentional asymmetry** and **tonal depth**. Instead of rigid, boxed-in grids, the layout uses expansive white space (breathing room) to signify cleanliness. Overlapping elements and varying typographic scales create a sense of architectural layering, suggesting a platform that is as sophisticated as the services it manages.

---

## 2. Colors: Depth Without Lines
The palette is built on "Deep Ocean" and "Fresh Teal," but its power lies in the neutral "Surface" tiers which define the physical space.

### The "No-Line" Rule
**Strict Mandate:** Prohibit the use of 1px solid borders for sectioning or containment. 
Boundaries are defined exclusively through:
- **Background Color Shifts:** A `surface-container-low` section sitting on a `surface` background.
- **Tonal Transitions:** Using subtle shifts in the neutral scale to indicate where one functional area ends and another begins.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
- **Base:** `surface` (#f7f9fb) for the primary application background.
- **Sub-sections:** `surface-container-low` (#f2f4f6) for sidebar or secondary navigation backgrounds.
- **Interactive Layers:** `surface-container-lowest` (#ffffff) for primary content cards and data tables to provide maximum "pop" and a clean, bleached-white feel.

### The "Glass & Gradient" Rule
To elevate the "clinical" feel, use **Glassmorphism** for floating elements (e.g., dropdowns, modals). Use `surface` at 80% opacity with a `24px` backdrop-blur. 
**Signature Texture:** Use a linear gradient from `primary` (#004370) to `primary_container` (#005b96) at a 135-degree angle for primary Action Buttons to give them a "liquid" depth that feels premium and tactile.

---

## 3. Typography: The Editorial Voice
We use a dual-font strategy to balance authority with utility.

*   **Display & Headlines (Manrope):** A geometric sans-serif that feels modern and architectural. Large scales (e.g., `display-lg` at 3.5rem) should be used with tight letter-spacing (-0.02em) to create a bold, authoritative "editorial" header.
*   **Body & Labels (Inter):** Chosen for its clinical legibility. Inter handles the dense data of inventory tracking and scheduling without fatigue.

**Hierarchy Strategy:** 
Use `headline-lg` (Manrope) for page titles to establish trust. Pair it immediately with `body-md` (Inter) in `on_surface_variant` (#414750) for descriptions to create a high-contrast, professional rhythm.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "digital." We mimic natural light hitting clean surfaces.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on `surface-container-low` backgrounds. This 1-step tier jump creates "Soft Lift" without a single pixel of shadow.
*   **Ambient Shadows:** For high-priority floating elements (like a scheduling popover), use a "Whisper Shadow": `0px 12px 32px rgba(25, 28, 30, 0.06)`. The tint is derived from `on_surface` to ensure it feels like a natural occlusion of light.
*   **The "Ghost Border" Fallback:** If a divider is essential for accessibility, use the `outline_variant` (#c1c7d1) at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Style & Intent

### Buttons (The "Coated" Look)
*   **Primary:** Gradient fill (`primary` to `primary_container`), `xl` (1.5rem) corner radius. No border.
*   **Secondary:** `surface_container_high` background with `on_primary_fixed_variant` text.
*   **Tertiary:** Ghost style. No background; `primary` text. Transitions to `surface_variant` on hover.

### Data Visualization & Charts
*   **Style:** Use "Fresh Teal" (`secondary`) for growth/positive metrics and "Deep Ocean" (`primary`) for baselines.
*   **Aesthetics:** Area charts should use a subtle gradient fill (from `secondary` to transparent) rather than a solid line. Ensure "Roundness" is applied to bar chart tips (`sm` radius).

### Inventory & Scheduling (The "White-Glove" Grid)
*   **Cards:** Forbid divider lines. Use `1.5rem` (xl) padding and `surface-container-lowest` fill.
*   **Calendar Slots:** Use `surface-container-low` for empty slots and `secondary_container` for scheduled services. The contrast between the clinical grey and the fresh teal creates an immediate "at-a-glance" status.
*   **Input Fields:** Use a "Floating" style. `surface-container-highest` background, `md` corner radius, and a `bottom-border` only when focused, using the `primary` color.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use whitespace as a functional element. If a layout feels "crowded," increase the padding rather than adding a border.
*   **DO** use `secondary_fixed` (#79f7e3) for "Clean/Waterproofed" status indicators—the brightness suggests a fresh, treated surface.
*   **DO** overlap elements (e.g., a card slightly bleeding over a section header) to create a bespoke, high-end feel.

### Don't:
*   **DON'T** use pure black (#000000) for text. Use `on_surface` (#191c1e) to keep the contrast high but the "clinical" feel soft.
*   **DON'T** use standard `0.5rem` corners for everything. Mix `xl` (1.5rem) for large containers and `md` (0.75rem) for interactive components to create visual hierarchy.
*   **DON'T** use "hard" dividers. If you need to separate content, use a `24px` vertical gap or a subtle shift from `surface` to `surface_container_low`.