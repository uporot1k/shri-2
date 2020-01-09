class Rule {
  constructor(args) {
    this.code = args.code;
    this.error = args.error;
    this.trigger = args.triggerFn;
    this.checkError = args.lintFn;
  }
  check(node, parent, prop, index) {

    if (this.trigger(node, parent, prop)) {
      const errorLoc = this.checkError(parent);

      if (errorLoc) {
        // debugger
        return { code: this.code, error: this.error, location: errorLoc };
      }
    }

    return true;
  }

}

export default Rule;
