import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import InfoField from './components/info-area/info-field';
import LanguageModal from './components/language-modal';
import TextArea from './components/text-area/text-area';

function App() {

  return (
    <>
      <Container fluid>
        <Row className='py-5'>
          <Col>
            <TextArea />
          </Col>
          <Col xl={3}>
            <InfoField />
          </Col>
        </Row>
      </Container>
      <LanguageModal />
    </>
  );
}

export default App;
