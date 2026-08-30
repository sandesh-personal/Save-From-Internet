// PM2 process definitions for the Contabo VPS.
// Deploy:  pm2 start ecosystem.config.js
// Reload:  pm2 reload ecosystem.config.js --update-env
module.exports = {
  apps: [
    {
      name: 'savefrominternet-web',
      cwd: __dirname,
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        YTDLP_SERVICE_URL: 'http://127.0.0.1:5000',
      },
    },
    {
      name: 'savefrominternet-ytdlp',
      cwd: __dirname + '/server',
      script: 'ytdlp_server.py',
      interpreter: 'python3',
      env: {
        HOST: '127.0.0.1',
        PORT: '5000',
      },
    },
  ],
}
