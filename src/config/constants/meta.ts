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
      '/swap': { basePath: true, title: 'Swap'},
      '/add': { basePath: true, title: 'Add LP'},
      '/remove': { basePath: true, title: 'Remove LP'},
      '/liquidity': { title: 'Liquidity'},
      '/find': { title: 'Import LP' },
      '/farms': { title: 'Farms'},
      '/pools': { title: 'Pools'},
      '/info': {
        title: "Overview - Info"
      },
      '/info/pairs': {
        title: 'Pairs - Info'
      },
      '/info/tokens': {
        title: "Tokens - Info"
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
