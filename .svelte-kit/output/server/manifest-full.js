export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "app",
	appPath: "ncw/app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"app/immutable/entry/start.DUD_DPYM.js","app":"app/immutable/entry/app.B87YbWRT.js","imports":["app/immutable/entry/start.DUD_DPYM.js","app/immutable/chunks/entry.CvL_bNDr.js","app/immutable/chunks/scheduler.Cv6dzE50.js","app/immutable/chunks/index.Bvnd0Eds.js","app/immutable/entry/app.B87YbWRT.js","app/immutable/chunks/scheduler.Cv6dzE50.js","app/immutable/chunks/index.Didnr6p9.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
