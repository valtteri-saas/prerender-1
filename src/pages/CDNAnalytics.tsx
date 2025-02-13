import React from 'react';
import { Layout, Typography } from 'antd';
import { Container } from '../components/Container';

const { Title, Paragraph } = Typography;

const CDNAnalytics: React.FC = () => {
  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <div>
          <Title level={2}>CDN Analytics</Title>
          <Paragraph type="secondary">
            Recent crawler requests handled by our CDN
          </Paragraph>
        </div>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          Not available
        </div>
      </Container>
    </Layout.Content>
  );
};

export default CDNAnalytics;
