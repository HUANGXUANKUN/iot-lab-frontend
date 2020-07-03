import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { sendCommand } from "../../assets/apis/device-api";

const TextSectionStyled = styled.div`
  display: grid; 
  margin-top: 15px; 
  grid-gap: 5px; 
`

class CommandTextSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id : props.device.id,
      value: 'Enter your command'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      sendCommand("text", this.state.value, this.state.id);
      this.setState({ value: 'Enter your command' });
    } catch (err) {
      alert('Fail to send command');
    }
    alert('Sent successfully');
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <label>Text Command
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <textarea style={{ minHeight: 100 }, { minWidth: 400 }} rows="3" value={this.state.value} onChange={this.handleChange} />
          <div />
          <Button>
            <input variant="primary" size="lg" type="submit" value="Submit" />
          </Button>
        </form>
      </label>
    );
  }
}

export default CommandTextSection;

