import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rawName = process.argv[2];

if (!rawName) {
  console.error('Укажите имя компонента: npm run component Navbar');
  process.exit(1);
}

const componentName =
  rawName.charAt(0).toUpperCase() + rawName.slice(1);

const componentDir = path.resolve(
  'src',
  'components',
  componentName,
);

await mkdir(componentDir, { recursive: false });








await Promise.all([
  writeFile(
    path.join(componentDir, `${componentName}.tsx`),
    `import cls from './${componentName}.module.scss';

const ${componentName} = () => {
  return <div className={cls.${componentName}}>${componentName}</div>;
};
export default ${componentName};
`,
  ),
  writeFile(
    path.join(componentDir, `${componentName}.module.scss`),
    `.root {
}
`,
  ),
]);

console.log(`Компонент ${componentName} создан`);