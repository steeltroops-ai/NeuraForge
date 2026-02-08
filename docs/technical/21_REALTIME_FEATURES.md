# ⚡ NeuraForge OS Real-time Features

## Overview

NeuraForge OS provides comprehensive real-time collaboration features powered by Socket.io, enabling researchers to work together seamlessly on projects with live updates, cursor tracking, and synchronized content editing.

## Architecture

### Technology Stack

- **Frontend**: Socket.io client with React hooks
- **Backend**: Socket.io server with Fastify integration
- **State Management**: Zustand for real-time state
- **Conflict Resolution**: Operational Transformation (OT)
- **Persistence**: Redis for session management

### Connection Management

```typescript
// Socket connection with authentication
const socket = io('http://localhost:4000', {
  auth: {
    token: accessToken
  },
  transports: ['websocket', 'polling'],
  upgrade: true,
  rememberUpgrade: true
});
```

## Core Features

### 1. Real-time Project Collaboration

#### Project Rooms

Each project creates a dedicated room for real-time collaboration:

```typescript
// Join project room
socket.emit('project-join', {
  projectId: 'proj_1234567890',
  branchId: 'branch_main',
  userInfo: {
    id: 'user_123',
    name: 'Dr. Jane Smith',
    avatar: 'https://example.com/avatar.jpg'
  }
});

// Leave project room
socket.emit('project-leave', {
  projectId: 'proj_1234567890'
});
```

#### User Presence Tracking

Track who's currently active in a project:

```typescript
// Receive presence updates
socket.on('user-presence', (data) => {
  const { action, user, users } = data;
  
  switch (action) {
    case 'join':
      console.log(`${user.name} joined the project`);
      updateActiveUsers(users);
      break;
    case 'leave':
      console.log(`${user.name} left the project`);
      updateActiveUsers(users);
      break;
    case 'update':
      updateActiveUsers(users);
      break;
  }
});
```

### 2. Live Cursor Tracking

#### Cursor Position Sharing

Share cursor positions and selections in real-time:

```typescript
// Send cursor update
const updateCursor = (position, selection) => {
  socket.emit('cursor-update', {
    projectId: currentProject.id,
    branchId: currentBranch.id,
    cursor: {
      position: { x: position.x, y: position.y },
      selection: { start: selection.start, end: selection.end },
      element: selection.elementId,
      timestamp: Date.now()
    }
  });
};

// Receive cursor updates from collaborators
socket.on('cursor-update', (data) => {
  const { userId, cursor, user } = data;
  
  // Don't show own cursor
  if (userId === currentUser.id) return;
  
  // Update collaborator cursor display
  updateCollaboratorCursor(userId, {
    position: cursor.position,
    selection: cursor.selection,
    user: {
      name: user.name,
      avatar: user.avatar,
      color: getUserColor(userId)
    }
  });
});
```

#### Cursor Visualization

```tsx
// React component for displaying collaborator cursors
const CollaboratorCursors: React.FC = () => {
  const { collaboratorCursors } = useRealtimeStore();
  
  return (
    <>
      {Object.entries(collaboratorCursors).map(([userId, cursor]) => (
        <div
          key={userId}
          className="absolute pointer-events-none z-50"
          style={{
            left: cursor.position.x,
            top: cursor.position.y,
            transform: 'translate(-2px, -2px)'
          }}
        >
          <div 
            className="w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: cursor.user.color }}
          />
          <div 
            className="mt-1 px-2 py-1 text-xs text-white rounded shadow-lg whitespace-nowrap"
            style={{ backgroundColor: cursor.user.color }}
          >
            {cursor.user.name}
          </div>
        </div>
      ))}
    </>
  );
};
```

### 3. Synchronized Content Editing

#### Operational Transformation

Implement conflict-free collaborative editing:

