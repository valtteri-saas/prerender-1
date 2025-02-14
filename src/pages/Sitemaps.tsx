import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Button,
  Table,
  Space,
  Switch,
  Tag,
  Tooltip,
  Input,
  Card,
  Alert,
  Modal,
  Form,
  Radio,
  Select,
  Dropdown,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  GoogleOutlined,
  EyeOutlined,
  DeleteOutlined,
  DesktopOutlined,
  MobileOutlined,
  GlobalOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  MoreOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Container } from '../components/Container';

const { Title, Text, Paragraph } = Typography;

interface SitemapData {
  key: string;
  status: boolean;
  url: string;
  createdAt: string;
  revisitInterval: string;
  deviceCompatibility: string[];
  lastVisitedAt: string;
  nextVisit: string;
  origin: string;
  health: string;
}

const Sitemaps: React.FC = () => {
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [importForm] = Form.useForm();

  // Function to format relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Function to format future relative time
  const getFutureRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'in a moment';
    if (diffInSeconds < 3600) return `in ${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `in ${Math.floor(diffInSeconds / 3600)}h`;
    return `in ${Math.floor(diffInSeconds / 86400)}d`;
  };

  const sitemaps: SitemapData[] = [
    {
      key: '1',
      status: true,
      url: 'https://example.com/sitemap.xml',
      createdAt: '2024-03-01',
      revisitInterval: '24 hours',
      deviceCompatibility: ['desktop', 'mobile'],
      lastVisitedAt: '2024-03-15 10:30:00',
      nextVisit: '2024-03-16 10:30:00',
      origin: 'Manual',
      health: 'healthy',
    },
    {
      key: '2',
      status: true,
      url: 'https://example.com/blog-sitemap.xml',
      createdAt: '2024-03-02',
      revisitInterval: '12 hours',
      deviceCompatibility: ['desktop'],
      lastVisitedAt: '2024-03-15 12:30:00',
      nextVisit: '2024-03-16 00:30:00',
      origin: 'Google Search Console',
      health: 'warning',
    },
  ];

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
      default:
        return <QuestionCircleOutlined />;
    }
  };

  const getHealthTooltip = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'All pages in this sitemap are working correctly';
      case 'warning':
        return 'Some pages might be loading slowly or have minor issues';
      case 'error':
        return 'Some pages are not working - immediate attention needed';
      default:
        return 'Status unknown';
    }
  };

  const columns = [
    {
      title: () => (
        <Space>
          <span>Active</span>
          <Tooltip title="Toggle to enable or disable sitemap monitoring">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: boolean) => (
        <Switch
          checked={status}
          size="small"
          onChange={(checked) => console.log('Status changed:', checked)}
        />
      ),
    },
    {
      title: 'Sitemap URL',
      dataIndex: 'url',
      key: 'url',
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: () => (
        <Space>
          <span>Update Frequency</span>
          <Tooltip title="How often we check this sitemap for changes">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'revisitInterval',
      key: 'revisitInterval',
      width: 140,
      render: (text: string) => (
        <Space>
          <ClockCircleOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: () => (
        <Space>
          <span>Devices</span>
          <Tooltip title="Which devices this sitemap is optimized for">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'deviceCompatibility',
      key: 'deviceCompatibility',
      width: 180,
      render: (devices: string[]) => (
        <Space>
          {devices.includes('desktop') && (
            <Tooltip title="Desktop Version">
              <DesktopOutlined />
            </Tooltip>
          )}
          {devices.includes('mobile') && (
            <Tooltip title="Mobile Version">
              <MobileOutlined />
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: 'Last Check',
      dataIndex: 'lastVisitedAt',
      key: 'lastVisitedAt',
      width: 160,
      render: (timestamp: string) => (
        <Tooltip title={timestamp}>
          {getRelativeTime(timestamp)}
        </Tooltip>
      ),
    },
    {
      title: 'Next Check',
      dataIndex: 'nextVisit',
      key: 'nextVisit',
      width: 160,
      render: (timestamp: string) => (
        <Tooltip title={timestamp}>
          {getFutureRelativeTime(timestamp)}
        </Tooltip>
      ),
    },
    {
      title: 'Added By',
      dataIndex: 'origin',
      key: 'origin',
      width: 160,
      render: (text: string) => (
        <Tag icon={text === 'Google Search Console' ? <GoogleOutlined /> : <GlobalOutlined />}>
          {text === 'Google Search Console' ? 'GSC' : text}
        </Tag>
      ),
    },
    {
      title: () => (
        <Space>
          <span>Status</span>
          <Tooltip title="Overall health of pages in this sitemap">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'health',
      key: 'health',
      width: 100,
      render: (health: string) => (
        <Tooltip title={getHealthTooltip(health)}>
          {getHealthIcon(health)}
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 60,
      render: (_: any, record: SitemapData) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'view',
                label: 'View Pages',
                icon: <EyeOutlined />,
                onClick: () => console.log('View sitemap:', record.url),
              },
              {
                key: 'recache',
                label: 'Recache',
                icon: <ReloadOutlined />,
                onClick: () => console.log('Recache sitemap:', record.url),
              },
              {
                type: 'divider',
              },
              {
                key: 'delete',
                label: 'Delete',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => console.log('Delete sitemap:', record.url),
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

  const handleImportSubmit = () => {
    importForm.validateFields().then(values => {
      console.log('Import form values:', values);
      setShowImportModal(false);
      importForm.resetFields();
    });
  };

  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Title level={2}>Sitemaps</Title>
              <Paragraph type="secondary">
                Keep search engines up to date with your latest content
              </Paragraph>
            </div>
            <Space>
              <Tooltip title="Add a new sitemap to monitor">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowImportModal(true)}
                >
                  Add Sitemap
                </Button>
              </Tooltip>
              {!isGoogleConnected && (
                <Button
                  icon={<GoogleOutlined />}
                  onClick={() => setIsGoogleConnected(true)}
                >
                  Connect GSC
                </Button>
              )}
              {isGoogleConnected && (
                <Button
                  icon={<SyncOutlined />}
                  onClick={() => console.log('Syncing with Google Search Console')}
                >
                  Sync with GSC
                </Button>
              )}
            </Space>
          </div>

          {showGuide && (
            <Alert
              message={
                <Space>
                  <Text strong>Boost Your SEO with Sitemaps</Text>
                </Space>
              }
              description={
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <Text>Improve your site's visibility by loading sitemaps into Prerender. Our system fetches and prepares pages for search engines, enhancing SEO performance.</Text>
                  <Space size={16} style={{ marginTop: 40 }}>
                    <Button
                      type="primary"
                      onClick={() => window.open('#/help/sitemaps', '_blank')}
                    >
                      Discover how to effectively use Prerender
                    </Button>
                    <Button
                      type="text"
                      onClick={() => setShowGuide(false)}
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
              onClose={() => setShowGuide(false)}
            />
          )}

          <Card styles={{ body: { padding: 0 } }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                  <Input
                    placeholder="Search sitemaps..."
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Button>Enable All</Button>
                  <Button danger>Disable All</Button>
                </Space>
                <Tooltip title="Download sitemap data as CSV">
                  <Button icon={<DownloadOutlined />}>Export</Button>
                </Tooltip>
              </Space>
            </div>

            <Table
              columns={columns}
              dataSource={sitemaps}
              pagination={{
                total: sitemaps.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                style: { padding: '0 16px' }
              }}
              className="no-radius-table"
            />
          </Card>

          <Modal
            title="Add New Sitemap"
            open={showImportModal}
            onOk={handleImportSubmit}
            onCancel={() => setShowImportModal(false)}
            width={600}
          >
            <Form
              form={importForm}
              layout="vertical"
            >
              <Form.Item
                name="url"
                label="Sitemap URL"
                tooltip="The URL of your sitemap file (typically sitemap.xml)"
                rules={[
                  { required: true, message: 'Please enter the sitemap URL' },
                  { type: 'url', message: 'Please enter a valid URL' }
                ]}
              >
                <Input placeholder="https://example.com/sitemap.xml" />
              </Form.Item>
              <Form.Item
                name="revisitInterval"
                label={
                  <Space>
                    <span>Update Frequency</span>
                    <Tooltip title="How often should we check for changes to your sitemap">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                }
                rules={[{ required: true, message: 'Please select how often to check for updates' }]}
              >
                <Select>
                  <Select.Option value="6h">Every 6 hours</Select.Option>
                  <Select.Option value="12h">Every 12 hours</Select.Option>
                  <Select.Option value="24h">Daily</Select.Option>
                  <Select.Option value="48h">Every 2 days</Select.Option>
                  <Select.Option value="7d">Weekly</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="deviceCompatibility"
                label="Optimized For"
                rules={[{ required: true, message: 'Please select which devices this sitemap is for' }]}
              >
                <Radio.Group>
                  <Radio.Button value="all">All Devices</Radio.Button>
                  <Radio.Button value="desktop">Desktop Only</Radio.Button>
                  <Radio.Button value="mobile">Mobile Only</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      </Container>
    </Layout.Content>
  );
};

export default Sitemaps;
