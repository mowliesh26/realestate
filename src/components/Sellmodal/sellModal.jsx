// SellModal.js
import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const SellModal = ({ isModalOpen, handleOk, handleCancel, fetchAllData }) => {
  const [form] = Form.useForm();
  const [baseImage, setBaseImage] = useState([]);

  const handleFileInputChange = async (e) => {
    const files = e.target.files[0];
    const result = await getBase64(files);
    setBaseImage((prev) => [...prev, result]);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onFinish = async (args) => {
    const temp = { ...args, productImages: baseImage ,location: args.location.label,};
    try {
      const response = await axios.post("http://localhost:5000/api/data", temp);
      console.log(response.data);
      form.resetFields();
      setBaseImage([]);
      fetchAllData();
      handleOk();
    } catch (error) {
      console.error(error);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <Modal
      title="POST YOUR ADD HERE"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="User Name"
          name="username"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand Model"
          name="brandmodel"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        {/* <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Select
                        showSearch
                        size="large"
                        style={{ width: 200 }}
                        placeholder="Search Location"
                        optionFilterProp="label"
                        options={[
                            { value: '1', label: 'Chennai' },
                            { value: '2', label: 'Coimbatore' },
                            { value: '3', label: 'Erode' },
                            { value: '4', label: 'Salem' },
                            { value: '5', label: 'Ooty' },
                            { value: '6', label: 'Tirchy' },
                        ]}
                    />
                </Form.Item> */}
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select
            labelInValue
            showSearch
            size="large"
            style={{ width: 200 }}
            placeholder="Search Location"
            optionFilterProp="label"
            options={[
              { value: "1", label: "Chennai" },
              { value: "2", label: "Coimbatore" },
              { value: "3", label: "Erode" },
              { value: "4", label: "Salem" },
              { value: "5", label: "Ooty" },
              { value: "6", label: "Tirchy" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Upload" onChange={handleFileInputChange}>
          <Upload listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="DatePicker"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SellModal;
