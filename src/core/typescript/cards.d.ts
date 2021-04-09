/*Card_skills*/
export class Card_skills {
  skill_name: string
  skill_cost: string
  skill_damage: string
  skill_effect: string
}

/*Card*/
export class Card {
  id: number
  card_style: string
  card_image_url: string
  card_name: string
  card_attr: string
  card_icon: string
  card_type: string
  card_label: string
  card_hp: string
  card_skills: Card_skills[]
  card_attr_weakness: string
  card_attr_resistance: string
  card_attr_retreat: string
}


export class Cards {
  cards: Card[]
}
