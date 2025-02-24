import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Box } from "components";

const Stylediframe = styled.iframe`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`

const YoutubeEmbed = ({ embedId }) => (
  <Box pb="56.25%" position="relative" height="0" overflow="hidden" mb="20px">
    <Stylediframe
      width="853"
      height="480"
      // src={`https://www.youtube.com/embed/${embedId}`}
      src={embedId}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </Box>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
}

export default YoutubeEmbed