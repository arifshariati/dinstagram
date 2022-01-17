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

        it('lists images',async () => {

            const image = await dinstagram.images(imageCount);
            assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(image.hash, hash, 'Hash is correct');
            assert.equal(image.description, 'Image Description', 'Description is correct');
            assert.equal(image.tipAmount, '0', 'Tip Amount is correct');
            assert.equal(image.author, author, 'Author is correct');

        });
    });
})