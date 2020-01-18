class Rule {
  constructor(args) {
    this.code = args.code;
    this.errorCode = args.error;
    this.trigger = args.triggerFn;
    this.checkError = args.lintFn;
  }
  check({node, parent, prop}, commitError) {
    const triggeredObj = this.trigger(node, parent, prop);
    if (triggeredObj) {
      this.checkError(triggeredObj, this.submitError.bind(this), commitError);
    }

    return true;
  }
  submitError(loc, commit) {
    const payload = {
      code: this.code,
      error: this.errorCode,
      location: {
        start: {
          line: loc.start.line,
          column: loc.start.column
        },
        end: {
          line: loc.end.line,
          column: loc.end.column
        },
      }
    };

    commit(payload);
  }
}

export default Rule;
