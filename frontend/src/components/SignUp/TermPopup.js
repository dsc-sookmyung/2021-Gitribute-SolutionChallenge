import React from "react";
import styled from 'styled-components';
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import MyTheme from '../Common/MyTheme';

const contentStyle = {
  maxWidth: "90vw",
  width: "50vw",
  background: "#fff",
};

const TermPopup = () => (
  <>
    <Popup
      trigger={<a href="#term">The Terms & Conditions</a>}
      modal
      contentStyle={contentStyle}
    >
      {close => (
        <>
        <Background/>
        <div className="modal">
          <ThemeProvider theme={MyTheme}>
            <Top>
              <Title>The Terms & Conditions</Title>
              <a className="close" onClick={close}>
                <Button 
                  color="secondary" 
                  variant="text"
                  size="large"
                  >
                    &times;
                </Button>
              </a>
            </Top>
            <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
            <Content>
              About terms and conditions ... <br/ >
              . <br/ >
              . <br/ >
              . <br/ >
              <br />
            </Content>
            <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
            <OkButton>
              <Button 
                onClick={() => { close(); }}
                size="small"
                variant="contained"
                color="secondary"
              >
                OK
              </Button>
            </OkButton>
          </ThemeProvider>
        </div>
        </>
      )}
    </Popup>
  </>
);

export default TermPopup;

const Background = styled.div`
  z-index: -1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0,0.5);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  padding-left: 1rem;
`;

const Content = styled.div`
  padding: 1rem;
`;

const OkButton = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
`;
