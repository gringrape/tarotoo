import img00 from '../assets/00-The-Pool.png';
import img01 from '../assets/01-The-Magician.png';
import img02 from '../assets/02-THE-High-Priestess.png';
import img03 from '../assets/03-The-Empress.png';
import img04 from '../assets/04-The-Emperor.png';
import img05 from '../assets/05-The-Hierophant.png';
import img06 from '../assets/06-The-Lovers.png';
import img07 from '../assets/07-The-Chariot.png';
import img08 from '../assets/08-Strength.png';
import img09 from '../assets/09-The-Hermit.png';
import img10 from '../assets/10-Wheel-of-Fortune.png';
import img11 from '../assets/11-Justice.png';
import img12 from '../assets/12-The-Hanged-Man.png';
import img13 from '../assets/13-Death.png';
import img14 from '../assets/14-Temperance.png';
import img15 from '../assets/15-The-Devil.png';
import img16 from '../assets/16-The-Tower.png';
import img17 from '../assets/17-The-Star.png';
import img18 from '../assets/18-The-Moon.png';
import img19 from '../assets/19-The-Sun.png';
import img20 from '../assets/20-Judgement.png';
import img21 from '../assets/21-The-World.png';

export interface TarotCardData {
    id: number;
    name: string;
    image: string;
    desc: string; // Basic keyword or description
}

export const TAROT_DATA: TarotCardData[] = [
    { id: 0, name: "The Fool", image: img00, desc: "새로운 시작, 모험, 순수함" },
    { id: 1, name: "The Magician", image: img01, desc: "창조력, 자신감, 재능" },
    { id: 2, name: "The High Priestess", image: img02, desc: "지혜, 직관, 신비" },
    { id: 3, name: "The Empress", image: img03, desc: "풍요, 아름다움, 모성" },
    { id: 4, name: "The Emperor", image: img04, desc: "권위, 구조, 리더십" },
    { id: 5, name: "The Hierophant", image: img05, desc: "전통, 신념, 조언" },
    { id: 6, name: "The Lovers", image: img06, desc: "사랑, 조화, 선택" },
    { id: 7, name: "The Chariot", image: img07, desc: "승리, 의지, 전진" },
    { id: 8, name: "Strength", image: img08, desc: "인내, 용기, 내면의 힘" },
    { id: 9, name: "The Hermit", image: img09, desc: "성찰, 고독, 인도" },
    { id: 10, name: "Wheel of Fortune", image: img10, desc: "운명, 변화, 순환" },
    { id: 11, name: "Justice", image: img11, desc: "정의, 균형, 진실" },
    { id: 12, name: "The Hanged Man", image: img12, desc: "희생, 새로운 관점, 정지" },
    { id: 13, name: "Death", image: img13, desc: "종결, 변화, 재탄생" },
    { id: 14, name: "Temperance", image: img14, desc: "절제, 조화, 균형" },
    { id: 15, name: "The Devil", image: img15, desc: "속박, 유혹, 물질주의" },
    { id: 16, name: "The Tower", image: img16, desc: "파괴, 갑작스러운 변화, 깨달음" },
    { id: 17, name: "The Star", image: img17, desc: "희망, 영감, 평온" },
    { id: 18, name: "The Moon", image: img18, desc: "불안, 환상, 잠재의식" },
    { id: 19, name: "The Sun", image: img19, desc: "성공, 활력, 기쁨" },
    { id: 20, name: "Judgement", image: img20, desc: "심판, 부활, 각성" },
    { id: 21, name: "The World", image: img21, desc: "완성, 통합, 성취" },
];
