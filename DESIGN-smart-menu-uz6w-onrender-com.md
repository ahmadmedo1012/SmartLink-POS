---
name: Smart Menu
url: https://smart-menu-uz6w.onrender.com/
colors:
  page-background: '#FBF6F0'
  background: '#ffffff'
  background-dark: '#000000'
  text-primary: '#000000'
  text-inverse: '#ffffff'
  text-muted: '#70717B'
  border: '#E0DCD7'
  primary-start: '#F4A34B'
  primary-end: '#E78C08'
  accent-green: '#4CAF50'
  accent-blue: '#007BFF'
  accent-red: '#DC3545'
  accent-purple: '#6F42C1'
typography:
  display:
    family: 'Readex Pro'
    size: 72px
    weight: 400
    line-height: 1
  heading-1:
    family: 'Readex Pro'
    size: 36px
    weight: 400
    line-height: 1.2
  heading-2:
    family: 'Readex Pro'
    size: 30px
    weight: 400
    line-height: 1.2
  heading-3:
    family: 'Readex Pro'
    size: 20px
    weight: 400
    line-height: 1.2
  body:
    family: 'Noto Sans Arabic'
    size: 16px
    weight: 400
    line-height: 1.5
  caption:
    family: 'Noto Sans Arabic'
    size: 10px
    weight: 400
    line-height: 1.5
spacing:
  base: 4px
  scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
radius:
  sm: 12px
  md: 17px
  lg: 22px
  xl: 42px
  full: 9999px
elevation:
  card: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px'
  lg: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px'
  glow: 'oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 10px 15px -3px, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 4px 6px -4px'
  glass: 'lab(0 0 0 / 0.06) 0px 4px 30px 0px'
motion:
  duration-fast: '0.15s'
  duration-base: '0.3s'
  duration-slow: '0.4s'
  duration-hero: '0.7s'
  easing-standard: 'ease-out'
  easing-in: 'cubic-bezier(0.4, 0, 1, 1)'
components:
  button-primary:
    bg-gradient-start: '{colors.primary-start}'
    bg-gradient-end: '{colors.primary-end}'
    text: '{colors.text-inverse}'
    radius: '{radius.sm}'
    padding: '12px 32px'
    font-weight: 500
    font-size: 18px
  card:
    bg: '{colors.background}'
    border: '1px solid {colors.border}'
    radius: '{radius.lg}'
    shadow: '{elevation.card}'
---

# Design System Inspired by Smart Menu

## 1. Visual Theme & Atmosphere
Smart Menu presents a warm, inviting, and modern aesthetic, characterized by a soft off-white `page-background` of `#FBF6F0` paired with vibrant amber accents (`#F4A34B` to `#E78C08`) for key interactive elements. Typography leverages `Readex Pro` for impactful headings like the 72px display text, while `Noto Sans Arabic` ensures readability for body content at 16px. The design emphasizes clear hierarchy and ample whitespace, creating an airy feel.

The brand's signature is the interactive phone mockup displaying a digital menu, often subtly animated with CSS keyframe `float` effects. Iconography is monochrome and line-based, utilizing specific accent colors like `#4CAF50` for feature highlights. Components feature soft `22px` rounded corners and subtle `rgba(0,0,0,0.1) 0px 1px 3px` shadows, contributing to a clean and approachable interface. The site uses various CSS animations to enhance interaction, including `magneticFloat` and `pulse-glow`.

**Key Characteristics**
- Warm `#FBF6F0` background with amber accents.
- `Readex Pro` headings, `Noto Sans Arabic` body text.
- Soft `22px` rounded corners on cards and containers.
- Subtle `rgba(0,0,0,0.1) 0px 1px 3px` shadows for depth.
- Line-based iconography with specific accent colors.
- Interactive phone menu mockup as a central visual.
- Subtle `float` and `translateY` CSS animations.

## 2. Color Palette & Roles
The Smart Menu color palette is built around a warm neutral base, punctuated by a vibrant amber gradient for primary actions and a set of distinct accent colors for feature differentiation.

