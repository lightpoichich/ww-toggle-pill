<template>
  <div class="segmented-control">
    <div class="segmented-control__track" :style="trackStyles">
      <div class="segmented-control__options" role="radiogroup">
        <div class="segmented-control__pill" :style="pillStyles"></div>
        <button
          v-for="(option, index) in options"
          :key="option.value ?? index"
          class="segmented-control__option"
          :class="{ 'segmented-control__option--active': isActive(option) }"
          :style="getOptionStyles(option)"
          role="radio"
          :aria-checked="isActive(option)"
          :aria-label="option.label"
          @click="handleSelect(option)"
          @keydown="handleKeydown($event, index)"
        >
          <svg
            v-if="showCheckmark && isActive(option)"
            class="segmented-control__check"
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
          >
            <path
              d="M3 8.5L6.5 12L13 4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            v-else-if="showIcons && option.icon && iconSvgs[option.icon]"
            class="segmented-control__icon"
            v-html="iconSvgs[option.icon]"
          ></span>
          <span v-if="option.label" class="segmented-control__label">{{ option.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, reactive } from 'vue';

const props = defineProps({
  content: { type: Object, required: true },
  uid: { type: String, required: true },
  /* wwEditor:start */
  wwEditorState: { type: Object },
  /* wwEditor:end */
});

const emit = defineEmits(['trigger-event']);

// Props with optional chaining + fallback defaults
const options = computed(() => {
  const raw = props.content?.options ?? [
    { label: 'Light', icon: '', value: 'light' },
    { label: 'Dark', icon: '', value: 'dark' },
    { label: 'Device', icon: '', value: 'device' },
  ];
  return raw.map((opt, i) => ({
    label: opt?.label ?? `Option ${i + 1}`,
    icon: opt?.icon ?? '',
    value: opt?.value ?? `option-${i}`,
  }));
});

// Async icon resolution via SystemIcon SVG system
const { getIcon } = wwLib.useIcons();
const iconSvgs = reactive({});

watch(
  () => options.value.map((opt) => opt.icon),
  async (icons) => {
    for (const icon of icons) {
      if (icon && !iconSvgs[icon]) {
        try {
          iconSvgs[icon] = await getIcon(icon);
        } catch {
          iconSvgs[icon] = null;
        }
      }
    }
  },
  { immediate: true },
);

const pillColor = computed(() => props.content?.pillColor ?? '#4A6CF7');
const activeTextColor = computed(() => props.content?.activeTextColor ?? '#FFFFFF');
const inactiveTextColor = computed(() => props.content?.inactiveTextColor ?? '#64748B');
const backgroundColor = computed(() => props.content?.backgroundColor ?? '#F1F5F9');
const showCheckmark = computed(() => props.content?.showCheckmark ?? true);
const showIcons = computed(() => props.content?.showIcons ?? true);
const borderRadius = computed(() => props.content?.borderRadius ?? '999px');
const gap = computed(() => props.content?.gap ?? '4px');
const fontSize = computed(() => props.content?.fontSize ?? '14px');
const fontWeight = computed(() => props.content?.fontWeight ?? '500');
const optionPadding = computed(() => props.content?.optionPadding ?? '8px 16px');
const pillShadow = computed(() => props.content?.pillShadow ?? true);

// MANDATORY: Expose selected value as component variable for NoCode users
const { value: selectedValue, setValue: setSelectedValue } = wwLib.wwVariable.useComponentVariable({
  uid: props.uid,
  name: 'value',
  type: 'string',
  defaultValue: computed(() => props.content?.initialValue ?? options.value[0]?.value ?? ''),
});

// Sync when initialValue changes
watch(
  () => props.content?.initialValue,
  (newVal) => {
    if (newVal !== undefined && newVal !== null) {
      setSelectedValue(newVal);
    }
  },
  { immediate: true },
);

const activeValue = computed(() => selectedValue.value ?? options.value[0]?.value);

const selectedIndex = computed(() => {
  const idx = options.value.findIndex((opt) => opt.value === activeValue.value);
  return idx >= 0 ? idx : 0;
});

function isActive(option) {
  return option.value === activeValue.value;
}

function handleSelect(option) {
  setSelectedValue(option.value);
  emit('trigger-event', {
    name: 'change:option',
    event: { value: option.value },
  });
}

function handleKeydown(event, index) {
  const count = options.value.length;
  if (!count) return;
  let newIndex = -1;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault();
    newIndex = (index + 1) % count;
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault();
    newIndex = (index - 1 + count) % count;
  } else if (event.key === 'Home') {
    event.preventDefault();
    newIndex = 0;
  } else if (event.key === 'End') {
    event.preventDefault();
    newIndex = count - 1;
  }
  if (newIndex >= 0) {
    const newOption = options.value[newIndex];
    handleSelect(newOption);
    const container = event.target.closest('.segmented-control__options');
    if (container) {
      const buttons = container.querySelectorAll('.segmented-control__option');
      buttons[newIndex]?.focus();
    }
  }
}

// Computed styles
const trackStyles = computed(() => ({
  backgroundColor: backgroundColor.value,
  borderRadius: borderRadius.value,
  padding: gap.value,
}));

const pillStyles = computed(() => {
  const count = options.value.length;
  if (count === 0) return { opacity: '0' };
  const widthPercent = 100 / count;
  return {
    width: `${widthPercent}%`,
    transform: `translateX(${selectedIndex.value * 100}%)`,
    backgroundColor: pillColor.value,
    borderRadius: `calc(${borderRadius.value} - ${gap.value})`,
    boxShadow: pillShadow.value ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
  };
});

function getOptionStyles(option) {
  return {
    color: isActive(option) ? activeTextColor.value : inactiveTextColor.value,
    fontSize: fontSize.value,
    fontWeight: fontWeight.value,
    padding: optionPadding.value,
  };
}
</script>

<style lang="scss" scoped>
.segmented-control {
  // Never style root — WeWeb overrides inline styles

  &__track {
    width: 100%;
  }

  &__options {
    display: flex;
    position: relative;
    width: 100%;
  }

  &__pill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: transform 0.3s ease;
    pointer-events: none;
  }

  &__option {
    flex: 1 1 0%;
    min-width: 0;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.2s ease;
    font-family: inherit;

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: -2px;
      border-radius: inherit;
    }
  }

  &__check {
    flex-shrink: 0;
  }

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;

    :deep(svg) {
      width: 1em;
      height: 1em;
    }
  }

  &__label {
    line-height: 1;
  }
}
</style>
