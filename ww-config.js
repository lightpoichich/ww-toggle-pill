export default {
  editor: {
    label: {
      en: 'Segmented Control',
    },
    icon: 'toggle-on',
  },
  triggerEvents: [
    {
      name: 'change:option',
      label: { en: 'On option change' },
      event: { value: '' },
    },
  ],
  properties: {
    options: {
      label: { en: 'Options' },
      type: 'Array',
      section: 'settings',
      defaultValue: [
        { label: 'Light', icon: '', value: 'light' },
        { label: 'Dark', icon: '', value: 'dark' },
        { label: 'Device', icon: '', value: 'device' },
      ],
      options: {
        expandable: true,
        getItemLabel(item, index) {
          return item.label || `Option ${index + 1}`;
        },
        item: {
          type: 'Object',
          defaultValue: { label: 'New option', icon: '', value: '' },
          options: {
            item: {
              label: {
                label: { en: 'Label' },
                type: 'Text',
              },
              icon: {
                label: { en: 'Icon' },
                type: 'Icon',
              },
              value: {
                label: { en: 'Value' },
                type: 'Text',
              },
            },
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'An array of options: [{ label, icon, value }]',
      },
      /* wwEditor:end */
    },
    initialValue: {
      label: { en: 'Initial value' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'light',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The value of the currently selected option',
      },
      /* wwEditor:end */
    },
    showCheckmark: {
      label: { en: 'Show checkmark' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },
    showIcons: {
      label: { en: 'Show icons' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },
    pillColor: {
      label: { en: 'Pill color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#4A6CF7',
    },
    activeTextColor: {
      label: { en: 'Active text color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#FFFFFF',
    },
    inactiveTextColor: {
      label: { en: 'Inactive text color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#64748B',
    },
    backgroundColor: {
      label: { en: 'Background color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#F1F5F9',
    },
    borderRadius: {
      label: { en: 'Border radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '999px',
    },
    gap: {
      label: { en: 'Gap' },
      type: 'Length',
      section: 'style',
      defaultValue: '4px',
    },
    fontSize: {
      label: { en: 'Font size' },
      type: 'Length',
      section: 'style',
      defaultValue: '14px',
    },
    fontWeight: {
      label: { en: 'Font weight' },
      type: 'TextSelect',
      section: 'style',
      defaultValue: '500',
      options: {
        options: [
          { value: '400', label: { en: 'Normal' } },
          { value: '500', label: { en: 'Medium' } },
          { value: '600', label: { en: 'Semibold' } },
          { value: '700', label: { en: 'Bold' } },
        ],
      },
    },
    optionPadding: {
      label: { en: 'Option padding' },
      type: 'Length',
      section: 'style',
      defaultValue: '8px 16px',
    },
    pillShadow: {
      label: { en: 'Pill shadow' },
      type: 'OnOff',
      section: 'style',
      defaultValue: true,
    },
  },
};
