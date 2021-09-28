import styled from 'styled-components';

export const ReviewFormStyle = styled.form`
display: flex;
    flex-direction: column;
    font-family: 'Metal Mania', cursive;
    padding-top: 3.5em;
    padding-bottom: 2em;
    align-items: center;
    align-content: center;
    margin: 0;
    max-width: 100%;
    h3 {
        font-size: 1.5em;
        font-weight: 900;
        color: #DC143C;
        margin: 0;
        text-align: left;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 50vw;
    }
    label {
        font-weight: 600;
        color: rgba(107,129,117,1);
        text-align: left;
        padding-top: 1em;
    }
    input {
        border: none;
        border-bottom: 0.25em solid rgba(107,129,117,1);
        background: none;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        font-family: 'Open Sans', sans-serif;
        font-size: 0.8em;
        font-weight: 500;
        color: rgba(107,129,117,1);
    }
    input:focus {
        outline: none;
    }
    button {
        height: 2em;
        width: 4em;
        margin-top: 1em;
        border-radius: 1rem;
        border: solid 0.2em whitesmoke;
        background: rgba(107,129,117,1);
        color: whitesmoke;
        font-size: 1.1em;
        font-family: 'Metal Mania', cursive;
        font-weight: 60;
        cursor: pointer;
    }
    a {
        font-size: 0.8em;
        font-weight: 600;
        color: rgba(225,185,152,1);
        text-decoration: underline;
        margin-top: 1.5em;
        cursor: pointer;
        padding-bottom: 2em;
    }
    select {
        font-family: Montserrat, sans-serif;
        font-size: 0.75em;
        font-weight: 500;
        color: rgba(107,129,117,1);
        background: none;
        border: 0.25em solid rgba(107,129,117,1);
        border-radius: 0.75rem;
        height: 2.5em;
        margin-top: 1em;
    }
`;