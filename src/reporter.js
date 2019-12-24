
class Reporter {
  constructor() {
    this.error = [];
  }
  commitError(args) {
    const error = new Error(args);

    this.error = [...this.error, error];
  }
  report() {
    return this.error;
  }
}

class Error {
  constructor(args) {
    this.code = args.code;
    this.error = args.error;
    this.location = args.location;
  }
}

export default Reporter;