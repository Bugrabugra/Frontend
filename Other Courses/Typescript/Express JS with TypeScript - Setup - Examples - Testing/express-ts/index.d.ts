declare global {
  namespace Express {
    type Request = {
      customField?: string;
    }
  }
}
