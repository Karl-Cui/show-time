export class Show {
  constructor(
    public _id: number,
    public title: string,
    public description: string,
    public approved: boolean,
    public img?: string,
    public link?: string,
    public airDate?: string,
    public airInterval?: number,
    public updating?: number,
  ) { }
}
