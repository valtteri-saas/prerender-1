import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  GlobalOutlined,
  ApiOutlined,
  DatabaseOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  TableOutlined,
  LinkOutlined,
  PlayCircleOutlined,
  HistoryOutlined,
  LineChartOutlined,
  RocketOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Badge, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { Logo } from './components/Logo';
import Overview from './pages/Overview';
import Pages from './pages/Pages';
import Rules from './pages/Rules';
import Queue from './pages/Queue';
import History from './pages/History';
import CDNAnalytics from './pages/CDNAnalytics';
import Sitemaps from './pages/Sitemaps';
import Domains from './pages/Domains';
import GetStarted from './pages/GetStarted';
import RankTracker from './pages/RankTracker';

const { Header, Sider, Content } = Layout;

const userMenuItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
  },
  {
    key: '2',
    label: 'Settings',
  },
  {
    key: '3',
    type: 'divider',
  },
  {
    key: '4',
    label: 'Sign out',
  },
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('get-started');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  const mainMenuItems: MenuProps['items'] = [
    {
      key: 'get-started',
      icon: <RocketOutlined />,
      label: 'Get Started',
    },
    {
      type: 'divider',
    },
    {
      key: 'overview',
      icon: <DashboardOutlined />,
      label: 'Overview',
    },
    {
      key: 'cdn-analytics',
      icon: <LineChartOutlined />,
      label: 'CDN Analytics',
    },
    {
      type: 'divider',
    },
    {
      key: 'domains',
      icon: <GlobalOutlined />,
      label: 'Domains',
    },
    {
      key: 'sitemaps',
      icon: <ApiOutlined />,
      label: 'Sitemaps',
    },
    {
      type: 'divider',
    },
    {
      key: 'cache-manager',
      icon: <DatabaseOutlined />,
      label: 'Cache Manager',
      children: [
        {
          key: 'cached-pages',
          icon: <TableOutlined />,
          label: 'Pages',
        },
        {
          key: 'caching-rules',
          icon: <LinkOutlined />,
          label: 'Rules',
        },
        {
          key: 'schedule',
          icon: <PlayCircleOutlined />,
          label: 'Queue',
        },
      ],
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: 'Render History',
    },
    {
      type: 'divider',
    },
    {
      key: 'rank-tracker',
      icon: <TrophyOutlined />,
      label: 'Rank Tracker',
    },
  ];

  const settingsMenuItem: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case 'get-started':
        return <GetStarted />;
      case 'overview':
        return <Overview />;
      case 'cached-pages':
        return <Pages />;
      case 'caching-rules':
        return <Rules />;
      case 'schedule':
        return <Queue />;
      case 'history':
        return <History />;
      case 'cdn-analytics':
        return <CDNAnalytics />;
      case 'sitemaps':
        return <Sitemaps />;
      case 'domains':
        return <Domains />;
      case 'cache-manager':
        setSelectedKey('cached-pages'); // Redirect to Pages when Cache Manager is clicked
        return <Pages />;
      case 'rank-tracker':
        return <RankTracker />;
      default:
        return (
          <div style={{ padding: 24, textAlign: 'center' }}>
            Content will be added in subsequent prompts
          </div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="light"
        width={240}
        style={{
          borderRight: '1px solid #f0f0f0',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ 
            padding: '16px 16px 24px', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}>
            <Logo collapsed={collapsed} />
          </div>
          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                defaultOpenKeys={['cache-manager']}
                onSelect={handleMenuSelect}
                style={{ 
                  borderRight: 0,
                }}
                items={mainMenuItems}
              />
            </div>
            <div>
              <Menu
                mode="inline"
                style={{ 
                  borderRight: 0,
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '8px'
                }}
                items={settingsMenuItem}
              />
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ 
                  width: '100%',
                  borderRadius: 0,
                  height: 48,
                  borderTop: '1px solid #f0f0f0',
                }}
              />
            </div>
          </div>
        </div>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 240 }}>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end', 
            padding: '0 24px',
            height: '100%'
          }}>
            <Space size={24}>
              <Badge count={5} size="small">
                <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
              </Badge>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar icon={<UserOutlined />} />
                  <span>John Doe</span>
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Header>
        {renderContent()}
      </Layout>
    </Layout>
  );
}

export default App;
