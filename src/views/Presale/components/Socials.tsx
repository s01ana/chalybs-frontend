import React from "react"
import { Link, Flex, FlexProps } from "components"
import { socials } from "../types"

interface Props {
    props?: FlexProps
    links: (string | undefined)[]
}

const SocialLinks: React.FC<React.PropsWithChildren<Props>> = ({ ...props }) => (
  <Flex {...props.props} data-theme="dark">
    {socials.map((social, index) => {
      const iconProps = {
        width: `${social.label === "Twitter" ? "17px" : "20px"}`,
        height: `${social.label === "Twitter" ? "17px" : "20px"}`,
        color: "textSubtle",
        style: { cursor: "pointer" },
      }
      const Icon = social.icon
      const mr = index < socials.length - 1 ? "24px" : 0
      if (props.links && props.links[index] !== "" && props.links[index] !== undefined) {
        const _link = props.links[index]
        const link = _link ? (_link.startsWith("http") ? _link : `https://${_link}`) : ""
        return (
          <Link external key={social.label} href={link} aria-label={social.label} mr={mr}>
            <Icon {...iconProps} />
          </Link>
        )
      }
      return <></>
    })}
  </Flex>
)

export default SocialLinks
