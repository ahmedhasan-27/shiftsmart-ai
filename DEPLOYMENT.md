# ShiftSmart AI - Deployment Guide

## Development Deployment

### Frontend
```bash
npm install
npm run dev
# Access at http://localhost:5173
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python scripts/init_db.py
uvicorn app.main:app --reload
# API at http://localhost:8000
```

## Docker Deployment

### Backend Only
```bash
cd backend
docker-compose up -d
```

This starts:
- API server on port 8000
- PostgreSQL on port 5432
- Redis on port 6379

## Production Deployment (AWS)

### React app → AWS App Runner (recommended, free tier friendly)

To deploy **only the React frontend** to AWS App Runner (GitHub → automatic deployments, free tier):

1. Follow **[APP_RUNNER_DEPLOY.md](./APP_RUNNER_DEPLOY.md)** for:
   - Pushing this repo to GitHub
   - Creating an App Runner service from that repo
   - Using free tier settings and getting the **live public URL**

No Docker or ECS required for the React app when using App Runner.

---

### Other AWS options (backend / full stack)

#### Prerequisites
- AWS Account
- AWS CLI configured
- Docker installed

### Step 1: Build Docker Images

```bash
# Backend
cd backend
docker build -t shiftsmart-api:latest .
```

### Step 2: Deploy to AWS ECS

1. Push image to ECR:
```bash
aws ecr create-repository --repository-name shiftsmart-api
docker tag shiftsmart-api:latest <account>.dkr.ecr.<region>.amazonaws.com/shiftsmart-api:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/shiftsmart-api:latest
```

2. Create ECS Task Definition
3. Create ECS Service
4. Configure Load Balancer

### Step 3: Database Setup

1. Create RDS PostgreSQL instance
2. Update DATABASE_URL in environment variables
3. Run migrations:
```bash
python scripts/init_db.py
```

### Step 4: Frontend Deployment

1. Build frontend:
```bash
npm run build
```

2. Deploy to S3 + CloudFront:
```bash
aws s3 sync dist/ s3://shiftsmart-frontend
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

### Step 5: Environment Variables

Set in ECS Task Definition or Parameter Store:
- `DATABASE_URL`
- `SECRET_KEY`
- `REDIS_URL`
- `AWS_REGION`

## Monitoring

### CloudWatch
- API logs
- Error tracking
- Performance metrics

### Health Checks
- `/health` endpoint
- Database connectivity
- Redis connectivity

## Scaling

### Horizontal Scaling
- ECS Auto Scaling Groups
- Load Balancer configuration
- Database read replicas

### Vertical Scaling
- Increase ECS task CPU/memory
- Upgrade RDS instance size

## Security Checklist

- [ ] HTTPS enabled (CloudFront/ALB)
- [ ] Secrets in AWS Secrets Manager
- [ ] Database encryption at rest
- [ ] VPC configuration
- [ ] Security groups configured
- [ ] IAM roles with least privilege
- [ ] WAF rules (optional)

## Backup Strategy

- RDS automated backups
- S3 versioning for static assets
- Database snapshots before major updates

## Rollback Procedure

1. Revert to previous ECS task definition
2. Restore database from snapshot if needed
3. Invalidate CloudFront cache
