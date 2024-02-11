export const API_URL = import.meta.env.VITE_API_URL

export const FONTS = [
  {
    family: 'Lobster',
    lang: ['en', 'es', 'de', 'fr', 'pt', 'tr', 'pl', 'tl', 'uk', 'ru'],
  },
  {
    family: 'Roboto',
    lang: ['en', 'es', 'de', 'fr', 'pt', 'tr', 'pl', 'tl', 'uk', 'ru'],
  },
  {
    family: 'Alfa Slab One',
    lang: ['en', 'es', 'de', 'fr', 'pt', 'tr', 'pl', 'tl'],
  },
  {
    family: 'Russo One',
    lang: ['ru', 'uk'],
  },
  {
    family: 'Bebas Neue',
    lang: ['en', 'es', 'de', 'fr', 'pt', 'tr', 'pl', 'tl', 'uk'],
  },
  {
    family: 'Source Serif Pro',
    lang: ['en', 'es', 'de', 'fr', 'pt', 'tr', 'pl', 'tl', 'uk', 'ru'],
  },
  {
    family: 'Noto Sans SC',
    lang: ['hi', 'zh'],
  },
]

export const COLOR_PALETTES = [
  {
    name: 'contrasting-1',
    colors: ['#e76f3d', '#feab6b', '#f3e9e7', '#9bcfe0', '#00a7c7'],
    backgroundColor: '#000000',
  },
  {
    name: 'blue',
    colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
    backgroundColor: '#ffffff',
  },
  {
    name: 'green',
    colors: ['#386641', '#6a994e', '#a7c957', '#f2e8cf', '#bc4749'],
    backgroundColor: '#ffffff',
  },
  {
    name: 'cold-1',
    colors: ['#252b31', '#5e6668', '#c1c8c7', '#f6fafb', '#d49c6b'],
    backgroundColor: '#000000',
  },
  {
    name: 'black',
    colors: ['#000000'],
    backgroundColor: '#ffffff',
  },
  {
    name: 'white',
    colors: ['#ffffff'],
    backgroundColor: '#000000',
  },
]

const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?display=swap'

export function getFontURL(font) {
  return GOOGLE_FONTS_URL + '&family=' + font.family.replaceAll(' ', '+')
}

