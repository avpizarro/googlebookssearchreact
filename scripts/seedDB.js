const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/googlebooks"
);

const bookSeed = [
  {
    author: "Suzanne Collins",
    description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
    image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
    title: "The Hunger Games"
  },
  {
    author: "Gabriel Garcia Marquez",
    description: "Nobel prize winner and author of One Hundred Years of Solitude Gabriel Garcia Marquez tells a tale of an unrequited love that outlasts all rivals in his masterpiece Love in the Time of Cholera. 'It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love' Fifty-one years, nine months and four days have passed since Fermina Daza rebuffed hopeless romantic Florentino Ariza's impassioned advances and married Dr Juvenal Urbino instead. During that half-century, Florentino has fallen into the arms of many delighted women, but has loved none but Fermina. Having sworn his eternal love to her, he lives for the day when he can court her again. When Fermina's husband is killed trying to retrieve his pet parrot from a mango tree, Florentino seizes his chance to declare his enduring love. But can young love find new life in the twilight of their lives? 'The most important writer of fiction in any language' Bill Clinton 'An exquisite writer, wise, compassionate and extremely funny' Sunday Telegraph 'An amazing celebration of the many kinds of love between men and women' The Times",
    image: "http://books.google.com/books/content?id=kSGVAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    link: "http://books.google.com.au/books?id=kSGVAgAAQBAJ&printsec=frontcover&dq=amor+colera&hl=&cd=1&source=gbs_api",
    title: "Love in the Time of Cholera"
  }

];

db.Book.remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
