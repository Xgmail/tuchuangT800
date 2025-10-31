
// src/app/history/page.tsx
'use client';  // ← 必须加这行！

import { useState } from 'react';

export default function HistoryPage() {
  const [fileId, setFileId] = useState('');
  const [markdown, setMarkdown] = useState('');

  const generateLink = () => {
    if (fileId) {
      const md = `![图床图片](https://tg.i-c-a.su/img/${fileId})`;
      setMarkdown(md);
      navigator.clipboard.writeText(md);
      alert('已复制 Markdown 链接到剪贴板！');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Telegram 图床历史记录</h1>
      <p><strong>使用方法：</strong></p>
      <ol>
        <li>打开你的 Telegram 图床群</li>
        <li>转发任意图片给 <code>@get_id_bot</code></li>
        <li>复制 <code>File ID</code>（如 <code>AgACAgQAAx...</code>）</li>
        <li>粘贴到下面 → 一键生成 Obsidian 链接</li>
      </ol>

      <hr />

      <h3>快速生成 Markdown 链接</h3>
      <textarea
        placeholder="粘贴 file_id 这里..."
        value={fileId}
        onChange={(e) => {
          setFileId(e.target.value);
          setMarkdown(e.target.value ? `![图床图片](https://tg.i-c-a.su/img/${e.target.value})` : '');
        }}
        style={{ width: '100%', height: '80px', padding: '10px', fontFamily: 'monospace' }}
      />
      <br />
      <button
        onClick={generateLink}
        style={{
          marginTop: '10px',
          padding: '12px 20px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        生成并复制 Markdown
      </button>

      {markdown && (
        <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '15px', borderRadius: '6px' }}>
          <strong>Obsidian 可用：</strong>
          <pre style={{ margin: '10px 0', background: '#fff', padding: '10px', borderRadius: '4px' }}>
            {markdown}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(markdown)}
            style={{ fontSize: '12px', padding: '5px 10px' }}
          >
            重新复制
          </button>
        </div>
      )}

      <hr />
      <p style={{ fontSize: '14px', color: '#666' }}>
        提示：所有图片永久保存在 Telegram 群里，随时可翻旧图获取 <code>file_id</code>。
      </p>
    </div>
  );
}
