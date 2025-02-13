import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Card,
  Space,
  Button,
  Select,
  Row,
  Col,
  Tooltip,
  Modal,
  Form,
  Input,
  Collapse,
  Steps,
  Divider,
  Popover,
  message,
} from 'antd';
import {
  CloudOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  LinkOutlined,
  MailOutlined,
  RightOutlined,
  ShareAltOutlined,
  CopyOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const GetStarted: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('cloudflare');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showNpmModal, setShowNpmModal] = useState(false);
  const [inviteForm] = Form.useForm();

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      message.success('Link copied to clipboard');
    });
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('pk_1234567890').then(() => {
      message.success('API key copied to clipboard');
    });
  };

  const shareContent = (
    <div style={{ width: 300 }}>
      <Paragraph style={{ marginBottom: 16 }}>
        Share this guide with your team members or developers
      </Paragraph>
      <Space.Compact style={{ width: '100%' }}>
        <Input 
          value={window.location.href} 
          readOnly
        />
        <Button 
          icon={<CopyOutlined />}
          onClick={handleCopyLink}
        >
          Copy
        </Button>
      </Space.Compact>
    </div>
  );

  const integrationMethods = [
    { value: 'cloudflare', label: 'Cloudflare' },
    { value: 'fastly', label: 'Fastly' },
    { value: 'node', label: 'Node.js' },
    { value: 'nginx', label: 'Nginx' },
    { value: 'apache', label: 'Apache' },
    { value: 'magento', label: 'Magento' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'iis', label: 'IIS' },
  ];

  const commonQuestions = [
    {
      key: '0',
      label: 'What is Prerender?',
      children: <Paragraph>Prerender is a service that generates static HTML versions of your JavaScript applications, making them SEO-friendly and improving their performance for search engines and social media crawlers.</Paragraph>
    },
    {
      key: '1',
      label: 'How long does integration take?',
      children: <Paragraph>Integration time varies by method. Cloudflare integration typically takes under 5 minutes, while other methods may take 15-30 minutes depending on your setup and familiarity with the technology.</Paragraph>
    },
    {
      key: '2',
      label: 'Do I need to modify my application code?',
      children: <Paragraph>It depends on your integration method. Cloudflare integration requires no code changes, while other methods might require minimal configuration changes to your application or server setup.</Paragraph>
    },
    {
      key: '3',
      label: 'Can I use multiple integration methods?',
      children: <Paragraph>Yes, you can use different integration methods for different environments or parts of your application, though we recommend sticking to one method for simplicity.</Paragraph>
    },
  ];

  const handleInvite = () => {
    inviteForm.validateFields().then(values => {
      console.log('Invite form values:', values);
      setShowInviteModal(false);
      inviteForm.resetFields();
    });
  };

  return (
    <Layout.Content style={{ padding: 24 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%', display: 'flex' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Title level={2}>Get Started with Prerender</Title>
              <Paragraph type="secondary">
                Follow our step-by-step guide to set up Prerender for your website.
              </Paragraph>
            </div>
            <Popover 
              content={shareContent}
              title="Share Guide"
              trigger="click"
              placement="bottomRight"
            >
              <Button icon={<ShareAltOutlined />}>
                Share
              </Button>
            </Popover>
          </div>

          <Card>
            <Steps
              direction="vertical"
              size="small"
              current={-1}
              items={[
                {
                  title: 'Select Integration Method',
                  description: (
                    <div style={{ marginTop: 8 }}>
                      <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        <Paragraph style={{ marginBottom: 0 }}>Choose how you want to integrate Prerender with your website.</Paragraph>
                        <Select
                          value={selectedMethod}
                          onChange={setSelectedMethod}
                          style={{ width: 200 }}
                          options={integrationMethods}
                        />
                      </Space>
                    </div>
                  ),
                },
                {
                  title: 'Follow Integration Guide',
                  description: (
                    <div style={{ marginTop: 8 }}>
                      <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        <Paragraph style={{ marginBottom: 8 }}>Follow our step-by-step documentation to set up Prerender for your chosen method.</Paragraph>
                        <Space size={16}>
                          <Button icon={<LinkOutlined />}>
                            View Documentation
                          </Button>
                          <div style={{ 
                            background: '#f5f5f5',
                            height: 32,
                            padding: '0 12px',
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                          }}>
                            <Text type="secondary">Your API key:</Text>
                            <Text strong>pk_1234567890</Text>
                            <Button 
                              type="text" 
                              icon={<CopyOutlined />} 
                              onClick={handleCopyApiKey}
                              style={{ marginLeft: 4 }}
                            />
                          </div>
                        </Space>
                      </Space>
                    </div>
                  ),
                },
                {
                  title: 'Verify Integration',
                  description: (
                    <div style={{ marginTop: 8 }}>
                      <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        <Paragraph style={{ marginBottom: 0 }}>Ensure everything is working correctly by verifying your integration.</Paragraph>
                        <Button type="primary" icon={<CheckCircleOutlined />}>
                          Verify Setup
                        </Button>
                      </Space>
                    </div>
                  ),
                },
              ]}
            />

            <Divider />

            <div>
              <Text type="secondary" style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>Other ways to install</Text>
              <Row gutter={16}>
                <Col span={12}>
                  <div 
                    className="install-option"
                    onClick={() => setShowInviteModal(true)}
                  >
                    <Space align="center">
                      <TeamOutlined style={{ fontSize: 16, color: '#2da01d' }} />
                      <Text strong>Install with a Team Member's Help</Text>
                    </Space>
                  </div>
                </Col>
                <Col span={12}>
                  <div 
                    className="install-option"
                    onClick={() => setShowNpmModal(true)}
                  >
                    <Space align="center">
                      <img 
                        src="https://static-00.iconduck.com/assets.00/npm-icon-2048x2048-wm0mnkz6.png" 
                        alt="npm" 
                        width="16" 
                        height="16" 
                        style={{ borderRadius: '4px' }}
                      />
                      <Text strong>Install Using npm</Text>
                    </Space>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>

          <Card 
            style={{ cursor: 'pointer' }}
            onClick={() => window.open('#/integration-methods', '_blank')}
            className="hover-card"
          >
            <div>
              <Title level={3} style={{ marginTop: 0, marginBottom: 16 }}>Use your technology of choice</Title>
              <Paragraph style={{ marginBottom: 40 }}>
                Prerender integrates with various frameworks, allowing you to choose the best fit for your project.
              </Paragraph>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space size={16}>
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'rgba(0, 0, 0, 0.08)',
                      borderRadius: 6
                    }}>
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" width="24" />
                    </div>
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'rgba(76, 152, 66, 0.08)',
                      borderRadius: 6
                    }}>
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="24" />
                    </div>
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'rgba(69, 173, 63, 0.08)',
                      borderRadius: 6
                    }}>
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" width="24" />
                    </div>
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'rgba(231, 116, 39, 0.08)',
                      borderRadius: 6
                    }}>
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" alt="Apache" width="24" />
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>+13 more</Text>
                  </Space>
                </Col>
                <Col>
                  <Button type="text" icon={<RightOutlined />}>
                    View All Integration Methods
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>

          <div>
            <Title level={3}>Common Questions</Title>
            <Collapse
              ghost
              expandIcon={({ isActive }) => (
                <RightOutlined rotate={isActive ? 90 : 0} />
              )}
              items={commonQuestions.map(item => ({
                ...item,
                className: 'question-item',
                children: (
                  <div style={{ padding: '16px', background: 'white', borderRadius: '0 0 8px 8px' }}>
                    {item.children}
                  </div>
                ),
              }))}
            />
          </div>

          <Modal
            title="Invite Team Members"
            open={showInviteModal}
            onOk={handleInvite}
            onCancel={() => setShowInviteModal(false)}
            width={500}
          >
            <Form
              form={inviteForm}
              layout="vertical"
            >
              <Form.Item
                name="emails"
                label={
                  <Space>
                    <span>Email Addresses</span>
                    <Tooltip title="Enter email addresses of team members you want to invite">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                }
                rules={[
                  { required: true, message: 'Please enter at least one email address' },
                  { type: 'string', pattern: /^[^,]*$/, message: 'Please enter one email per line' }
                ]}
              >
                <Input.TextArea
                  placeholder="Enter one email address per line"
                  rows={4}
                  prefix={<MailOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="message"
                label="Personal Message (Optional)"
              >
                <Input.TextArea
                  placeholder="Add a personal message to your invitation"
                  rows={3}
                />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Install Using npm"
            open={showNpmModal}
            onCancel={() => setShowNpmModal(false)}
            footer={[
              <Button key="verify" type="primary" icon={<CheckCircleOutlined />}>
                Verify Integration
              </Button>,
              <Button 
                key="npm"
                icon={<ArrowRightOutlined />}
                onClick={() => window.open('https://www.npmjs.com/package/prerender', '_blank')}
              >
                View npm Package
              </Button>,
            ]}
            width={600}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong>Install the package</Text>
                <Paragraph type="secondary">
                  The quickest way to run your own prerender server:
                </Paragraph>
                <Card>
                  <code>$ npm install prerender</code>
                </Card>
              </div>

              <div>
                <Text strong>Create your server</Text>
                <Card>
                  <pre style={{ margin: 0 }}>
                    <code>
                      {`server.js
const prerender = require('prerender');
const server = prerender();
server.start();`}
                    </code>
                  </pre>
                </Card>
              </div>

              <div>
                <Text strong>Test it</Text>
                <Card>
                  <code>curl http://localhost:3000/render?url=https://www.example.com/</code>
                </Card>
              </div>
            </Space>
          </Modal>
        </Space>
      </div>
    </Layout.Content>
  );
};

export default GetStarted;
