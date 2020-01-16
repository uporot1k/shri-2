class Rule {
  constructor(args) {
    this.code = args.code;
    this.errorCode = args.error;
    this.trigger = args.triggerFn;
    this.checkError = args.lintFn;
  }
  check(node, parent, prop, index) {
    const reducer = (acc, error) => {
      return acc.push({
        code: this.code,
        error: this.errorCode,
        loc: { start: error.location.start, end: error.location.end }
      });
    };
    const triggeredObj = this.trigger(node, parent, prop);
    if (triggeredObj) {
      const errorObj = this.checkError(triggeredObj);

      if (errorLoc.length > 0) {
        // errorObj
        return errorObj.reduce(reducer, []);
        // return { code: this.code, error: this.error, location: errorLoc };
      }
    }

    return true;
  }
}

export default Rule;