export const DEMO_TEXT = `Animal Farm
by
George Orwell

Chapter I

Mr. Jones, of the Manor Farm, had locked the hen-houses for the night, but was too drunk to remember to shut the pop-holes. With the ring of light from his lantern dancing from side to side, he lurched across the yard, kicked off his boots at the back door, drew himself a last glass of beer from the barrel in the scullery, and made his way up to bed, where Mrs. Jones was already snoring.

As soon as the light in the bedroom went out there was a stirring and a fluttering all through the farm buildings. Word had gone round during the day that old Major, the prize Middle White boar, had had a strange dream on the previous night and wished to communicate it to the other animals. It had been agreed that they should all meet in the big barn as soon as Mr. Jones was safely out of the way. Old Major (so he was always called, though the name under which he had been exhibited was Willingdon Beauty) was so highly regarded on the farm that everyone was quite ready to lose an hour's sleep in order to hear what he had to say.

At one end of the big barn, on a sort of raised platform, Major was already ensconced on his bed of straw, under a lantern which hung from a beam. He was twelve years old and had lately grown rather stout, but he was still a majestic-looking pig, with a wise and benevolent appearance in spite of the fact that his tushes had never been cut. Before long the other animals began to arrive and make themselves comfortable after their different fashions. First came the three dogs, Bluebell, Jessie, and Pincher, and then the pigs, who settled down in the straw immediately in front of the platform. The hens perched themselves on the window-sills, the pigeons fluttered up to the rafters, the sheep and cows lay down behind the pigs and began to chew the cud. The two cart-horses, Boxer and Clover, came in together, walking very slowly and setting down their vast hairy hoofs with great care lest there should be some small animal concealed in the straw. Clover was a stout motherly mare approaching middle life, who had never quite got her figure back after her fourth foal. Boxer was an enormous beast, nearly eighteen hands high, and as strong as any two ordinary horses put together. A white stripe down his nose gave him a somewhat stupid appearance, and in fact he was not of first-rate intelligence, but he was universally respected for his steadiness of character and tremendous powers of work. After the horses came Muriel, the white goat, and Benjamin, the donkey. Benjamin was the oldest animal on the farm, and the worst tempered. He seldom talked, and when he did, it was usually to make some cynical remark—for instance, he would say that God had given him a tail to keep the flies off, but that he would sooner have had no tail and no flies. Alone among the animals on the farm he never laughed. If asked why, he would say that he saw nothing to laugh at. Nevertheless, without openly admitting it, he was devoted to Boxer; the two of them usually spent their Sundays together in the small paddock beyond the orchard, grazing side by side and never speaking.

The two horses had just lain down when a brood of ducklings, which had lost their mother, filed into the barn, cheeping feebly and wandering from side to side to find some place where they would not be trodden on. Clover made a sort of wall round them with her great foreleg, and the ducklings nestled down inside it and promptly fell asleep. At the last moment Mollie, the foolish, pretty white mare who drew Mr. Jones's trap, came mincing daintily in, chewing at a lump of sugar. She took a place near the front and began flirting her white mane, hoping to draw attention to the red ribbons it was plaited with. Last of all came the cat, who looked round, as usual, for the warmest place, and finally squeezed herself in between Boxer and Clover; there she purred contentedly throughout Major's speech without listening to a word of what he was saying.

All the animals were now present except Moses, the tame raven, who slept on a perch behind the back door. When Major saw that they had all made themselves comfortable and were waiting attentively, he cleared his throat and began:

"Comrades, you have heard already about the strange dream that I had last night. But I will come to the dream later. I have something else to say first. I do not think, comrades, that I shall be with you for many months longer, and before I die, I feel it my duty to pass on to you such wisdom as I have acquired. I have had a long life, I have had much time for thought as I lay alone in my stall, and I think I may say that I understand the nature of life on this earth as well as any animal now living. It is about this that I wish to speak to you.

"Now, comrades, what is the nature of this life of ours? Let us face it: our lives are miserable, laborious, and short. We are born, we are given just so much food as will keep the breath in our bodies, and those of us who are capable of it are forced to work to the last atom of our strength; and the very instant that our usefulness has come to an end we are slaughtered with hideous cruelty. No animal in England knows the meaning of happiness or leisure after he is a year old. No animal in England is free. The life of an animal is misery and slavery: that is the plain truth.

"But is this simply part of the order of nature? Is it because this land of ours is so poor that it cannot afford a decent life to those who dwell upon it? No, comrades, a thousand times no! The soil of England is fertile, its climate is good, it is capable of affording food in abundance to an enormously greater number of animals than now inhabit it. This single farm of ours would support a dozen horses, twenty cows, hundreds of sheep—and all of them living in a comfort and a dignity that are now almost beyond our imagining. Why then do we continue in this miserable condition? Because nearly the whole of the produce of our labour is stolen from us by human beings. There, comrades, is the answer to all our problems. It is summed up in a single word—Man. Man is the only real enemy we have. Remove Man from the scene, and the root cause of hunger and overwork is abolished for ever.

"Man is the only creature that consumes without producing. He does not give milk, he does not lay eggs, he is too weak to pull the plough, he cannot run fast enough to catch rabbits. Yet he is lord of all the animals. He sets them to work, he gives back to them the bare minimum that will prevent them from starving, and the rest he keeps for himself. Our labour tills the soil, our dung fertilises it, and yet there is not one of us that owns more than his bare skin. You cows that I see before me, how many thousands of gallons of milk have you given during this last year? And what has happened to that milk which should have been breeding up sturdy calves? Every drop of it has gone down the throats of our enemies. And you hens, how many eggs have you laid in this last year, and how many of those eggs ever hatched into chickens? The rest have all gone to market to bring in money for Jones and his men. And you, Clover, where are those four foals you bore, who should have been the support and pleasure of your old age? Each was sold at a year old—you will never see one of them again. In return for your four confinements and all your labour in the fields, what have you ever had except your bare rations and a stall?

"And even the miserable lives we lead are not allowed to reach their natural span. For myself I do not grumble, for I am one of the lucky ones. I am twelve years old and have had over four hundred children. Such is the natural life of a pig. But no animal escapes the cruel knife in the end. You young porkers who are sitting in front of me, every one of you will scream your lives out at the block within a year. To that horror we all must come—cows, pigs, hens, sheep, everyone. Even the horses and the dogs have no better fate. You, Boxer, the very day that those great muscles of yours lose their power, Jones will sell you to the knacker, who will cut your throat and boil you down for the foxhounds. As for the dogs, when they grow old and toothless, Jones ties a brick round their necks and drowns them in the nearest pond.

"Is it not crystal clear, then, comrades, that all the evils of this life of ours spring from the tyranny of human beings? Only get rid of Man, and the produce of our labour would be our own. Almost overnight we could become rich and free. What then must we do? Why, work night and day, body and soul, for the overthrow of the human race! That is my message to you, comrades: Rebellion! I do not know when that Rebellion will come, it might be in a week or in a hundred years, but I know, as surely as I see this straw beneath my feet, that sooner or later justice will be done. Fix your eyes on that, comrades, throughout the short remainder of your lives! And above all, pass on this message of mine to those who come after you, so that future generations shall carry on the struggle until it is victorious.`
