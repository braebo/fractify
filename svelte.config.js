// @ts-ignore
import * as postcss from './postcss.config.cjs';
import preprocess from 'svelte-preprocess';

export default {
    preprocess: [
        preprocess({ postcss }),
    ],
};
