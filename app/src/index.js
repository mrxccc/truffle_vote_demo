import Web3 from "web3";
import votingArtfacts from "../../build/contracts/Voting.json";


const App = {
  web3: null,
  account: null,
  meta: null,
  candidates: { "Candidate": "candidate-1", "Alice": "candidate-2", "Cary": "candidate-3" },

  start: async function() {
    const {web3} = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = votingArtfacts.networks[networkId];
      this.meta = new web3.eth.Contract(
        votingArtfacts.abi,
        deployedNetwork.address,
      );
      console.log(this.meta)

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.refreshVotesList();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },


  vote: async function() {

    let candidateName = $("#candidate").val();
    try {
      this.meta.methods.vote(this.stringtoHex(candidateName)).send({from: this.account })
      .then(
        hash=>{
          this.totalVotesFor(candidateName).then(result => $("#" + this.candidates[candidateName]).html(result));
        }
      )
    } catch (err) {
        console.log(err)
     }
  },

  totalVotesFor: async function(message) {
    const count = await this.meta.methods.totalVotesFor(this.stringtoHex(message)).call()
    return count;
  },

  stringtoHex: function (str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return "0x"+val
  },

  refreshVotesList: async function() {
    const candidateNames = Object.keys(this.candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];
      this.totalVotesFor(name).then(result => $("#" + this.candidates[name]).html(result));
    }
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
