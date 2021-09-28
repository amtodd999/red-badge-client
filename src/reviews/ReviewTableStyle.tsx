import styled from 'styled-components';

export const ReviewTableStyle = styled.table`
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    
    width: 100%;
    table-layout: fixed;
    color: green;

    button {
        height: 2em;
        width: 4em;
        margin-top: 1em;
        border-radius: 1rem;
        border: solid 0.2em whitesmoke;
        background: rgba(107,129,117,1);
        color: whitesmoke;
        font-size: 1em;
        font-family: 'Metal Mania', cursive;
        font-weight: 60;
        cursor: pointer;
    }

  tr {
    background-color: #f8f8f8
    border: 1px solid purple;
    padding: .35em;
  }
  
  th, td {
    padding: .625em;
    text-align: left;
    color: #D3D3D3;
  }
  
  th {
    font-size: .85em;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-family: 'Metal Mania', cursive;
  }
`;