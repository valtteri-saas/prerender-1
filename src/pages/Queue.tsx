import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Card,
  Space,
  Button,
  Table,
  Tag,
  Tooltip,
  Popconfirm,
  Segmented,
  Divider,
  Alert,
  Row,
  Col,
  Dropdown,
} from 'antd';
import {
  PlayCircleOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  DesktopOutlined,
  MobileOutlined,
  ThunderboltOutlined,
  FieldTimeOutlined,
  LoadingOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  CloseOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Container } from '../components/Container';

const { Title, Text, Paragraph } = Typography;

const Queue: React.FC = () => {
  const [queueFilter, setQueueFilter] = useState<'all' | 'automatic' | 'priority'>('all');
  const [showQueueGuide, setShowQueueGuide] = useState(true);

  const queuedURLs = [
    {
      key: '1',
      url: 'https://example.com/page1',
      priority: 'high',
      status: 'caching',
      device: 'Desktop',
      addedAt: '2024-03-15 10:30:00',
      estimatedTime: '2 minutes',
      source: 'API',
      age: 72,
    },
    {
      key: '2',
      url: 'https://example.com/page2',
      priority: 'normal',
      status: 'queued',
      device: 'Mobile',
      addedAt: '2024-03-15 10:35:00',
      estimatedTime: '5 minutes',
      source: 'Sitemap',
      age: 48,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'caching':
        return <LoadingOutlined style={{ color: '#1890ff' }} />;
      default:
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
    }
  };

  const queueColumns = [
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
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: string) => (
        <Tag icon={priority === 'high' ? <ThunderboltOutlined /> : <FieldTimeOutlined />} 
            color={priority === 'high' ? 'error' : 'default'}>
          {priority === 'high' ? 'Priority' : 'Automatic'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: string) => (
        <Space>
          {getStatusIcon(status)}
          <span style={{ 
            color: status === 'caching' ? '#1890ff' : '#faad14'
          }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </Space>
      ),
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      width: 100,
      render: (device: string) => (
        <Space>
          {device === 'Desktop' ? <DesktopOutlined /> : <MobileOutlined />}
          <span>{device}</span>
        </Space>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 120,
      render: (source: string) => {
        const color = 
          source === 'API' ? 'blue' :
          source === 'Manual' ? 'purple' :
          source === 'Sitemap' ? 'cyan' :
          'default';
        return <Tag color={color}>{source}</Tag>;
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 120,
      render: (age: number) => (
        <Space>
          <ClockCircleOutlined />
          <span>{age}h old</span>
        </Space>
      ),
      sorter: (a: any, b: any) => a.age - b.age,
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
                key: 'start',
                label: 'Start Processing',
                icon: <PlayCircleOutlined />,
                disabled: record.status === 'caching',
                onClick: () => console.log('Start processing:', record.url),
              },
              {
                type: 'divider',
              },
              {
                key: 'remove',
                label: 'Remove from Queue',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => console.log('Remove from queue:', record.url),
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

  const segmentedOptions = [
    {
      label: (
        <Space>
          <FieldTimeOutlined />
          All
        </Space>
      ),
      value: 'all',
    },
    {
      label: (
        <Tooltip title="Automatic caching">
          <Space>
            <ClockCircleOutlined />
            Automatic
          </Space>
        </Tooltip>
      ),
      value: 'automatic',
    },
    {
      label: (
        <Tooltip title="Manually added">
          <Space>
            <ThunderboltOutlined />
            Priority
          </Space>
        </Tooltip>
      ),
      value: 'priority',
    },
  ];

  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <div>
            <Title level={2}>Queue</Title>
            <Paragraph type="secondary">
              Manage your caching queue and priorities
            </Paragraph>
          </div>

          {showQueueGuide && (
            <Alert
              message={
                <Space>
                  <Text strong>Manage Your Caching Queue</Text>
                </Space>
              }
              description={
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <Text>Control when and how your pages are cached by managing the queue. Set priorities and monitor the processing status of your pages.</Text>
                  <Space size={16} style={{ marginTop: 40 }}>
                    <Button
                      type="primary"
                      onClick={() => window.open('#/help/queue', '_blank')}
                    >
                      Learn More About Queue
                    </Button>
                    <Button
                      type="text"
                      onClick={() => setShowQueueGuide(false)}
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
              onClose={() => setShowQueueGuide(false)}
            />
          )}

          <Card styles={{ body: { padding: 0 } }}>
            <div style={{ padding: '8px 16px 0' }}>
              <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Processing Rate</Text>
                    <Space>
                      <ArrowUpOutlined style={{ color: '#52c41a' }} />
                      <Text>120 pages/hour</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Queue Size</Text>
                    <Space>
                      <ClockCircleOutlined />
                      <Text>15 pages</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Success Rate</Text>
                    <Space>
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      <Text>98.5%</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Average Age</Text>
                    <Space>
                      <FieldTimeOutlined />
                      <Text>84 hours</Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </div>

            <Divider style={{ margin: '0 0 16px' }} />

            <div style={{ padding: '0 16px 16px' }}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Segmented
                  value={queueFilter}
                  onChange={(value) => setQueueFilter(value as typeof queueFilter)}
                  options={segmentedOptions}
                />
                <Space>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add to Priority Queue
                  </Button>
                  <Button icon={<ReloadOutlined />}>Refresh</Button>
                  <Popconfirm
                    title="Clear priority queue?"
                    description="This will remove all URLs from the priority queue. Automatic queue items will not be affected."
                    onConfirm={() => console.log('Priority queue cleared')}
                  >
                    <Button icon={<DeleteOutlined />}>
                      Clear Priority
                    </Button>
                  </Popconfirm>
                </Space>
              </Space>
            </div>

            <Table
              columns={queueColumns}
              dataSource={queuedURLs}
              pagination={{
                total: queuedURLs.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                style: { padding: '0 8px' }
              }}
              className="no-radius-table"
            />
          </Card>
        </Space>
      </Container>
    </Layout.Content>
  );
};

export default Queue;
