import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import Alert from '../components/ui/Alert';

function Batches() {
  const [batches, setBatches] = useState([
    { id: 1, batch_number: 'BATCH-001', vendor_id: 1, product_name: 'Widget A', quantity: 500, unit_price: 9.99, total_amount: 4995, status: 'completed' },
    { id: 2, batch_number: 'BATCH-002', vendor_id: 2, product_name: 'Widget B', quantity: 1200, unit_price: 14.99, total_amount: 17988, status: 'pending' },
    { id: 3, batch_number: 'BATCH-003', vendor_id: 1, product_name: 'Component X', quantity: 300, unit_price: 24.99, total_amount: 7497, status: 'approved' },
  ]);
  const [vendors] = useState([
    { id: 1, name: 'Acme Corp' },
    { id: 2, name: 'Global Supplies' },
    { id: 3, name: 'Tech Parts Inc' },
  ]);
  const [form, setForm] = useState({
    batch_number: '',
    vendor_id: '',
    product_name: '',
    quantity: '',
    unit_price: '',
    total_amount: '',
    status: 'pending',
  });
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
      const newBatch = {
        id: batches.length + 1,
        batch_number: form.batch_number,
        vendor_id: parseInt(form.vendor_id),
        product_name: form.product_name,
        quantity: parseInt(form.quantity),
        unit_price: parseFloat(form.unit_price),
        total_amount: parseFloat(form.quantity) * parseFloat(form.unit_price),
        status: form.status,
      };
      setBatches([...batches, newBatch]);
      setForm({
        batch_number: '',
        vendor_id: '',
        product_name: '',
        quantity: '',
        unit_price: '',
        total_amount: '',
        status: 'pending',
      });
      setSuccess('Batch created successfully!');
      setSubmitting(false);
    }, 500);
  };

  const calculateTotal = () => {
    const qty = parseFloat(form.quantity) || 0;
    const price = parseFloat(form.unit_price) || 0;
    return (qty * price).toFixed(2);
  };

  const getStatusVariant = (status) => {
    const variants = {
      pending: 'warning',
      completed: 'success',
      approved: 'success',
      rejected: 'error',
      in_transit: 'info',
    };
    return variants[status?.toLowerCase()] || 'info';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Batches</h1>
          <p className="text-slate-500 mt-1">Track and manage your shipments</p>
        </div>
        <Badge variant="primary" size="lg">{batches.length} Batches</Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Batch Form */}
        <Card padding="lg" className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Create Batch</h2>
              <p className="text-slate-500 text-sm">Add a new shipment batch</p>
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
              label="Batch Number"
              placeholder="BATCH-001"
              value={form.batch_number}
              onChange={(e) => setForm({ ...form, batch_number: e.target.value })}
              required
            />
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Vendor <span className="text-red-400">*</span>
              </label>
              <select
                value={form.vendor_id}
                onChange={(e) => setForm({ ...form, vendor_id: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              >
                <option value="">Select a vendor</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Product Name"
              placeholder="Enter product name"
              value={form.product_name}
              onChange={(e) => setForm({ ...form, product_name: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Quantity"
                type="number"
                min="1"
                placeholder="100"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
              />
              <Input
                label="Unit Price ($)"
                type="number"
                min="0"
                step="0.01"
                placeholder="9.99"
                value={form.unit_price}
                onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
                required
              />
            </div>

            <Input
              label="Total Amount ($)"
              value={calculateTotal()}
              readOnly
              containerClassName="bg-slate-800/50"
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in_transit">In Transit</option>
                <option value="completed">Completed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              disabled={vendors.length === 0}
              className="w-full mt-2"
            >
              {submitting ? 'Creating...' : 'Create Batch'}
            </Button>
          </form>
        </Card>

        {/* Batch List */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-100">All Batches</h2>
            </div>
          </div>

          {batches.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-slate-500">No batches created yet</p>
              <p className="text-slate-600 text-sm mt-1">Create your first batch using the form</p>
            </div>
          ) : (
            <Table headers={['Batch #', 'Product', 'Vendor', 'Qty', 'Total', 'Status']}>
              {batches.map((b) => {
                const vendor = vendors.find((v) => v.id === b.vendor_id);
                return (
                  <Table.Row key={b.id} className="group">
                    <Table.Cell>
                      <span className="font-mono text-sm text-slate-300">{b.batch_number}</span>
                    </Table.Cell>
                    <Table.Cell className="text-slate-200">{b.product_name}</Table.Cell>
                    <Table.Cell>
                      <span className="text-slate-400">{vendor?.name || '-'}</span>
                    </Table.Cell>
                    <Table.Cell className="text-slate-400">{b.quantity}</Table.Cell>
                    <Table.Cell>
                      <span className="font-medium text-emerald-400">${b.total_amount}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={getStatusVariant(b.status)}>
                        {b.status.replace('_', ' ')}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Batches;

