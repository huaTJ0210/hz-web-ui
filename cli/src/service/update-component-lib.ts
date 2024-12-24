import { ComponentInfo } from '../domain/component-info';
import path from 'path';
import fs from 'fs';
import { g } from '../utils/log-utils';

const updateComponentLibIndex = (libPath: string, componentInfo: ComponentInfo) => {
	const indexPath = path.join(libPath, 'index.ts');
	const content = fs.readFileSync(indexPath).toString();

	const index1 = content.indexOf('// import component end');
	const index2 = content.indexOf('] // components');

	const result =
		`${content.substring(0, index1)}` +
		`import ${componentInfo.upCamelName} from './components/${componentInfo.lineName}'\n` +
		content.substring(index1, index2) +
		`,\n  ${componentInfo.upCamelName}\n` +
		content.substring(index2);

	fs.writeFileSync(indexPath, result);
};

/**
 * 更新组件库入口
 */
export const updateComponentLib = async (componentInfo: ComponentInfo) => {
	// 组件库入口的路径
	const libPath = componentInfo.libPath;
	// 1. 更新入口 index.ts
	updateComponentLibIndex(libPath, componentInfo);

	g('component library update success');
};
