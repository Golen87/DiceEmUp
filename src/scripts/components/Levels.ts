import { EnemyType } from './Enemy';

const S = EnemyType.SQUIRE;
const T = EnemyType.TANK;
const W = EnemyType.SQUIRE_WAVE;
const H = EnemyType.TROJAN_HORSE;

interface RoundData {
  group: EnemyType[];
  event?: () => {}
}

const rounds: RoundData[] = [
  {group: [S]},
  {group: []},
  {group: []},
  {group: []},
  {group: []},
  {group: []},
  {group: []},
  {group: [S]},
  {group: [S]},
  {group: []},
  {group: []},
  {group: []},
  {group: []},
  {group: [S]},
  {group: [S,S]},
  {group: [S]},
  {group: [S,S,S]},
  {group: []},
  {group: []},
  {group: []},
  {group: [W]},
  {group: []},
  {group: []},
  {group: []},
  {group: []},
  {group: [S]},
  {group: [S,S]},
  {group: [T]},
  {group: []},
  {group: []},
  {group: []}
];

export default rounds;
