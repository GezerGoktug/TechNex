import { fadeInLeft, fadeInRights } from "../animations/variants";

export const sliderData = [
  {
    header: "Aesthetic colors",
    desc: "Catch the style in technology with different and pleasing aesthetic colors",
  },
  {
    header: "Unlimited Performance, Innovation in Portability",
    desc: "Never have your work interrupted with powerful laptop models.",
  },
  {
    header: "Exceptionally flexible technological operation",
    desc: "Benefit from the great flexibility of technology with innovative tablets",
  },
  {
    header: "Take Control of Time: Follow Technology with Smart Watches!",
    desc: "Enjoy the power of technology wherever you are with the latest smart watches",
  },
  {
    header: "Enjoy the Sound",
    desc: "Enjoy music with quality listening experience",
  },
  {
    header: "Discover the Future Now",
    desc: "Meet the latest technology trends and meet the products that transform your life. Are you ready to experience the future today?",
  },
  {
    header: "Unlimited Audio Experience",
    desc: "Catch the rhythm of the music at any time with unlimited loud volume",
  },
  {
    header: "Extraordinary accessories",
    desc: "Customize your devices with different style accessories.",
  },
];
export const campaigns = [
  {
    variant: fadeInLeft,
    title: "Light and powerful laptops",
    description: "Take power everywhere with its lightweight design",
    imageUrl: "/img/campaigns/campaign1-min.jpg",
    className: "c-p-1",
  },
  {
    variant: fadeInRights,
    title: "Multidirectional!",
    description: "New tablets are versatile, discover the power of different uses",
    imageUrl: "/img/campaigns/campaign2-min.jpg",
    className: "c-p-2 lg:col-span-2",
  },
  {
    variant: fadeInLeft,
    title: "A Brand New World at Your Fingertips",
    description: "Step into perfection. Break the boundaries of boundary-pushing phones and technology",
    imageUrl: "/img/campaigns/campaign4-min.jpg",
    className: "c-p-3 lg:col-span-2",
  },
  {
    variant: fadeInRights,
    title: "Make Your Life Easier with a Smart Watch!",
    description: "Make your life more organized, more efficient and more fun with a smart watch",
    imageUrl: "/img/campaigns/campaign3-min.jpg",
    className: "c-p-4",
  },
];
export const footerLinks = {
  page: [
    { title: "Home", path: "" },
    { title: "About", path: "about" },
    { title: "Products", path: "products" },
    { title: "Contact", path: "contact" },
    { title: "Cart", conditionalPath: "cart" },
    { title: "Favourites", conditionalPath: "favourites" },
    { title: "Profile", conditionalPath: "profile" },
  ],
  privacy: [
    "Privacy Policy",
    "Cookies Policy",
    "Terms of Use",
    "Data Security",
    "Advertising",
  ],
  categories: [
    "Telephone",
    "Tablet",
    "Watch",
    "Laptop",
    "Accessories",
    "TV",
    "Headphones",
  ],
};
export const aboutPageArticleContent = [
  {
    header: "Who Are We?",
    desc: "Tech Nex is a technology company that offers innovative and quality products to customers as a leading player in the world of technology. By keeping customer satisfaction at the highest level, we aim to make technology accessible to everyone and make their lives easier. With our wide product range and customer-oriented approach, Tech Nex aims to be the first choice of technology enthusiasts.",
    isReverse: false,
    src: "/img/sections/about/about_sec_1.png",
  },
  {
    header: "What do we aim for?",
    desc: "As Tech Nex, our aim is to not compromise on quality while offering the latest technology products to customers. Based on customer satisfaction, we prioritize reliability, transparency and innovation. We aim to make people's lives more comfortable and efficient by making technology accessible to everyone.",
    isReverse: true,
    src: "/img/sections/about/about_sec_2.png",
  },
  {
    header: "What do we produce?",
    desc: "As Tech Nex, we have a wide range of products such as phones, tablets, smart watches, wearable technology products and accessories. We aim to meet our customers' expectations by offering various options to suit their needs. We are always on the side of technology enthusiasts with our high quality products and constantly updated portfolio.",
    isReverse: false,
    src: "/img/sections/about/about_sec_3.png",
  },
  {
    header: "Do You Want To Join Our Team?",
    desc: "Would you like to join the Tech Nex family? If you want to be part of a team united by your passion for technology, we would love to meet you! If you want to share your innovative ideas and work in an environment open to growth and development, join us. Tech Nex knows the value of having a talented and motivated team and is determined to support its employees in this regard. Take a step to make a difference in the world of technology with us!",
    isReverse: true,
    src: "/img/sections/about/about_sec_4.png",
    button: "Send your CV",
  },
];
export const countriesInfo = [
  {
    name: "Turkey",
    address: "123 Istiklal Avenue \n Beyoğlu, Istanbul \n 34430, Turkey",
    src: "TR.png",
  },
  {
    name: "United States",
    address: "450 Mission Street \n Suite 201 \n San Francisco, CA, 94105, USA",
    src: "USA.png",
  },
  {
    name: "United Kingdom",
    address: "10 Downing Street \n London, SW1A 2AA, United Kingdom",
    src: "UK.png",
  },
  {
    name: "France",
    address: "1 Rue de la République \n 75001 \n Paris, France",
    src: "FRA.png",
  },
  {
    name: "Germany",
    address: "1 Musterstraße \n 10178 \n Berlin, Germany",
    src: "GER.png",
  },
  {
    name: "Japan",
    address:
      "〒100-0005 \n 2-1-1 Marunouchi, Chiyoda-ku, Tokyo International Forum \n Tokyo, Japan",
    src: "JAP.png",
  },
];
export const testimonialsContent = [
  {
    rating: 5,
    comment:
      "Fantastic shopping experience! The products are top quality and the delivery was super fast.",
    name: "Alice Johnson",
  },
  {
    rating: 4,
    comment:
      "Great customer service and a wide range of products. Will definitely shop here again.",
    name: "Bob Smith",
  },
  {
    rating: 5,
    comment:
      "Excellent prices and high-quality products. The website is very user-friendly.",
    name: "Carol White",
  },
  {
    rating: 3,
    comment:
      "The products are good, but the delivery took longer than expected.",
    name: "Dave Brown",
  },
  {
    rating: 5,
    comment:
      "I love this site! Great deals and the products always meet my expectations.",
    name: "Eve Davis",
  },
  {
    rating: 4,
    comment:
      "Good selection of tech gadgets. The support team was very helpful.",
    name: "Frank Miller",
  },
  {
    rating: 5,
    comment:
      "Amazing tech store! Everything I need in one place with fast delivery.",
    name: "Grace Wilson",
  },
  {
    rating: 4,
    comment:
      "Good prices and the product quality is excellent. Will recommend to friends.",
    name: "Hank Garcia",
  },
  {
    rating: 5,
    comment: "Best tech store online! Great variety and unbeatable prices.",
    name: "Ivy Martinez",
  },
  {
    rating: 4,
    comment:
      "Very satisfied with my purchase. Customer support was responsive and helpful.",
    name: "Jack Lee",
  },
];
export const productsPageSliderContent = [
  {
    title: "Unleash the Power of iPhone 15 Pro Max",
    description:
      "Experience the future of mobile technology with the iPhone 15 Pro Max. With groundbreaking features and unparalleled performance, it's a true game-changer.",
    src: "/img/sections/products/slider/slider_1.png",
  },
  {
    title: "Dominate Any Challenge with Monster Notebook",
    description:
      "Take your computing experience to the next level with Monster Notebook. Our high-performance laptops are designed to tackle any task, from gaming marathons to intensive work projects.",
    src: "/img/sections/products/slider/slider_2.png",
  },
  {
    title: "Elevate Your Entertainment with Samsung Tablets",
    description:
      "Immerse yourself in the world of entertainment with Samsung tablets. Featuring stunning displays and powerful processors, they offer an unrivaled viewing experience.",
    src: "/img/sections/products/slider/slider_3.png",
  },
  {
    title: "Experience Pure Sound Bliss with JBL Headphones",
    description:
      "Escape into your own world of music with JBL headphones. Designed for ultimate comfort and superior sound quality, they're the perfect companion for music lovers and audiophiles alike.",
    src: "/img/sections/products/slider/slider_4.png",
  },
];
export const categories = [
  {
    title: "Telephone",
    src: "/img/sections/products/categories/category_1.png",
  },
  {
    title: "Laptop",
    src: "/img/sections/products/categories/category_2.png",
  },
  {
    title: "Watch",
    src: "/img/sections/products/categories/category_3.png",
  },
  {
    title: "Tablet",
    src: "/img/sections/products/categories/category_4.png",
  },
  {
    title: "TV",
    src: "/img/sections/products/categories/category_5.png",
  },
  {
    title: "Headphones",
    src: "/img/sections/products/categories/category_6.png",
  },
  {
    title: "Accessories",
    src: "/img/sections/products/categories/category_7.png",
  },
];
