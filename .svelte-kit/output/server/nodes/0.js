import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["app/immutable/nodes/0.DGhAtNvL.js","app/immutable/chunks/scheduler.Cv6dzE50.js","app/immutable/chunks/index.Didnr6p9.js"];
export const stylesheets = [];
export const fonts = [];
