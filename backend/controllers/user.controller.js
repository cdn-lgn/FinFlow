export async function userRegistration (req,res){
  console.log("User Registration Request");
  console.log("Request Body : ", req.file);
  res.status(200).json({
    success: true,
    message: "User Registration Successful",
  });
}
