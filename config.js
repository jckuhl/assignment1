const environments = {
    staging: {
        port: 1234,
        envName: 'staging'
    },
    production: {
        port: 5000,
        envName: 'production'
    }
};

let node_env = process.env.NODE_ENV;
let currentEnvironment;

if(typeof node_env === 'string') {
    node_env = node_env.toLowerCase();
    if(Object.keys(environments).includes(node_env)) {
        currentEnvironment = environments[node_env];
    } else {
        throw new Error('invalid environment');
    }
} else {
    currentEnvironment = environments.staging;
}

module.exports = currentEnvironment