import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PendingApprovalsTab = () => {
  const [selectedAthletes, setSelectedAthletes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showApprovalModal, setShowApprovalModal] = useState(null);
  const [approvalComment, setApprovalComment] = useState('');

  const pendingAthletes = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      sport: "Track & Field",
      profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      submittedDate: "2025-01-18",
      documents: ["ID Verification", "Athletic Certification", "Medical Records"],
      achievements: "State Champion 2024, Regional Record Holder",
      fundingGoal: 15000,
      priority: "high",
      verificationStatus: "pending"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      email: "marcus.rodriguez@email.com",
      sport: "Basketball",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      submittedDate: "2025-01-17",
      documents: ["ID Verification", "Team Contract", "Performance Stats"],
      achievements: "College Scholarship Recipient, MVP 2023",
      fundingGoal: 25000,
      priority: "medium",
      verificationStatus: "pending"
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      sport: "Swimming",
      profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      submittedDate: "2025-01-16",
      documents: ["ID Verification", "Swimming Federation License"],
      achievements: "National Junior Championships Qualifier",
      fundingGoal: 12000,
      priority: "low",
      verificationStatus: "pending"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@email.com",
      sport: "Soccer",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      submittedDate: "2025-01-15",
      documents: ["ID Verification", "Club Registration", "Injury Report"],
      achievements: "Division 1 Player, Team Captain",
      fundingGoal: 18000,
      priority: "high",
      verificationStatus: "pending"
    }
  ];

  const sportOptions = [
    { value: '', label: 'All Sports' },
    { value: 'Track & Field', label: 'Track & Field' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Swimming', label: 'Swimming' },
    { value: 'Soccer', label: 'Soccer' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Submission Date' },
    { value: 'priority', label: 'Priority Level' },
    { value: 'sport', label: 'Sport Category' },
    { value: 'amount', label: 'Funding Goal' }
  ];

  const handleSelectAthlete = (athleteId) => {
    setSelectedAthletes(prev => 
      prev.includes(athleteId) 
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAthletes.length === filteredAthletes.length) {
      setSelectedAthletes([]);
    } else {
      setSelectedAthletes(filteredAthletes.map(athlete => athlete.id));
    }
  };

  const handleApproval = (athleteId, action) => {
    setShowApprovalModal({ athleteId, action });
  };

  const confirmApproval = () => {
    console.log(`${showApprovalModal.action} athlete ${showApprovalModal.athleteId} with comment: ${approvalComment}`);
    setShowApprovalModal(null);
    setApprovalComment('');
  };

  const filteredAthletes = pendingAthletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !filterSport || athlete.sport === filterSport;
    return matchesSearch && matchesSport;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search athletes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select
            placeholder="Filter by sport"
            options={sportOptions}
            value={filterSport}
            onChange={setFilterSport}
          />
          
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" fullWidth>
              <Icon name="Filter" size={16} />
              Advanced
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAthletes.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedAthletes.length} athlete{selectedAthletes.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="success" size="sm">
                <Icon name="CheckCircle" size={16} />
                Bulk Approve
              </Button>
              <Button variant="destructive" size="sm">
                <Icon name="XCircle" size={16} />
                Bulk Reject
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Athletes Table - Desktop */}
      <div className="hidden lg:block bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedAthletes.length === filteredAthletes.length && filteredAthletes.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Athlete</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Sport</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Documents</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Goal</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Submitted</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAthletes.map((athlete) => (
                <tr key={athlete.id} className="hover:bg-muted/20">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedAthletes.includes(athlete.id)}
                      onChange={() => handleSelectAthlete(athlete.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={athlete.profilePhoto}
                        alt={athlete.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-foreground">{athlete.name}</div>
                        <div className="text-sm text-muted-foreground">{athlete.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                      {athlete.sport}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{athlete.documents.length}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">
                      ${athlete.fundingGoal.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium capitalize ${getPriorityColor(athlete.priority)}`}>
                      {athlete.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(athlete.submittedDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApproval(athlete.id, 'approve')}
                      >
                        <Icon name="Check" size={14} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleApproval(athlete.id, 'reject')}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Athletes Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredAthletes.map((athlete) => (
          <div key={athlete.id} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedAthletes.includes(athlete.id)}
                  onChange={() => handleSelectAthlete(athlete.id)}
                  className="rounded border-border"
                />
                <Image
                  src={athlete.profilePhoto}
                  alt={athlete.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-foreground">{athlete.name}</div>
                  <div className="text-sm text-muted-foreground">{athlete.sport}</div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium capitalize ${getPriorityColor(athlete.priority)}`}>
                {athlete.priority}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Funding Goal</div>
                <div className="font-medium text-foreground">${athlete.fundingGoal.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Documents</div>
                <div className="font-medium text-foreground">{athlete.documents.length} files</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Submitted {new Date(athlete.submittedDate).toLocaleDateString()}
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleApproval(athlete.id, 'approve')}
                >
                  <Icon name="Check" size={14} />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleApproval(athlete.id, 'reject')}
                >
                  <Icon name="X" size={14} />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card rounded-lg shadow-elevation-3">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon 
                  name={showApprovalModal.action === 'approve' ? 'CheckCircle' : 'XCircle'} 
                  size={24} 
                  className={showApprovalModal.action === 'approve' ? 'text-success' : 'text-error'} 
                />
                <h3 className="text-lg font-semibold text-foreground">
                  {showApprovalModal.action === 'approve' ? 'Approve' : 'Reject'} Athlete
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Please provide a comment for this {showApprovalModal.action} decision:
              </p>
              
              <Input
                type="text"
                placeholder="Enter your comment..."
                value={approvalComment}
                onChange={(e) => setApprovalComment(e.target.value)}
                className="mb-4"
              />
              
              <div className="flex items-center space-x-3">
                <Button
                  variant={showApprovalModal.action === 'approve' ? 'success' : 'destructive'}
                  onClick={confirmApproval}
                  disabled={!approvalComment.trim()}
                >
                  Confirm {showApprovalModal.action === 'approve' ? 'Approval' : 'Rejection'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowApprovalModal(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApprovalsTab;