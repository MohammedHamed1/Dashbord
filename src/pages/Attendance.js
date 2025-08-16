import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Tag,
  Typography,
  message
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const Attendance = () => {
  const [data, setData] = useState([
    {
      id: 1,
      employeeName: 'أحمد محمد',
      date: '2024-01-15',
      checkIn: '08:00',
      checkOut: '17:00',
      status: 'present',
      salary: 100
    }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'الموظف',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'التاريخ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'وقت الحضور',
      dataIndex: 'checkIn',
      key: 'checkIn',
    },
    {
      title: 'وقت الانصراف',
      dataIndex: 'checkOut',
      key: 'checkOut',
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'present' ? 'green' : 'red'}>
          {status === 'present' ? 'حاضر' : 'غائب'}
        </Tag>
      )
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      )
    }
  ];

  const handleSubmit = (values) => {
    message.success('تم حفظ البيانات بنجاح');
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>إدارة الحضور والانصراف</Title>
      </div>

      <Card
        title="سجل الحضور"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            إضافة سجل
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>

      <Modal
        title="إضافة سجل حضور جديد"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="employeeName"
                label="اسم الموظف"
                rules={[{ required: true, message: 'يرجى إدخال اسم الموظف' }]}
              >
                <Input placeholder="أدخل اسم الموظف" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="التاريخ"
                rules={[{ required: true, message: 'يرجى اختيار التاريخ' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="checkIn"
                label="وقت الحضور"
                rules={[{ required: true, message: 'يرجى إدخال وقت الحضور' }]}
              >
                <Input placeholder="08:00" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="checkOut"
                label="وقت الانصراف"
              >
                <Input placeholder="17:00" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="الحالة"
                rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
              >
                <Select placeholder="اختر الحالة">
                  <Option value="present">حاضر</Option>
                  <Option value="absent">غائب</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="الراتب اليومي"
                rules={[{ required: true, message: 'يرجى إدخال الراتب' }]}
              >
                <Input placeholder="100" />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>
                إلغاء
              </Button>
              <Button type="primary" htmlType="submit">
                حفظ
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Attendance; 