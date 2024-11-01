
import { useEffect, useState } from 'react'
import Layout from '../components/Loyouts/Layout'
import { Form, message, Modal, Select, Table,  DatePicker} from 'antd'

import Input from 'antd/es/input/Input';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

import axios from 'axios'
import Spinner from '../components/Loyouts/Spinner'
import moment from 'moment';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [editable, setEditable] = useState(null);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate ] = useState([]);
  

  //table data
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',

    },
    {
      title: 'Description',
      dataIndex: 'description',

    },
    {
      title: 'item',
      dataIndex: 'item',

    },
    {
      title:'Category',
      dataIndex: 'category'
    },
    {
      title: 'Type',
      dataIndex: 'type',

    },{
      title: 'Amount',
      dataIndex: 'amount',

    },
    {
      title: 'Date',
      dataIndex: 'date',
      render:(text)=><spam>{moment(text).format('YYYY-MM-DD')}</spam>

    },
    {
      title:'Actions',
      render: (text, record) => (
        <div>
         <EditOutlined onClick = {() =>{
          setEditable(record)
          setShowModal(true);
         }} />
          <DeleteOutlined className='mx-2'onClick = {() => {handleDelete(record)}} />
        </div>
      )
    },
  ]


  const getAllResults = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('/transections/get-transection', { 
        userid: user._id, 
        frequency,
        selectedDate

      });
      setLoading(false);
      setAllTransection(res.data);
      console.log(res.data);

    } catch (error) {
      console.log(error)
      message.error("Fetch issue with Transection")

    }
  }

  useEffect(() => {
    getAllResults();
  }, [frequency, selectedDate]);

  // delete handing
  const handleDelete = async(record) =>{
    try {
      setLoading(true);
      await axios.post('/transections/delete-transection',{transectionId:record._id});
      setLoading(false);
      message.success('Transection Deleted!')
    } catch (error) {
      setLoading(false)
      console.log(error);
      message.error('unable to delete') 
      
    }

  }

  //form handing

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if (editable) {
      await axios.post('/transections/edit-transection', {
        payload:{
          ...values,
          userId:user._id,
          
        },
        transectionId: editable._id,
        })
      setLoading(false)
      message.success("Transection Updated successfully");
        
      }else{
       
      await axios.post('/transections/add-transection', { ...values, userid: user._id })
      setLoading(false)
      message.success("Transection Added successfully");
      setShowModal(false);
      setEditable(null)
      }
    } catch (error) {
      setLoading('false');
      message.error("Failed to add transection");

    }

  }
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <h6>Select Frequenct</h6>
        <Select value={frequency} onChange={(values)=>setFrequency(values)}>
          <Select.Option value='7' >Last 1 Week</Select.Option>
          <Select.Option  value='30'  >Last 1 Month</Select.Option>
          <Select.Option value='365' >Last 1 Year</Select.Option>
          <Select.Option value = 'custom' >Custom</Select.Option>
          {frequency === 'custom' && <RangePicker value={selectedDate} onClick={(values) => setSelectedDate(values)} />}
        </Select>
        <div>
          <button className='btn btn-primary'
            onClick={() => setShowModal(true)}
          >Add New </button>
        </div>
      </div>
      <div className="contents"></div>
      <Table columns={columns} dataSource={allTransection}  >

      </Table>
      <Modal title= {editable ? 'Edit Transection': 'Add Transection'}
       open={showModal}
        onCancel={() => { setShowModal(false) }}
        footer={false}
      >
        <Form layout='vertical' onFinish={handleSubmit}
         initialValues={editable}>
          <Form.Item label="Name " name="name" >
            <Input type='text' />

          </Form.Item>
          <Form.Item label="Description" name="description" >
            <Input type='text' />

          </Form.Item>
          <Form.Item label="Item" name="item" >
            <Input type='text' />

          </Form.Item>
          <Form.Item label="Category" name="category" >
            <Input type='text' />

          </Form.Item>
          <Form.Item label="Type" name="type" >

            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'  >Expense</Select.Option>
            </Select>

          </Form.Item>

          <Form.Item label="Amount" name="amount" >
            <Input type='text' />

          </Form.Item>
          <Form.Item label="Date" name="date" >
            <Input type='date' />

          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type='submit' className='btn btn-primary'>SAVE</button>
          </div>

        </Form>
      </Modal>


    </Layout>
  )
}

export default HomePage
