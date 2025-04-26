import { DropdownMenuItemType, MenuItemsType } from 'widgets/Menu'
import { DropdownMenuItems } from 'components/DropdownMenu'
import {
  MoreIcon
} from '../../Svg'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  chainId?: number,
) => ConfigMenuItemsType[] = (chainId) =>
  [
    {
      label: '',
      icon: MoreIcon,
      fillIcon: MoreIcon,
      href: '',
      showItemsOnMobile: true,
      items: [
        {
          label: 'Swap',
          href: '/swap',
        },
        {
          label: 'Liquidity',
          href: '/liquidity',
        },
        {
          label: 'Farms',
          href: '/farms',
        },
        {
          label: 'Pools',
          href: '/pools',
        },
        // {
        //   label: 'Vaults',
        //   href: '/vaults',
        // },
        // {
        //   label: 'Leverage Trading',
        //   href: '/xtrade',
        // },
        // {
        //   label: 'Bonds',
        //   href: '/bonds',
        // },
        // {
        //   label: 'Sales',
        //   href: '/sales',
        // },
        // {
        //   label: 'Token Creator',
        //   href: '/token',
        // },
        // {
        //   label: 'Token Multi-sender',
        //   href: '/multisend',
        // },
        // {
        //   label: 'Token Locker',
        //   href: '/lock',
        // },
        {
          label: 'Twitter',
          href: 'https://x.com/Chalybs01',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Telegram',
          href: 'https://t.me/+fDl9tssNdvk0N2Rh',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Discord',
          href: 'https://discord.gg/',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Docs',
          href: 'https://docs.chalybs.finance/',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
