import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MedicalDocumentationStep = ({ formData, onUpdate, errors }) => {
  const [dragActive, setDragActive] = useState(false);

  const acceptedFileTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      if (!acceptedFileTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported`);
        return false;
      }
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    const currentFiles = formData.medicalDocuments || [];
    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      description: ''
    }));

    onUpdate({ medicalDocuments: [...currentFiles, ...newFiles] });
  };

  const removeFile = (fileId) => {
    const currentFiles = formData.medicalDocuments || [];
    const updatedFiles = currentFiles.filter(file => file.id !== fileId);
    onUpdate({ medicalDocuments: updatedFiles });
  };

  const updateFileDescription = (fileId, description) => {
    const currentFiles = formData.medicalDocuments || [];
    const updatedFiles = currentFiles.map(file => 
      file.id === fileId ? { ...file, description } : file
    );
    onUpdate({ medicalDocuments: updatedFiles });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('image')) return 'Image';
    if (fileType.includes('word')) return 'FileText';
    return 'File';
  };

  const documentTypes = [
    { id: 'medical-report', label: 'Medical Report', description: 'Doctor\'s diagnosis and treatment plan' },
    { id: 'xray-mri', label: 'X-Ray/MRI Results', description: 'Imaging results showing injury' },
    { id: 'prescription', label: 'Prescription', description: 'Prescribed medications or treatments' },
    { id: 'therapy-plan', label: 'Therapy Plan', description: 'Physical therapy or rehabilitation plan' },
    { id: 'surgery-report', label: 'Surgery Report', description: 'Surgical procedure documentation' },
    { id: 'insurance', label: 'Insurance Documentation', description: 'Insurance coverage and claims' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm">3</span>
          </div>
          <h3 className="font-heading font-semibold text-foreground">Medical Documentation</h3>
        </div>

        <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={18} className="text-warning mt-0.5" />
            <div>
              <div className="font-medium text-warning mb-1">Privacy & Security</div>
              <div className="text-sm text-muted-foreground">
                All medical documents are encrypted and stored securely. Only verified medical professionals and platform administrators can access these files for verification purposes.
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Upload Medical Documents *
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary" />
              </div>
              
              <div>
                <div className="font-medium text-foreground mb-1">
                  Drop files here or click to browse
                </div>
                <div className="text-sm text-muted-foreground">
                  Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Icon name="FolderOpen" size={16} />
                Choose Files
              </Button>
            </div>
          </div>
          {errors.medicalDocuments && (
            <div className="mt-2 text-sm text-error">{errors.medicalDocuments}</div>
          )}
        </div>

        {/* Uploaded Files */}
        {formData.medicalDocuments && formData.medicalDocuments.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-4">Uploaded Documents</h4>
            <div className="space-y-3">
              {formData.medicalDocuments.map((file) => (
                <div key={file.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getFileIcon(file.type)} size={18} className="text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-foreground truncate">{file.name}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          iconName="X"
                          className="text-error hover:text-error"
                        />
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        {formatFileSize(file.size)} • Uploaded {new Date(file.uploadDate).toLocaleDateString()}
                      </div>
                      
                      <Input
                        type="text"
                        placeholder="Add a description for this document..."
                        value={file.description}
                        onChange={(e) => updateFileDescription(file.id, e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Type Checklist */}
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-4">Recommended Document Types</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTypes.map((docType) => (
              <div key={docType.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <Icon name="FileText" size={16} className="text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-foreground text-sm">{docType.label}</div>
                  <div className="text-xs text-muted-foreground">{docType.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <Input
            label="Medical Professional Contact"
            type="text"
            placeholder="Dr. Smith, Orthopedic Surgeon - (555) 123-4567"
            description="Primary doctor or medical professional handling your case"
            value={formData.medicalContact || ''}
            onChange={(e) => onUpdate({ medicalContact: e.target.value })}
            error={errors.medicalContact}
          />
        </div>

        <div className="mt-4">
          <Input
            label="Treatment Facility"
            type="text"
            placeholder="City General Hospital, Sports Medicine Center"
            description="Where are you receiving or planning to receive treatment?"
            value={formData.treatmentFacility || ''}
            onChange={(e) => onUpdate({ treatmentFacility: e.target.value })}
            error={errors.treatmentFacility}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalDocumentationStep;