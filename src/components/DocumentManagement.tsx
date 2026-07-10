import { useState } from 'react';
import { 
  FolderOpen, Folder, FileText, Image as ImageIcon, Video, 
  Download, File, Search 
} from 'lucide-react';


interface FileItem {
  name: string;
  size: string;
  type: 'pdf' | 'doc' | 'zip' | 'jpg' | 'mp4';
}

const FOLDERS_DATA: Record<string, FileItem[]> = {
  'Inspection Reports': [
    { name: 'Inspection_Nilgiris_Core_Q2.pdf', size: '2.4 MB', type: 'pdf' },
    { name: 'Ranger_Patrol_Audit_June.pdf', size: '1.8 MB', type: 'pdf' },
    { name: 'Sandalwood_Nursery_Audit_2026.pdf', size: '3.1 MB', type: 'pdf' }
  ],
  'Circulars': [
    { name: 'Circular_Fire_Lines_Preparation_2026.pdf', size: '890 KB', type: 'pdf' },
    { name: 'Circular_Monsoon_Preparedness_Protocol.pdf', size: '1.2 MB', type: 'pdf' }
  ],
  'Government Orders (G.O.s)': [
    { name: 'GO-2026-12_Elephant_Corridor_Restructuring.pdf', size: '4.5 MB', type: 'pdf' },
    { name: 'GO-2026-18_EcoTourism_Restriction_Guidelines.pdf', size: '2.1 MB', type: 'pdf' }
  ],
  'Forest Notifications': [
    { name: 'Notification_Boundary_Demarcation_Coimbatore.pdf', size: '1.4 MB', type: 'pdf' },
    { name: 'Wildlife_Schedule_I_Update_2026.pdf', size: '940 KB', type: 'pdf' }
  ],
  'Images & Videos': [
    { name: 'Tiger_CAM-401_Sighting_Mudumalai.jpg', size: '4.8 MB', type: 'jpg' },
    { name: 'Elephant_Herd_Highway_Crossing_Gudalur.mp4', size: '42.1 MB', type: 'mp4' },
    { name: 'Raid_Evidence_Sandalwood_Seizures.jpg', size: '2.9 MB', type: 'jpg' }
  ],
  'Drone Surveys': [
    { name: 'Drone_Thermal_Mapping_Nilgiris_Core.zip', size: '184.2 MB', type: 'zip' },
    { name: 'OrthoMap_Sathyamangalam_East_2026.zip', size: '312.4 MB', type: 'zip' }
  ],
  'GPS Track Logs': [
    { name: 'GPX_Ranger_Patrol_Team_08_June.gpx', size: '640 KB', type: 'doc' },
    { name: 'GPX_Elephants_Telemetry_Corridors.gpx', size: '1.2 MB', type: 'doc' }
  ]
};

export default function DocumentManagement() {
  const [activeFolder, setActiveFolder] = useState<string>('Government Orders (G.O.s)');
  const [searchTerm, setSearchTerm] = useState('');

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'pdf': return <FileText className="doc-file-icon" style={{ color: '#ef4444' }} />;
      case 'doc': return <File className="doc-file-icon" style={{ color: '#3b82f6' }} />;
      case 'zip': return <Folder className="doc-file-icon" style={{ color: '#f59e0b' }} />;
      case 'jpg': return <ImageIcon className="doc-file-icon" style={{ color: '#10b981' }} />;
      case 'mp4': return <Video className="doc-file-icon" style={{ color: '#8b5cf6' }} />;
    }
  };

  const files = FOLDERS_DATA[activeFolder] || [];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <span>Project VanamAI</span>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--color-primary-green)' }}>Document Explorer</span>
        </div>
        <div className="page-header-row">
          <h1 className="page-title">
            <FolderOpen style={{ color: 'var(--color-primary-green)' }} />
            Document Management System
          </h1>
          <div className="page-actions">
            <div className="nav-search-bar" style={{ width: '220px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search file name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Uploading a new document file...')}>
              Upload Document
            </button>
          </div>
        </div>
      </div>

      {/* Explorer grid */}
      <div className="doc-explorer-layout">
        
        {/* Left Side: Folder list */}
        <div className="doc-sidebar">
          {Object.keys(FOLDERS_DATA).map((folderName) => (
            <div 
              key={folderName}
              className={`doc-folder-item ${activeFolder === folderName ? 'active' : ''}`}
              onClick={() => setActiveFolder(folderName)}
            >
              <Folder size={18} />
              <span style={{ fontSize: '13px' }}>{folderName}</span>
            </div>
          ))}
        </div>

        {/* Right Side: Files list */}
        <div className="card" style={{ minHeight: '380px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontWeight: 700, fontSize: '15px' }}>{activeFolder}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{files.length} items</span>
          </div>

          <div className="doc-files-grid">
            {files
              .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((file, i) => (
                <div key={i} className="doc-file-card" onClick={() => alert(`Downloading: ${file.name}`)}>
                  {getFileIcon(file.type)}
                  <span className="doc-file-name" title={file.name}>{file.name}</span>
                  <span className="doc-file-size">{file.size}</span>
                  
                  {/* Download trigger hover helper */}
                  <button className="btn btn-secondary btn-sm" style={{ padding: '4px', border: 'none', marginTop: '12px' }}>
                    <Download size={14} />
                  </button>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
