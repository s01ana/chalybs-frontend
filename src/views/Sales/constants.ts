import { ChainId } from "config/chains"
import { ChainMap } from "config/constants/types"

export const fee: ChainMap<string> = {
	[ChainId.MAINNET]: '0.001',
	[ChainId.TESTNET]: '0.001',
}

export const routers: ChainMap<any> = {
	[ChainId.MAINNET]: [
		{
			label: "Dexfinity Finance",
			value: "0xed5eBceB2ea46D74DE55DD0572Fedc035ac3b37A",
		},
	],
	[ChainId.TESTNET]: [
		{
			label: "Dexfinity Finance",
			value: "0xed5eBceB2ea46D74DE55DD0572Fedc035ac3b37A",
		},
	],
}