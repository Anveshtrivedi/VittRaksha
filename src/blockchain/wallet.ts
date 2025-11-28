import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum?: any;
    }
}

// IMPORTANT: Replace this with the real token address
export const SFT_TOKEN_ADDRESS = "0xeCe93A27254d238200824b9D5e1E532133772C20";

// Minimal ERC20 ABI
const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function decimals() view returns (uint8)"
];

let provider: ethers.BrowserProvider | null = null;
let signer: ethers.Signer | null = null;
let contract: ethers.Contract | null = null;

export async function connectWallet(): Promise<string> {
    try {
        if (typeof window === "undefined" || !window.ethereum) {
            throw new Error("MetaMask not detected");
        }

        provider = new ethers.BrowserProvider(window.ethereum);

        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        const addr = await signer.getAddress();

        if (SFT_TOKEN_ADDRESS !== "YOUR_POLYGON_AMOY_TOKEN_ADDRESS") {
            contract = new ethers.Contract(SFT_TOKEN_ADDRESS, ERC20_ABI, signer);
        }

        return addr;
    } catch (err) {
        console.error("connectWallet error:", err);
        throw err;
    }
}

export async function getSFTBalance(address: string): Promise<string> {
    try {
        if (!contract) return "0.00";

        const raw = await contract.balanceOf(address);
        return Number(ethers.formatUnits(raw, 18)).toFixed(2);
    } catch (err) {
        console.error("getSFTBalance error:", err);
        return "0.00";
    }
}

export async function getMaticBalance(address: string): Promise<string> {
    try {
        if (!provider) {
            provider = new ethers.BrowserProvider(window.ethereum);
        }

        const raw = await provider.getBalance(address);
        return Number(ethers.formatEther(raw)).toFixed(4);
    } catch (err) {
        console.error("getMaticBalance error:", err);
        return "0.00";
    }
}

export async function sendSFT(to: string, amount: string): Promise<string> {
    if (!signer || !contract) {
        throw new Error("Wallet not connected");
    }

    const value = ethers.parseUnits(amount, 18);
    const tx = await contract.transfer(to, value);
    const receipt = await tx.wait();

    return receipt.hash;
}
