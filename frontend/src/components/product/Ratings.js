import { Star } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import axios from "axios";
import { useState, useEffect } from "react";
export function Ratings({ product }) {
  const [reviews, setRatings] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const { ratingsData } = product;
  const [ratingsCount, setRatingsCount] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("Token");
  const handleSaveChanges = async () => {
    const ratingInput = document.getElementById("rating-input").value;
    const descriptionInput = document.getElementById("description-input").value;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/products/${product.productId}/rating`,
        {
          rating: ratingInput,
          comment: descriptionInput,
        },
        {
          headers: { Authorization: token },
        }
      );

      handleClose();
    } catch (error) {
      console.log(error);
    }
    fetchRatings();
  };

  //function to fetch the ratings associated with the product
  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}/products/${product.productId}/ratings`,
        {
          headers: { Authorization: token },
        }
      );

      setRatings(response.data);
      const count = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };
      response.data.forEach((review) => {
        count[Math.round(review.rating)] += 1;
      });
      setRatingsCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRatings();
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: token,
    };

    axios
      .get(
        process.env.REACT_APP_BACKEND_SERVER +
          "/account/getuserfirstandlastName",
        {
          headers: headers,
        }
      )
      .then((response) => {
        const output = response.data;

        if (output.responseStatus) {
          setFirstName(output.responseData.firstname);
          setLastName(output.responseData.lastname);
        }
      })
      .catch((response) => {
        console.log("response" + response);
      });
  }, []);

  return (
    <div>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" component="div" sx={{ mr: 1 }}>
                  Reviews & Ratings
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    className="button-black"
                    sx={{ mt: 3, width: "100%" }}
                    onClick={handleShow}
                  >
                    Add Rating
                  </Button>

                  <Modal open={show} onClose={handleClose}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Typography variant="h6" component="h2" gutterBottom>
                        Add Review
                      </Typography>
                      <Box component="form" sx={{ marginLeft: 0 }} noValidate>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Enter rating (1-5)"
                          type="number"
                          autoFocus
                          id="rating-input"
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Enter description"
                          multiline
                          rows={3}
                          id="description-input"
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleClose}
                          sx={{ mr: 1 }}
                          className="button"
                        >
                          Close
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleSaveChanges}
                          className="button-black"
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Star
                  color="#282c34"
                  sx={{ fontSize: 30, marginRight: "5px" }}
                />
                <Typography variant="h4" component="div" sx={{ mr: 1 }}>
                  {Math.round(product.averageRating)}
                </Typography>
              </div>
              <Typography variant="subtitle1" component="div">
                {product.totalRating} Ratings &
              </Typography>
              <Typography variant="subtitle1" component="div">
                {ratingsData && ratingsData[0]?.ratingDesc.ratings.length}{" "}
                {ratingsData && ratingsData[0]?.ratingDesc.ratings.length === 1
                  ? "Review"
                  : "Reviews"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="div">
                5 Stars
              </Typography>
              <LinearProgress
                variant="determinate"
                value={ratingsCount[5]}
                color="success"
                sx={{ mb: 1 }}
              />
              <Typography variant="subtitle1" component="div">
                4 Stars
              </Typography>
              <LinearProgress
                variant="determinate"
                value={ratingsCount[4]}
                color="success"
                sx={{ mb: 1 }}
              />
              <Typography variant="subtitle1" component="div">
                3 Stars
              </Typography>
              <LinearProgress
                variant="determinate"
                value={ratingsCount[3]}
                color="success"
                sx={{ mb: 1 }}
              />
              <Typography variant="subtitle1" component="div">
                2 Stars
              </Typography>
              <LinearProgress
                variant="determinate"
                value={ratingsCount[2]}
                color="warning"
                sx={{ mb: 1 }}
              />
              <Typography variant="subtitle1" component="div">
                1 Star
              </Typography>
              <LinearProgress
                variant="determinate"
                value={ratingsCount[1]}
                color="error"
                sx={{ mb: 1 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ width: "100%", marginTop: "1rem" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ mr: 1, marginBottom: "1rem" }}
          >
            Reviews
          </Typography>

          {reviews?.length > 0 &&
            reviews.map((review) => (
              <div key={review.id} style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "4px" }}>
                    {Math.round(review.rating)}
                  </Typography>
                  <Star color="#2b2d42" />
                </div>
                <Typography variant="body2" sx={{ marginBottom: "6px" }}>
                  {" "}
                  {review.comment}
                </Typography>
                <div style={{ display: "flex" }}>
                  <Typography variant="body2"></Typography>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
