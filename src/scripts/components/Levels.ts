import { GameScene } from './../scenes/GameScene';
import { EnemyType } from './Enemy';

const S = EnemyType.SQUIRE;
const T = EnemyType.TANK;
const W = EnemyType.SQUIRE_WAVE;
const H = EnemyType.TROJAN_HORSE;
const P = EnemyType.PEASANT;

interface EnemyParams {
  type: EnemyType;
  y?: number;
}

interface RoundData {
  group: EnemyParams[];
  optional?: boolean;
  event?: (scene: GameScene) => void;
}


const e = (type: EnemyType, y?: number): EnemyParams => { return { type, y }; };
const blanks: RoundData[] = new Array(20).fill({group: []});

const rounds: RoundData[] = [
  {
    group: [e(P,2)],
    event: (scene) => {
      scene.setStageName("Move the dice to attack");
    }
  },

  ...blanks,
  {group: [e(P,3)]},
  {group: [e(P,1), e(P,3)]},
  {group: [e(P,1), e(P,4)]},
  {group: [e(P,0), e(P,3)]},
  {group: [e(P), e(P)], optional: true},

  ...blanks,
  {
    group: [e(S,2)],
    event: (scene) => {
      scene.setStageName("Brittle confidence");
    }
  },
  {group: [e(S,1), e(S,3)]},
  {group: [e(P,0), e(S,2), e(P,4)]},
  {group: [e(S,1)]},
  {group: [e(P,2), e(P,3)]},
  // {group: [e(S,2), e(P), e(P), e(P)]},
  {group: [e(P), e(P)], optional: true},
  {group: [e(P)], optional: true},

  ...blanks,
  {
    group: [e(T,2)],
    event: (scene) => {
      scene.setStageName("Tough meat");
    }
  },
  {group: [e(P,0), e(P,4)]},
  {group: [e(T,1), e(S,3)]},
  {group: [e(S,0), e(S,2), e(S,4)]},
  {group: [e(P,1), e(P,3)], optional: true},

  ...blanks,
  {
    group: [e(S,1), e(S,3)],
    event: (scene) => {
      scene.setStageName("All out attack");
    }
  },
  {group: [e(W)]},
  {group: [e(S,0), e(P,2), e(S,4)]},
  {group: [e(P,1), e(T,2), e(P,3)]},
  {group: [e(S,0), e(S,4)]},
  {group: [e(S,0)], optional: true},
  {group: [e(P), e(P)], optional: true},
  {group: [e(P), e(P)], optional: true},

  ...blanks,
  {
    group: [e(H,2)],
    event: (scene) => {
      scene.setStageName("Gift of peace");
    }
  },
  {group: [e(P,1), e(P,3)]},
  {group: [e(P,0), e(S,3)]},
  {group: [e(H,1)]},
  {group: [e(H,3), e(P,0)]},
  {group: [e(S,1), e(S,4)]},
  {group: [e(P)], optional: true},

  ...blanks,
  {
    group: [e(P,1), e(P,3)],
    event: (scene) => {
      scene.setStageName("Peasant party");
    }
  },
  {group: [e(P), e(P), e(P), e(P), e(P)]},
  {group: [e(H,1), e(P,4)]},
  {group: [e(H,3), e(P,0)]},
  {group: [e(P,2)]},
  // {group: [e(P,3)]},
  {group: [e(P,0), e(H,2), e(P,4)]},
  {group: [e(S)]},
  {group: [e(S), e(P)], optional: true},
  {group: [e(P)], optional: true},

  ...blanks,
  {
    group: [e(T,1), e(T,3)],
    event: (scene) => {
      scene.setStageName("The king's platter");
    }
  },
  // ...blanks,
  {group: [e(S,1), e(S,2), e(S,3)]},
  {group: []},
  {group: [e(S,1), e(T,2), e(S,3)]},
  {group: [e(S,0), e(S,4)]},
  {group: [e(H,1), e(H,3)]},
  {group: [e(S,2)]},
  {group: []},
  {group: [e(W)]},
  {group: [e(P,1), e(P,3)]},
  {group: [e(W)]},
  {group: [e(P), e(P)], optional: true},
  {group: [e(P), e(P)], optional: true},
  {group: [e(P)], optional: true},

  ...blanks,
  {
    group: [e(P)],
    event: (scene) => {
      scene.setStageName("Endless food");
    }
  },
];

export default rounds;
