const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'https://www.musicdo.cn:444/' : 'api/'
}
