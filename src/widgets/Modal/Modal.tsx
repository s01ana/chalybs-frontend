import React, { PropsWithChildren, useContext, useRef } from "react";
import { Text } from "components";
import { Box } from "components/Box";
import { useMatchBreakpoints } from "contexts";
import { ModalV2Context } from "./ModalV2";
import { ModalBackButton, ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from "./styles";
import { ModalProps, ModalWrapperProps } from "./types";

export const MODAL_SWIPE_TO_CLOSE_VELOCITY = 300;

export const ModalWrapper = ({
  children,
  onDismiss,
  hideCloseButton,
  ...props
}: PropsWithChildren<ModalWrapperProps>) => {
  const { isMobile } = useMatchBreakpoints();
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    // @ts-ignore
    <ModalContainer
      drag={isMobile && !hideCloseButton ? "y" : false}
      dragConstraints={{ top: 0, bottom: 600 }}
      dragElastic={{ top: 0 }}
      dragSnapToOrigin
      onDragStart={() => {
        if (wrapperRef.current) wrapperRef.current.style.animation = "none";
      }}
      // @ts-ignore
      onDragEnd={(e, info) => {
        if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss) onDismiss();
      }}
      ref={wrapperRef}
      style={{ overflow: "visible" }}
    >
      <Box overflow="hidden" borderRadius="16px" {...props}>
        <>{children}</>
      </Box>
    </ModalContainer>
  );
};

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  title,
  onDismiss: onDismiss_,
  onBack,
  children,
  hideCloseButton = false,
  headerPadding = "12px 24px",
  bodyPadding = "24px",
  minWidth = "360px",
  headerRightSlot,
  bodyAlignItems,
  headerBorderColor,
  bodyTop = "0px",
  ...props
}) => {
  const context = useContext(ModalV2Context);
  const onDismiss = context?.onDismiss || onDismiss_;
  return (
    <ModalWrapper minWidth={minWidth} onDismiss={onDismiss} hideCloseButton={hideCloseButton} {...props}>
      <ModalHeader
        p={headerPadding}
        headerBorderColor={headerBorderColor}
      >
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Text fontSize="18px"><>{title}</></Text>
        </ModalTitle>
        <>
          {headerRightSlot}
          {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
        </>
      </ModalHeader>
      <ModalBody
        position="relative"
        top={bodyTop}
        // prevent drag event from propagating to parent on scroll
        onPointerDownCapture={(e) => e.stopPropagation()}
        p={bodyPadding}
        style={{ alignItems: bodyAlignItems ?? "normal" }}
      >
        <>{children}</>
      </ModalBody>
    </ModalWrapper>
  );
};

export default Modal;
