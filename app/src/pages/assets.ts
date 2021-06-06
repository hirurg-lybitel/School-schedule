const metaAssets = () => {
    return [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'minimum-scale=1, initial-scale=1, width=device-width' },
    ];
};

const linkAssets = () => {
    const links = [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    ];

    return links;
};

export const title = 'test School scheduler';
export const meta = metaAssets();
export const link = linkAssets();
