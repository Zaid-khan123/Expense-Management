import React, { useEffect, useState } from 'react';
import { Table, Select, DatePicker, Input, message, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { RangePicker } = DatePicker;

const ReportingPage = () => {
  const [data, setData] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchReport = async () => {
    try {
      const res = await axios.post('/api/reporting/admin-report'); // Modify based on user role
      setData(res.data);
    } catch (error) {
      message.error('Error fetching report data');
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.post('/api/reporting/filtered-expenses', filters);
      setExpenses(res.data);
    } catch (error) {
      message.error('Error fetching expenses');
    }
  };

  useEffect(() => {
    fetchReport();
    fetchExpenses();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (dates) => {
    setFilters((prev) => ({
      ...prev,
      fromDate: dates ? moment(dates[0]).format('YYYY-MM-DD') : null,
      toDate: dates ? moment(dates[1]).format('YYYY-MM-DD') : null,
    }));
  };

  const columns = [
    { title: 'Expense Name', dataIndex: 'expenseName' },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Date', dataIndex: 'date', render: (text) => moment(text).format('YYYY-MM-DD') },
  ];

  return (
    <div>
      <h2>Reporting Page</h2>
      <div>
        <p>Total Users: {data.userCount}</p>
        <p>Total Expense This Month: ${data.totalExpense}</p>
        <p>Average Expense per User: ${data.averageExpense}</p>
      </div>

      <div>
        <Input
          placeholder="Expense Name"
          onChange={(e) => handleFilterChange('expenseName', e.target.value)}
        />
        <Input
          placeholder="Amount"
          type="number"
          onChange={(e) => handleFilterChange('amount', e.target.value)}
        />
        <Input
          placeholder="Location"
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />
        <RangePicker onChange={handleDateChange} />
        <Button onClick={fetchExpenses}>Apply Filters</Button>
      </div>

      <Table columns={columns} dataSource={expenses} rowKey="_id" />
    </div>
  );
};

export default ReportingPage;
