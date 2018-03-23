const isUndefined = thing => typeof thing === 'undefined'

function noUndefined(thing) {
  function removeUndefined(result, key) {
    return isUndefined(thing[key]) ? result : Object.assign(result, { [key]: noUndefined(thing[key]) })
  }
  if (typeof thing === 'object') {
    return Object.keys(thing).reduce(removeUndefined, {})
  }
  return thing
}

export default noUndefined
