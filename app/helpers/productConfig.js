import _ from 'lodash'
import Api from '../helpers/api'

export async function getConfig(history) {
    const config = await Api.getProduct().then(response => response.data).catch(() => ({}))

    localStorage.setItem('config', JSON.stringify(config))

    if (_.isEmpty(config) && history) {
        history.replace('/404')
        return {}
    }

    // Set styling variables
    const { style } = document.documentElement
    style.setProperty('--primary', config.primaryColor || '#3333FF')
    style.setProperty('--btn-radius', `${config.borderRadius}px` || '100px')

    // set fonts
    if (config.fontName) {
        style.setProperty('--font-name', config.fontName || 'Open Sans')
        document.head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=${encodeURIComponent(config.fontName)}:100,300,400,600,700" rel="stylesheet">`
    }

    return config
}

export const decodeConfig = () => JSON.parse(localStorage.getItem('config'))
