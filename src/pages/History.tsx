import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Card,
  Space,
  Button,
  Table,
  Tag,
  Select,
  DatePicker,
  Row,
  Col,
  Divider,
  Alert,
  Tooltip,
} from 'antd';
import {
  ReloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  DesktopOutlined,
  MobileOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Container } from '../components/Container';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const History: React.FC = () => {
  const [showHistoryGuide, setShowHistoryGuide] = useState(true);

  const renderHistory = [
    {
      key: '1',
      url: 'https://example.com/page1',
      device: 'Desktop',
      status: 'Success',
      duration: 1.5,
      timestamp: '2024-03-15 10:30:00',
      statusCode: 200,
    },
    {
      key: '2',
      url: 'https://example.com/page2',
      device: 'Mobile',
      status: 'Failed',
      duration: 2.1,
      timestamp: '2024-03-15 10:32:00',
      statusCode: 404,
    },
  ];

  const historyColumns = [
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
      width: 120,
      render: (device: string) => (
        <Space>
          {device === 'Desktop' ? <DesktopOutlined /> : <MobileOutlined />}
          <span>{device}</span>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: string, record: any) => (
        <Space>
          {status === 'Success' ? (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              {record.statusCode}
            </Tag>
          ) : (
            <Tag color="error" icon={<CloseCircleOutlined />}>
              {record.statusCode}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 120,
      render: (duration: number) => `${duration}s`,
      sorter: (a: any, b: any) => a.duration - b.duration,
    },
    {
      title: 'Rendered At',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
    },
  ];

  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Title level={2}>Render History</Title>
              <Paragraph type="secondary">
                View render history and performance
              </Paragraph>
            </div>
            <Space>
              <Tooltip title="Only the last 24h is available">
                <Select
                  value="last-day"
                  disabled
                  style={{ width: 120 }}
                  options={[
                    { value: 'last-day', label: 'Last day' },
                  ]}
                />
              </Tooltip>
            </Space>
          </div>

          {showHistoryGuide && (
            <Alert
              message={
                <Space>
                  <Text strong>Welcome to Your Render History</Text>
                </Space>
              }
              description={
                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                  <Text>Keep track of when your pages are rendered. Use this info to improve speed and address any issues.</Text>
                  <Space size={16} style={{ marginTop: 24 }}>
                    <Button
                      type="primary"
                      onClick={() => window.open('#/help/render-history', '_blank')}
                    >
                      How do I find my sitemap?
                    </Button>
                    <Button
                      type="text"
                      onClick={() => setShowHistoryGuide(false)}
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
              onClose={() => setShowHistoryGuide(false)}
            />
          )}

          <Card styles={{ body: { padding: 0 } }}>
            <div style={{ padding: '8px 16px 0' }}>
              <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Total Renders</Text>
                    <Space>
                      <ReloadOutlined />
                      <Text>1,250</Text>
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
                    <Text type="secondary" style={{ fontSize: 12 }}>Average Duration</Text>
                    <Space>
                      <ClockCircleOutlined />
                      <Text>1.8s</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Failed Renders</Text>
                    <Space>
                      <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                      <Text>19</Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </div>

            <Divider style={{ margin: '0 0 16px' }} />

            <div style={{ padding: '0 16px 16px' }}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                  <Select defaultValue="all" style={{ width: 120 }}>
                    <Select.Option value="all">All Status</Select.Option>
                    <Select.Option value="success">200</Select.Option>
                    <Select.Option value="failed">404</Select.Option>
                  </Select>
                  <Select defaultValue="all" style={{ width: 120 }}>
                    <Select.Option value="all">All Devices</Select.Option>
                    <Select.Option value="desktop">Desktop</Select.Option>
                    <Select.Option value="mobile">Mobile</Select.Option>
                  </Select>
                </Space>
                <Button icon={<DownloadOutlined />}>Export</Button>
              </Space>
            </div>

            <Table
              columns={historyColumns}
              dataSource={renderHistory}
              pagination={{
                total: renderHistory.length,
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

export default History;
