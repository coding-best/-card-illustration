export class Card {
  id: number
  status: number
  card_style: string
  card_image_url: string
  card_name: string
  card_description: string
  card_hp: string
  skill_one_name: string
  skill_one_cost: string
  skill_one_damage: string
  skill_one_effect: string
  skill_two_name: string
  skill_two_cost: string
  skill_two_damage: string
  skill_two_effect: string
  card_attr_weakness: string
  card_attr_resistance: string
  card_attr_retreat: string
}

export class Cards {
  cards: Card[]
}
