/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./index.js"],
  theme: {
    extend: {
      screens: {
        sm: '370px', // custom sm breakpoint at 370px
      },
      colors: {
        'marine-blue': 'hsl(213, 96%, 18%)',
        'purplish-blue': 'hsl(243, 100%, 62%)',
        'pastel-blue': 'hsl(228, 100%, 84%)',
        'light-blue': 'hsl(206, 94%, 87%)',
        'strawberry-red': 'hsl(354, 84%, 57%)',
        'cool-gray': 'hsl(231, 11%, 63%)',
        'light-gray': 'hsl(229, 24%, 87%)',
        'magnolia': 'hsl(217, 100%, 97%)',
        'alabaster': 'hsl(231, 100%, 99%)',
        'white': 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      fontSize: {
        'body': '16px',
      },
      backgroundImage: {
        "sidebar-desktop": "url('./assets/images/bg-sidebar-mobile.svg')", // Corrected path with '/'
        "sidebar-mobile":  "url('./assets//images//bg-sidebar-mobile.svg')",  // Corrected path with '/'
      },
      screens: {
        'max-xs': { min: '376px' }, 
      },
    },
  },
  plugins: [],
};
