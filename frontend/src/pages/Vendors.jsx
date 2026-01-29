import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import Alert from '../components/ui/Alert';

function Vendors() {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '+1 234 567 8900', is_active: true },
    { id: 2, name: 'Global Supplies', email: 'info@globalsupplies.com', phone: '+1 234 567 8901', is_active: true },
    { id: 3, name: 'Tech Parts Inc', email: 'sales@techparts.com', phone: '+1 234 567 8902', is_active: false },
  ]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      const newVendor = {
        id: vendors.length + 1,
        name: form.name,
        email: form.email,
        phone: form.phone,
        is_active: true,
      };
      setVendors([...vendors, newVendor]);
      setForm({ name: '', email: '', phone: '', address: '' });
      setSuccess('Vendor created successfully!');
      setSubmitting(false);
    }, 500);
  };

  const getStatusVariant = (isActive) => {
    return isActive ? 'success' : 'default';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Vendors</h1>
          <p className="text-slate-500 mt-1">Manage your supplier network</p>
        </div>
        <Badge variant="primary" size="lg">{vendors.length} Vendors</Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Vendor Form */}
        <Card padding="lg" className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Add Vendor</h2>
              <p className="text-slate-500 text-sm">Register a new supplier</p>
            </div>
          </div>

          {error && (
            <Alert variant="error" className="mb-4">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-4">
              {success}
            </Alert>
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
              className="w-full mt-2"
            >
              {submitting ? 'Creating...' : 'Create Vendor'}
            </Button>
          </form>
        </Card>

        {/* Vendor List */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-100">All Vendors</h2>
            </div>
          </div>

          {vendors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-slate-500">No vendors registered yet</p>
              <p className="text-slate-600 text-sm mt-1">Add your first vendor using the form</p>
            </div>
          ) : (
            <Table headers={['Name', 'Email', 'Phone', 'Status']}>
              {vendors.map((v) => (
                <Table.Row key={v.id} className="group">
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-300">
                          {v.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-slate-200">{v.name}</span>
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

