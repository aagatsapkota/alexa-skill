const SANS_DEFAULT = ['Helvetica', 'arial', 'sans-serif']

// eslint-disable-next-line import/prefer-default-export
export const typography = {
  body: {
    default: ['Gothic A1', ...SANS_DEFAULT].join(', '),
  },
  heading: {
    default: ['Gilroy', ...SANS_DEFAULT].join(', '),
  },
  sizes: {
    default: '.95em',
    XL: '3em',
    LG: '1.5em',
    MD: '1.2em',
    SM: '.9em',
    XS: '.7em',
    headings: {
      h1: 'XL',
      h2: 'LG',
      h3: 'XL',
      h4: 'MD',
      h5: 'SM',
      h6: 'SM',
    },
  },
}
