module.exports = {
    apps: [
      {
        name: 'frontend-admin',
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 7001',
        instances: 1,
        exec_mode: 'cluster',
      },
    ],
  };