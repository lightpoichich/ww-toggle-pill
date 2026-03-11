# Segmented Control — WeWeb Custom Component

A segmented control (toggle pill) with 2+ options, each with an icon (WeWeb icon selector) and text label. Sliding pill animation on selection with checkmark indicator on active option.

## Project ID

b413e1c2-8199-4468-bcf2-4f5a2dd1a16c

## Key Files

- `src/wwElement.vue` — Component template, logic, and styles
- `ww-config.js` — WeWeb editor configuration (properties, trigger events)
- `package.json` — Dependencies and scripts

## Properties

| Name | Type | Section | Description |
|------|------|---------|-------------|
| options | Array | settings | Options with label, icon, value |
| value | Text | settings | Currently selected value (bindable) |
| showCheckmark | OnOff | settings | Show checkmark on active option |
| showIcons | OnOff | settings | Show icons on inactive options |
| pillColor | Color | style | Active pill background |
| activeTextColor | Color | style | Text color when selected |
| inactiveTextColor | Color | style | Text color when not selected |
| backgroundColor | Color | style | Track background |
| borderRadius | Length | style | Track corner radius |
| gap | Length | style | Padding between track edge and pill |

## Trigger Events

- `change:option` — Emits `{ value }` when user selects an option

## Dev Commands

```bash
npm run serve    # Start dev server
npm run build    # Build for production
```

## Conventions

- All `props.content` access uses optional chaining (`?.`) with fallback defaults
- Computed (not ref) for all props-derived data
- Scoped styles on inner containers — never on root `<div>`
- Root `<div>` must not have inline styles (WeWeb overrides them)
- Use `emit('trigger-event', { name, event: { value } })` for events
- Library: vanilla (no external dependencies)
