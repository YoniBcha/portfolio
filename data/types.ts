// types.ts
export interface CardData {
  title: string;
  description: string;
  height: string;
  imageUrl: string;
}

export interface MasonryCardProps extends CardData {
  controls: "left" | "right";
  isInView: boolean;
}

export type CardList = CardData[];