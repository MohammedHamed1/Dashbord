import React, { useState } from 'react';
import { Card, Input, Button, List, Typography, Avatar, Space } from 'antd';
import { RobotOutlined, UserOutlined, SendOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SmartAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'مرحبًا! أنا المساعد الذكي. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setLoading(true);
    // محاكاة رد الذكاء الاصطناعي
    setTimeout(() => {
      setMessages(prev => ([
        ...prev,
        { sender: 'ai', text: 'هذه إجابة تجريبية من المساعد الذكي. يمكن ربط هذا القسم لاحقًا مع OpenAI أو Claude أو أي مزود ذكاء اصطناعي.' }
      ]));
      setLoading(false);
    }, 1200);
    setInput('');
  };

  return (
    <Card
      title={<span><ThunderboltOutlined style={{ color: '#722ed1' }} /> المساعد الذكي</span>}
      style={{ maxWidth: 600, margin: '32px auto', borderRadius: 16 }}
      styles={{ body: { background: '#fafaff', minHeight: 400 } }}
    >
      <List
        dataSource={messages}
        renderItem={msg => (
          <List.Item style={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <Space>
              {msg.sender === 'ai' && <Avatar icon={<RobotOutlined />} style={{ background: '#722ed1' }} />}
              <Text style={{ background: msg.sender === 'ai' ? '#f4f0ff' : '#e6f7ff', padding: '8px 16px', borderRadius: 16, maxWidth: 350, display: 'inline-block' }}>{msg.text}</Text>
              {msg.sender === 'user' && <Avatar icon={<UserOutlined />} style={{ background: '#1890ff' }} />}
            </Space>
          </List.Item>
        )}
        style={{ marginBottom: 24, maxHeight: 320, overflowY: 'auto' }}
      />
      <Input.Group compact>
        <Input
          style={{ width: '80%' }}
          placeholder="اكتب رسالتك..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onPressEnter={handleSend}
          disabled={loading}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
        >
          إرسال
        </Button>
      </Input.Group>
      <div style={{ marginTop: 16, color: '#888', fontSize: 13 }}>
        <ThunderboltOutlined /> هذا القسم يمكن ربطه لاحقًا مع <a href="https://openai.com/" target="_blank" rel="noopener noreferrer">OpenAI</a> أو <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer">Claude</a> أو أي مزود ذكاء اصطناعي آخر.
      </div>
    </Card>
  );
};

export default SmartAssistant; 