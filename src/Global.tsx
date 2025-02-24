import { AppTheme } from 'theme'
import { createGlobalStyle } from 'styled-components'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends AppTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Space-Grotesk', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    // background: url('/images/background.png');
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-position: center;
    overflow-x: hidden;

    img {
      height: auto;
      max-width: 100%;
    }
  }

  #__next {
    position: relative;
  }

  #portal-root {
    position: relative;
  }

  @font-face {
    font-family: "Basel";
    font-style: normal;
    font-weight: 485;
    src: url("/fonts/Basel-Grotesk-Book.woff2") format("woff2");

  @font-face {
    font-family: "Space-Grotesk";
    font-style: normal;
    font-weight: 400;
    src: url("/fonts/SpaceGrotesk-Regular.ttf") format("truetype");
  }
`

export default GlobalStyle
