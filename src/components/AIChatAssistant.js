import React, { useState } from 'react';
import { Card, Input, Button, List } from 'antd';
import { RobotOutlined } from '@ant-design/icons';

const AIChatAssistant = () => {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const send = () => {
    if (!input) return;
    setMessages([...messages, { from: 'user', text: input }, { from: 'ai', text: 'تم استلام سؤالك: ' + input }]);
    setInput('');
  };
  return (
    <Card title={<><RobotOutlined /> المساعد الذكي</>} style={{ maxWidth: 400, margin: '0 auto' }}>
      <List
        dataSource={messages}
        renderItem={msg => (
          <List.Item style={{ justifyContent: msg.from === 'ai' ? 'flex-start' : 'flex-end' }}>
            <span style={{ background: msg.from === 'ai' ? '#e6f7ff' : '#f6ffed', padding: 8, borderRadius: 8 }}>{msg.text}</span>
          </List.Item>
        )}
        style={{ minHeight: 200, maxHeight: 300, overflowY: 'auto' }}
      />
      <Input.Group compact>
        <Input value={input} onChange={e => setInput(e.target.value)} onPressEnter={send} placeholder="اكتب سؤالك..." style={{ width: '80%' }} />
        <Button type="primary" onClick={send}>إرسال</Button>
      </Input.Group>
    </Card>
  );
};

export default AIChatAssistant; 