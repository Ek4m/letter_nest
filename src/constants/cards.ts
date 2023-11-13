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

export const GameCards: LoveLetterCard[] = [
  {
    rank: CardRank.Guard,
    name: 'guard',
    description: "Guess a player's hand.",
    image: `/images/cards/guard.jpg`,
  },
  {
    rank: CardRank.Guard,
    name: 'guard',
    description: "Guess a player's hand.",
    image: `/images/cards/guard.jpg`,
  },
  {
    rank: CardRank.Guard,
    name: 'guard',
    description: "Guess a player's hand.",
    image: `/images/cards/guard.jpg`,
  },
  {
    rank: CardRank.Guard,
    name: 'guard',
    description: "Guess a player's hand.",
    image: `/images/cards/guard.jpg`,
  },
  {
    rank: CardRank.Guard,
    name: 'guard',
    description: "Guess a player's hand.",
    image: `/images/cards/guard.jpg`,
  },
  {
    rank: CardRank.Priest,
    name: 'priest',
    description: "Look at another player's hand.",
    image: `/images/cards/priest.jpg`,
  },
  {
    rank: CardRank.Priest,
    name: 'priest',
    description: "Look at another player's hand.",
    image: `/images/cards/priest.jpg`,
  },
  {
    rank: CardRank.Handmaid,
    name: 'handmaid',
    description:
      "Until your next turn, ignore all effects from other players' cards.",
    image: `/images/cards/handmaid.jpg`,
  },
  {
    rank: CardRank.Handmaid,
    name: 'handmaid',
    description:
      "Until your next turn, ignore all effects from other players' cards.",
    image: `/images/cards/handmaid.jpg`,
  },
  {
    rank: CardRank.Baron,
    name: 'baron',
    description: 'Compare hands; lower hand is out.',
    image: `/images/cards/baron.jpg`,
  },
  {
    rank: CardRank.Baron,
    name: 'baron',
    description: 'Compare hands; lower hand is out.',
    image: `/images/cards/baron.jpg`,
  },
  {
    rank: CardRank.Prince,
    name: 'prince',
    description:
      'Choose any player (including yourself) to discard their hand and draw a new card.',
    image: `/images/cards/prince.jpg`,
  },
  {
    rank: CardRank.Prince,
    name: 'prince',
    description:
      'Choose any player (including yourself) to discard their hand and draw a new card.',
    image: `/images/cards/prince.jpg`,
  },
  {
    rank: CardRank.King,
    name: 'king',
    description: 'Trade hands with another player of your choice.',
    image: `/images/cards/king.jpg`,
  },
  {
    rank: CardRank.Countess,
    name: 'countess',
    description:
      'If you have this card and the King or Prince in your hand, you must discard this card.',
    image: `/images/cards/countess.jpg`,
  },
  {
    rank: CardRank.Princess,
    name: 'princess',
    description: 'If you discard this card, you are out of the round.',
    image: `/images/cards/princess.jpg`,
  },
];
