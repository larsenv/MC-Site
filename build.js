const fs = require('fs');
const path = require('path');

function processIncludes(content) {
    return content.replace(/{%\s+include\s+([\w.]+)\s+%}/g, (match, includeFile) => {
        const includePath = path.join('_includes', includeFile);
        if (fs.existsSync(includePath)) {
            return processIncludes(fs.readFileSync(includePath, 'utf8'));
        }
        return `<!-- Include not found: ${includeFile} -->`;
    });
}

function buildPage(pagePath) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Extract front matter
    const frontMatterMatch = content.match(/^---([\s\S]*?)---/);
    let frontMatter = {};
    if (frontMatterMatch) {
        const fmText = frontMatterMatch[1];
        fmText.split('\n').forEach(line => {
            const [key, ...value] = line.split(':');
            if (key && value.length > 0) {
                frontMatter[key.trim()] = value.join(':').trim();
            }
        });
        content = content.replace(/^---[\s\S]*?---/, '');
    }

    // Handle layout
    if (frontMatter.layout) {
        const layoutPath = path.join('_layouts', `${frontMatter.layout}.html`);
        if (fs.existsSync(layoutPath)) {
            let layoutContent = fs.readFileSync(layoutPath, 'utf8');
            content = layoutContent.replace('{{ content }}', content);
        }
    }

    // Process includes
    content = processIncludes(content);

    // Replace some common Jekyll variables
    content = content.replace(/{{ page.title }}/g, frontMatter.title || 'MarioCube');
    content = content.replace(/{{ site.url }}/g, 'http://localhost:8080');
    content = content.replace(/{{ site.title }}/g, 'MarioCube');
    content = content.replace(/{{ page.url | replace:'index.html','' }}/g, '');

    return content;
}

const builtContent = buildPage('index.html');
if (!fs.existsSync('_test_site')) {
    fs.mkdirSync('_test_site');
}
fs.writeFileSync(path.join('_test_site', 'index.html'), builtContent);

// Copy assets
const assets = ['css', 'images', 'js'];
assets.forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.cpSync(dir, path.join('_test_site', dir), { recursive: true });
    }
});

console.log('Mock build complete in _test_site/');
