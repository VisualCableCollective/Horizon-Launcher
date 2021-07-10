// Assets
import LoadingIndicator from "../../../assets/animations/overlays/loading-indicator.gif";

// Modules
import styled, {css} from "styled-components";
import Image from 'next/image';

function LoadingOverlay({ isVisible }) {
    return (
        <Wrapper isVisible={isVisible}>
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