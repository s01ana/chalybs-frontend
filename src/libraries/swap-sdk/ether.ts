import { ChainId } from 'config/chains'
import invariant from 'tiny-invariant'
import { Currency, NativeCurrency, Token } from 'libraries/swap-sdk-core'
import { WETH9 } from './constants'

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'ETH', 'Ether')
  }

  public get wrapped(): Token {
    const weth9 = WETH9[this.chainId as ChainId.KAI]

    invariant(!!weth9, 'WRAPPED')

    return weth9
  }

  private static _etherCache: { [chainId: number]: Ether } = {}

  public static onChain(chainId: number): Ether {
    if (!this._etherCache[chainId]) {
      this._etherCache[chainId] = new Ether(chainId)
    }

    return this._etherCache[chainId]
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
