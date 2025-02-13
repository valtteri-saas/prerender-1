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
  Input,
  Modal,
  Form,
  Radio,
  Alert,
  Row,
  Col,
  Badge,
  Switch,
  Divider,
  Select,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  DownloadOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  SyncOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Container } from '../components/Container';

const { Title, Text, Paragraph } = Typography;

interface DomainData {
  key: string;
  domain: string;
  createdAt: string;
  urlCount: number;
  integrationStatus: 'active' | 'pending' | 'error';
  errorMessage?: string;
  notFoundStatus: {
    enabled: boolean;
    reachable: boolean;
    returns404: boolean;
    lastChecked: string;
    nextCheck: string;
    checkInterval: string;
    errorCount: number;
    history: Array<{
      timestamp: string;
      status: string;
      message: string;
    }>;
  };
}

const Domains: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [form] = Form.useForm();

  // Mock data for the domains
  const domains: DomainData[] = [
    {
      key: '1',
      domain: 'example.com',
      createdAt: '2024-03-01',
      urlCount: 1250,
      integrationStatus: 'active',
      notFoundStatus: {
        enabled: true,
        reachable: true,
        returns404: true,
        lastChecked: '2024-03-15 10:30:00',
        nextCheck: '2024-03-15 11:30:00',
        checkInterval: '1 hour',
        errorCount: 0,
        history: [
          {
            timestamp: '2024-03-15 10:30:00',
            status: 'success',
            message: 'Domain check successful - Returns 404 status code',
          },
          {
            timestamp: '2024-03-15 09:30:00',
            status: 'success',
            message: 'Domain check successful - Returns 404 status code',
          },
        ],
      },
    },
    {
      key: '2',
      domain: 'test-site.com',
      createdAt: '2024-03-02',
      urlCount: 850,
      integrationStatus: 'error',
      errorMessage: 'Integration failed - check domain configuration',
      notFoundStatus: {
        enabled: true,
        reachable: true,
        returns404: false,
        lastChecked: '2024-03-15 06:00:00',
        nextCheck: '2024-03-15 12:00:00',
        checkInterval: '6 hours',
        errorCount: 3,
        history: [
          {
            timestamp: '2024-03-15 06:00:00',
            status: 'error',
            message: 'Domain returned 200 status code for non-existent page',
          },
          {
            timestamp: '2024-03-15 00:00:00',
            status: 'error',
            message: 'Domain returned 200 status code for non-existent page',
          },
        ],
      },
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'pending':
        return <SyncOutlined style={{ color: '#1890ff' }} spin />;
      case 'error':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <WarningOutlined style={{ color: '#faad14' }} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Integrating';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const get404StatusIcon = (status: DomainData['notFoundStatus']) => {
    if (!status.reachable) {
      return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
    }
    return status.returns404 ? 
      <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
      <WarningOutlined style={{ color: '#faad14' }} />;
  };

  const get404StatusText = (status: DomainData['notFoundStatus']) => {
    if (!status.reachable) return 'Unreachable';
    return status.returns404 ? 'Correct' : 'Incorrect';
  };

  const expandedRowRender = (record: DomainData) => {
    const status = record.notFoundStatus;

    return (
      <div style={{ padding: '0 48px 24px' }}>
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Card title="404 Status Details" size="small">
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Monitoring Status</Text>
                    <Space>
                      <Switch size="small" checked={status.enabled} />
                      <Text>{status.enabled ? 'Enabled' : 'Disabled'}</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Check Frequency</Text>
                    <Space>
                      <ClockCircleOutlined />
                      <Text>{status.checkInterval}</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Last Check</Text>
                    <Text>{status.lastChecked}</Text>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Next Check</Text>
                    <Text>{status.nextCheck}</Text>
                  </Space>
                </Col>
              </Row>

              <Divider style={{ margin: '16px 0' }} />

              <Title level={5}>Recent History</Title>
              <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                {status.history.map((item, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      padding: '8px 0',
                      borderBottom: index !== status.history.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}
                  >
                    <Space align="start">
                      {item.status === 'success' ? (
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                      )}
                      <div>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>{item.timestamp}</Text>
                        <Text>{item.message}</Text>
                      </div>
                    </Space>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Integration Status" size="small">
              <Space direction="vertical" style={{ width: '100%' }} size={16}>
                <Space>
                  {getStatusIcon(record.integrationStatus)}
                  <Text strong>{getStatusText(record.integrationStatus)}</Text>
                </Space>

                {record.integrationStatus === 'error' && (
                  <Alert
                    message="Integration Error"
                    description={record.errorMessage}
                    type="error"
                    showIcon
                    action={
                      <Button size="small" icon={<SyncOutlined />}>
                        Retry
                      </Button>
                    }
                  />
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  const columns = [
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
      render: (text: string) => (
        <Space>
          <GlobalOutlined />
          <Text copyable>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Added On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: () => (
        <Space>
          <span>URLs</span>
          <Tooltip title="Number of unique URLs found on this domain">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'urlCount',
      key: 'urlCount',
      width: 100,
      render: (count: number) => (
        <Tag>{count.toLocaleString()}</Tag>
      ),
    },
    {
      title: () => (
        <Space>
          <span>Integration</span>
          <Tooltip title="Overall integration status with our services">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      key: 'integration',
      width: 140,
      render: (_: any, record: DomainData) => (
        <Space>
          {getStatusIcon(record.integrationStatus)}
          <span>{getStatusText(record.integrationStatus)}</span>
          {record.errorMessage && (
            <Tooltip title={record.errorMessage}>
              <InfoCircleOutlined />
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: () => (
        <Space>
          <span>404 Status</span>
          <Tooltip title="Whether your website correctly handles non-existent pages">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      key: '404status',
      width: 140,
      render: (_: any, record: DomainData) => (
        <Space>
          {get404StatusIcon(record.notFoundStatus)}
          <span>{get404StatusText(record.notFoundStatus)}</span>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: DomainData) => (
        <Space>
          <Tooltip title="Edit settings">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Remove domain">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleAddDomain = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      setShowAddModal(false);
      form.resetFields();
    });
  };

  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Title level={2}>Domains</Title>
              <Paragraph type="secondary">
                Monitor and adjust settings for each cached domain
              </Paragraph>
            </div>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowAddModal(true)}
              >
                Add Domain
              </Button>
              <Button icon={<DownloadOutlined />}>Export Report</Button>
            </Space>
          </div>

          {showGuide && (
            <Alert
              message={
                <Space>
                  <Text strong>Manage Your Domains and 404s</Text>
                </Space>
              }
              description={
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <Text>Keep track of your domains and adjust settings to ensure everything runs smoothly. Make sure your 404 error pages are set up correctly to avoid issues with caching.</Text>
                  <Space size={16} style={{ marginTop: 40 }}>
                    <Button
                      type="primary"
                      onClick={() => window.open('#/help/domains', '_blank')}
                    >
                      View Help Center
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
                    placeholder="Search domains..."
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Select defaultValue="all" style={{ width: 120 }}>
                    <Select.Option value="all">All Status</Select.Option>
                    <Select.Option value="active">Active</Select.Option>
                    <Select.Option value="issues">Has Issues</Select.Option>
                    <Select.Option value="404-error">404 Issues</Select.Option>
                  </Select>
                </Space>
              </Space>
            </div>

            <Table
              columns={columns}
              dataSource={domains}
              expandable={{
                expandedRowRender,
                expandRowByClick: true,
              }}
              pagination={{
                total: domains.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                style: { padding: '0 16px' }
              }}
              className="no-radius-table"
            />
          </Card>

          <Modal
            title="Add Domain"
            open={showAddModal}
            onOk={handleAddDomain}
            onCancel={() => setShowAddModal(false)}
            width={600}
          >
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                name="domain"
                label={
                  <Space>
                    <span>Domain Name</span>
                    <Tooltip title="Enter your domain name without http:// or https://">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                }
                rules={[
                  { required: true, message: 'Please enter your domain' },
                  { 
                    pattern: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid domain name'
                  }
                ]}
              >
                <Input placeholder="example.com" prefix={<GlobalOutlined />} />
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      </Container>
    </Layout.Content>
  );
};

export default Domains;
