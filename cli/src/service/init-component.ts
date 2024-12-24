import fs from 'fs';
import path from 'path';
import { ComponentInfo } from '../domain/component-info';
import { execCmd } from '../utils/cmd-utils';
import { g } from '../utils/log-utils';
import { indexTemplate, sfcTemplate, tsxTemplate, typesTemplate } from '../utils/template-utils';

/**
 * 创建组件目录及文件
 */
export const initComponent = (componentInfo: ComponentInfo) =>
	new Promise((resolve, reject) => {
		if (fs.existsSync(componentInfo.fullPath)) {
			return reject(new Error('组件已存在'));
		}

		// 1. 创建组件根目录
		fs.mkdirSync(componentInfo.fullPath);

		// 2. 初始化 package.json
		execCmd(`cd ${componentInfo.fullPath}`)
			.then((r) => {
				// 3. 创建组件 src 目录
				fs.mkdirSync(path.resolve(componentInfo.fullPath, 'src'));

				// 4. 创建 src/xxx.vue 或s src/xxx.tsx
				createSrcIndex(componentInfo);

				// 5. 创建 src/types.ts 文件
				createSrcTypes(componentInfo);

				// 6. 创建 index.ts
				createIndex(componentInfo);

				g('component init success');

				return resolve(componentInfo);
			})
			.catch((e) => {
				return reject(e);
			});
	});

// const updatePackageJson = (componentInfo: ComponentInfo) => {
//   const { lineName, fullPath, nameWithLib } = componentInfo
//   const packageJsonPath = `${fullPath}/package.json`
//   if (fs.existsSync(packageJsonPath)) {
//     let content = fs.readFileSync(packageJsonPath).toString()
//     content = content.replace(lineName, nameWithLib)
//     fs.writeFileSync(packageJsonPath, content)
//   }
// }

const createSrcIndex = (componentInfo: ComponentInfo) => {
	let content = '';
	if (componentInfo.type === 'vue') {
		content = sfcTemplate(componentInfo.lineNameWithPrefix, componentInfo.lowCamelName);
	} else {
		content = tsxTemplate(componentInfo.lineNameWithPrefix, componentInfo.lowCamelName);
	}
	const fileFullName = `${componentInfo.fullPath}/src/${componentInfo.lineName}.${componentInfo.type}`;
	fs.writeFileSync(fileFullName, content);
};

const createSrcTypes = (componentInfo: ComponentInfo) => {
	const content = typesTemplate(componentInfo.lowCamelName, componentInfo.upCamelName);
	const fileFullName = `${componentInfo.fullPath}/src/types.ts`;
	fs.writeFileSync(fileFullName, content);
};

const createIndex = (componentInfo: ComponentInfo) => {
	fs.writeFileSync(`${componentInfo.fullPath}/index.ts`, indexTemplate(componentInfo));
};
