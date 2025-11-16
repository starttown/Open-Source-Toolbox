const fs = require('fs');
const path = require('path');

// 路径设置
const srcDir = path.join(__dirname, 'src');
const rootDir = __dirname;

const templatePath = path.join(srcDir, 'template.html');
const toolsDataPath = path.join(srcDir, 'tools.json');
const stylePath = path.join(srcDir, 'style.css');
const outputPath = path.join(rootDir, 'index.html');
const outputStylePath = path.join(rootDir, 'style.css');

// 读取模板和数据
const template = fs.readFileSync(templatePath, 'utf8');
const tools = JSON.parse(fs.readFileSync(toolsDataPath, 'utf8'));

// 生成工具卡片 HTML
const toolsHtml = tools.map(tool => `
    <div class="tool-card">
        <div class="card-header">
            <h3>${tool.icon} ${tool.name}</h3>
        </div>
        <div class="card-body">
            <p>${tool.description}</p>
            <div class="tags">
                ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="card-footer">
            <a href="${tool.demoUrl}" class="btn primary" target="_blank">在线体验</a>
            ${tool.repoUrl ? `<a href="${tool.repoUrl}" class="btn secondary" target="_blank">查看源码</a>` : ''}
        </div>
    </div>
`).join('');

// 替换占位符
const finalHtml = template.replace('<!-- TOOLS_PLACEHOLDER -->', toolsHtml);

// 写入文件
fs.writeFileSync(outputPath, finalHtml);
fs.writeFileSync(outputStylePath, fs.readFileSync(stylePath));  // 复制CSS文件

console.log('✅ index.html and style.css have been generated successfully!');
