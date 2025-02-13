import React from 'react';
import { Layout, Typography } from 'antd';
import { Container } from '../components/Container';

const { Title, Paragraph } = Typography;

const RankTracker: React.FC = () => {
  return (
    <Layout.Content style={{ padding: 24 }}>
      <Container>
        <div>
          <Title level={2}>Rank Tracker</Title>
          <Paragraph type="secondary">
            Monitor and improve your search engine rankings
          </Paragraph>
        </div>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          Not available
        </div>
      </Container>
    </Layout.Content>
  );
};

export default RankTracker;
