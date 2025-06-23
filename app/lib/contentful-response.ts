export class ContentfulResponse<D, E extends Error> {
  error: E | null;
  data: D;

  constructor(data: D, error: E | null) {
    this.data = data;
    this.error = error;
  }
}
