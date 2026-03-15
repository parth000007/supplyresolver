import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import { vendorApi, batchApi } from '../api/axios';

function Batches() {
  const [batches, setBatches] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    batch_number: '',
    vendor_id: '',
    product_name: '',
    quantity: '',
    unit_price: '',
    status: 'pending',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [batchesRes, vendorsRes] = await Promise.all([
        batchApi.getAll(),
        vendorApi.getAll(),
      ]);
      setBatches(batchesRes.data);
      setVendors(vendorsRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const total = parseFloat(form.quantity) * parseFloat(form.unit_price);
      await batchApi.create({
        batch_number: form.batch_number,
        vendor_id: parseInt(form.vendor_id),
        product_name: form.product_name,
        quantity: parseInt(form.quantity),
        unit_price: parseFloat(form.unit_price),
        total_amount: total,
        status: form.status,
      });
      setForm({
        batch_number: '',
        vendor_id: '',
        product_name: '',
        quantity: '',
        unit_price: '',
        status: 'pending',
      });
      setSuccess('Batch created successfully!');
      await fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to create batch:', err);
    } finally {
      setSubmitting(false);
    }
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
          <h1 className="text-2xl font-bold text-white">Batches</h1>
          <p className="text-slate-500 mt-1">Track and manage your shipments</p>
        </div>
        <Badge variant="primary" size="lg">{batches.length} Batches</Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Batch Form */}
        <Card className="p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold text-white mb-4">Create Batch</h2>

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 text-sm">
              {success}
            </div>
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
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full btn-lift"
            >
              {submitting ? 'Creating...' : 'Create Batch'}
            </Button>
          </form>
        </Card>

        {/* Batch List */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">All Batches</h2>

          {batches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No batches created yet</p>
            </div>
          ) : (
            <Table headers={['Batch #', 'Product', 'Vendor', 'Qty', 'Total', 'Status']}>
              {batches.map((b) => {
                const vendor = vendors.find((v) => v.id === b.vendor_id);
                return (
                  <Table.Row key={b.id} className="table-row-hover">
                    <Table.Cell>
                      <span className="font-mono text-sm text-slate-300">{b.batch_number}</span>
                    </Table.Cell>
                    <Table.Cell className="text-white">{b.product_name}</Table.Cell>
                    <Table.Cell className="text-slate-400">{vendor?.name || '-'}</Table.Cell>
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

