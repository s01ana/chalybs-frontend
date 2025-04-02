import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Chalybs',
  defaultTitle: 'Chalybs',
  description:
    'Discover Chalybs, the leading DEX on KaiChain with the best rewarding in DeFi.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@chalybs',
    site: '@chalybs',
  },
  openGraph: {
    title: 'Chalybs - A next evolution DeFi exchange on KaiChain',
    description:
      'The most popular AMM on KaiChain! Earn CHL through yield farming, then stake it in Pools to earn more tokens!',
    images: [{ url: 'https://chalybs.net/logo.png' }],
  },
}
