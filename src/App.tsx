import React, {useEffect, useState} from 'react';
import { Package, DollarSign, Users, Clock } from 'lucide-react';
import { Card } from './components/Card';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
                                                       title = 'Title',
                                                       value = 'N/A',
                                                       icon: Icon,
                                                       color = 'bg-gray-100 text-gray-600',
                                                     }) => (
    <Card className="p-4 flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <div className={`p-2 ${color} rounded-lg`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <span className="text-2xl font-semibold">{value}</span>
    </Card>
);

interface DashboardData {
  total: number;
  unique_color: number;
  total_price: number;
  colors: string[];
}

const SellerDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    total: 0,
    unique_color: 0,
    total_price: 0,
    colors: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.mazalbot.com/api/v1/get-report?diamond_id=3');
        const result = await response.json();
        setDashboardData(result);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="w-full max-w-4xl bg-white rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Seller Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, manage your listings and transactions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard
              title="Total diamonds"
              value={dashboardData!.total}
              icon={Package}
              color="bg-blue-100 text-blue-600"
          />
          <DashboardCard
              title="Total in stock"
              value={120}
              icon={DollarSign}
              color="bg-green-100 text-green-600"
          />
          <DashboardCard
              title="New Inquiries"
              value={dashboardData!.total_price}
              icon={Users}
              color="bg-purple-100 text-purple-600"
          />
          <DashboardCard
              title="Pending Orders"
              value={dashboardData!.unique_color}
              icon={Clock}
              color="bg-yellow-100 text-yellow-600"
          />
        </div>

        <Card className="p-4 space-y-2">
          <h2 className="text-sm font-medium">Revenue Overview</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData!.colors}>
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                    labelFormatter={(label) => `Month: ${label}`}
                />
                <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#818cf8"
                    strokeWidth={2}
                    dot={{ fill: '#818cf8', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity Section */}
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-4">Recent Activity</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>New order received - #12345</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Price updated for item SKU-789</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>New inquiry for product XYZ</span>
            </div>
          </div>
        </Card>
      </div>
  );
}

const PaymentPage = () => {
  const { payment_url } = useParams();

  useEffect(() => {
    if (payment_url) {
      console.log(`prev ${payment_url}`)
      const formattedUrl = payment_url
          .replace(/\*/g, ':')  // Заменяем '*' обратно на ':'
          .replace(/\+/g, '/')  // Заменяем '+' обратно на '/'
          .replace(/#/g, '?');  // Заменяем '#' обратно на '?'

      console.log(`new ${formattedUrl}`)
      window.location.href = formattedUrl;
    }
  }, [payment_url]);

  return <div>Redirecting...</div>;
};

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SellerDashboard />} />
          <Route path="/payment/:payment_url" element={<PaymentPage />} />
        </Routes>
      </Router>
  );
}

export default App;