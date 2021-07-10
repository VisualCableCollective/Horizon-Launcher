// Assets
import LoadingIndicator from "../../../assets/animations/overlays/loading-indicator.gif";

// Contexts
import LoadingOverlayContext from "../../../contexts/loading-overlay-context";

// Modules
import styled, {css} from "styled-components";
import Image from 'next/image';
import {useContext} from "react";

function LoadingOverlay() {
    const loadingOverlayCtx = useContext(LoadingOverlayContext);

    return (
        <Wrapper isVisible={loadingOverlayCtx.isVisible}>
            <Image src={LoadingIndicator} alt="Loading..." height={"100px"} width={"100px"} layout={"fixed"}  style={{maxHeight: "100px"}} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  
  z-index: 10;
  
  min-width: 100%;
  min-height: 100vh;
  
  background-color: black;
  
  transition-property: opacity;
  transition-duration: 500ms;

  ${props =>
          props.isVisible ? 
                  css`
                    opacity: 100%;` : 
                  css`
                    opacity: 0; 
                    pointer-events: none;`
};
`

export default LoadingOverlay;