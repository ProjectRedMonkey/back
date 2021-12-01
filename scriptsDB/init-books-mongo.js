db.getCollection('books').insertMany([
  {
    photo:
      'https://static.fnac-static.com/multimedia/Images/FR/NR/40/67/1e/1992512/1540-1/tsp20200411070916/Le-Seigneur-des-Anneaux.jpg',
    title: 'Le Seigneur des Anneaux',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    date: ISODate('1977-04-22T06:00:00Z'),
    extract:
      "Le monde est en vérité empli de périls, et il y a en lui maints lieux sombres ; mais il y en a encore beaucoup de beaux, et quoique dans tous les pays l'amour se mêle maintenant d'affliction, il n'en devient peut-être que plus grand.",
    page: 4,
  },
  {
    photo: 'https://images-na.ssl-images-amazon.com/images/I/71xwnDO9PBL.jpg',
    title: 'Le Trone de Fer',
    author: 'George R. R. Martin',
    category: 'Fantasy',
    date: ISODate('1922-04-30T01:00:00Z'),
    extract:
      "Oyez mes paroles et soyez témoins de mon serment, récitèrent-ils, emplissant d'une même voix l'obscurité croissante du bois sacré. La Nuit se regroupe, et voici que débute ma garde. Jusqu’à ma mort, je la monterai. Je ne prendrai femme, ne tiendrai terre, ni n’engendrerai. Je ne porterai de couronne, n’acquerrai de gloire. Je vivrai et mourrai à mon poste. Je suis l’épée dans les Ténèbres. Je suis le veilleur aux remparts. Je suis le feu qui flambe contre le froid, la lumière qui rallume l’aube, le cor qui secoue les dormeurs, le bouclier protecteur des Royaumes humains. Je voue mon existence et mon honneur à la Garde de Nuit, je les lui voue pour cette nuit-ci comme pour toutes les nuits à venir.",
    page: 11,
  },
  {
    photo:
      'https://www.livredepoche.com/sites/default/files/styles/manual_crop_269_435/public/images/livres/couv/9782253006756-001-T.jpeg',
    title: 'ainsi parlait zarathoustra',
    author: 'Friedrich Nietzsche',
    category: 'Philosophie',
    date: ISODate('1897-01-22T09:00:00Z'),
    extract:
      'En marchant «Ne va pas auprès des hommes, reste dans la forêt ! Va plutôt encore auprès des bêtes ! Pourquoi ne veux-tu pas être comme moi, — ours parmi les ours, oiseau parmi les oiseaux ? » « Et que fait le saint dans les bois ? » demanda Zarathoustra. Le saint répondit : « Je fais des chants et je les chante, et quand je fais des chants, je ris, je pleure et je murmure : c’est ainsi que je loue Dieu. Avec des chants, des pleurs, des rires et des murmures, je rends grâce à Dieu qui est mon Dieu. Cependant quel présent nous apportes-tu ? » Lorsque Zarathoustra eut entendu ces paroles, il salua le saint et lui dit : « Qu’aurais-je à vous donner ? Mais laissez-moi partir en hâte, afin que je ne vous prenne rien ! » — Et c’est ainsi qu’ils se séparèrent l’un de l’autre, le vieillard et l’homme, riant comme rient deux petits garçons. Mais quand Zarathoustra fut seul, il parla ainsi à son cœur : « Serait-ce possible ! Ce vieux saint dans sa forêt n’a pas encore entendu dire que Dieu est mort ! »',
    page: 204,
  },
]);

db.getCollection('books').find({});
