import React from 'react';
import { Layout, Typography } from 'antd';
import { Container } from '../components/Container';

const { Title, Paragraph } = Typography;

const Overview: React.FC = () => {
  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <div>
          <Title level={2}>Overview</Title>
          <Paragraph type="secondary">
            Track, manage and forecast your Prerender activity and usage.
          </Paragraph>
        </div>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          Not available
        </div>
      </Container>
    </Layout.Content>
  );
};

export default Overview;
