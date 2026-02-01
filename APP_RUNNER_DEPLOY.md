# Deploy React App to AWS App Runner (Free Tier)

This guide walks you through deploying the ShiftSmart AI React app to **AWS App Runner** with automatic deployments from GitHub and **free tier** settings.

---

## What’s Already Done in This Repo

- **`apprunner.yaml`** – App Runner build and run config (Node 22, `npm run build`, serve on port 8080).
- **`package.json`** – `serve` dependency and `start:prod` script for serving the built app.
- Build: `npm run build` (Vite). Run: `npx serve -s dist -l 8080`.

---

## 1. Create a New GitHub Repository (or Use Existing)

- **New repo:** [GitHub → New repository](https://github.com/new). Name it e.g. `shiftsmart-ai`. Do **not** add a README (you already have code). Create the repo.
- **Existing repo:** If you already published this project, use that repo and skip to step 2.

---

## 2. Initialize Git and Push All Code to GitHub

If this folder is not yet a Git repo or has no remote:

```bash
# If Git is not initialized
git init

# Add GitHub as remote (replace YOUR_USERNAME and YOUR_REPO with your GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Stage and commit everything
git add .
git commit -m "Add App Runner config and production serve script"

# Push (main or master)
git branch -M main
git push -u origin main
```

If you already have a remote and just need to push:

```bash
git add .
git commit -m "Add App Runner config and production serve script"
git push origin main
```

---

## 3. Set Up AWS App Runner and Connect GitHub

1. **Sign in to AWS**  
   [AWS Console](https://console.aws.amazon.com/) → sign in (create an account if needed).

2. **Open App Runner**  
   Search for **“App Runner”** in the AWS Console and open **App Runner**.

3. **Create a service**  
   Click **“Create service”**.

4. **Repository type**  
   Choose **“Source code repository”** → **“Connect to GitHub”** (or **“Add new”** if you haven’t connected GitHub yet).

5. **Connect GitHub**  
   - If first time: **“Add new”** → authorize AWS to access your GitHub (e.g. “Authorize AWS Connector for GitHub”).  
   - Then choose your **GitHub connection** (e.g. your account or org).  
   - **Repository:** select the repo you pushed in step 2.  
   - **Branch:** e.g. `main`.  
   - **Deployment trigger:** **Automatic** (so every push to this branch deploys).  
   - **Source directory:** leave blank (root is correct for this React app).

6. **Configure build**  
   - **Configuration source:** **Use a configuration file in the source code**.  
   - App Runner will use the **`apprunner.yaml`** in your repo (build: `npm install` + `npm run build`, run: `npx serve -s dist -l 8080`, port 8080).

7. **Configure service**  
   - **Service name:** e.g. `shiftsmart-ai`.  
   - **Virtual CPU:** **0.25 vCPU** (free tier friendly).  
   - **Virtual memory:** **0.5 GB** (free tier friendly).  
   - **Environment variables:** optional (add later if needed).  
   - **Security:** keep **“Allow public access”** if you want a public URL.

8. **Auto scaling (free tier friendly)**  
   - **Min size:** **1** (one instance).  
   - **Max size:** **1** (keeps cost minimal; you can increase later).

9. **Create**  
   Click **“Create & deploy”**. App Runner will clone the repo, build with `apprunner.yaml`, and deploy.

---

## 4. Automatic Deployments

- With **Deployment trigger: Automatic**, every push to the selected branch (e.g. `main`) triggers a new build and deployment.
- You can see deployment status and logs in the App Runner console under your service → **Deployments** / **Logs**.

---

## 5. Free Tier Settings Used

| Setting        | Value   | Note                    |
|----------------|---------|-------------------------|
| vCPU           | 0.25    | Free tier friendly      |
| Memory         | 0.5 GB  | Free tier friendly      |
| Min / Max size | 1 / 1   | One instance, low cost  |
| Public access  | Enabled | So you get a public URL  |

App Runner free tier (if available in your account/region) typically includes a monthly allowance of vCPU and memory; the above keeps usage low. Check [AWS App Runner pricing](https://aws.amazon.com/apprunner/pricing/) for current free tier details.

---

## 6. Get Your Live Public URL

1. In **App Runner** → your service (e.g. `shiftsmart-ai`).
2. Open the **“Default domain”** link in the service overview (e.g. `https://xxxxx.us-east-1.awsapprunner.com`).

That URL is your **live public URL**. Share it or use it in the browser; no extra steps needed for “deploy” beyond pushing to GitHub after the initial setup.

---

## Summary Checklist

- [ ] GitHub repo created or existing repo chosen  
- [ ] Git initialized (if needed), remote added, code pushed  
- [ ] App Runner → Create service → Source: GitHub, branch, **Automatic** trigger  
- [ ] Build: use config file → **apprunner.yaml** in repo  
- [ ] Service: 0.25 vCPU, 0.5 GB, min/max 1, public access  
- [ ] Create & deploy → copy **Default domain** URL as your live public URL  

If you want, the next step can be adding a custom domain (e.g. `app.yourdomain.com`) in App Runner and DNS.
