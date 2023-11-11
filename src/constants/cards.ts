export enum CardRank {
  Guard = 1,
  Priest = 2,
  Baron = 3,
  Handmaid = 4,
  Prince = 5,
  King = 6,
  Countess = 7,
  Princess = 8,
}

export interface LoveLetterCard {
  rank: CardRank;
  name: string;
  description: string;
  image: string;
}

export const loveLetterDeck: LoveLetterCard[] = [
  {
    rank: CardRank.Guard,
    name: 'guard',
    description: "Guess a player's hand.",
    image: `${process.cwd()}/images/cards/guard.jpg`,
  },
  {
    rank: CardRank.Priest,
    name: 'priest',
    description: "Look at another player's hand.",
    image: `${process.cwd()}/images/cards/priest.jpg`,
  },
  {
    rank: CardRank.Baron,
    name: 'baron',
    description: 'Compare hands; lower hand is out.',
    image: `${process.cwd()}/images/cards/baron.jpg`,
  },
  {
    rank: CardRank.Handmaid,
    name: 'handmaid',
    description:
      "Until your next turn, ignore all effects from other players' cards.",
    image: `${process.cwd()}/images/cards/handmaid.jpg`,
  },
  {
    rank: CardRank.Prince,
    name: 'prince',
    description:
      'Choose any player (including yourself) to discard their hand and draw a new card.',
    image: `${process.cwd()}/images/cards/prince.jpg`,
  },
  {
    rank: CardRank.King,
    name: 'king',
    description: 'Trade hands with another player of your choice.',
    image: `${process.cwd()}/images/cards/king.jpg`,
  },
  {
    rank: CardRank.Countess,
    name: 'countess',
    description:
      'If you have this card and the King or Prince in your hand, you must discard this card.',
    image: `${process.cwd()}/images/cards/countess.jpg`,
  },
  {
    rank: CardRank.Princess,
    name: 'princess',
    description: 'If you discard this card, you are out of the round.',
    image: `${process.cwd()}/images/cards/princess.jpg`,
  },
];
