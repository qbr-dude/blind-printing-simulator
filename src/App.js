import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import InfoField from './components/info-area/info-field';
import TextArea from './components/text-area/text-area';

function App() {
  ;

  return (
    <Container className='app' fluid>
      <Row className='py-5'>
        <Col>
          <TextArea />
        </Col>
        <Col xl={3}>
          <InfoField />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
