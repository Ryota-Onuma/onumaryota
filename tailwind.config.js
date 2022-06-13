module.exports = {
  // 追記
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'mainColor': '#0B2025',
      'subColor': '#027d9c',
      'fontColor': '#fff',
      'enhanceColor': '#fddd00',
      'formPlacehoderColor': '#494D4F',
      'blackMask': 'rgba(0,0,0,0.5)'
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '4.5rem',
    },
    extend: {
      width: {
        '48': '48%',
      },
      height: {
        '2px': '2px'
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }

}
