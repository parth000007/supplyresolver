import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import { vendorApi } from '../api/axios';

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await vendorApi.getAll();
      setVendors(res.data);
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await vendorApi.create(form);
      setForm({ name: '', email: '', phone: '', address: '' });
      setSuccess('Vendor created successfully!');
      await fetchVendors();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to create vendor:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusVariant = (isActive) => {
    return isActive ? 'success' : 'default';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Vendors</h1>
          <p className="text-slate-500 mt-1">Manage your supplier network</p>
        </div>
        <Badge variant="primary" size="lg">{vendors.length} Vendors</Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Vendor Form */}
        <Card className="p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold text-white mb-4">Add Vendor</h2>

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Vendor Name"
              placeholder="Enter vendor name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="vendor@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Phone Number"
              placeholder="+1 234 567 8900"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              label="Address"
              placeholder="123 Main St, City, Country"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              className="w-full btn-lift"
            >
              {submitting ? 'Creating...' : 'Create Vendor'}
            </Button>
          </form>
        </Card>

        {/* Vendor List */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">All Vendors</h2>

          {vendors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No vendors registered yet</p>
            </div>
          ) : (
            <Table headers={['Name', 'Email', 'Phone', 'Status']}>
              {vendors.map((v) => (
                <Table.Row key={v.id} className="table-row-hover">
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-300">
                          {v.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-white">{v.name}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-slate-400">{v.email}</Table.Cell>
                  <Table.Cell className="text-slate-400">{v.phone || '-'}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={getStatusVariant(v.is_active)}>
                      {v.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Vendors;

