import React, { useEffect, useState } from 'react';
import Layout from '../components/Loyouts/Layout';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { message, Table, Modal, Form, Input, Button } from 'antd';

const UserPage = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [editable, setEditable] = useState(null);
  const [searchQuery, setSearchQuery] = useState('') // for search input
  const [form] = Form.useForm();

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined
            className='mx-2'
            onClick={() => handleDelete(record._id)} // Call handleDelete with user ID
          />

        </div>
      ),
    },
  ];

  // Fetch all users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/users/get-users');
      setAllUsers(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Fetch issue with user");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Handle edit action
  const handleEdit = (record) => {
    setEditable(record);
    form.setFieldsValue(record); // Set form values to the record
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      await axios.put(`/users/edit/${editable._id}`, values); // Update user
      message.success('User updated successfully');
      setEditable(null); // Clear editable state
      getAllUsers(); // Refresh user list
      form.resetFields(); // Clear form
    } catch (error) {
      console.log(error);
      message.error("Failed to update user");
    }
  };

  // New handleDelete function
  const handleDelete = (userId) => {
    // Show confirmation dialog before deleting
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      onOk: async () => {
        try {
          await axios.delete(`/users/delete/${userId}`); // Send DELETE request
          message.success('User deleted successfully');
          getAllUsers(); // Refresh the user list
        } catch (error) {
          console.log(error);
          message.error('Failed to delete user');
        }
      },
    });
  };

  // Filtered users based on search query
  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="user-list ">
      <Input
          
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          style={{ marginBottom: '20px', width: '300px', marginTop: '20px',display: 'flex',
            alignItems: 'center',
            justifyContent: 'center' }}
        />
        <Table columns={columns} /* dataSource={allUsers} */ dataSource={filteredUsers}   loading={loading} />
        

        {/* Edit User Modal */}
        <Modal
          title="Edit User"
          open ={!!editable}
          onCancel={() => {
            setEditable(null);
            form.resetFields(); // Reset form when modal is closed
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" >
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" >
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default UserPage;
