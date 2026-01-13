import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Neuzeit Grotesk Bold';
    src: url("/static/font/NeuzeitGrotesk-Bold.woff2") format("woff2"),
      url("/static/font/NeuzeitGrotesk-Bold.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Fira Code';
    src: url("/static/font/FiraCode-Regular.woff2") format("woff2"),
      url("/static/font/FiraCode-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Biotif';
    src: url("/static/font/Biotif-Bold.woff2") format("woff2"),
      url("/static/font/Biotif-Bold.woff") format("woff");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Biotif';
    src: url("/static/font/Biotif-Book.woff2") format("woff2"),
      url("/static/font/Biotif-Book.woff") format("woff");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Biotif';
    src: url("/static/font/Biotif-Regular.woff2") format("woff2"),
      url("/static/font/Biotif-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Biotif';
    src: url("/static/font/Biotif-RegularItalic.woff2") format("woff2"),
      url("/static/font/Biotif-RegularItalic.woff") format("woff");
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  * {
    font-family: ${({ theme }) => theme.fonts.body};
  }

  html {
    scroll-behavior: smooth;
  }

  html, body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.colors.background};
  }

  .page-transition {
    /* No animation on the page wrapper itself */
  }

  /* Only animate the main content, not navbar or footer */
  .page-transition main,
  .page-transition [class*="PostMain"],
  .page-transition [class*="Home"] {
    animation: fadeInUp 0.25s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Staggered animation for content children only */
  .page-transition main > * > *,
  .page-transition [class*="PostMain"] > * > *,
  .page-transition [class*="Home"] > * > * {
    animation: fadeInUpStagger 0.3s ease-out;
    animation-fill-mode: both;
  }

  .page-transition main > * > *:nth-child(1),
  .page-transition [class*="PostMain"] > * > *:nth-child(1),
  .page-transition [class*="Home"] > * > *:nth-child(1) {
    animation-delay: 0.03s;
  }

  .page-transition main > * > *:nth-child(2),
  .page-transition [class*="PostMain"] > * > *:nth-child(2),
  .page-transition [class*="Home"] > * > *:nth-child(2) {
    animation-delay: 0.06s;
  }

  .page-transition main > * > *:nth-child(3),
  .page-transition [class*="PostMain"] > * > *:nth-child(3),
  .page-transition [class*="Home"] > * > *:nth-child(3) {
    animation-delay: 0.09s;
  }

  .page-transition main > * > *:nth-child(4),
  .page-transition [class*="PostMain"] > * > *:nth-child(4),
  .page-transition [class*="Home"] > * > *:nth-child(4) {
    animation-delay: 0.12s;
  }

  .page-transition main > * > *:nth-child(5),
  .page-transition [class*="PostMain"] > * > *:nth-child(5),
  .page-transition [class*="Home"] > * > *:nth-child(5) {
    animation-delay: 0.15s;
  }

  @keyframes fadeInUpStagger {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  kbd {
    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.secondary};
    padding: 1px 5px;
    border-radius: 4px;
    transition: background ${({ theme }) => theme.transitions.duration} ease-in-out;
    font-family: ${({ theme }) => theme.fonts.code};
    font-size: 14px;
  }

  svg {
    width: 32px;
    height: 32px;
    fill: white;
  }

  figure {
    margin: 0;
  }

  twitterwidget {
    margin: 0 auto;
  }

  code {
    background: #151417;
    border-radius: ${({ theme }) => theme.radii.borderRadius};
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.code};
    font-size: 15px;
  }

  :not(pre) > code {
    padding: 4px;
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 48px;
    line-height: 50px;
    margin: 0 0 20px;
    color: ${({ theme }) => theme.colors.primary};
  }

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 60px 0 0;
    font-size: 24px;
  }

  h3, h3 a {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
    margin: 20px 0 0;
  }

  ul {
    margin: 0;
  }

  img {
    border-radius: 8px;
    min-width: 100%;
    max-width: 100%;
  }

  p {
    margin: 20px 0;
    color: ${({ theme }) => theme.colors.secondary};
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.secondary};
    font-style: italic;
    margin: 0;
    padding-left: 20px;
  }

  a {
    border-bottom: .5px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: opacity ${({ theme }) => theme.transitions.duration} ease-in-out;
  }

  a:hover, a:focus {
    opacity: 0.8;
  }
`
