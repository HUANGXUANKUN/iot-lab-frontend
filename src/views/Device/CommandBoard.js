// import React, { useContext } from 'react';
// import { Button } from 'react-bootstrap';
// import styled from 'styled-components';
// import { sendCommand } from "../../apis/command-api";

// const CommandBoardStyled = styled.div`
//   display: grid; 
//   grid-gap: 15px; 
//   grid-template-columns:  repeat(auto-fill, minmax(100px, 1fr)); 
// `


// const onClickHandler = (content, sendCommand, deviceId) => {
//   sendCommand("default", content, deviceId);
// }

// export default function (props) {
//   return (
//     <CommandBoardStyled class="btn-group"role="group" aria-label="command button group">
//         <Button type="button" size='sm' variant="secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command A</Button>
//         <Button type="button" size='sm' variant="secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command B</Button>
//         <Button type="button" size='sm' variant="secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command C</Button>
//         <Button type="button" size='sm' variant="secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command D</Button>
//         <Button type="button" size='sm' variant="secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command E</Button>
//         <Button type="button" size='sm' variant="secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command F</Button>
//         <Button type="button" size='sm' variant="secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command G</Button>
//     </CommandBoardStyled>
//   );
// };

