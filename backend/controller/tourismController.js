const AsyncHandler = require("express-async-handler");
const { deleteOne } = require("../model/turestModal");
const Tour = require("../model/turestModal");



const getTours =AsyncHandler(async(req, res) => {
    const tours = await Tour.find()
  res.json(tours);
});



// post tours
const postTours = AsyncHandler(async (req, res) => {
  const { place, price } = req.body;
  if (!place || !price) {
    res.status(400);
    throw new Error("please enter all the fields");
  }
  const tour = await Tour.create({
    place,
    price,
  });
  res.json(tour);
});





const updateTours =AsyncHandler(async(req, res) => {
    const checkTour = await Tour.findById(req.params.id);
    if(!checkTour){
        res.status(404);
        throw new Error('not found')
    }
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updatedTour)
});
const deleteTours = AsyncHandler(async(req, res) => {
  const checkTour = await Tour.findById(req.params.id)
  if(!checkTour){
    res.status(404);
    throw new Error('Tour not found')
  }
  await Tour.deleteOne(checkTour);
  res.json({id:checkTour._id})
});

module.exports = {
  getTours,
  postTours,
  updateTours,
  deleteTours,
};
