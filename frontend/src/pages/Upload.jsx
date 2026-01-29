import { useState, useRef } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import Alert from '../components/ui/Alert';

function Upload() {
  const [documents] = useState([
    { id: 1, title: 'Quality Certificate', document_type: 'Certificate', batch_id: 1, file_hash: 'a1b2c3d4e5f6', created_at: '2024-01-15' },
    { id: 2, title: 'Invoice #1234', document_type: 'Invoice', batch_id: 2, file_hash: 'f6e5d4c3b2a1', created_at: '2024-01-16' },
  ]);
  const [batches] = useState([
    { id: 1, batch_number: 'BATCH-001', product_name: 'Widget A' },
    { id: 2, batch_number: 'BATCH-002', product_name: 'Widget B' },
    { id: 3, batch_number: 'BATCH-003', product_name: 'Component X' },
  ]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [batchId, setBatchId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !batchId) {
      setError('Please select a file and batch');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    // Simulate upload
    setTimeout(() => {
      setSuccess('Document uploaded successfully!');
      setFile(null);
      setTitle('');
      setBatchId('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSubmitting(false);
    }, 1000);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const dropAreaActive = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }
      setFile(droppedFile);
      setError('');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Document Upload</h1>
          <p className="text-slate-500 mt-1">Upload certificates and documents</p>
        </div>
        <Badge variant="primary" size="lg">{documents.length} Documents</Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <Card padding="lg" className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Upload Document</h2>
              <p className="text-slate-500 text-sm">Add a new certificate</p>
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
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Batch <span className="text-red-400">*</span>
              </label>
              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              >
                <option value="">Select a batch</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.batch_number} - {b.product_name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Document Title"
              placeholder="Leave empty to use filename"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* File Drop Zone */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                PDF File <span className="text-red-400">*</span>
              </label>
              <div
                className={`
                  relative border-2 border-dashed rounded-lg p-6
                  transition-all duration-200 cursor-pointer
                  ${file ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/50'}
                `}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={dropAreaActive}
                onDragLeave={dropAreaActive}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {file ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                      <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="ml-auto p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-400">
                      <span className="text-blue-400 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF files only (max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              disabled={!file || !batchId || batches.length === 0}
              className="w-full mt-2"
              icon={UploadIcon}
            >
              {submitting ? 'Uploading...' : 'Upload Document'}
            </Button>
          </form>
        </Card>

        {/* Document List */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-100">All Documents</h2>
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-500">No documents uploaded yet</p>
              <p className="text-slate-600 text-sm mt-1">Upload your first document using the form</p>
            </div>
          ) : (
            <Table headers={['Title', 'Type', 'Batch', 'Hash', 'Created']}>
              {documents.map((d) => {
                const batch = batches.find((b) => b.id === d.batch_id);
                return (
                  <Table.Row key={d.id} className="group">
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-200 truncate max-w-[200px]">{d.title}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="info">{d.document_type}</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-slate-400">{batch?.batch_number || '-'}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <code className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        {d.file_hash ? `${d.file_hash.substring(0, 16)}...` : '-'}
                      </code>
                    </Table.Cell>
                    <Table.Cell className="text-slate-400">
                      {new Date(d.created_at).toLocaleDateString()}
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

const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export default Upload;
