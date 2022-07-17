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
      scene.setStageName("A minor annoyance");
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
      scene.music_isFull = true;
      console.log(scene.musicButton.active);
      if (scene.musicButton.active) {
        scene.music.volume = 0.25;
        scene.music_light.volume = 0;
      }
    }
  },
  ...blanks,
  {group: [S]},
  {group: [P,P]},
  ...blanks,
  {group: [S]},
  {group: [S,S]},
  {group: [S]},
  {group: [S,S,P]},
  ...blanks,
  {
    group: [W],
    event: (scene) => {
      scene.setStageName("All out attack");
    }
  },
  ...blanks,
  {group: [S]},
  {group: [S,S]},
  ...blanks,
  {
    group: [T],
    event: (scene) => {
      scene.setStageName("Tough meat");
    }
  },
  ...blanks,
  {group: [S,T]},
  ...blanks,
  {group: [T,T]},
  {group: [S]},
  ...blanks,
  {group: [W]},
  {
    group: [T],
    event: (scene) => {
      scene.setStageName("Tough confidence");
    }
  },
  ...blanks,
  {group: [S]},
  {group: [P]},
  ...blanks,
  {
    group: [H],
    event: (scene) => {
      scene.setStageName("Horse... MAN");
    }
  },
  ...blanks,
  {group: [S,H]},
  ...blanks,
  {group: [T]},
  {group: [H]},
  ...blanks,
  {group: [W]},
  {group: [H],
    event: (scene) => {
      scene.setStageName("Side dish");
    }
  },
  ...blanks,
  {group: [T]},
  {group: [P,P,H]},
  ...blanks,
  {group: [S]},
  ...blanks,
  {group: [P,P,P,P,P]},
  {
    group: [H,H],
    event: (scene) => {
      scene.setStageName("Peasant party");
    }
  },
  ...blanks,
  {group: [P]},
  ...blanks,
  {
    group: [S,S,T,S,S],
    event: (scene) => {
      scene.setStageName("The king's platter");
    }
  },
  ...blanks,
  {group: [W]},
  {group: [H,H]},
  ...blanks,
  {
    group: [P],
    event: (scene) => {
      scene.setStageName("Infinite food!");
    }
  },
];

export default rounds;
