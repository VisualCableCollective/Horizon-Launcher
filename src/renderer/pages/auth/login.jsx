// Dialogs
import SelectLoginOptionDialog from "../../components/dialogs/login/SelectLoginOptionDialog";

// Contexts
import LoadingOverlayContext from "../../contexts/loading-overlay-context";

// Helpers
import AuthHelper from "../../helpers/AuthHelper";

// Modules
import {useState, useEffect, useContext} from "react";
import electron from 'electron';
import styled from "styled-components";

const ipcRenderer = electron.ipcRenderer || false;

function Login() {
    // Contexts
    let loadingOverlayCtx = useContext(LoadingOverlayContext);

    // States
    let [currentDialog, setCurrentDialog] = useState();

    // Init
    useEffect(() => {
        new AuthHelper().IsAuthTokenValid().then((result) => {
            if (result) {
                // set current page home page
                loadingOverlayCtx.setIsVisible(false);
            } else {
                setCurrentDialog(<SelectLoginOptionDialog setCurrentDialog={setCurrentDialog} />);
                loadingOverlayCtx.setIsVisible(false);
            }
        });
    }, []);

    return (
        <PageWrapper>
            <DialogContainer>
                {currentDialog}
            </DialogContainer>
        </PageWrapper>
    );
}

// Styles
const PageWrapper = styled.div`
  min-height: 100vh;
  min-width: 100%;
  
  display: flex;
  align-items: center;
  justify-items: center;
  
  background-color: #0f0f0f;
`;

const DialogContainer = styled.div`
  padding: 2.5rem 3.5rem;
  
  width: 100%;
  max-width: 28rem;
  
  background-color: #242424;
`;

export default Login;