import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Card,
  Button,
  Space,
  Tooltip,
  Badge,
  Switch,
  Table,
  Tag,
  Alert,
  Dropdown,
} from 'antd';
import {
  ReloadOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  ClearOutlined,
  MobileOutlined,
  CloseOutlined,
  MoreOutlined,
  EyeOutlined,
  DeleteOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Container } from '../components/Container';

const { Title, Text, Paragraph } = Typography;

const Pages: React.FC = () => {
  const [showOldPages, setShowOldPages] = useState(false);
  const [showPagesGuide, setShowPagesGuide] = useState(true);

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  };

  const cachedPages = [
    {
      key: '1',
      contentAge: '4 days ago',
      url: 'https://example.com/page1',
      device: 'Desktop',
      seoScore: 92,
      state: 'Cached',
      firstSeen: '2024-01-15',
      source: 'Sitemap',
      lastCrawled: '2024-01-16 14:30:00',
    },
  ];

  const columns = [
    {
      title: 'Content Age',
      dataIndex: 'contentAge',
      key: 'contentAge',
      render: (text: string) => text,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      render: (text: string) => (
        <Space>
          <MobileOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: () => (
        <Space>
          <span>SEO Score</span>
          <Tooltip title="A measure of how well your page is optimized for search engines. Factors include meta tags, content quality, and performance.">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'seoScore',
      key: 'seoScore',
      render: (score: number) => (
        <Tag color={score >= 90 ? 'success' : score >= 70 ? 'warning' : 'error'}>
          {score}
        </Tag>
      ),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (text: string) => (
        <Badge status="success" text={text} />
      ),
    },
    {
      title: 'First Seen',
      dataIndex: 'firstSeen',
      key: 'firstSeen',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Last Crawled',
      dataIndex: 'lastCrawled',
      key: 'lastCrawled',
      render: (timestamp: string) => (
        <Tooltip title={timestamp}>
          <Text>{formatRelativeTime(timestamp)}</Text>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 60,
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'recache',
                label: 'Recache',
                icon: <ReloadOutlined />,
                onClick: () => console.log('Recache page:', record.url),
              },
              {
                key: 'audit',
                label: 'Audit',
                icon: <AuditOutlined />,
                onClick: () => console.log('Audit page:', record.url),
              },
              {
                key: 'view',
                label: 'View Cached Page',
                icon: <EyeOutlined />,
                onClick: () => console.log('View cached page:', record.url),
              },
              {
                type: 'divider',
              },
              {
                key: 'delete',
                label: 'Delete',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => console.log('Delete page:', record.url),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            style={{ width: 32, height: 32, padding: 0 }}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>Pages</Title>
            <Paragraph type="secondary">
              Monitor and manage your cached pages
            </Paragraph>
          </div>

          {showPagesGuide && (
            <Alert
              message={
                <Space>
                  <Text strong>Manage Your Pages</Text>
                </Space>
              }
              description={
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <Text>View and manage all your cached pages in one place. Monitor their status, performance, and keep them up to date.</Text>
                  <Space size={16} style={{ marginTop: 40 }}>
                    <Button
                      type="primary"
                      onClick={() => window.open('#/help/pages', '_blank')}
                    >
                      Learn More About Pages
                    </Button>
                    <Button
                      type="text"
                      onClick={() => setShowPagesGuide(false)}
                    >
                      Close
                    </Button>
                  </Space>
                </Space>
              }
              type="info"
              showIcon={false}
              closable
              closeIcon={<CloseOutlined />}
              onClose={() => setShowPagesGuide(false)}
            />
          )}

          <Card styles={{ body: { padding: 0 } }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                  <Switch
                    checked={showOldPages}
                    onChange={setShowOldPages}
                  />
                  <Text>
                    Show unindexed pages
                    <Tooltip title="Display pages that haven't been requested by Google in the last 30 days">
                      <InfoCircleOutlined style={{ marginLeft: 8 }} />
                    </Tooltip>
                  </Text>
                </Space>
                <Space size={8}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add URL
                  </Button>
                  <Button icon={<ClearOutlined />}>Clear Cache</Button>
                </Space>
              </Space>
            </div>

            <Table
              columns={columns}
              dataSource={cachedPages}
              pagination={{
                total: cachedPages.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                style: { padding: '0 16px' }
              }}
              className="no-radius-table"
            />
          </Card>
        </Space>
      </Container>
    </Layout.Content>
  );
};

export default Pages;
