import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Home from "./components/Home";

// ABIs
import RealEstate from "./abis/RealEstate.json";
import Escrow from "./abis/Escrow.json";

// Config
import config from "./config.json";

function App() {
    const [escrow, setEscrow] = useState(null);
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [homes, setHomes] = useState([]);

    const loadBlockchainData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const network = await provider.getNetwork();

        const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider);
        console.log("realEstate:", realEstate);
        const totalSupply = await realEstate.totalSupply();

        // const homes = [];

        // for (var i = 1; i <= totalSupply; i++) {
        //     const uri = await realEstate.tokenURI(i);
        //     const response = await fetch(uri);
        //     const metadata = await response.json();
        //     homes.push(metadata);
        // }
        // setHomes(homes);

        // console.log("home:", homes);

        // const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider);
        // setEscrow(escrow);

        // window.ethereum.on("accountsChanged", async () => {
        //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        //     const account = ethers.utils.getAddress(accounts[0]);
        //     setAccount(account);
        // });
    };

    useEffect(() => {
        loadBlockchainData();
    }, []);

    return (
        <div>
            <Navigation account={account} setAccount={setAccount} />
            <Search />
            <div className="cards__section">
                <h3>Homes for you</h3>
                <hr />
                <div className="cards">
                    <div className="card">
                        <div className="card__image">
                            <img src="" alt="Home" />
                        </div>
                        <div className="card__info">
                            <h4>1ETH</h4>
                            <p>
                                <strong>1</strong>
                                <strong>2</strong>
                                <strong>3</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
