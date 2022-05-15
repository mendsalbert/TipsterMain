const Tipster = artifacts.require('./Tipster.sol')
const senderContract = artifacts.require('Sender.sol')
const receiverContract = artifacts.require('Receiver.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Tipster', ([deployer, author, tipper, accounts]) => {
  let tipster
  let amount
  const acc1 = accounts[0]
  const acc2 = accounts[1]

  it('Should get the amount required for sending', async () => {
    const { contract: { methods }}= await senderContract.deployed()
    amount = await methods.amount().call()
  })

  it(`Should send the amount to a the receiver contract`, async () => {
    const { contract: { methods }} = await senderContract.deployed()
    const { address } = await receiverContract.deployed()
    const recBalanceBefore = await web3.eth.getBalance(address)
    await methods.send(address).send({from: acc1, value: amount})
    const recBalanceAfter = await web3.eth.getBalance(address)
    assert.isTrue(parseInt(recBalanceAfter) - parseInt(recBalanceBefore) === amount)
  })

  it(`Should send the amount to another address`, async () => {
    const { contract: { methods }} = await senderContract.deployed()
    const acc2BalanceBefore = await web3.eth.getBalance(acc2)
    await methods.send(acc2).send({from: acc1, value: amount})
    const acc2BalanceAfter = await web3.eth.getBalance(acc2)
    assert.isTrue(parseInt(acc2BalanceAfter) - parseInt(acc2BalanceBefore) === amount)
  })


  it(`Should fail to send the amount if < required amount`, async () => {
    const { contract: { methods }} = await senderContract.deployed()
    const { address } = await receiverContract.deployed()
    try {
      await methods.send(address).send({from: acc1, value: amount})
      assert.fail('Should have failed!')
    } catch (_) {}
  })

  before(async () => {
    tipster = await Tipster.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await tipster.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await tipster.name()
      assert.equal(name, 'Tipster')
    })
  })

  describe('images', async () => {
    let result, imageCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await tipster.uploadImage(hash, 'Image description', { from: author })
      imageCount = await tipster.imageCount()
    })

    //check event
    it('creates images', async () => {
      // SUCESS
      assert.equal(imageCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Image description', 'description is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')


      // FAILURE: Image must have hash
      await tipster.uploadImage('', 'Image description', { from: author }).should.be.rejected;

      // FAILURE: Image must have description
      await tipster.uploadImage('Image hash', '', { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists images', async () => {
      const image = await tipster.images(imageCount)
      assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(image.hash, hash, 'Hash is correct')
      assert.equal(image.description, 'Image description', 'description is correct')
      assert.equal(image.tipAmount, '0', 'tip amount is correct')
      assert.equal(image.author, author, 'author is correct')
    })


    it('allows users to tip images', async () => {
      // Track the author balance before purchase
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await tipster.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Image description', 'description is correct')
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
      await tipster.tipImageOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })
  })
})