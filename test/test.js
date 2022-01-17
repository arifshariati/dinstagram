const Dinstagram = artifacts.require('./Dinstagram');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Dinstagram', ([deployer, author, tipper]) => {

    let dinstagram;

    before(async () => {
        dinstagram = await Dinstagram.deployed();
    });

    describe('deployment', async () => {

        it('depploys successfully', async () => {

            const address = await dinstagram.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);

        });

        it('has a name', async () => {

            const name = await dinstagram.name();
            assert.equal(name, 'Dinstagram');
        });

    });

    describe('images', async () => {

        let result, imageCount;

        const hash = 'abc123';

        before(async () => {
            result = await dinstagram.uploadImage(hash, 'Image Description', { from: author });
            imageCount = await dinstagram.imageCount();
        });

        it('creates images', async () => {

            // Success
            assert.equal(imageCount, 1);

            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(event.hash, hash, 'Hash is correct');
            assert.equal(event.description, 'Image Description', 'Description is correct');
            assert.equal(event.tipAmount, '0', 'Tip Amount is correct');
            assert.equal(event.author, author, 'Author is correct');

            // Failure 

            // 1. Image must have hash 
            await dinstagram.uploadImage('', 'Image Description', { from: author }).should.be.rejected;

            // 2. Image must have description
            await dinstagram.uploadImage('abc123', '', { from: author }).should.be.rejected;

        });

        it('lists images', async () => {

            const image = await dinstagram.images(imageCount);
            assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(image.hash, hash, 'Hash is correct');
            assert.equal(image.description, 'Image Description', 'Description is correct');
            assert.equal(image.tipAmount, '0', 'Tip Amount is correct');
            assert.equal(image.author, author, 'Author is correct');

        });
    });

    describe('tip author', async () => {

        const hash = 'abc123';

        before(async () => {
            result = await dinstagram.uploadImage(hash, 'Image Description', { from: author });
            imageCount = await dinstagram.imageCount();
        });

        it('allows users to tip images', async () => {

            // Track the author balance before purchase
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await dinstagram.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
            assert.equal(event.hash, hash, 'Hash is correct')
            assert.equal(event.description, 'Image Description', 'description is correct')
            assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')

            // Check that author received funds
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipImageOwner
            tipImageOwner = web3.utils.toWei('1', 'Ether')
            tipImageOwner = new web3.utils.BN(tipImageOwner)

            const expectedBalance = oldAuthorBalance.add(tipImageOwner)

            assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

            // FAILURE: Tries to tip a image that does not exist
            await dinstagram.tipImageOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;

        });
    });
})