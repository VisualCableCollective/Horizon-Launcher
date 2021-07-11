// Modules
import electron from 'electron';
import styled from "styled-components";

export default function SelectLoginOptionDialog({/*setCurrentDialog*/ }) {
    function LoginUsingBrowserOptionButtonClicked() {
        //setCurrentDialog(<LoginUsingBrowserDialog setCurrentDialog={setCurrentDialog} />)
        //electron.shell.openExternal(Config.getAPIServerURL() + "/auth/vcc/redirect?socketID=" + encodeURI(WebsocketHandler.echoHandler.socketId()));
    }

    return (
        <div className="dialog">
            <Title>Sign In To Your Horizon Account</Title>
            <ContentWrapper>
                <DialogButton onClick={LoginUsingBrowserOptionButtonClicked}>
                    Sign in using your browser
                </DialogButton>
                <DialogButton disabled>
                    Sign in using the Horizon app
                </DialogButton>
            </ContentWrapper>
            <FooterWrapper>
                <FooterSecondaryText>Don't have an Horizon account yet?</FooterSecondaryText>
                <FooterPrimaryButton className="text-sm font-medium">Sign Up</FooterPrimaryButton>
            </FooterWrapper>
        </div>
    );
}

const Title = styled.h1`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
`;

const ContentWrapper = styled.div`
  margin: 1rem 0;
  
  display: grid;
  gap: 0.75rem;
`;

const DialogButton = styled.button`
  padding: 0.75rem 1.25rem;
  width: 100%;
  
  outline: none;

  --tw-bg-opacity: 0.6;
  background-color: #3b3b3b;
  border-radius: 0.125rem;
  
  transition-property: all;
  transition-duration: 100ms;
  
  :hover{
    --tw-bg-opacity: 0.8;
  }
  
  :focus{
    --tw-bg-opacity: 1;
    outline: none;
  }
  
  :disabled{
    --tw-bg-opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-items: center;
`;

const FooterSecondaryText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  --tw-text-opacity: 0.6;
  color: white;
  margin-right: 0.25rem;
`;

const FooterPrimaryButton = styled.button`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
`;