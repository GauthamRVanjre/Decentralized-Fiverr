// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DecentraFiverrEscrow is Ownable, ReentrancyGuard {
    AggregatorV3Interface public priceFeed;
    uint256 public jobCount;

    struct Job {
        address payable poster;
        address payable worker;
        uint256 amount;
        string metadataCID; // Pinata CID
        string submissionCID; // deliverable CID
        bool isFunded;
        bool isCompleted;
    }

    mapping(uint256 => Job) public jobs;

    event JobCreated(uint256 indexed jobId, address indexed poster, string cid);
    event WorkSubmitted(uint256 indexed jobId, string submissionCID);
    event FundsReleased(uint256 indexed jobId, address indexed worker);

    constructor() Ownable(msg.sender) {
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    }

    function getLatestPrice() public view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        // Chainlink price = 8 decimals, scale to 18
        return uint256(answer * 1e10);
        // return uint256(answer);
    }

    // Converts USD (18 decimals) → ETH (in wei)
    function convertUsdToEth(uint256 usdAmount) public view returns (uint256) {
        uint256 ethPrice = getLatestPrice(); // ETH price in USD (18 decimals)

        // USD (1e18) ÷ ETH Price (1e18) = ETH (1e18)
        uint256 ethAmount = (usdAmount * 1e18) / ethPrice;

        return ethAmount; // in wei (18 decimals)
    }

    // Create a new job
    function createJob(string calldata cid) external payable nonReentrant returns (uint256) {
        require(msg.value >= 0, "Insufficient ETH sent");

        jobCount++;
        jobs[jobCount] = Job({
            poster: payable(msg.sender),
            worker: payable(address(0)),
            amount: msg.value,
            metadataCID: cid,
            submissionCID: "",
            isFunded: true,
            isCompleted: false
        });
        emit JobCreated(jobCount, msg.sender, cid);
        return jobCount;
    }


    // Worker submits deliverable
    function submitWork(uint256 jobId, string calldata submissionCID) external {
        Job storage j = jobs[jobId];
        require(j.isFunded, "Job not funded");
        require(j.worker == address(0), "Already submitted");
        j.worker = payable(msg.sender);
        j.submissionCID = submissionCID;
        emit WorkSubmitted(jobId, submissionCID);
    }

    // Poster releases funds
    function releaseFunds(uint256 jobId) external nonReentrant {
        Job storage j = jobs[jobId];
        require(msg.sender == j.poster, "Only poster");
        require(j.isFunded && !j.isCompleted, "Invalid state");
        require(j.worker != address(0), "No worker");
        j.isCompleted = true;
        (bool ok, ) = j.worker.call{value: j.amount}("");
        require(ok, "Transfer failed");
        emit FundsReleased(jobId, j.worker);
    }

    receive() external payable {}
}
