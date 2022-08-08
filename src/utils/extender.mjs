export default function extender(base, ...mixins) {
  class Combined extends base {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        if (mixin.prototype.initializer) {
          mixin.prototype.initializer.call(this);
        }
      });
    }
  }

  function copyProps(target, source) {
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          !/^(constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/.test(
            prop
          )
        ) {
          Object.defineProperty(
            target,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)
          );
        }
      });
  }

  mixins.forEach((mixin) => {
    copyProps(Combined.prototype, mixin.prototype);
    copyProps(Combined, mixin);
  });

  return Combined;
}
