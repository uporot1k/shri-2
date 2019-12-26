class Rule {
  constructor(args) {
    this.code = args.code;
    this.error = args.error;
    this.trigger = args.triggerFn;
    this.checkError = args.lintFn;
  }
  check() {
    if (this.trigger()) {
      this.checkError() ? { code: this.code, error: this.error } : false;
    }

    return false;
  }
}

export default Rule;