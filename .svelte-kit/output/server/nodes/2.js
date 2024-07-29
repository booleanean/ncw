

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["app/immutable/nodes/2.BvJoydCJ.js","app/immutable/chunks/scheduler.Cv6dzE50.js","app/immutable/chunks/index.Didnr6p9.js","app/immutable/chunks/index.Bvnd0Eds.js"];
export const stylesheets = ["app/immutable/assets/2.B22N-nAp.css"];
export const fonts = [];
