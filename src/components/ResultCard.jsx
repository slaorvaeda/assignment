export default function ResultCard({ result, compact = false, onRemove }) {
  if (!result) return null
  
  // Generate a color from the user's name for avatar bg
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return `hsl(${hash % 360}, 70%, 60%)`;
  }
  
  const avatarBg = stringToColor(result.name || "");
  
  return (
    <div className={`modern-card-container ${compact ? 'compact' : ''} animate-fade-in relative group h-full min-h-[300px] sm:min-h-[350px]`}>
      {/* Remove Button for Recent Cards - Show on Hover */}
      {onRemove && (
        <button
          onClick={() => onRemove(result.id)}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100"
          title="Remove from recent"
        >
          <i className="fa-solid fa-times text-xs"></i>
        </button>
      )}
      
      {/* Main Card */}
      <div className="card-main h-full">
        {/* Sidebar */}
        <div className="card-sidebar">
          <div className="sidebar-icon">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="sidebar-line"></div>
        </div>
        
        {/* Card Content */}
        <div className="card-content">
          {/* Header Section */}
          <div className="card-header">
            <div className="header-image">
              <div className="image-overlay"></div>
              <div className="user-info">
                <h3 className="user-name">{result.name}</h3>
                <span className="user-id">ID: {result.id}</span>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="card-body">
            <div className="info-grid">
              {/* Email */}
              <div className="info-item">
                <div className="info-icon email-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <span className="info-value">{result.email}</span>
                </div>
              </div>
              
              {/* Phone */}
              <div className="info-item">
                <div className="info-icon phone-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{result.phone}</span>
                </div>
              </div>
              
              {/* Website */}
              <div className="info-item">
                <div className="info-icon website-icon">
                  <i className="fa-solid fa-globe"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Website</span>
                  <span className="info-value">{result.website}</span>
                </div>
              </div>
              
              {/* Company */}
              <div className="info-item">
                <div className="info-icon company-icon">
                  <i className="fa-solid fa-building"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Company</span>
                  <span className="info-value">{result.company?.name}</span>
                </div>
              </div>
              
              {/* Address */}
              <div className="info-item">
                <div className="info-icon address-icon">
                  <i className="fa-solid fa-map-marker-alt"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">{result.address?.city}, {result.address?.street}</span>
                </div>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="status-section">
              <div className="status-badge">
                <div className="status-dot"></div>
                <span className="status-text">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="float-element float-1"></div>
        <div className="float-element float-2"></div>
        <div className="float-element float-3"></div>
      </div>
    </div>
  )
}
