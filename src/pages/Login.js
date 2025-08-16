import React, { useState } from "react";
import { Card, Button, Select, Space, Typography } from "antd";
import { useSafeNavigate } from "../utils/safeHooks";
import { useRole } from "../context/RoleContext";

const { Title, Text } = Typography;
const { Option } = Select;

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("admin");
  const { setCurrentRole } = useRole();
  const navigate = useSafeNavigate();

  const handleLogin = () => {
    setCurrentRole(selectedRole);
    navigate("/");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <Card style={{ width: 400, textAlign: "center" }}>
        <Title level={2}>تسجيل الدخول</Title>
        <Text>اختر دورك للدخول إلى النظام</Text>
        <br /><br />
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            value={selectedRole}
            onChange={setSelectedRole}
            style={{ width: "100%" }}
            size="large"
          >
            <Option value="admin">مدير النظام</Option>
            <Option value="laundry">مدير المغسلة</Option>
            <Option value="employee">موظف</Option>
            <Option value="user">مستخدم</Option>
          </Select>
          <Button type="primary" size="large" onClick={handleLogin} style={{ width: "100%" }}>
            دخول
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login; 