```typescript
// Content change operations
interface Operation {
  type: 'insert' | 'delete' | 'retain';
  position: number;
  content?: string;
  length?: number;
  timestamp: number;
  userId: string;
}

// Send content change
const sendContentChange = (operation: Operation) => {
  socket.emit('content-change', {
    projectId: currentProject.id,
    branchId: currentBranch.id,
    operation: {
      ...operation,
      timestamp: Date.now(),
      userId: currentUser.id
    }
  });
};

// Receive and apply content changes
socket.on('content-change', (data) => {
  const { operation, userId } = data;
  
  // Don't apply own operations
  if (userId === currentUser.id) return;
  
  // Transform operation against pending operations
  const transformedOp = transformOperation(operation, pendingOperations);
  
  // Apply operation to content
  applyOperation(transformedOp);
  
  // Update UI to show change attribution
  highlightChange(transformedOp, getUserColor(userId));
});
```

#### Content Synchronization

```typescript
// Sync content state
const syncContent = () => {
  socket.emit('content-sync-request', {
    projectId: currentProject.id,
    branchId: currentBranch.id,
    lastSyncTimestamp: lastSyncTime
  });
};

socket.on('content-sync-response', (data) => {
  const { content, operations, timestamp } = data;
  
  // Apply missed operations
  operations.forEach(op => applyOperation(op));
  
  // Update sync timestamp
  lastSyncTime = timestamp;
});
```

### 4. Live Comments and Annotations

#### Comment System

Real-time commenting on research content:

```typescript
// Add comment
const addComment = (comment) => {
  socket.emit('comment-add', {
    projectId: currentProject.id,
    branchId: currentBranch.id,
    comment: {
      id: generateId(),
      content: comment.content,
      position: comment.position,
      elementId: comment.elementId,
      timestamp: Date.now(),
      userId: currentUser.id
    }
  });
};

// Receive new comments
socket.on('comment-add', (data) => {
  const { comment, user } = data;
  
  addCommentToUI({
    ...comment,
    user: {
      name: user.name,
      avatar: user.avatar
    }
  });
});

// Update comment
socket.on('comment-update', (data) => {
  const { commentId, content, user } = data;
  updateCommentInUI(commentId, content, user);
});

// Delete comment
socket.on('comment-delete', (data) => {
  const { commentId } = data;
  removeCommentFromUI(commentId);
});
```

### 5. Project Activity Feed

#### Activity Tracking

Real-time activity notifications:

```typescript
// Activity types
type ActivityType = 
  | 'project-created'
  | 'branch-created'
  | 'content-updated'
  | 'comment-added'
  | 'collaborator-added'
  | 'experiment-completed';

// Receive activity updates
socket.on('project-activity', (data) => {
  const { activity, user } = data;
  
  addActivityToFeed({
    id: activity.id,
    type: activity.type,
    message: activity.message,
    timestamp: activity.timestamp,
    user: {
      name: user.name,
      avatar: user.avatar
    },
    metadata: activity.metadata
  });
});
```

## React Hooks for Real-time Features

### useRealtimeCollaboration

```typescript
const useRealtimeCollaboration = (projectId: string, branchId: string) => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [cursors, setCursors] = useState<Record<string, CursorData>>({});
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Join project room
    socket.emit('project-join', { projectId, branchId });
    
    // Set up event listeners
    socket.on('user-presence', handlePresenceUpdate);
    socket.on('cursor-update', handleCursorUpdate);
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    return () => {
      socket.emit('project-leave', { projectId });
      socket.off('user-presence', handlePresenceUpdate);
      socket.off('cursor-update', handleCursorUpdate);
    };
  }, [projectId, branchId]);
  
  const updateCursor = useCallback((position, selection) => {
    socket.emit('cursor-update', {
      projectId,
      branchId,
      cursor: { position, selection, timestamp: Date.now() }
    });
  }, [projectId, branchId]);
  
  return {
    activeUsers,
    cursors,
    isConnected,
    updateCursor
  };
};
```

### useRealtimeContent

```typescript
const useRealtimeContent = (projectId: string, branchId: string) => {
  const [content, setContent] = useState('');
  const [pendingOperations, setPendingOperations] = useState<Operation[]>([]);
  
  useEffect(() => {
    socket.on('content-change', handleContentChange);
    socket.on('content-sync-response', handleContentSync);
    
    return () => {
      socket.off('content-change', handleContentChange);
      socket.off('content-sync-response', handleContentSync);
    };
  }, []);
  
  const updateContent = useCallback((operation: Operation) => {
    // Apply operation locally
    const newContent = applyOperation(content, operation);
    setContent(newContent);
    
    // Send to server
    socket.emit('content-change', {
      projectId,
      branchId,
      operation
    });
  }, [content, projectId, branchId]);
  
  return {
    content,
    updateContent,
    pendingOperations
  };
};
```

