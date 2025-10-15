# VPS Deployment Guide for Expo Calendar App

This guide will help you deploy your Expo calendar app to a Linux VPS so you can access it from your iPhone via Expo Go 24/7.

## Prerequisites

- Linux VPS (Ubuntu/Debian recommended)
- SSH access to your VPS
- Git repository for your project (optional but recommended)

## 1. Install Required Software on VPS

### Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js (Latest LTS)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Install Git

```bash
sudo apt install git -y
```

### Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

## 2. Upload Your Project

### Option A: Using Git (Recommended)

```bash
# Clone your project
git clone https://github.com/yourusername/Calander_App.git
cd Calander_App

# Install dependencies
npm install
```

### Option B: Using SCP/SFTP

```bash
# From your local machine, upload the project
scp -r Calander_App/ user@your-vps-ip:/home/user/
```

## 3. Configure Firewall

Allow necessary ports:

```bash
# Allow SSH
sudo ufw allow 22

# Allow Expo development server
sudo ufw allow 8081

# Enable firewall
sudo ufw enable
```

## 4. Start the Expo Server

### For Testing (Manual Start)

```bash
cd Calander_App
npx expo start --tunnel
```

### For Production (Using PM2)

```bash
cd Calander_App

# Start with PM2
pm2 start "npx expo start --tunnel" --name "calander-app"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

## 5. Connect from iPhone

1. **Install Expo Go** from the App Store on your iPhone

2. **Get the connection URL** from your VPS terminal:

   ```
   › Metro waiting on exp://your-tunnel-url
   › Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
   ```

3. **Scan the QR code** with your iPhone camera or Expo Go app

4. **Your app should load** on your iPhone!

## 6. Managing Your App

### View PM2 Status

```bash
pm2 status
pm2 logs calander-app
```

### Restart App

```bash
pm2 restart calander-app
```

### Stop App

```bash
pm2 stop calander-app
```

### Update App Code

```bash
# Pull latest changes (if using Git)
git pull origin main

# Restart the app
pm2 restart calander-app
```

## 7. Troubleshooting

### Check if Expo Server is Running

```bash
pm2 status
netstat -tlnp | grep :8081
```

### View Logs

```bash
pm2 logs calander-app --lines 50
```

### Restart Everything

```bash
pm2 restart all
```

### Check VPS Resources

```bash
# CPU and Memory usage
htop

# Disk space
df -h
```

## 8. Security Considerations

- **Keep VPS updated**: `sudo apt update && sudo apt upgrade`
- **Use SSH keys** instead of passwords
- **Configure fail2ban** for SSH protection
- **Regular backups** of your code and data

## 9. Cost Comparison

- **VPS Hosting**: $5-20/month
- **Apple Developer Program**: $99/year
- **Savings**: Significant for personal projects!

## 10. Next Steps

Once your Hello World app is working on the VPS:

1. Build out your calendar functionality
2. Add features like event creation, editing, deletion
3. Implement data persistence (database or local storage)
4. Add authentication if needed
5. Optimize for mobile performance

## Support

If you encounter issues:

- Check PM2 logs: `pm2 logs calander-app`
- Verify Node.js version: `node --version`
- Ensure all dependencies are installed: `npm install`
- Check firewall settings: `sudo ufw status`
