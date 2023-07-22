import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "View all",
    image:
      "https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce.png",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    categoryName: "Men",
    image:
      "https://m.media-amazon.com/images/G/31/img22/Fashion/AF/Newseason/revamp/halo/C/v1/Men_s_clothing._SS300_QL85_FMpng_.png",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    categoryName: "Women",
    image:
      "https://m.media-amazon.com/images/G/31/img22/Fashion/AF/Newseason/revamp/halo/C/v1/Women_s_clothing._SS300_QL85_FMpng_.png",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
  },
  {
    _id: uuid(),
    categoryName: "Kids",
    image:
      "https://m.media-amazon.com/images/G/31/img22/Fashion/AF/Newseason/revamp/halo/C/v1/03-Kids._SS300_QL85_FMpng_.png",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
  },
];
