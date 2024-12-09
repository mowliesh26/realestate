import React, { useEffect, useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Card,
  Space,
  Typography,
  Badge,
  Dropdown,
  Select,
  Input,
  Button,
  Avatar,
  Menu,
  Image,
} from 'antd';
import {
  BellOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import SellModal from './components/Sellmodal/sellModal';
import { useNavigate } from 'react-router';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;
const { Search } = Input;

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllData, setGetAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const navigate = useNavigate();

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const fetchAllData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data/sell');
      if (response.data.success) {
        setGetAllData(response.data.files);
        setFilteredData(response.data.files);
      }
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const filterData = (search, location) => {
    let filtered = getAllData;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(item =>
        item.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply location filter
    if (location) {
      filtered = filtered.filter(item =>
        item.location.toLowerCase() === location.toLowerCase()
      );
    }

    setFilteredData(filtered);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    filterData(value, selectedLocation);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    if (value) {
     
      filterData(searchQuery, value);
    } else {
      
      setFilteredData(getAllData);
    }
  };
  const profileMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  const handleCardClick = (item) => {
    navigate('/details', { state: { item } });
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#001529',
          padding: '0 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Image
            width={50}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={false}
          />
          <Select
            showSearch
            size="large"
            style={{ width: 200 }}
            placeholder="Search to Select Location"
            value={selectedLocation}
            onChange={handleLocationChange}
            optionFilterProp="label"
            options={[
              { value: 'Chennai', label: 'Chennai' },
              { value: 'Coimbatore', label: 'Coimbatore' },
              { value: 'Erode', label: 'Erode' },
              { value: 'Salem', label: 'Salem' },
              { value: 'Ooty', label: 'Ooty' },
              { value: 'Tirchy', label: 'Tirchy' },
            ]}
          />
          <Search
            style={{ width: '800px' }}
            placeholder="Search by brand"
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Badge count={5} offset={[10, 0]}>
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: '20px', color: '#fff' }} />}
            />
          </Badge>
          <Dropdown overlay={profileMenu} trigger={['click']}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <Text style={{ color: '#fff', marginLeft: '8px' }}>User</Text>
              <DownOutlined style={{ color: '#fff', marginLeft: '4px' }} />
            </div>
          </Dropdown>
          <Button type="primary" onClick={showModal}>
            SELL
          </Button>
        </div>
      </Header>
      <Content>
        <div
          style={{
            padding: 24,
            height: '100%',
            background: '#fff',
            borderRadius: '8px',
          }}
        >
          <Row gutter={[20, 20]}>
            {filteredData.map((item, i) => (
              <Col key={i} span={6}>
                <Card
                  hoverable
                  cover={<img alt="example" src={item.productImages[0]} />}
                  onClick={() => handleCardClick(item)}
                >
                  <Row justify="space-around">
                    <Space direction="vertical">
                      <Text className="total">{item.price}</Text>
                      <Text className="count">{item.brand}</Text>
                      <Text className="count">{item.location}</Text>
                    </Space>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
      <SellModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        fetchAllData={fetchAllData}
      />
    </Layout>
  );
};

export default App;