## Error Handling and Reconnection

### Connection Management

```typescript
// Handle connection errors
socket.on('connect_error', (error) => {
  console.error('Connection failed:', error);
  showNotification('Connection lost. Attempting to reconnect...', 'warning');
});

// Handle reconnection
socket.on('reconnect', (attemptNumber) => {
  console.log('Reconnected after', attemptNumber, 'attempts');
  showNotification('Connection restored', 'success');
  
  // Rejoin project rooms
  if (currentProject) {
    socket.emit('project-join', {
      projectId: currentProject.id,
      branchId: currentBranch.id
    });
  }
});

// Handle disconnection
socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
  showNotification('Connection lost', 'error');
  
  // Clear real-time state
  setActiveUsers([]);
  setCursors({});
});
```

### Conflict Resolution

```typescript
// Transform operations for conflict resolution
const transformOperation = (op1: Operation, op2: Operation): Operation => {
  if (op1.timestamp < op2.timestamp) {
    // op1 happened first, transform op2
    if (op1.type === 'insert' && op2.position >= op1.position) {
      return {
        ...op2,
        position: op2.position + (op1.content?.length || 0)
      };
    }
    if (op1.type === 'delete' && op2.position >= op1.position) {
      return {
        ...op2,
        position: Math.max(op1.position, op2.position - (op1.length || 0))
      };
    }
  }
  
  return op2;
};
```

## Performance Optimization

### Throttling and Debouncing

```typescript
// Throttle cursor updates
const throttledCursorUpdate = throttle((position, selection) => {
  socket.emit('cursor-update', {
    projectId: currentProject.id,
    branchId: currentBranch.id,
    cursor: { position, selection, timestamp: Date.now() }
  });
}, 100); // Update at most every 100ms

// Debounce content changes
const debouncedContentSync = debounce(() => {
  socket.emit('content-sync-request', {
    projectId: currentProject.id,
    branchId: currentBranch.id,
    lastSyncTimestamp: lastSyncTime
  });
}, 1000); // Sync after 1 second of inactivity
```

### Memory Management

```typescript
// Clean up old cursor data
const cleanupOldCursors = () => {
  const now = Date.now();
  const maxAge = 30000; // 30 seconds
  
  setCursors(prev => {
    const cleaned = { ...prev };
    Object.keys(cleaned).forEach(userId => {
      if (now - cleaned[userId].timestamp > maxAge) {
        delete cleaned[userId];
      }
    });
    return cleaned;
  });
};

// Run cleanup periodically
useEffect(() => {
  const interval = setInterval(cleanupOldCursors, 10000);
  return () => clearInterval(interval);
}, []);
```

## Security Considerations

### Authentication

```typescript
// Verify user permissions before joining rooms
socket.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const user = await verifyToken(token);
    socket.userId = user.id;
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication failed'));
  }
});

// Check project access permissions
socket.on('project-join', async (data) => {
  const { projectId } = data;
  const hasAccess = await checkProjectAccess(socket.userId, projectId);
  
  if (!hasAccess) {
    socket.emit('error', { message: 'Access denied' });
    return;
  }
  
  socket.join(`project:${projectId}`);
  // ... rest of join logic
});
```

### Rate Limiting

```typescript
// Rate limit real-time events
const rateLimiter = new Map();

const checkRateLimit = (userId: string, eventType: string) => {
  const key = `${userId}:${eventType}`;
  const now = Date.now();
  const limit = getRateLimit(eventType);
  
  if (!rateLimiter.has(key)) {
    rateLimiter.set(key, { count: 1, resetTime: now + 60000 });
    return true;
  }
  
  const data = rateLimiter.get(key);
  if (now > data.resetTime) {
    data.count = 1;
    data.resetTime = now + 60000;
    return true;
  }
  
  if (data.count >= limit) {
    return false;
  }
  
  data.count++;
  return true;
};
```

This real-time collaboration system provides a robust foundation for seamless multi-user research collaboration with live updates, conflict resolution, and comprehensive user presence tracking.
