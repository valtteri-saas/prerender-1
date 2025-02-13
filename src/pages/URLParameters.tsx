import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Card,
  Button,
  Space,
  Tooltip,
  Switch,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Radio,
  Alert,
} from 'antd';
import {
  PlusOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Container } from '../components/Container';

const { Title, Text, Paragraph } = Typography;

const URLParameters: React.FC = () => {
  const [showParameterModal, setShowParameterModal] = useState(false);
  const [showSystemParams, setShowSystemParams] = useState(false);
  const [showParametersGuide, setShowParametersGuide] = useState(true);
  const [parameterForm] = Form.useForm();

  const systemParameters = [
    { key: 'sys1', name: 'utm_*', rule: 'always-ignore', isSystem: true },
    { key: 'sys2', name: 'fbclid', rule: 'always-ignore', isSystem: true },
    { key: 'sys3', name: 'gclid', rule: 'always-ignore', isSystem: true },
    { key: 'sys4', name: '_ga', rule: 'always-ignore', isSystem: true },
    { key: 'sys5', name: 'mc_cid', rule: 'always-ignore', isSystem: true },
    { key: 'sys6', name: 'mc_eid', rule: 'always-ignore', isSystem: true },
  ];

  const customParameters = [
    {
      key: '1',
      name: 'page',
      rule: 'use',
    },
    {
      key: '2',
      name: 'sort',
      rule: 'use',
    },
  ];

  const allParameters = showSystemParams 
    ? [...systemParameters, ...customParameters]
    : customParameters;

  const parameterColumns = [
    {
      title: 'Parameter',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <GlobalOutlined />
          <Text copyable style={{ 
            color: record.isSystem ? '#666' : 'inherit',
            fontStyle: record.isSystem ? 'italic' : 'normal'
          }}>
            {text}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Rule',
      dataIndex: 'rule',
      key: 'rule',
      render: (rule: string) => {
        let color = 'default';
        let text = '';

        switch (rule) {
          case 'use':
            color = 'success';
            text = 'Use for caching';
            break;
          case 'ignore':
            color = 'warning';
            text = 'Ignore when caching';
            break;
          case 'always-ignore':
            color = 'default';
            text = 'Always ignored';
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        !record.isSystem && (
          <Space size={8}>
            <Button type="text" icon={<EditOutlined />} />
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Space>
        )
      ),
    },
  ];

  const handleAddParameter = () => {
    parameterForm.validateFields().then(values => {
      console.log('Parameter values:', values);
      setShowParameterModal(false);
      parameterForm.resetFields();
    });
  };

  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>URL Parameters</Title>
            <Paragraph type="secondary">
              Configure how URL parameters affect caching
            </Paragraph>
          </div>

          {showParametersGuide && (
            <Alert
              message={
                <Space>
                  <Text strong>Streamline Your URL Caching</Text>
                </Space>
              }
              description={
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <Text>Decide which URLs with query parameters should be cached under a main URL. This helps reduce duplicates and boosts site efficiency.</Text>
                  <Space size={16} style={{ marginTop: 40 }}>
                    <Button
                      type="primary"
                      onClick={() => window.open('#/help/url-parameters', '_blank')}
                    >
                      Learn More About Parameters
                    </Button>
                    <Button
                      type="text"
                      onClick={() => setShowParametersGuide(false)}
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
              onClose={() => setShowParametersGuide(false)}
            />
          )}

          <Card styles={{ body: { padding: 0 } }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                  <Switch
                    checked={showSystemParams}
                    onChange={setShowSystemParams}
                  />
                  <Text>
                    Show Always Ignored Trackers
                    <Tooltip title="Display common tracking parameters that are automatically ignored">
                      <InfoCircleOutlined style={{ marginLeft: 8 }} />
                    </Tooltip>
                  </Text>
                </Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowParameterModal(true)}
                >
                  Add Parameter
                </Button>
              </Space>
            </div>

            <Table
              columns={parameterColumns}
              dataSource={allParameters}
              pagination={false}
              className="no-radius-table"
            />
          </Card>

          <Modal
            title="Add URL Parameter"
            open={showParameterModal}
            onOk={handleAddParameter}
            onCancel={() => setShowParameterModal(false)}
            width={600}
          >
            <Form
              form={parameterForm}
              layout="vertical"
            >
              <Form.Item
                name="name"
                label="Parameter Name"
                tooltip="The name of the URL parameter (e.g., page, sort)"
                rules={[
                  { required: true, message: 'Please enter the parameter name' },
                  { pattern: /^[a-zA-Z0-9_-]+$/, message: 'Only letters, numbers, underscores and hyphens are allowed' }
                ]}
              >
                <Input placeholder="Enter parameter name" />
              </Form.Item>
              <Form.Item
                name="rule"
                label="Caching Rule"
                tooltip="Determine how this parameter affects caching"
                rules={[{ required: true, message: 'Please select a rule' }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="use">
                      <Space direction="vertical">
                        <Text strong>Use for caching</Text>
                        <Text type="secondary">Different parameter values will create separate cache entries</Text>
                      </Space>
                    </Radio>
                    <Radio value="ignore">
                      <Space direction="vertical">
                        <Text strong>Ignore when caching</Text>
                        <Text type="secondary">Parameter will be removed before caching the URL</Text>
                      </Space>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      </Container>
    </Layout.Content>
  );
};

export default URLParameters;
