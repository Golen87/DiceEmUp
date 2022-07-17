import { GameScene } from './../scenes/GameScene';
import { EnemyType } from './Enemy';

const S = EnemyType.SQUIRE;
const T = EnemyType.TANK;
const W = EnemyType.SQUIRE_WAVE;
const H = EnemyType.TROJAN_HORSE;
const P = EnemyType.PEASANT;

interface RoundData {
  group: EnemyType[];
  event?: (scene: GameScene) => void;
}

const blanks: RoundData[] = new Array(20).fill({group: []});

const rounds: RoundData[] = [
  {
    group: [P],
    event: (scene) => {
      scene.setStageName("Move the dice to attack");
    }
  },
  ...blanks,
  {group: [P]},
  {group: [P,P]},
  ...blanks,
  {
    group: [S],
    event: (scene) => {
      scene.setStageName("Brittle confidence");
    }
  },
  {group: []},
  // ...blanks,
  {group: [S]},
  {group: [S,S]},
  {group: [S,S,P]},
  {group: [S,P]},
  ...blanks,
  {
    group: [W],
    event: (scene) => {
      scene.setStageName("All out attack");
    }
  },
  {group: []},
  // ...blanks,
  {group: [S,S]},
  {group: [S,P,P,P]},
  ...blanks,
  {
    group: [T],
    event: (scene) => {
      scene.setStageName("Tough meat");
    }
  },
  {group: []},
  // ...blanks,
  {group: [S,T]},
  {group: [S,P,P]},
  ...blanks,
  {
    group: [H],
    event: (scene) => {
      scene.setStageName("Gift of peace");
    }
  },
  {group: []},
  {group: [S,P]},
  {group: [H]},
  {group: [S,S]},
  ...blanks,
  {group: [W]},
  {
    group: [T,T],
    event: (scene) => {
      scene.setStageName("Tough confidence");
    }
  },
  // ...blanks,
  {group: [S,P]},
  {group: [P,P]},
  {group: [S,P,P]},
  ...blanks,
  {group: [W]},
  {group: [H],
    event: (scene) => {
      scene.setStageName("Side dish");
    }
  },
  // ...blanks,
  {group: [S]},
  {group: [P,H]},
  ...blanks,
  {group: [P,P,P,P,P]},
  {
    group: [H,H,P],
    event: (scene) => {
      scene.setStageName("Peasant party");
    }
  },
  // ...blanks,
  {group: []},
  {group: []},
  {group: [P]},
  ...blanks,
  {
    group: [S,S,T,S,S],
    event: (scene) => {
      scene.setStageName("The king's platter");
    }
  },
  // ...blanks,
  {group: [W]},
  {group: []},
  {group: [H,H]},
  {group: [T,S]},
  ...blanks,
  {
    group: [P],
    event: (scene) => {
      scene.setStageName("Infinite food!");
    }
  },
];

export default rounds;
