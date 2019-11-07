let Decorator = function(props) {
  this.defaultProps = props
}
Decorator.prototype.setProps = (object, props) => {
  for (const a in props) {
    object[a] = props[a]
  }
  return object
}
Decorator.prototype.matchFilter = (object, filters) => {
  if (!(filters instanceof Array)) filters = [filters]

  let matched = true
  for (const filter of filters) {
    // on null filter we return true
    if (filter === null) {
      return matched
    }
    matched = true
    for (const a in filter) {
      if (typeof object[a] !== void 0 && object[a] !== filter[a]) {
        matched = false
        break
      }
    }
  }
  return matched
}
/**
 * objects - array of objects that we want to decorate by props
 * propFilters - array of objects where each object conatains props and values that should be in the decorated object
 * decoratedProps -
 */
Decorator.prototype.decorate = (objects, propFilters, decoratedProps) => {
  if (typeof decoratedProps !== 'object') {
    throw 'Decorator.decorate: decoratedProps is not an object!'
  }

  // check if "objects" variable is iterable
  const isIterable = object =>
    object != null && typeof object[Symbol.iterator] === 'function'

  // force them iterable
  if (!isIterable(objects)) {
    objects = [objects]
  }

  // for each object in array, we should:
  //   set default decorated props
  //   check if the object mathes the filter props
  //     and set new decorated props for the filtered objects

  for (const a in objects) {
    this.setProps(objects[a], this.defaultProps)

    if ((this.matchFilter(objects[a]), propFilters)) {
      this.setProps(objects[a], this.decoratedProps)
    }
  }

  return objects
}

const DecorateService = {
  create: props => new Decorator(props),
  decorateArray(array, props, funcs) {
    if (!(array instanceof Array)) {
      throw 'Only arrays could be decorated by DecorateService.decorateArray'
    }
    array.forEach(element => {
      this.decorate(element, props, funcs)
    })
    return array
  },
  undecorateArray(array) {
    if (!(array instanceof Array)) {
      throw 'Only arrays could be decorated by DecorateService.undecorateArray'
    }
    array.forEach(element => {
      this.undecorate(element)
    })
    return array
  },
  decorate(object, props, funcs) {
    object._decorated = [
      ...new Set(
        object._decorated.concat(Object.keys(props), Object.keys(funcs))
      )
    ]
    for (const propName in props) {
      object[propName] = props[propName]
    }
    for (const funcName in funcs) {
      object.funcName = funcs[funcName].bind(object)
    }
    return object
  },
  undecorate(object) {
    if (object._decorated !== void 0)
      for (const propName in object._decorated) {
        object[propName] = null
        delete object[propName]
      }
    return object
  }
}
export default DecorateService
