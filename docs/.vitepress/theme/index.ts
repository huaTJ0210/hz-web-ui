import DefaultTheme from 'vitepress/theme';
import { AntDesignContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import { EnhanceAppContext } from 'vitepress';

import webUI from '@htj24/web-ui';

export default {
	...DefaultTheme,
	enhanceApp(ctx: EnhanceAppContext) {
		ctx.app.use(webUI);
		ctx.app.component('demo-preview', AntDesignContainer);
	}
};
