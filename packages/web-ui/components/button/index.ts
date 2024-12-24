import Button from './src/button.vue'
import { App } from 'vue'

Button.name = 'hz-button'

Button.install = (app: App): void => {
	// 注册组件
	app.component(Button.name!, Button)
}

export default Button
