# Railway Backend Deployment Guide

## 🚀 Complete Railway Deployment Setup for NeuraForge OS API

### **Prerequisites**
- Railway CLI installed: `npm install -g @railway/cli`
- Railway account created at [railway.app](https://railway.app)
- Git repository access to NeuraForge project

---

## **Step 1: Railway CLI Setup**

```bash
# Install Railway CLI globally
npm install -g @railway/cli

# Login to Railway
railway login

# Verify login
railway whoami
```

---

## **Step 2: Deploy API to Railway**

### **2.1 Navigate to API Directory**
```bash
cd apps/api
```

### **2.2 Initialize Railway Project**
```bash
# Initialize new Railway project
railway init

# Follow prompts:
# - Project name: "neuraforge-api"
# - Environment: "production"
```

### **2.3 Configure Environment Variables**
```bash
# Set production environment variables
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set HOST=0.0.0.0

# Set CORS origins (replace with your actual Vercel domain)
railway variables set CORS_ORIGINS="https://neuraforge.vercel.app,https://neuraforge-os.vercel.app"

# Set Clerk secret key (replace with your actual key)
railway variables set CLERK_SECRET_KEY="sk_live_your_production_key_here"

# Set JWT secret (generate a secure random string)
railway variables set JWT_SECRET="your_secure_jwt_secret_here"

# Optional: Set database URL if using external database
railway variables set DATABASE_URL="postgresql://username:password@host:port/database"
```

### **2.4 Deploy to Railway**
```bash
# Deploy the API
railway up

# Monitor deployment
railway logs
```

---

## **Step 3: Update Frontend Configuration**

### **3.1 Get Railway API URL**
```bash
# Get your Railway deployment URL
railway domain
```

### **3.2 Update Frontend Environment Variables**

Update `apps/web/.env.local`:
```env
# Replace with your actual Railway URL
NEXT_PUBLIC_API_URL="https://neuraforge-api-production.up.railway.app"
NEXT_PUBLIC_WS_URL="wss://neuraforge-api-production.up.railway.app"
```

Update `apps/web/.env.production`:
```env
# Production environment variables
NEXT_PUBLIC_API_URL="https://neuraforge-api-production.up.railway.app"
NEXT_PUBLIC_WS_URL="wss://neuraforge-api-production.up.railway.app"

# Clerk production keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_your_production_key_here"
CLERK_SECRET_KEY="sk_live_your_production_key_here"

# Supabase production keys
NEXT_PUBLIC_SUPABASE_URL="https://juyebmhkqjjnttvelvpp.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_production_supabase_key_here"
```

---

## **Step 4: Vercel Frontend Deployment**

### **4.1 Deploy to Vercel**
```bash
# From project root
cd ../..
vercel --prod

# Or using Vercel dashboard:
# 1. Connect GitHub repository
# 2. Set build command: "cd apps/web && bun run build"
# 3. Set output directory: "apps/web/.next"
# 4. Add environment variables from .env.production
```

### **4.2 Configure Vercel Environment Variables**
In Vercel dashboard, add these environment variables:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_WS_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## **Step 5: Test Deployment**

### **5.1 API Health Check**
```bash
# Test Railway API health
curl https://your-railway-url.up.railway.app/health

# Expected response:
# {"status":"ok","timestamp":"2024-01-01T00:00:00.000Z"}
```

### **5.2 Frontend-Backend Connection**
1. Visit your Vercel deployment URL
2. Test authentication flow: Sign in → Dashboard
3. Verify API calls work in browser developer tools
4. Test WebSocket connections for real-time features

---

## **Step 6: Production Monitoring**

### **6.1 Railway Monitoring**
```bash
# View logs
railway logs --tail

# Monitor metrics
railway status

# View deployments
railway deployments
```

### **6.2 Set Up Alerts**
- Configure Railway alerts for downtime
- Set up Vercel monitoring for frontend
- Monitor API response times and error rates

---

## **Environment Variables Reference**

### **Railway (Backend) Variables:**
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
CORS_ORIGINS=https://neuraforge.vercel.app,https://neuraforge-os.vercel.app
CLERK_SECRET_KEY=sk_live_...
JWT_SECRET=your_secure_secret
DATABASE_URL=postgresql://... (optional)
```

### **Vercel (Frontend) Variables:**
```env
NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app
NEXT_PUBLIC_WS_URL=wss://your-railway-url.up.railway.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SUPABASE_URL=https://juyebmhkqjjnttvelvpp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## **Troubleshooting**

### **Common Issues:**

1. **CORS Errors:**
   - Verify CORS_ORIGINS includes your Vercel domain
   - Check Railway logs for CORS-related errors

2. **API Connection Failed:**
   - Verify Railway deployment is running: `railway status`
   - Check API URL in frontend environment variables
   - Test API health endpoint directly

3. **WebSocket Connection Issues:**
   - Ensure WSS protocol for production
   - Verify Railway supports WebSocket connections
   - Check browser developer tools for WebSocket errors

4. **Authentication Issues:**
   - Verify Clerk production keys are set correctly
   - Check Clerk dashboard for domain configuration
   - Ensure JWT_SECRET is set in Railway

### **Useful Commands:**
```bash
# Railway commands
railway logs --tail          # View live logs
railway shell               # Access Railway shell
railway variables           # List environment variables
railway deployments         # View deployment history
railway restart             # Restart service

# Local testing
bun run dev                 # Test locally
bun run build               # Test build process
bun run start               # Test production build
```

---

## **Success Verification Checklist**

- [ ] Railway API deployed and accessible
- [ ] Health check endpoint returns 200 OK
- [ ] Vercel frontend deployed successfully
- [ ] Authentication flow works end-to-end
- [ ] API calls from frontend to Railway backend work
- [ ] WebSocket connections established successfully
- [ ] All environment variables configured correctly
- [ ] CORS configured for production domains
- [ ] Monitoring and logging set up

Your NeuraForge OS platform is now fully deployed with Railway backend and Vercel frontend! 🎉
