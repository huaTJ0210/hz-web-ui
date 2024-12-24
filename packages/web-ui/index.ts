import { App } from 'vue'
import Button from './components/button'
import Input from './components/input'
// import component end
const components: any[] = [,
  Button
,
  Input
] // components

// 全局动态添加组件
const install = (app: App): void => {
	components.forEach((component) => {
		app.component(component.name!, component)
	})
}

export default {
	install
}
