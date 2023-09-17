import { Person } from "./interfaces";

export type PersonListType = {
  items: Person[];
  total: number;
  page: number;
  size: number;
  pages: number;
};
