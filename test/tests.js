const expect = chai.expect



describe('addFaveToLocalStorage', function() {

  it('addFaveToLocalStorage should take an id and title, and push it into local storage', function() {
    localStorage.clear()
    addFaveToLocalStorage(345, 'My Awesome SHMUP')
    let favorites = JSON.parse(localStorage.getItem("favorites") || '[]')
    let expectedFaves = [{
      "id": 345,
      "title": 'My Awesome SHMUP'
    }]

    console.log(favorites);
    console.log(expectedFaves);

    expect(favorites).to.deep.equal(expectedFaves)
  })
  describe('onAPISuccess', function () {

    it('onAPISuccess results should have a greater length than 0 ', function (){
      console.log("meh");
      expect(onAPISuccess(results)).to.have.lengthOf.at.least(1)
    })


  })

})