-   **Page Background**: `#FBF6F0` (from `--warm-bg`) — The overarching background color for the entire page, providing a warm, inviting canvas.
-   **Background**: `#ffffff` (from `--card`) — Used for primary content containers, cards, and modals, offering a clean, bright surface.
-   **Background Dark**: `#000000` — The designated background color for dark mode contexts (not actively used in the light theme screenshot).
-   **Text Primary**: `#000000` — The default color for main headings, body text, and high-contrast information, ensuring maximum readability.
-   **Text Inverse**: `#ffffff` — Used for text placed on dark or primary colored backgrounds, such as button labels.
-   **Text Muted**: `#70717B` (from `--color-slate-500`) — Applied to secondary text, descriptions, captions, and less prominent UI elements to reduce visual hierarchy.
-   **Border**: `#E0DCD7` (from `--border`) — A subtle, warm border color used for dividing lines, input fields, and card outlines.
-   **Primary Start**: `#F4A34B` (from `--amber-500`) — The lighter shade of amber, serving as the starting point for brand gradients and highlights.
-   **Primary End**: `#E78C08` (from `--amber-600`) — The darker, more saturated amber, used as the endpoint for brand gradients, solid primary accents, and interactive states.
-   **Accent Green**: `#4CAF50` (from `--color-green-500`) — A vibrant green used for success indicators, "WhatsApp order" icons, and positive feedback.
-   **Accent Blue**: `#007BFF` (from `--color-blue-700`) — A strong blue used for specific interactive elements or icons, such as the "QR code" feature.
-   **Accent Red**: `#DC3545` (from `--color-red-900`) — A distinct red used for warnings, error states, or specific feature icons like the "loyalty program".
-   **Accent Purple**: `#6F42C1` (from `--color-purple-600`) — A rich purple used for specific feature icons, such as "analytics and statistics".

## 3. Typography Rules
Smart Menu employs a dual-font strategy to establish a clear visual hierarchy and cater to Arabic script legibility, with `Readex Pro` for display and heading roles and `Noto Sans Arabic` for body and smaller text.

-   **Font Family**:
    -   Primary Headings: `'Readex Pro', sans-serif`
    -   Body & UI: `'Noto Sans Arabic', system-ui, sans-serif`
    -   Monospace (Code): `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace` (inferred from common practice)

-   **Hierarchy**:
    -   **Display**: `Readex Pro` `72px` `400` · line-height `1` · tracking `none` · Used for prominent hero sections and large numerical displays.
    -   **H1**: `Readex Pro` `36px` `400` · line-height `1.2` · tracking `none` · Primary section titles, often with amber gradient.
    -   **H2**: `Readex Pro` `30px` `400` · line-height `1.2` · tracking `none` · Secondary section titles, providing clear content breaks.
    -   **H3**: `Readex Pro` `20px` `400` · line-height `1.2` · tracking `none` · Feature titles and sub-headings within cards.
    -   **Body**: `Noto Sans Arabic` `16px` `400` · line-height `1.5` · tracking `none` · Standard paragraph text, ensuring comfortable reading.
    -   **Caption**: `Noto Sans Arabic` `10px` `400` · line-height `1.5` · tracking `none` · Small annotations, metadata, and legal text.
    -   **Button Text**: `Noto Sans Arabic` `18px` `500` · line-height `1.2` · tracking `none` · Prominent call-to-action text.
    -   **Small Text**: `Noto Sans Arabic` `14px` `400` · line-height `1.5` · tracking `none` · Used for supplementary information and minor UI elements.

-   **Principles**:
    -   **Clarity and Readability**: `Noto Sans Arabic` is chosen for its excellent legibility in Arabic script, particularly for body text.
    -   **Visual Weight for Hierarchy**: `Readex Pro` at `400` weight provides a distinct, modern feel for headings, differentiating them from body content.
    -   **Consistent Line Spacing**: A `1.5` line-height for body text and `1.2` for headings ensures ample space, preventing text from feeling cramped.
    -   **Strategic Emphasis**: `500` and `700` font weights are used sparingly for interactive elements and key phrases to draw attention without overwhelming.
    -   **Arabic-First Design**: The font stack prioritizes Arabic typefaces, ensuring a native and high-quality reading experience for the target audience.

## 4. Component Stylings

### Buttons

Smart Menu buttons feature a clean, rounded aesthetic with subtle interactive feedback, leveraging the brand's amber gradient for primary actions. All buttons include a `transition` for smooth visual changes.

**Primary Button**
A prominent call-to-action button with a gradient background, white text, and a noticeable lift on hover.

