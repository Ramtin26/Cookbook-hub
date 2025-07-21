import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{

    &, &.light-mode{
      --color-yellow-0: #fff;
      --color-yellow-50: #fffcf1;
      --color-yellow-100: #fff7d6;
      --color-yellow-200: #ffeeaa;
      --color-yellow-300: #ffe066;
      --color-yellow-400: #ffd53a;
      --color-yellow-500: #fcbf1e;
      --color-yellow-600: #e0a600;
      --color-yellow-700: #b58b00;
      --color-yellow-800: #946f00;
      --color-yellow-900: #775b00;

      --color-border: #e0e0e0;

      --color-herbal-100: #d9f3d1;
      --color-herbal-700: #257a3e;
      --color-meaty-100: #fcdcdc;
      --color-meaty-700: #b91c1c;
      --color-indigoish-100: #dceeff;
      --color-indigoish-700: #1e40af;
      --color-grey-100: #f0f0f0;
      --color-grey-700: #6b7280;
      --color-cream-100: #E0F7F1;
      --color-cream-700:	#00BFA5;
      --color-beige-100:	#FFF3E0; 
      --color-beige-700:	#FB8C00;
        
      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;    
        
      --backdrop-color: rgba(255, 255, 255, 0.1);
        
      --shadow-box-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-box-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
      --shadow-box-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
        
      --image-grayscale: 0;
      --image-opacity: 100%;
    }
    
    &.dark-mode{
      --color-yellow-0: #2e2118;
      --color-yellow-50: #3b2b17;
      --color-yellow-100: #4d3512;
      --color-yellow-200: #60420f;
      --color-yellow-300: #75510e;
      --color-yellow-400: #936208;
      --color-yellow-500: #b78e00;
      --color-yellow-600: #d9ac1a;
      --color-yellow-700: #f6c945;
      --color-yellow-800: #fde47f;
      --color-yellow-900: #fff7d6;

      --color-border: #3a3a3a ;

      --color-herbal-100: #224d2f;
      --color-herbal-700: #98e1a1;
      --color-meaty-100: #4a0d0d;
      --color-meaty-700: #ff5f5f;
      --color-indigoish-100: #123252;
      --color-indigoish-700: #71c7ec;
      --color-grey-100: #2c2e31;
      --color-grey-700: #9ca3af;
      --color-cream-100: #1A3B36;
      --color-cream-700: #70EFDE;
      --color-beige-100: #3B2F1A;
      --color-beige-700: #FFD180;

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(0, 0, 0, 0.3);
    
      --shadow-box-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      --shadow-box-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      --shadow-box-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
    
      --image-grayscale: 10%;
      --image-opacity: 90%;
    }

    --color-primary-50: #fff4f2;
    --color-primary-100: #ffe4df;
    --color-primary-200: #ffccc5;
    --color-primary-300: #ff9f8f;
    --color-primary-400: #f86f5d;
    --color-primary-500: #e14f37;
    --color-primary-600: #c13d2b;
    --color-primary-700: #a12f23;
    --color-primary-800: #81241c;
    --color-primary-900: #691a15;

}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Ancizar Serif", sans-serif;
  color: var(--color-yellow-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-yellow-200);
  color: var(--color-yellow-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-primary-600);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
