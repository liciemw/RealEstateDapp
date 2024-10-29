module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 8545,        // Default Ganache port
      network_id: "1337",   // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.4.18", // Specify the Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};