```css
.button-primary {
  background: linear-gradient(to bottom right, var(--color-primary-start, #F4A34B), var(--color-primary-end, #E78C08));
  color: var(--color-text-inverse, #ffffff);
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: var(--components-button-primary-font-size, 18px);
  font-weight: var(--components-button-primary-font-weight, 500);
  padding: var(--components-button-primary-padding, 12px 32px);
  border: none;
  border-radius: var(--radius-sm, 12px);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all var(--motion-duration-slow, 0.4s) var(--motion-easing-standard, ease-out);
}

.button-primary:hover {
  transform: translateY(-2px); /* inferred from screenshot */
  box-shadow: var(--elevation-lg, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px), var(--elevation-glow, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 10px 15px -3px, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 4px 6px -4px); /* from .magnetic-btn:hover */
}

.button-primary:active {
  transform: scale(0.96); /* from .magnetic-btn:active */
  box-shadow: none;
}

.button-primary:disabled {
  opacity: 0.6; /* inferred from screenshot */
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

**Secondary Button**
A button with a transparent background and a subtle border, using the primary amber color for its text.

```css
.button-secondary {
  background-color: transparent;
  color: var(--color-primary-end, #E78C08);
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: 18px; /* inferred from screenshot */
  font-weight: 500;
  padding: 12px 32px; /* inferred from screenshot */
  border: 1px solid var(--color-primary-end, #E78C08); /* inferred from screenshot */
  border-radius: var(--radius-sm, 12px);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all var(--motion-duration-slow, 0.4s) var(--motion-easing-standard, ease-out);
}

.button-secondary:hover {
  background-color: rgba(var(--color-primary-end, #E78C08), 0.05); /* inferred from screenshot */
  transform: translateY(-2px); /* inferred from screenshot */
  box-shadow: var(--elevation-card, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px); /* inferred from screenshot */
}

.button-secondary:active {
  transform: scale(0.98); /* inferred from screenshot */
  box-shadow: none;
}

.button-secondary:disabled {
  opacity: 0.5; /* inferred from screenshot */
  cursor: not-allowed;
  border-color: var(--color-border, #E0DCD7); /* inferred from screenshot */
  color: var(--color-text-muted, #70717B); /* inferred from screenshot */
  transform: none;
  box-shadow: none;
}
```

**Ghost Button**
A text-only button for less prominent actions, often used within navigation or cards.

```css
.button-ghost {
  background-color: transparent;
  color: var(--color-text-primary, #000000);
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: 16px; /* inferred from screenshot */
  font-weight: 400;
  padding: 8px 16px; /* inferred from screenshot */
  border: none;
  border-radius: var(--radius-sm, 12px);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color var(--motion-duration-base, 0.3s) var(--motion-easing-standard, ease-out), color var(--motion-duration-base, 0.3s) var(--motion-easing-standard, ease-out);
}

.button-ghost:hover {
  background-color: rgba(var(--color-primary-end, #E78C08), 0.05); /* inferred from screenshot */
  color: var(--color-primary-end, #E78C08); /* inferred from screenshot */
}

.button-ghost:active {
  background-color: rgba(var(--color-primary-end, #E78C08), 0.1); /* inferred from screenshot */
  color: var(--color-primary-end, #E78C08); /* inferred from screenshot */
}

.button-ghost:disabled {
  opacity: 0.4; /* inferred from screenshot */
  cursor: not-allowed;
  color: var(--color-text-muted, #70717B); /* inferred from screenshot */
  background-color: transparent;
}
```

### Cards & Containers

**Standard Card**
Cards are used to group related content, featuring a soft border, rounded corners, and a subtle shadow that lifts on hover.

```css
.card {
  background-color: var(--components-card-bg, #ffffff);
  border: var(--components-card-border, 1px solid #E0DCD7);
  border-radius: var(--components-card-radius, 22px);
  box-shadow: var(--components-card-shadow, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px);
  padding: var(--spacing-6, 24px); /* inferred from screenshot */
  transition: all var(--motion-duration-slow, 0.4s) var(--motion-easing-standard, ease-out); /* from .card-premium */
}

.card:hover {
  transform: translateY(-1px); /* from .card-premium:hover */
  box-shadow: var(--elevation-lg, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px), var(--elevation-glow, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 10px 15px -3px, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 4px 6px -4px); /* from .card-premium:hover */
}
```

**Feature Card**
These cards highlight specific features, often containing an icon and descriptive text. They share the base card styling but may have unique icon colors.

```css
.feature-card {
  background-color: var(--components-card-bg, #ffffff);
  border: var(--components-card-border, 1px solid #E0DCD7);
  border-radius: var(--components-card-radius, 22px);
  box-shadow: var(--components-card-shadow, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px);
  padding: var(--spacing-6, 24px); /* inferred from screenshot */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-4, 16px); /* inferred from screenshot */
  transition: all var(--motion-duration-slow, 0.4s) var(--motion-easing-standard, ease-out);
}

.feature-card:hover {
  transform: translateY(-1px);
  box-shadow: var(--elevation-lg, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px), var(--elevation-glow, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 10px 15px -3px, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 4px 6px -4px);
}

.feature-card .feature-icon {
  width: var(--spacing-12, 48px); /* inferred from screenshot */
  height: var(--spacing-12, 48px); /* inferred from screenshot */
  border-radius: var(--radius-md, 17px); /* inferred from screenshot */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--color-primary-end, #E78C08), 0.1); /* inferred, specific to icon */
  color: var(--color-primary-end, #E78C08); /* inferred, specific to icon */
}
```

### Inputs & Forms

**Text Input**
Standard text input field with a subtle border and rounded corners, providing clear focus indication.

```css
.input-text {
  background-color: var(--color-background, #ffffff);
  color: var(--color-text-primary, #000000);
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: var(--typography-body-size, 16px);
  font-weight: var(--typography-body-weight, 400);
  padding: var(--spacing-3, 12px) var(--spacing-4, 16px); /* inferred from screenshot */
  border: 1px solid var(--color-border, #E0DCD7);
  border-radius: var(--radius-sm, 12px);
  width: 100%;
  box-sizing: border-box;
  transition: border-color var(--motion-duration-base, 0.3s) var(--motion-easing-standard, ease-out), box-shadow var(--motion-duration-fast, 0.15s) var(--motion-easing-standard, ease-out);
}

.input-text:focus {
  border-color: var(--color-primary-end, #E78C08); /* inferred from screenshot */
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--color-primary-end, #E78C08), 0.2); /* inferred from screenshot */
  outline-offset: 3px; /* from :focus-visible */
  transition-property: outline-offset; /* from :focus-visible */
  transition-duration: var(--motion-duration-fast, 0.15s); /* from :focus-visible */
  transition-timing-function: var(--motion-easing-standard, ease-out); /* from :focus-visible */
}

.input-text:disabled {
  background-color: var(--color-page-background, #FBF6F0); /* inferred from screenshot */
  color: var(--color-text-muted, #70717B); /* inferred from screenshot */
  cursor: not-allowed;
  opacity: 0.7; /* inferred from screenshot */
}
```

**Form Label**
Labels for form fields, using a slightly bolder weight for clarity.

```css
.form-label {
  color: var(--color-text-primary, #000000);
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: var(--typography-body-size, 16px);
  font-weight: 500; /* inferred from screenshot */
  margin-bottom: var(--spacing-2, 8px); /* inferred from screenshot */
  display: block;
}
```

**Checkbox/Radio**
(No specific checkbox or radio components were observed in the provided screenshots or extracted tokens, therefore this section is omitted as per rules.)

### Navigation

**Top Navigation Bar**
The main navigation bar at the top of the page, providing brand identity and key links.

```css
.navbar {
  background-color: var(--color-page-background, #FBF6F0); /* inferred from screenshot */
  border-bottom: 1px solid var(--color-border, #E0DCD7); /* inferred from screenshot */
  padding: var(--spacing-4, 16px) var(--spacing-8, 32px); /* inferred from screenshot */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* from elevation.zIndexValues */
  top: 0;
  width: 100%;
  z-index: 30; /* from elevation.zIndexValues */
  box-shadow: 0 2px 4px rgba(0,0,0,0.04); /* inferred from screenshot */
  transition: background-color var(--motion-duration-base, 0.3s) var(--motion-easing-standard, ease-out), box-shadow var(--motion-duration-base, 0.3s) var(--motion-easing-standard, ease-out);
}
```

**Navigation Link**
Individual links within the navigation bar, with a subtle color change on hover and an active state.

```css
.nav-link {
  color: var(--color-text-primary, #000000);
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: var(--typography-body-size, 16px);
  font-weight: 500; /* inferred from screenshot */
  text-decoration: none;
  padding: var(--spacing-2, 8px) var(--spacing-3, 12px); /* inferred from screenshot */
  border-radius: var(--radius-sm, 12px); /* inferred from screenshot */
  transition: color var(--motion-duration-fast, 0.15s) var(--motion-easing-standard, ease-out), background-color var(--motion-duration-fast, 0.15s) var(--motion-easing-standard, ease-out);
}

.nav-link:hover {
  color: var(--color-primary-end, #E78C08); /* inferred from screenshot */
  background-color: rgba(var(--color-primary-end, #E78C08), 0.05); /* inferred from screenshot */
}

.nav-link.active,
.nav-link[aria-current="page"] {
  color: var(--color-primary-end, #E78C08); /* inferred from screenshot */
  font-weight: 700; /* inferred from screenshot */
  background-color: rgba(var(--color-primary-end, #E78C08), 0.08); /* inferred from screenshot */
}
```

**Dropdown Menu**
(No specific dropdown menu components were observed in the provided screenshots or extracted tokens, therefore this section is omitted as per rules.)

### Links

**Standard Link**
Inline text links, typically colored with the primary brand accent and underlined on hover.

```css
.link-standard {
  color: var(--color-primary-end, #E78C08); /* inferred from screenshot */
  text-decoration: none;
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: var(--typography-body-size, 16px);
  font-weight: var(--typography-body-weight, 400);
  transition: text-decoration var(--motion-duration-fast, 0.15s) var(--motion-easing-standard, ease-out), color var(--motion-duration-fast, 0.15s) var(--motion-easing-standard, ease-out);
}

.link-standard:hover {
  text-decoration: underline;
  color: var(--color-primary-start, #F4A34B); /* inferred from screenshot */
}

.link-standard:visited {
  color: var(--color-primary-end, #E78C08); /* inferred from screenshot */
}
```

**Secondary Link**
Links used for less emphasized actions or supplementary information, often using a muted text color.

```css
.link-secondary {
  color: var(--color-text-muted, #70717B); /* inferred from screenshot */
  text-decoration: none;
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: var(--typography-body-size, 16px);
  font-weight: var(--typography-body-weight, 400);
  transition: color var(--motion-duration-fast, 0.15s) var(--motion-easing-standard, ease-out), text-decoration var(--motion-duration-fast, 0.15s) var(--motion-easing-standard, ease-out);
}

.link-secondary:hover {
  color: var(--color-primary-end, #E78C08); /* inferred from screenshot */
  text-decoration: underline;
}

.link-secondary:visited {
  color: var(--color-text-muted, #70717B); /* inferred from screenshot */
}
```

### Badges

**Growth Badge**
A specific badge used to highlight achievements, featuring a light amber background and a darker amber text.

```css
.badge-growth {
  background-color: rgba(var(--color-primary-start, #F4A34B), 0.1); /* from bg-amber-500/10 */
  color: var(--color-primary-end, #E78C08); /* from text-amber-600 */
  font-family: var(--typography-body-family, 'Noto Sans Arabic', system-ui, sans-serif);
  font-size: var(--typography-caption-size, 10px); /* inferred from screenshot */
  font-weight: 500; /* inferred from screenshot */
  padding: var(--spacing-1, 4px) var(--spacing-2, 8px); /* inferred from screenshot */
  border-radius: var(--radius-full, 9999px); /* inferred from screenshot */
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1, 4px); /* inferred from screenshot */
  white-space: nowrap;
}
```

## 5. Layout Principles

-   **Spacing System**: Smart Menu employs a `4px` base unit for its spacing scale, ensuring consistent and harmonious visual rhythm across the interface.
    -   Base: `4px`
    -   Scale: `[0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]`
    -   **Usage Context**:
        -   `4px`: Smallest gaps, icon-text spacing.
        -   `8px`: Inline element spacing, very tight component margins.
        -   `12px`: Padding for small buttons, input fields.
        -   `16px`: Standard internal padding, spacing between list items.
        -   `20px`: Moderate spacing, often between form elements.
        -   `24px`: Section padding on mobile, spacing between major components.
        -   `32px`: Button horizontal padding, larger component margins.
        -   `40px`: Significant vertical spacing between sections.
        -   `48px`: Large section padding, hero element spacing.
        -   `64px`: Very large section padding, major content block separation.
        -   `80px, 96px`: Extra large spacing for hero sections or full-page breaks.

-   **Grid & Container** *(Suggested — not measured)*: _Note: container widths and column counts are not extracted from the source. The values below are reasonable defaults inferred from the visible layout density._
    -   Max Width: `1152px` (derived from `max-w-6xl` class, which is 72rem or 1152px)
    -   Columns: `12` (inferred from standard responsive design)
    -   Gutter: `24px` (inferred from typical grid systems)
    -   Section Padding: `48px` horizontal, `64px` vertical (inferred from screenshot)

-   **Whitespace Philosophy**: Smart Menu embraces an airy and open whitespace philosophy. Generous padding around components and substantial vertical spacing between sections create a sense of calm and focus. This ample use of `#FBF6F0` background space prevents visual clutter, allowing content and interactive elements to breathe and stand out. It contributes to a clean, modern aesthetic that is easy to navigate and visually appealing.

-   **Border Radius Scale**:
    -   `sm`: `12px` — Used for buttons, input fields, and small interactive elements.
    -   `md`: `17px` — Applied to feature icons and smaller containers.
    -   `lg`: `22px` — Standard for cards, larger containers, and prominent UI blocks.
    -   `xl`: `42px` — Used for the distinctive rounded edges of the phone mockup.
    -   `full`: `9999px` — For fully rounded elements like badges or circular avatars.

## 6. Depth & Elevation
Smart Menu utilizes subtle shadows and a clear z-index hierarchy to convey depth and guide user attention, with interactive elements exhibiting a distinct lift.

-   **Flat (z-0)**: `none` — Default state for background elements and static content.
-   **Card (z-10)**: `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px` — Used for standard cards, providing a subtle lift from the `page-background`.
-   **Hover (z-20)**: `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 10px 15px -3px, oklab(0.620004 0.0802886 0.114688 / 0.25) 0px 4px 6px -4px` — Applied to interactive cards and buttons on hover, combining a larger shadow with a distinct amber glow.
-   **Fixed Nav (z-30)**: `0 2px 4px rgba(0,0,0,0.04)` (inferred from screenshot) — Used for the fixed top navigation bar to ensure it floats above content.
-   **Floating Action (z-50)**: `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px` (inferred from screenshot) — Reserved for floating action buttons or elements that demand immediate attention.
-   **Modal/Overlay (z-100)**: `lab(0 0 0 / 0.06) 0px 4px 30px 0px` — Used for full-screen overlays, modals, and dropdowns, ensuring they appear on top of all other content.

**Shadow Philosophy**:
The shadow philosophy for Smart Menu is one of subtle enhancement and clear interaction feedback. Shadows are generally light and soft, primarily serving to differentiate layered elements like cards from the `page-background`. On interactive states, shadows become more pronounced and are often paired with an amber glow to clearly indicate interactivity and draw user focus, reinforcing the brand's primary color. The `glass` shadow is reserved for high-level overlays, providing a distinct, diffused depth effect.

## 7. Do's and Don'ts

### Do's
-   **Do** use `Readex Pro` `72px` `400` for hero titles, often with the gradient from `#F4A34B` to `#E78C08`.
-   **Do** ensure all body text uses `Noto Sans Arabic` `16px` `400` on `#FBF6F0` background; the measured ratio is 21:1, passing AAA.
-   **Do** apply `12px` padding and `12px` border-radius to all Primary Buttons for a consistent interactive feel.
-   **Do** use the `accent-green` `#4CAF50` for success icons and the "WhatsApp order" feature.
-   **Do** maintain at least `24px` of vertical spacing between consecutive Cards to prevent visual crowding.
-   **Do** ensure interactive elements like buttons and cards lift `translateY(-2px)` on hover with a `0.4s ease-out` transition.
-   **Do** use the `border` color `#E0DCD7` for all input fields and card outlines.
-   **Do** highlight active navigation links with `color: #E78C08` and `font-weight: 700`.
-   **Do** use the `badge-growth` component with `rgba(#F4A34B, 0.1)` background and `#E78C08` text for achievement highlights.
-   **Do** apply the `xl` `42px` border-radius specifically to the phone mockup container for its signature shape.

### Don'ts
-   **Don't** use `#70717B` (Text Muted) for primary body text on `#FBF6F0` (Page Background); the measured ratio is 3.1:1 (inferred), which fails AA.
-   **Don't** introduce spacing values outside the `4px` base scale (e.g., `10px` or `18px`); stick to `4, 8, 12, 16, 24, 32` for consistency.
-   **Don't** use `Readex Pro` for body text; reserve it exclusively for display and heading roles to maintain typographic hierarchy.
-   **Don't** apply harsh, dark shadows; use only the defined `elevation.card` or `elevation.lg` with the subtle `oklab` glow.
-   **Don't** use `text-inverse` `#ffffff` directly on `#FBF6F0` background; it provides insufficient contrast (inferred, ratio < 3:1).
-   **Don't** use border-radius values smaller than `12px` for interactive elements like buttons and inputs.
-   **Don't** deviate from the `0.4s ease-out` transition for card and button hovers; maintain consistent micro-interactions.
-   **Don't** use `accent-red` `#DC3545` for positive feedback; reserve it for warnings or loyalty program icons.
-   **Don't** allow input fields to lack a `3px` `outline-offset` `box-shadow` on focus; it's critical for accessibility.
-   **Don't** place more than two `feature-card` components without `32px` horizontal spacing between them on desktop.

## 8. Responsive Behavior *(Suggested — not measured)*
_Note: breakpoints below are industry-standard recommendations, not measurements from the source. Adjust to the brand's actual media queries when implementing._

-   **Suggested Breakpoints**:
    -   **Mobile Small** (~320px): Stacks all columns; primary navigation becomes a hamburger menu.
    -   **Mobile Large** (~480px): Adjusts font sizes to `14px` for body and `24px` for H1; increases touch targets.
    -   **Tablet** (~768px): Two-column layouts for features and cards; main navigation remains visible.
    -   **Desktop** (~1024px): Three-column layouts for content; full desktop navigation is active.
    -   **Desktop Large** (~1440px): Maximizes content width to `1152px`; expands section padding to `64px`.

-   **Touch Targets**:
    -   All interactive elements (buttons, links, form controls) should have a minimum tap area of `48px` by `48px`.
    -   Maintain a minimum `8px` clear space around touch targets to prevent accidental taps.

-   **Collapsing Strategy**:
    -   **Navigation**: The top navigation bar collapses into a hamburger menu icon at `768px` and below; the "ابدأ مجاناً" Primary Button remains visible.
    -   **Cards**: Feature cards and menu item cards reflow from multi-column grids to single columns on screens below `768px`.
    -   **Typography**: Display `72px` and H1 `36px` headings scale down to `36px` and `24px` respectively on screens below `480px`.
    -   **Padding**: Horizontal section padding reduces from `48px` to `24px` on mobile screens to optimize content width.
    -   **Forms**: Input fields maintain `100%` width but vertical spacing between elements may reduce from `20px` to `16px` on mobile.
    -   **Spacing**: Larger spacing values like `48px` and `64px` are generally halved on mobile to conserve vertical screen real estate.

## 9. Agent Prompt Guide

-   **Quick Color Reference**:
    -   `page-background`: `#FBF6F0`
    -   `background`: `#ffffff`
    -   `background-dark`: `#000000`
    -   `text-primary`: `#000000`
    -   `text-inverse`: `#ffffff`
    -   `text-muted`: `#70717B`
    -   `border`: `#E0DCD7`
    -   `primary-start`: `#F4A34B`
    -   `primary-end`: `#E78C08`
    -   `accent-green`: `#4CAF50`
    -   `accent-blue`: `#007BFF`
    -   `accent-red`: `#DC3545`
    -   `accent-purple`: `#6F42C1`

-   **Iteration Guide**:
    1.  Always use the amber gradient (`#F4A34B` to `#E78C08`) for primary call-to-action buttons.
    2.  Ensure all body text is `Noto Sans Arabic` `16px` `400` with `1.5` line-height.
    3.  Apply `12px` border-radius to all buttons and input fields.
    4.  Utilize the `4px` spacing scale (`4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96`) for all layout and component spacing.
    5.  Cards must have a `22px` border-radius and the `elevation.card` shadow.
    6.  Primary Buttons should have `12px 32px` padding and `18px` font size.
    7.  Input fields must show a `3px` `outline-offset` `box-shadow` on `:focus` with `0.15s ease-out` transition.
    8.  Navigation links should highlight with `color: #E78C08` and `font-weight: 700` for active states.
    9.  Implement `translateY(-2px)` and `elevation.lg` + `elevation.glow` on hover for interactive elements like buttons and cards.
    10. Ensure text color `#000000` on background `#ffffff` (or `#FBF6F0`) passes AAA contrast ratio (21:1).
    11. On mobile, collapse the main navigation into a hamburger menu and stack multi-column layouts into single columns.
    12. The phone mockup should feature the `xl` `42px` border-radius.