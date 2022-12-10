const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    // Плагины к PostCSS
    plugins: [
        autoprefixer,
        cssnano({ preset: 'default' })
    ]
};