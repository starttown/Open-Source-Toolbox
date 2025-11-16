const fs = require('fs');
const path = require('path');

// 读取模板和数据
const templatePath = path.join(__dirname, 'src', 'template.html');
const toolsDataPath = path.join(__dirname, 'src', 'tools.json');
const outputPath = path.join(__dirname, 'index.html');

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

// 写入最终的 index.html
fs.writeFileSync(outputPath, finalHtml);

console.log('✅ index.html has been generated successfully!');
