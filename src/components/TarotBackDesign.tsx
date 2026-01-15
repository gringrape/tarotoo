import styled from 'styled-components';

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;

  .ornament {
    fill: none;
    stroke: #ffffff;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  
  .bg-pattern {
    stroke: rgba(255, 255, 255, 0.15);
    stroke-width: 1;
  }

  .main-white {
    fill: #ffffff;
    stroke: #ffffff;
  }

  .clock-stroke {
    fill: none;
    stroke: #ffffff;
    stroke-width: 2;
  }

  .glow {
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.6));
  }
`;

export function TarotBackDesign() {
    return (
        <StyledSvg viewBox="0 0 320 560" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
                <g id="corner-decor">
                    <path d="M 20 100 C 20 50, 50 20, 100 20" className="ornament bg-pattern" strokeWidth="2" />
                    <path d="M 30 100 C 30 60, 60 30, 100 30" className="ornament bg-pattern" strokeWidth="1" />
                    <path d="M 20 20 Q 50 50 40 80" className="ornament bg-pattern" />
                    <path d="M 20 20 Q 50 50 80 40" className="ornament bg-pattern" />
                    <circle cx="45" cy="45" r="5" className="ornament bg-pattern" />
                    <circle cx="35" cy="110" r="3" fill="#fff" opacity="0.5" />
                    <circle cx="110" cy="35" r="3" fill="#fff" opacity="0.5" />
                </g>
            </defs>

            <rect width="100%" height="100%" fill="url(#gridPattern)" />

            <use href="#corner-decor" />
            <use href="#corner-decor" transform="scale(-1, 1) translate(-320, 0)" />
            <use href="#corner-decor" transform="scale(1, -1) translate(0, -560)" />
            <use href="#corner-decor" transform="scale(-1, -1) translate(-320, -560)" />

            <g transform="translate(160, 60)">
                <path d="M -40 0 Q -20 20 0 10 Q 20 20 40 0" className="ornament" stroke="rgba(255,255,255,0.3)" fill="none" />
                <circle cx="0" cy="15" r="3" fill="#fff" />
            </g>
            <g transform="translate(160, 500) scale(1,-1)">
                <path d="M -40 0 Q -20 20 0 10 Q 20 20 40 0" className="ornament" stroke="rgba(255,255,255,0.3)" fill="none" />
                <circle cx="0" cy="15" r="3" fill="#fff" />
            </g>

            <g transform="translate(160, 280)" className="glow">
                <circle cx="0" cy="0" r="110" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <circle cx="0" cy="0" r="100" fill="none" stroke="#fff" strokeWidth="3" />
                <circle cx="0" cy="0" r="94" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="2 4" />

                <g id="spikes">
                    <path d="M 0 -100 L 8 -120 L 0 -130 L -8 -120 Z" fill="#fff" />
                    <path d="M 0 100 L 8 120 L 0 130 L -8 120 Z" fill="#fff" />
                    <path d="M 100 0 L 120 8 L 130 0 L 120 -8 Z" fill="#fff" />
                    <path d="M -100 0 L -120 8 L -130 0 L -120 -8 Z" fill="#fff" />
                    <g transform="rotate(30)"><path d="M 0 -100 L 5 -110 L 0 -115 L -5 -110 Z" fill="#fff" /></g>
                    <g transform="rotate(60)"><path d="M 0 -100 L 5 -110 L 0 -115 L -5 -110 Z" fill="#fff" /></g>
                    <g transform="rotate(120)"><path d="M 0 -100 L 5 -110 L 0 -115 L -5 -110 Z" fill="#fff" /></g>
                    <g transform="rotate(150)"><path d="M 0 -100 L 5 -110 L 0 -115 L -5 -110 Z" fill="#fff" /></g>
                    <g transform="rotate(210)"><path d="M 0 -100 L 5 -110 L 0 -115 L -5 -110 Z" fill="#fff" /></g>
                    <g transform="rotate(240)"><path d="M 0 -100 L 5 -110 L 0 -115 L -5 -110 Z" fill="#fff" /></g>
                    <g transform="rotate(300)"><path d="M 0 -100 L 5 -110 L 0 -115 L -5 -110 Z" fill="#fff" /></g>
                    <g transform="rotate(330)"><path d="M 0 -100 L 5 -110 L 0 -115 L -5 -110 Z" fill="#fff" /></g>
                </g>

                <g fontFamily="serif" fontWeight="bold" fontSize="20" textAnchor="middle" fill="#fff" dominantBaseline="central">
                    <text x="0" y="-75">XII</text>
                    <text x="38" y="-65">I</text>
                    <text x="65" y="-38">II</text>
                    <text x="75" y="0" dy="2">III</text>
                    <text x="65" y="38">IV</text>
                    <text x="38" y="65">V</text>
                    <text x="0" y="75" dy="2">VI</text>
                    <text x="-38" y="65">VII</text>
                    <text x="-65" y="38">VIII</text>
                    <text x="-75" y="0" dy="2">IX</text>
                    <text x="-65" y="-38">X</text>
                    <text x="-38" y="-65">XI</text>
                </g>

                <g filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.5))">
                    <path d="M 0 0 L -5 -60 L 0 -85 L 5 -60 Z" fill="#fff" />
                    <path d="M 0 0 L -6 -40 L 0 -60 L 6 -40 Z" fill="#fff" transform="rotate(-25)" />
                    <circle cx="0" cy="0" r="6" fill="#1a233a" stroke="#fff" strokeWidth="2" />
                </g>
            </g>

            <path d="M 110 200 Q 160 220 210 200" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
            <path d="M 110 360 Q 160 340 210 360" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />

        </StyledSvg>
    );
}
