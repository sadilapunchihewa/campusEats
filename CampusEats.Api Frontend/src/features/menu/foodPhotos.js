const photos = {
  "kottu roti": {
    image: "/images/kottu.jpg",
    description: "A Sri Lankan favourite for your lunch break.",
  },
  "fried rice": {
    image: "/images/fried-rice.jpg",
    description: "A comforting rice dish for a hungry afternoon.",
  },
  watalappan: {
    image: "/images/watalappan.jpg",
    description: "Finish your meal with a Sri Lankan sweet treat.",
  },
};
export function foodPhoto(dish) {
  return (
    photos[dish.name.toLowerCase()] || {
      image: null,
      description: `Explore this ${dish.category.toLowerCase()} dish.`,
    }
  );
}
export function price(value) {
  return `Rs. ${Number(value).toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
