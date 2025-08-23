// Mock data for the NeuraForge Research Dashboard

export interface ResearchProject {
  id: string
  title: string
  description: string
  domain: string
  status: 'planning' | 'active' | 'review' | 'completed' | 'paused'
  progress: number
  collaborators: number
  experiments: number
  citations: number
  lastActivity: string
  funding: number
  tags: string[]
  lead: string
  startDate: string
  endDate?: string
}

export interface Experiment {
  id: string
  name: string
  description: string
  project: string
  status: 'planning' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress: number
  startTime?: string
  endTime?: string
  duration?: string
  eta?: string
  assignee: string
  resources: {
    type: 'cpu' | 'gpu' | 'memory' | 'storage'
    allocated: string
    used: string
  }[]
  parameters: Record<string, string | number | boolean | string[]>
  metrics: Record<string, number>
  tags: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export interface Collaborator {
  id: string
  name: string
  role: string
  status: 'online' | 'away' | 'offline'
  activity: string
  avatar: string
  expertise: string[]
  projects: string[]
  contributions: number
}

export interface AIRecommendation {
  id: string
  type: 'paper' | 'collaborator' | 'funding' | 'experiment' | 'dataset'
  title: string
  description: string
  relevance: number
  action: string
  metadata?: Record<string, string | number | string[]>
}

export interface Notification {
  id: string
  type: 'mention' | 'update' | 'collaboration' | 'system' | 'funding' | 'deadline'
  title: string
  content: string
  time: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
}

// Mock Research Projects
export const mockProjects: ResearchProject[] = [
  {
    id: 'proj-1',
    title: 'Neural Network Optimization',
    description: 'Improving deep learning model performance through architectural optimizations and novel training techniques',
    domain: 'Machine Learning',
    status: 'active',
    progress: 73,
    collaborators: 4,
    experiments: 12,
    citations: 8,
    lastActivity: '2 hours ago',
    funding: 125000,
    tags: ['deep-learning', 'optimization', 'neural-networks'],
    lead: 'Dr. Sarah Chen',
    startDate: '2024-01-15',
    endDate: '2024-06-15'
  },
  {
    id: 'proj-2',
    title: 'Climate Change Modeling',
    description: 'Advanced climate prediction models using satellite data and machine learning for improved accuracy',
    domain: 'Climate Science',
    status: 'active',
    progress: 45,
    collaborators: 7,
    experiments: 8,
    citations: 15,
    lastActivity: '1 day ago',
    funding: 250000,
    tags: ['climate', 'modeling', 'satellite-data', 'prediction'],
    lead: 'Prof. Maria Santos',
    startDate: '2023-09-01',
    endDate: '2024-08-31'
  },
  {
    id: 'proj-3',
    title: 'Quantum Computing Algorithms',
    description: 'Novel quantum algorithms for optimization problems in logistics and supply chain management',
    domain: 'Quantum Computing',
    status: 'review',
    progress: 89,
    collaborators: 3,
    experiments: 6,
    citations: 23,
    lastActivity: '3 hours ago',
    funding: 180000,
    tags: ['quantum', 'algorithms', 'optimization', 'logistics'],
    lead: 'Dr. Alex Kumar',
    startDate: '2023-11-01',
    endDate: '2024-04-30'
  },
  {
    id: 'proj-4',
    title: 'Biomedical Image Analysis',
    description: 'AI-powered medical imaging analysis for early disease detection and diagnosis',
    domain: 'Medical AI',
    status: 'active',
    progress: 62,
    collaborators: 6,
    experiments: 15,
    citations: 12,
    lastActivity: '5 hours ago',
    funding: 300000,
    tags: ['medical-ai', 'imaging', 'diagnosis', 'healthcare'],
    lead: 'Dr. Emily Rodriguez',
    startDate: '2024-02-01',
    endDate: '2024-12-31'
  },
  {
    id: 'proj-5',
    title: 'Sustainable Energy Storage',
    description: 'Research into novel battery technologies for renewable energy storage systems',
    domain: 'Energy',
    status: 'planning',
    progress: 15,
    collaborators: 2,
    experiments: 3,
    citations: 5,
    lastActivity: '2 days ago',
    funding: 200000,
    tags: ['energy', 'batteries', 'sustainability', 'storage'],
    lead: 'Prof. James Wilson',
    startDate: '2024-03-01',
    endDate: '2025-02-28'
  }
]

// Mock Experiments
export const mockExperiments: Experiment[] = [
  {
    id: 'exp-1',
    name: 'CNN Architecture Comparison',
    description: 'Comparing different CNN architectures for image classification performance',
    project: 'Neural Network Optimization',
    status: 'running',
    progress: 67,
    startTime: '2024-01-20 09:00',
    eta: '2h 15m',
    assignee: 'Dr. Sarah Chen',
    resources: [
      { type: 'gpu', allocated: '8 GPUs', used: '6 GPUs' },
      { type: 'memory', allocated: '64GB', used: '48GB' },
      { type: 'storage', allocated: '1TB', used: '750GB' }
    ],
    parameters: {
      learning_rate: 0.001,
      batch_size: 32,
      epochs: 100,
      optimizer: 'Adam'
    },
    metrics: {
      accuracy: 0.924,
      loss: 0.156,
      f1_score: 0.918,
      precision: 0.931
    },
    tags: ['cnn', 'classification', 'comparison'],
    priority: 'high'
  },
  {
    id: 'exp-2',
    name: 'Climate Data Analysis',
    description: 'Statistical analysis of temperature trends over the past decade',
    project: 'Climate Change Modeling',
    status: 'queued',
    progress: 0,
    eta: '4h 30m',
    assignee: 'Prof. Maria Santos',
    resources: [
      { type: 'cpu', allocated: '16 cores', used: '0 cores' },
      { type: 'memory', allocated: '32GB', used: '0GB' },
      { type: 'storage', allocated: '500GB', used: '0GB' }
    ],
    parameters: {
      time_range: '2014-2024',
      regions: ['North America', 'Europe', 'Asia'],
      variables: ['temperature', 'precipitation', 'humidity']
    },
    metrics: {},
    tags: ['climate', 'statistics', 'trends'],
    priority: 'medium'
  },
  {
    id: 'exp-3',
    name: 'Quantum Gate Optimization',
    description: 'Optimizing quantum gate sequences for improved algorithm performance',
    project: 'Quantum Computing Algorithms',
    status: 'completed',
    progress: 100,
    startTime: '2024-01-18 14:00',
    endTime: '2024-01-19 10:30',
    duration: '20h 30m',
    assignee: 'Dr. Alex Kumar',
    resources: [
      { type: 'cpu', allocated: '8 cores', used: '8 cores' },
      { type: 'memory', allocated: '16GB', used: '12GB' }
    ],
    parameters: {
      gate_types: ['CNOT', 'Hadamard', 'Phase'],
      optimization_method: 'genetic_algorithm',
      iterations: 1000
    },
    metrics: {
      fidelity: 0.987,
      gate_count: 45,
      depth: 12,
      success_rate: 0.94
    },
    tags: ['quantum', 'optimization', 'gates'],
    priority: 'high'
  },
  {
    id: 'exp-4',
    name: 'MRI Scan Classification',
    description: 'Training deep learning model to classify brain MRI scans for tumor detection',
    project: 'Biomedical Image Analysis',
    status: 'running',
    progress: 34,
    startTime: '2024-01-21 08:00',
    eta: '6h 45m',
    assignee: 'Dr. Emily Rodriguez',
    resources: [
      { type: 'gpu', allocated: '4 GPUs', used: '4 GPUs' },
      { type: 'memory', allocated: '128GB', used: '96GB' },
      { type: 'storage', allocated: '2TB', used: '1.2TB' }
    ],
    parameters: {
      model_type: 'ResNet50',
      input_size: '224x224',
      classes: ['normal', 'tumor'],
      augmentation: true
    },
    metrics: {
      accuracy: 0.876,
      sensitivity: 0.892,
      specificity: 0.861,
      auc: 0.923
    },
    tags: ['medical', 'mri', 'classification', 'tumor-detection'],
    priority: 'critical'
  },
  {
    id: 'exp-5',
    name: 'Battery Capacity Testing',
    description: 'Testing new lithium-ion battery formulation for capacity and longevity',
    project: 'Sustainable Energy Storage',
    status: 'planning',
    progress: 0,
    assignee: 'Prof. James Wilson',
    resources: [
      { type: 'cpu', allocated: '4 cores', used: '0 cores' },
      { type: 'storage', allocated: '100GB', used: '0GB' }
    ],
    parameters: {
      test_cycles: 1000,
      temperature_range: '0-60°C',
      charge_rate: '1C',
      discharge_rate: '1C'
    },
    metrics: {},
    tags: ['battery', 'capacity', 'testing', 'lithium-ion'],
    priority: 'medium'
  }
]

// Mock Collaborators
export const mockCollaborators: Collaborator[] = [
  {
    id: 'collab-1',
    name: 'Dr. Alex Kumar',
    role: 'ML Engineer',
    status: 'online',
    activity: 'Editing experiment protocol',
    avatar: 'AK',
    expertise: ['machine-learning', 'deep-learning', 'python'],
    projects: ['proj-1', 'proj-3'],
    contributions: 156
  },
  {
    id: 'collab-2',
    name: 'Prof. Maria Santos',
    role: 'Principal Investigator',
    status: 'online',
    activity: 'Reviewing results',
    avatar: 'MS',
    expertise: ['climate-science', 'modeling', 'statistics'],
    projects: ['proj-2'],
    contributions: 243
  },
  {
    id: 'collab-3',
    name: 'James Wilson',
    role: 'Research Assistant',
    status: 'away',
    activity: 'Last seen 15 min ago',
    avatar: 'JW',
    expertise: ['data-analysis', 'visualization', 'r'],
    projects: ['proj-2', 'proj-5'],
    contributions: 89
  },
  {
    id: 'collab-4',
    name: 'Dr. Lisa Chen',
    role: 'Data Scientist',
    status: 'offline',
    activity: 'Last seen 2 hours ago',
    avatar: 'LC',
    expertise: ['data-science', 'statistics', 'python', 'sql'],
    projects: ['proj-1', 'proj-4'],
    contributions: 134
  },
  {
    id: 'collab-5',
    name: 'AI Agent Alpha',
    role: 'Research Assistant',
    status: 'online',
    activity: 'Processing literature review',
    avatar: 'AI',
    expertise: ['literature-review', 'data-processing', 'automation'],
    projects: ['proj-1', 'proj-2', 'proj-3', 'proj-4'],
    contributions: 567
  }
]

// Mock AI Recommendations
export const mockRecommendations: AIRecommendation[] = [
  {
    id: 'rec-1',
    type: 'paper',
    title: 'Attention Is All You Need',
    description: 'Highly relevant to your neural network optimization work. This paper introduces the Transformer architecture.',
    relevance: 95,
    action: 'Read paper',
    metadata: {
      authors: ['Vaswani et al.'],
      year: 2017,
      citations: 50000,
      venue: 'NIPS'
    }
  },
  {
    id: 'rec-2',
    type: 'collaborator',
    title: 'Dr. Emily Rodriguez',
    description: 'Expert in quantum algorithms and optimization, perfect match for your quantum computing project.',
    relevance: 88,
    action: 'Send invitation',
    metadata: {
      institution: 'MIT',
      h_index: 45,
      recent_papers: 12
    }
  },
  {
    id: 'rec-3',
    type: 'funding',
    title: 'NSF AI Research Grant',
    description: 'Deadline in 15 days, matches your research focus on neural network optimization.',
    relevance: 92,
    action: 'Apply now',
    metadata: {
      amount: '$500,000',
      deadline: '2024-02-15',
      success_rate: '18%'
    }
  },
  {
    id: 'rec-4',
    type: 'dataset',
    title: 'ImageNet-22K Extended',
    description: 'Large-scale image dataset that could improve your CNN training results.',
    relevance: 87,
    action: 'Download dataset',
    metadata: {
      size: '1.2TB',
      images: '14M',
      classes: '21,841'
    }
  },
  {
    id: 'rec-5',
    type: 'experiment',
    title: 'Transfer Learning Comparison',
    description: 'Based on your current work, this experiment could provide valuable insights.',
    relevance: 83,
    action: 'Create experiment',
    metadata: {
      estimated_time: '4 hours',
      resources_needed: '2 GPUs',
      expected_improvement: '5-10%'
    }
  }
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'mention',
    title: 'Mentioned in experiment notes',
    content: 'Dr. Kumar mentioned you in "Neural Network Optimization" experiment results.',
    time: '2 min ago',
    read: false,
    priority: 'medium',
    actionUrl: '/experiments/exp-1'
  },
  {
    id: 'notif-2',
    type: 'update',
    title: 'Experiment completed',
    content: 'Your ML training job "CNN Architecture Comparison" has finished successfully with 92.4% accuracy.',
    time: '15 min ago',
    read: false,
    priority: 'high',
    actionUrl: '/experiments/exp-1'
  },
  {
    id: 'notif-3',
    type: 'collaboration',
    title: 'New collaboration request',
    content: 'Prof. Santos invited you to join "Climate Modeling Project" as a co-investigator.',
    time: '1 hour ago',
    read: false,
    priority: 'high',
    actionUrl: '/projects/proj-2'
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Lab booking confirmed',
    content: 'Your lab time reservation for tomorrow 2-4 PM in Quantum Lab A has been confirmed.',
    time: '2 hours ago',
    read: true,
    priority: 'low',
    actionUrl: '/marketplace/labs'
  },
  {
    id: 'notif-5',
    type: 'funding',
    title: 'Grant deadline reminder',
    content: 'NSF AI Research Grant application deadline is in 3 days. Don\'t forget to submit!',
    time: '4 hours ago',
    read: true,
    priority: 'high',
    actionUrl: '/funding/grants'
  },
  {
    id: 'notif-6',
    type: 'deadline',
    title: 'Project milestone due',
    content: 'Neural Network Optimization milestone "Architecture Design" is due tomorrow.',
    time: '6 hours ago',
    read: true,
    priority: 'medium',
    actionUrl: '/projects/proj-1'
  }
]

// Dashboard metrics
export const mockMetrics = {
  totalProjects: 12,
  activeExperiments: 24,
  collaborations: 8,
  citations: 156,
  impactScore: 8.7,
  fundingSecured: 450000,
  papersPublished: 23,
  datasetsShared: 45,
  replicationRate: 78,
  collaboratorCount: 34
}
