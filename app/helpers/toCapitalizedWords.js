const toCapitalizedWords = (name) => {
    const capitalize = word => word.charAt(0).toUpperCase() + word.substring(1)
    const words = name.match(/[A-Za-z][a-z]*/g)
    return words.map(capitalize).join(' ')
}

export default toCapitalizedWords
