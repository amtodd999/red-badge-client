import styled from 'styled-components';

export const HomeStyle = styled.div`

  
  #izutuLogo {
    position: relative;
    text-transform: uppercase;
    letter-spacing: 6px;
    font-size: 10vw;
    font-weight: 900;
    text-decoration: none;
    color: white;
    display: inline-block;
    background-size: 120% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -ms-background-clip: text;
    -ms-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    background-image: linear-gradient(45deg, 
                      #7794ff, 
                      #44107A,
                      #FF1361,
                      #FFF800);
    animation: 1s shake infinite alternate;
  }
  
  @keyframes shake {
    0% { transform: skewX(-5deg) filter: drop-shadow(0); }
    5% { transform: skewX(5deg) ; }
    10% { transform: skewX(-5deg); }
    15% { transform: skewX(5deg); }
    20% { transform: skewX(0deg) filter: drop-shadow(4px) ; }
    100% { transform: skewX(0deg); }  
}

#poemLine1 {
    textAlign: 'center';
    font-family: 'Metal Mania', cursive;
    opacity: 0;
    color: #D3D3D3;
    animation: fadeIn ease 3s;
    animation-delay: .5s;
    animation-duration: 9s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  #poemLine2 {
    textAlign: 'center';
    font-family: 'Metal Mania', cursive;
    opacity: 0;
    color: #D3D3D3;
    animation: fadeIn ease 3s;
    animation-delay: 1.5s;
    animation-duration: 9s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  #poemLine3 {
    textAlign: 'center';
    font-family: 'Metal Mania', cursive;
    opacity: 0;
    color: #D3D3D3;
    animation: fadeIn ease 3s;
    animation-delay: 2.8s;
    animation-duration: 9s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  #poemLine4 {
    textAlign: 'center';
    font-family: 'Metal Mania', cursive;
    opacity: 0;
    color: #D2042D;
    animation: fadeIn ease 3s;
    animation-delay: 4s;
    animation-duration: 9s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

@keyframes fadeIn {
    0% { opacity: 0; }
    45% { opacity: 50%; }
    100% { opacity: 100%; }
}
`;