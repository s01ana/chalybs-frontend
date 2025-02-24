import memoize from 'lodash/memoize'

export type PageMeta = {
  title: string
  description?: string
  image?: string
}

export const DEFAULT_META: PageMeta = {
  title: 'Chalybs',
  description: '',
  image: '',
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string; image?: string } }
  defaultTitleSuffix: string
}

const getPathList = (): PathList => {
  return {
    paths: {
      '/': { title: 'Home'},
      '/swap': { basePath: true, title: 'Swap', image: `https://dexfinity.finance/images/web/og/swap.jpg` },
      '/add': { basePath: true, title: 'Add LP', image: `https://dexfinity.finance/images/web/og/liquidity.jpg` },
      '/remove': { basePath: true, title: 'Remove LP', image: `https://dexfinity.finance/images/web/og/liquidity.jpg` },
      '/liquidity': { title: 'Liquidity', image: `https://dexfinity.finance/images/web/og/liquidity.jpg` },
      '/find': { title: 'Import LP' },
      '/farms': { title: 'Farms', image: `https://dexfinity.finance/images/web/og/farms.jpg` },
      '/pools': { title: 'Pools', image: `https://dexfinity.finance/images/web/og/farms.jpg` },
      '/info': {
        title: "Overview - Info",
        description: 'View statistics for Dexfinity exchanges.',
        image: `https://dexfinity.finance/images/web/og/info.jpg`,
      },
      '/info/pairs': {
        title: 'Pairs - Info',
        description: 'View statistics for Dexfinity exchanges.',
        image: `https://dexfinity.finance/images/web/og/info.jpg`,
      },
      '/info/tokens': {
        title: "Tokens - Info",
        description: 'View statistics for Dexfinity exchanges.',
        image: `https://dexfinity.finance/images/web/og/info.jpg`,
      },
      '/multisend': { title: 'Multi-Sender' },
      // '/multisend/history': { title: 'Multi-Send History' },
      '/token': { title: 'Token Creator' },
      '/lock': { title: 'Token Locker' },
      '/lock/create': { title: 'Create a Lock' },
      '/lock/token': { basePath: true, title: 'View Token Lock' },
      '/lock/record/': { basePath: true, title: 'View Lock Info' },
      // '/vaults': { basePath: true, title: 'Vaults' },
      '/presale': { basePath: true, title: 'Presale' },
    },
    defaultTitleSuffix: 'Chalybs',
  }
}

export const getCustomMeta = memoize(
  (path: string): PageMeta | null => {
    const pathList = getPathList()
    const basePath = Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]
    const pathMetadata = pathList.paths[path] ?? (basePath && pathList.paths[basePath])

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
        image: pathMetadata.image,
      }
    }
    return null
  },
  (path) => `${path}`,
)
