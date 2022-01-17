// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Dinstagram {
    string public name = "Dinstagram";

    // Store Images
    uint256 public imageCount = 0;
    mapping(uint256 => Image) public images;

    struct Image {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address payable author;
    }

    event ImageCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    //  Create Images
    function uploadImage(string memory _imgHash, string memory _description)
        public
    {

        // Make sure image hash exists
        require(bytes(_imgHash).length > 0);

        // Make sure image description exists
        require(bytes(_description).length > 0);

        // Make sure uploader address exists
        require(msg.sender != address(0x0));

        // Increment image count
        imageCount++;

        // Add Image to contract
        images[imageCount] = Image(
            imageCount,
            _imgHash,
            _description,
            0,
            payable(msg.sender)
        );

        // Trigger an event
        emit ImageCreated(
            imageCount,
            _imgHash,
            _description,
            0,
            payable(msg.sender)
        );
    }

    //  Tip Images
}
