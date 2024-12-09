import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Button, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";  

const { Text, Title } = Typography;
const { Header, Content, Footer } = Layout;

const DetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const carouselRef = useRef(null);  
 
  if (!state) {
    navigate("/");
    return null;
  }

  const { item } = state;

   
  const goToPrevious = () => {
    carouselRef.current.prev();
  };

  
  const goToNext = () => {
    carouselRef.current.next();
  };

  return (
    <Layout>
      <Header style={{ color: "#fff" }}>Item Details</Header>
      <Content style={{ padding: "20px" }}>
        
        <div style={{ position: "relative" }}>
          <Carousel ref={carouselRef} autoplay>
            {item.productImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`product-${index}`}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>

         
          <Button
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
            icon={<LeftOutlined />}
            onClick={goToPrevious}
            size="large"
          />
          <Button
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
            icon={<RightOutlined />}
            onClick={goToNext}
            size="large"
          />
        </div>

        
        <Title level={4}>Brand: {item.brand}</Title>
        <Text strong>Model:</Text> {item.brandmodel}
        <br />
        <Text strong>Price:</Text> {item.price}
        <br />
        <Text strong>Location:</Text> {item.location}
        <br />
        <Text strong>Description:</Text> {item.description}
        <br />
        <Text strong>Date Listed:</Text> {item.DatePicker}
        <br />

       
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Content>
      <Footer style={{ textAlign: "center" }}>Your App ©2024</Footer>
    </Layout>
  );
};

export default DetailsPage;
