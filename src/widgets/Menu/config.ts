import {
	TwitterIcon,
	TelegramIcon,
	// RedditIcon,
	// InstagramIcon,
	// GithubIcon,
	ResourcesIcon,
	DiscordIcon,
	GithubIcon,
	// MediumIcon,
	// YoutubeIcon,
} from "components/Svg";

export const MENU_HEIGHT = 64;
export const MOBILE_MENU_HEIGHT = 44;
export const TOP_BANNER_HEIGHT = 48;
export const TOP_BANNER_HEIGHT_MOBILE = 80;
export const SIDEBAR_WIDTH_FULL = 260;
export const SIDEBAR_WIDTH_REDUCED = 54;

export const socials = [
	{
		label: "Twitter",
		icon: TwitterIcon,
		href: "https://x.com/xdexfinity",
	},
	{
		label: "Telegram",
		icon: TelegramIcon,
		href: "https://t.me/DexfinityFinance"
	},
	{
	  label: "Github",
	  icon: GithubIcon,
	  href: "https://github.com/dexfinity-finance",
	},
	// {
	// 	label: "Discord",
	// 	icon: DiscordIcon,
	// 	href: "https://discord.com/invite/",
	// },
	// {
	//   label: "Medium",
	//   icon: MediumIcon,
	//   href: "https://medium.com",
	// },
	{
		label: "Docs",
		icon: ResourcesIcon,
		href: "https://docs.dexfinity.finance",
	},
];