export const StatusObj = {
  DISABLED: { key: 0, text: "Disabled" },
  ACTIVE: { key: 1, text: "Active" },
};

export const FILTER_OPTIONS = [
  { key: "bookstore", text: "Bookstore" },
];


export const BOOK_OPTIONS = [
  { key: 2, text: "Top Rating", route: "RATING" },
  { key: 3, text: "New Arrival", route: "NEW_ARRIVAL" },
  { key: 4, text: "Best Novel", route: "BEST_NOVEL" },
  { key: 5, text: "Top Free", route: "FREE" },
]

export const BOOK_STATUS = [
  { key: 1, text: "Completed" },
  { key: 2, text: "Progress" },
]

export const PAYMENT_TYPES = [
  { key: 1, text: "Buy" },
  { key: 2, text: "Subscript" },
  { key: 3, text: "Free" },
]