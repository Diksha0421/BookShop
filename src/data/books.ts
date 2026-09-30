export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  color: string;
};

export const books: Book[] = [
  {id: '1', title: 'The Alchemist', author: 'Paulo Coelho', price: 299, color: '#D9694E'},
  {id: '2', title: 'Atomic Habits', author: 'James Clear', price: 399, color: '#2E5E82'},
  {id: '3', title: 'Deep Work', author: 'Cal Newport', price: 349, color: '#4E9A82'},
];
