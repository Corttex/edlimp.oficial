# Design System Strategy: The Pristine Layer

## 1. Overview & Creative North Star
**The Creative North Star: "The Clinical Sanctuary"**

This design system moves beyond the generic "cleaning service" aesthetic. It is an editorial approach to hygiene and protection. We treat cleanliness as a high-end luxury and waterproofing as an invisible, high-tech shield. 

The visual identity is defined by **The Clinical Sanctuary**—a balance between "Friendly Vitality" (Lime Green) and "Deep Trust" (Blue). We break the traditional grid through **intentional asymmetry** and **tonal layering**. Elements should feel like they are floating in a sterile, perfectly lit environment. By overlapping soft-cornered containers and using high-contrast typography scales, we create an experience that feels both human and scientifically precise.

---

## 2. Colors: Tonal Architecture
We use color not just for decoration, but to define the physical structure of the interface.

*   **Primary (#0F238E):** Use for authority. This is the "Protective Shield."
*   **Secondary (#2B6C00 / #92F859):** The "Vitality Factor." Use sparingly for high-action items or to indicate fresh, clean results.
*   **Surface Hierarchy (The "No-Line" Rule):** 
    *   **Prohibit 1px solid borders.** Boundaries are defined by shifts between `surface`, `surface-container-low`, and `surface-container-highest`.
    *   **Nesting:** To define a card’s importance, nest a `surface-container-lowest` card inside a `surface-container` background. This creates depth through value, not lines.
*   **The Glass & Gradient Rule:** 
    *   Floating navigation and sidebars should use `surface-variant` with a **60% opacity and 20px backdrop-blur**.
    *   **Signature Textures:** Apply a subtle linear gradient from `primary` (#0F238E) to `primary-container` (#2D3EA5) on hero buttons to give them a convex, tactile feel.

---

## 3. Typography: Editorial Authority
We utilize **Manrope** for its geometric yet approachable skeleton, paired with **Plus Jakarta Sans** for technical labels.

*   **Display (Lg/Md):** Set in `manrope`. Use these for "Big Statements." They should feel bold and spacious. Use negative letter-spacing (-0.02em) for a tighter, more premium editorial look.
*   **Headlines:** The "Anchor." Use `headline-lg` to introduce new service sections. 
*   **Body (Lg/Md):** Primary information. Maintain a generous line-height (1.6) to ensure the "clean" and "airy" brand promise is reflected in the reading experience.
*   **Labels (Plus Jakarta Sans):** These are for "Clinical Data"—specs, measurements, or waterproofing types. The font shift signals to the user that they are looking at technical details.

---

## 4. Elevation & Depth: Tonal Layering
In this system, shadows are light, and borders are invisible.

*   **The Layering Principle:** Depth is a stack of papers. 
    *   Background: `surface` (#FBF8FF)
    *   Section: `surface-container-low` (#F5F2FC)
    *   Interactive Card: `surface-container-lowest` (#FFFFFF)
*   **Ambient Shadows:** For floating elements, use a "Cloud Shadow." 
    *   *Blur:* 40px | *Spread:* 0 | *Color:* `on-surface` at 5% opacity. It shouldn't look like a shadow; it should look like the object is caught in a soft studio light.
*   **The "Ghost Border" Fallback:** If a separation is required on identical background tones, use `outline-variant` (#C6C5D5) at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use for overlays (Modals, Sidebars). A blurred background suggests the "transparency" of the business and the "liquid" nature of the waterproofing services.

---

## 5. Components: The Pristine Kit

### Buttons
*   **Primary:** `primary` background with `on-primary` text. Corners: `full` (pill-shaped).
*   **Secondary:** `secondary-container` (Lime Green) with `on-secondary-container`. Use this for "Request Quote" to symbolize growth and freshness.
*   **Tertiary:** No background. Use `title-sm` typography with a subtle `primary` icon.

### Cards & Lists
*   **No Dividers:** Separate list items using 16px of vertical `surface-container` spacing or alternating background shifts between `surface-container-low` and `surface-container-lowest`.
*   **Service Cards:** Use `lg` (2rem) rounded corners. Feature a large icon in `secondary` top-left to guide the eye.

### Input Fields
*   **State:** Soft-filled `surface-container-highest` backgrounds rather than outlined boxes.
*   **Focus:** Transition the background to `surface-container-lowest` and apply a 2px `primary` ghost-border (20% opacity).

### Specialized Components
*   **The "Waterproof" Toggle:** A custom switch using a liquid-drop icon that fills with `secondary` (lime) when active, signaling "Protected."
*   **Comparison Slider:** A component used for Before/After cleaning shots. Use a `surface-container-lowest` handle with a high-diffusion ambient shadow.

---

## 6. Do's and Don'ts

### Do:
*   **Use Whitespace as a Tool:** If an element feels "cluttered," increase the margin; do not add a border.
*   **Asymmetric Layouts:** Place text on the left and imagery overlapping the right-edge of the container to create a custom, non-templated feel.
*   **Pill Shapes:** Use `full` rounded corners for all buttons and chips to maintain the "Friendly" brand pillar.

### Don't:
*   **No Pure Blacks:** Never use #000000. Use `on-surface` (#1B1B22) for high-contrast text to keep the aesthetic clinical and soft.
*   **No Sharp Corners:** Avoid `none` or `sm` rounding. It contradicts the "friendly and approachable" requirement.
*   **No Divider Lines:** Avoid the "Table" look. Use tonal shifts to categorize data.
*   **No High-Contrast Shadows:** Avoid small, dark, or "muddy" shadows. They make the UI look dated and "dirty," which is antithetical to the business.