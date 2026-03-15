import { useState, useRef, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import { batchApi, documentApi } from '../api/axios';

function Upload() {
  const [documents, setDocuments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [batchId, setBatchId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [docsRes, batchesRes] = await Promise.all([
        documentApi.getAll(),
        batchApi.getAll(),
      ]);
      setDocuments(docsRes.data);
      setBatches(batchesRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !batchId) {
      setError('Please select a file and batch');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('batch_id', batchId);
      formData.append('title', title || file.name);
      formData.append('document_type', 'certificate');
      await documentApi.upload(formData);
      setSuccess('Document uploaded successfully!');
      setFile(null);
      setTitle('');
      setBatchId('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to upload document:', err);
      setError(err.response?.data?.detail || 'Failed to upload document');
    } finally {
      setSubmitting(false);
    }
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

  const handleDrop = (e) => {
    e.preventDefault();
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
          <h1 className="text-2xl font-bold text-white">Document Upload</h1>
          <p className="text-slate-500 mt-1">Upload certificates and documents</p>
        </div>
        <Badge variant="primary" size="lg">{documents.length} Documents</Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <Card className="p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold text-white mb-4">Upload Document</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-600/20 border border-red-600/30 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 text-sm">
              {success}
            </div>
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
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  border-2 border-dashed rounded-lg p-6 cursor-pointer
                  transition-all
                  ${file ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800'}
                `}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
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
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{file.name}</p>
                      <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700"
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
              className="w-full btn-lift"
            >
              {submitting ? 'Uploading...' : 'Upload Document'}
            </Button>
          </form>
        </Card>

        {/* Document List */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">All Documents</h2>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No documents uploaded yet</p>
            </div>
          ) : (
            <Table headers={['Title', 'Type', 'Batch', 'Hash', 'Created']}>
              {documents.map((d) => {
                const batch = batches.find((b) => b.id === d.batch_id);
                return (
                  <Table.Row key={d.id} className="table-row-hover">
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium text-white truncate max-w-[200px]">{d.title}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="info">{d.document_type}</Badge>
                    </Table.Cell>
                    <Table.Cell className="text-slate-400">{batch?.batch_number || '-'}</Table.Cell>
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

export default Upload;

