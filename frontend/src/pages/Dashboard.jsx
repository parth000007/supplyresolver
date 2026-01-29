import { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import Loading from '../components/ui/Loading';

function Dashboard() {
  const [vendors] = useState([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', is_active: true },
    { id: 2, name: 'Global Supplies', email: 'info@globalsupplies.com', is_active: true },
    { id: 3, name: 'Tech Parts Inc', email: 'sales@techparts.com', is_active: false },
  ]);
  const [batches] = useState([
    { id: 1, batch_number: 'BATCH-001', product_name: 'Widget A', quantity: 500, status: 'completed' },
    { id: 2, batch_number: 'BATCH-002', product_name: 'Widget B', quantity: 1200, status: 'pending' },
    { id: 3, batch_number: 'BATCH-003', product_name: 'Component X', quantity: 300, status: 'approved' },
  ]);
  const [documents] = useState([
    { id: 1, title: 'Quality Certificate', document_type: 'Certificate', batch_id: 1, created_at: '2024-01-15' },
    { id: 2, title: 'Invoice #1234', document_type: 'Invoice', batch_id: 2, created_at: '2024-01-16' },
  ]);
  const [loading] = useState(false);

  const getStatusVariant = (status) => {
    const variants = {
      active: 'success',
      inactive: 'default',
      pending: 'warning',
      completed: 'success',
      approved: 'success',
      rejected: 'error',
    };
    return variants[status?.toLowerCase()] || 'info';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your supply chain data</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Loading type="card" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your supply chain data</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-slate-800 text-sm">
          <span className="text-slate-400">Total:</span>{' '}
          <span className="text-white font-medium">{vendors.length + batches.length + documents.length}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Vendors</p>
              <p className="text-3xl font-bold text-white mt-1">{vendors.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-3">Active partners</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Batches</p>
              <p className="text-3xl font-bold text-white mt-1">{batches.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-3">Total shipments</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Documents</p>
              <p className="text-3xl font-bold text-white mt-1">{documents.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-3">Certificates uploaded</p>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendors Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Vendors</h2>
            <Badge variant="primary">{vendors.length}</Badge>
          </div>
          {vendors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No vendors yet</p>
            </div>
          ) : (
            <Table headers={['Name', 'Email', 'Status']}>
              {vendors.slice(0, 5).map((v) => (
                <Table.Row key={v.id} className="table-row-hover">
                  <Table.Cell>
                    <span className="font-medium text-white">{v.name}</span>
                  </Table.Cell>
                  <Table.Cell className="text-slate-400">{v.email}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={getStatusVariant(v.is_active ? 'active' : 'inactive')}>
                      {v.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
          )}
        </Card>

        {/* Batches Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Batches</h2>
            <Badge variant="primary">{batches.length}</Badge>
          </div>
          {batches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No batches yet</p>
            </div>
          ) : (
            <Table headers={['Batch #', 'Product', 'Qty', 'Status']}>
              {batches.slice(0, 5).map((b) => (
                <Table.Row key={b.id} className="table-row-hover">
                  <Table.Cell>
                    <span className="font-mono text-sm text-slate-300">{b.batch_number}</span>
                  </Table.Cell>
                  <Table.Cell className="text-slate-300">{b.product_name}</Table.Cell>
                  <Table.Cell className="text-slate-400">{b.quantity}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={getStatusVariant(b.status)}>{b.status}</Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
          )}
        </Card>
      </div>

      {/* Documents Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Documents</h2>
          <Badge variant="primary">{documents.length}</Badge>
        </div>
        {documents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500">No documents uploaded yet</p>
          </div>
        ) : (
          <Table headers={['Title', 'Type', 'Batch ID', 'Created']}>
            {documents.map((d) => (
              <Table.Row key={d.id} className="table-row-hover">
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-white">{d.title}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="info">{d.document_type}</Badge>
                </Table.Cell>
                <Table.Cell className="text-slate-400">{d.batch_id || '-'}</Table.Cell>
                <Table.Cell className="text-slate-400">
                  {new Date(d.created_at).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;

