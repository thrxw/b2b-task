export interface DataItem {
  id: number;
  int: number;
  float: string;
  color: string
  child: {
    id: number
    color: string
  }
}
