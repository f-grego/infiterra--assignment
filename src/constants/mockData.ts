import type { Product, Category } from '@/models/types.ts'

export const categories: Category[] = [
  { id: 'c1', name: 'Electronics', slug: 'electronics' },
  { id: 'c2', name: 'Clothing', slug: 'clothing' },
  { id: 'c3', name: 'Accessories', slug: 'accessories' }
]

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Wireless Headphones X200',
    description: 'Noise‑cancelling over‑ear headphones with 30h battery life.',
    price: 29.99,
    categoryId: 'c1',
    images: ['https://img.magnific.com/premium-photo/3d-wireless-headphone-image_1222055-1864.jpg'],
    stock: 8,
    rating: 4.6,
    variants: { color: ['Blue', 'Black', 'White'] }
  },
  {
    id: 'p2',
    title: 'Smartwatch Pro 5',
    description: 'Fitness tracking, heart‑rate monitor, GPS, waterproof.',
    price: 199.99,
    categoryId: 'c1',
    images: ['https://www.techadvisor.com/wp-content/uploads/2022/08/Samsung-Galaxy-Watch-5-Pro_review_11.jpg?quality=50&strip=all'],
    stock: 5,
    rating: 4.3
  },
  {
    id: 'p3',
    title: 'Men’s Cotton Hoodie',
    description: '100% cotton hoodie, soft and breathable.',
    price: 39.99,
    categoryId: 'c2',
    images: ['https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/E23564s.jpg?im=Resize,width=750'],
    stock: 12,
    rating: 4.1,
    variants: {
      color: ['Black', 'Gray', 'Blue'],
      size: ['S', 'M', 'L', 'XL']
    }
  },
  {
    id: 'p4',
    title: 'Travel Backpack',
    description: 'Water‑resistant, 25L capacity.',
    price: 39.99,
    categoryId: 'c3',
    images: ['https://roamingramblers.com/wp-content/uploads/2024/02/image-108-jpeg.webp'],
    stock: 1,
    rating: 4.7
  },
  {
    id: 'p5',
    title: 'Running Sneakers',
    description: 'Lightweight running shoes with soft cushioning.',
    price: 79.99,
    categoryId: 'c2',
    images: ['https://hips.hearstapps.com/hmg-prod/images/run-reebok-running-shoes-64e3beadbe692.jpg'],
    stock: 5,
    rating: 4.8
  },
  {
    id: 'p6',
    title: 'High‑Top Street Shoes',
    description: 'Urban style high‑tops with durable sole.',
    price: 89.99,
    categoryId: 'c2',
    images: ['https://nothingnew.com/cdn/shop/products/1024x1024-Women-HighTop-White-110521-1_1024x1024.jpg?v=1651855386'],
    stock: 0,
    rating: 4.6
  },
  {
    id: 'p7',
    title: 'Leather Wallet',
    description: 'Genuine leather wallet with 6 card slots.',
    price: 29.99,
    categoryId: 'c3',
    images: ['https://m.media-amazon.com/images/I/61BygHH-M2L._AC_.jpg'],
    stock: 3,
    rating: 4.4
  },
  {
    id: 'p8',
    title: 'Black Slim T‑Shirt',
    description: 'Slim fit, breathable fabric.',
    price: 17.99,
    categoryId: 'c2',
    images: ['https://i.pinimg.com/originals/75/e2/75/75e2759dabb205d56b2dd279830e0e8a.jpg'],
    stock: 12,
    rating: 4.1
  },
  {
    id: 'p9',
    title: 'Winter Puffer Jacket',
    description: 'Warm insulated jacket for cold weather.',
    price: 159.99,
    categoryId: 'c2',
    images: ['https://cdna.lystit.com/photos/tessuti/e83def22/tommy-hilfiger-Navy-Alaska-Puffer-Jacket-Blue.jpeg'],
    stock: 3,
    rating: 4.9
  },
  {
    id: 'p10',
    title: 'Lightweight Windbreaker',
    description: 'Water‑resistant, perfect for running.',
    price: 59.99,
    categoryId: 'c2',
    images: ['https://www.sportsdirect.com/images/imgzoom/60/60042115_xxl.jpg'],
    stock: 14,
    rating: 4.4
  },
  {
    id: 'p11',
    title: 'Slim Fit Jeans',
    description: 'Stretch denim, modern slim fit.',
    price: 49.99,
    categoryId: 'c2',
    images: ['https://assets.digitalcontent.marksandspencer.app/images/w_2560,q_auto,f_auto/SD_10_T83_6434D_E0_X_EC_1/High-Waisted-Slim-Fit-Jeans'],
    stock: 20,
    rating: 4.5
  },
  {
    id: 'p12',
    title: 'Cargo Pants',
    description: 'Utility pockets, relaxed fit.',
    price: 44.99,
    categoryId: 'c2',
    images: ['https://kickflipnation.com/images/large/exploring-dickies-utility-cargo-pants-urban-skate-park.webp'],
    stock: 18,
    rating: 4.3
  },
  {
    id: 'p13',
    title: 'Sport Socks (3‑Pack)',
    description: 'Breathable cotton socks.',
    price: 9.99,
    categoryId: 'c3',
    images: ['https://www.cosmossport.gr/3212197-product_large/adidas-sportswear-tie-dye-socks-3-pairs.jpg'],
    stock: 1,
    rating: 4.1
  },
  {
    id: 'p14',
    title: 'Training Shorts',
    description: 'Quick‑dry fabric, elastic waistband.',
    price: 24.99,
    categoryId: 'c2',
    images: ['https://thumblr.uniid.it/product/266471/3609d6bf13c3.jpg'],
    stock: 25,
    rating: 4.4
  },
  {
    id: 'p15',
    title: 'Graphic T‑Shirt',
    description: 'Soft cotton with printed artwork.',
    price: 22.99,
    categoryId: 'c2',
    images: ['https://tint.creativemarket.com/zVMPDptvTolFslWTTBIqlsYt_k5rlRKyeAt4niPxm5Y/width:1820/height:1214/gravity:nowe/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzE5NDgvMTk0ODgvMTk0ODg5MTAvMC1vLmpwZw'],
    stock: 19,
    rating: 4.6
  },
  {
    id: 'p16',
    title: 'Premium Hoodie',
    description: 'Heavyweight fleece, luxury feel.',
    price: 69.99,
    categoryId: 'c2',
    images: ['https://img.magnific.com/fotos-premium/revolucion-sudaderas-capucha_941561-10875.jpg'],
    stock: 7,
    rating: 4.9
  },
  {
    id: 'p17',
    title: 'Slip‑On Shoes',
    description: 'Comfortable everyday slip‑ons.',
    price: 54.99,
    categoryId: 'c2',
    images: ['https://m.media-amazon.com/images/I/711QQFgEXML._AC_SL1500_.jpg'],
    stock: 12,
    rating: 4.3
  },
  {
    id: 'p18',
    title: 'Black Baseball Cap',
    description: 'Adjustable strap, breathable fabric.',
    price: 14.99,
    categoryId: 'c3',
    images: ['https://static.vecteezy.com/system/resources/previews/027/252/618/non_2x/mockup-black-baseball-cap-isolated-free-png.png'],
    stock: 50,
    rating: 4.2
  },
  {
    id: 'p19',
    title: 'Denim Jacket',
    description: 'Classic denim look with modern fit.',
    price: 79.99,
    categoryId: 'c2',
    images: ['https://i5.walmartimages.com/seo/Odeerbi-Denim-Jackets-Outwear-for-Men-Trendy-2024-Casual-Jacket-Denim-Outdoor-Single-breasted-Jacket-Tooling-Jacket-Blue_458b1e13-7cb9-4853-a2b9-d37fd94e1575.8cd08e473cccef0afda639c9946f8aa9.jpeg'],
    stock: 9,
    rating: 4.5
  },
  {
    id: 'p20',
    title: 'Thermal Long Sleeve',
    description: 'Warm and breathable winter layer.',
    price: 29.99,
    categoryId: 'c2',
    images: ['https://i5.walmartimages.com/seo/Therma-Pro-Thermal-Shirt-for-Men-Long-Sleeve-Thermal-Compression-Tops-for-Men-Base-Layer-Cold-Weather-Black-Large_383d87c7-34c9-4fc6-bb28-ffad35c3a8ad.fa3609b428bcf60d1a6f4dfe894466bb.png'],
    stock: 22,
    rating: 4.4
  },
  {
    id: 'p21',
    title: 'Classic Black Hoodie',
    description: 'Soft cotton hoodie with adjustable hood.',
    price: 39.99,
    categoryId: 'c2',
    images: ['https://img.magnific.com/premium-photo/black-hoodie-with-hoodie-it_1300187-1684.jpg'],
    stock: 12,
    rating: 4.5
  },
  {
    id: 'p22',
    title: 'Blue Oversized Hoodie',
    description: 'Oversized fit, premium cotton blend.',
    price: 49.99,
    categoryId: 'c2',
    images: ['https://thf.bing.com/th/id/R.b70d03021ecd6cf67b4040b1cc18e647?rik=xrbSzkzEj3JrLQ&riu=http%3a%2f%2fblakelyclothing.com%2fcdn%2fshop%2fproducts%2f2011MIDRISHOODIED-2_1200x1200.jpg%3fv%3d1666626254&ehk=01NJ4MyGm3bb1LnqFTwPoHvtzh49%2b9Pp2%2feus%2f1B%2bxo%3d&risl=&pid=ImgRaw&r=0'],
    stock: 8,
    rating: 4.7
  },
  {
    id: 'p23',
    title: 'White Minimal T‑Shirt',
    description: '100% organic cotton, unisex fit.',
    price: 19.99,
    categoryId: 'c2',
    images: ['https://assets-global.website-files.com/625816a3416990dd61391b9b/6479f9d2d8c1c388a041fa3e_Free%20minimalistic%20T-shirt%20mockup-Presentation-1.png'],
    stock: 30,
    rating: 4.3
  },
]

