import { EnemyType } from './Enemy';

const S = EnemyType.SQUIRE;
const T = EnemyType.TANK;
const W = EnemyType.SQUIRE_WAVE;
const H = EnemyType.TROJAN_HORSE;
const P = EnemyType.PEASANT;

interface RoundData {
  group: EnemyType[];
  event?: () => {}
}

const blanks: RoundData[] = new Array(20).fill({group: []});

const rounds: RoundData[] = [
  {group: [P]},
  ...blanks,
  {group: [P]},
  {group: [P,P]},
  ...blanks,
  {group: [S]},
  ...blanks,
  {group: [S]},
  {group: [P,P]},
  ...blanks,
  {group: [S]},
  {group: [S,S]},
  {group: [S]},
  {group: [S,S,P]},
  ...blanks,
  {group: [W]},
  ...blanks,
  {group: [S]},
  {group: [S,S]},
  ...blanks,
  {group: [T]},
  ...blanks,
  {group: [S,T]},
  ...blanks,
  {group: [T,T]},
  {group: [S]},
  ...blanks,
  {group: [W]},
  {group: [T]},
  ...blanks,
  {group: [S]},
  {group: [P]},
  ...blanks,
  {group: [H]},
  ...blanks,
  {group: [S,H]},
  ...blanks,
  {group: [T]},
  {group: [H]},
  ...blanks,
  {group: [W]},
  {group: [H]},
  ...blanks,
  {group: [T]},
  {group: [P,P,H]},
  ...blanks,
  {group: [S]},
  ...blanks,
  {group: [P,P,P,P,P]},
  {group: [H,H]},
  ...blanks,
  {group: [T,T,T,T,T]},
  ...blanks,
  {group: [W]},
  {group: [H,H]},
  ...blanks,
];

export default rounds;
