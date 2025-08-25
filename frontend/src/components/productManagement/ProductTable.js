/* 
This component is used to fetch relevant details from backend for the products specific to sellers.
This component is reused during the update items as well.
*/
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductTable(props) {
  const navigate = useNavigate();
  const [editButton, setEditButton] = useState(false);
  const [sellerList, setsellerList] = useState([]);

  const sellerProducts = [];

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const headers = {
      Authorization: token,
    };
    axios
      .get(
        process.env.REACT_APP_BACKEND_SERVER +
          "/productmanagement/getsellerproducts",
        {
          headers: headers,
        }
      )
      .then((response) => {
        setsellerList(response["data"]);
      })
      .catch((response) => {
        console.log(`Error useEffect sellerProducts ${response}`);
      });
  }, []);

  function createData(productName, quantity, price, rating, id) {
    return { productName, quantity, price, rating, id };
  }

  const rows = [];

  for (let i = 0; i < sellerList.length; i++) {
    rows.push(
      createData(
        sellerList[i]["name"],
        sellerList[i]["quantity"],
        sellerList[i]["price"],
        sellerList[i]["rating"],
        sellerList[i]["_id"]
      )
    );
  }

  function handleEditItem(id) {
    console.log(`handle edit called for ${id}`);
    navigate("/updateitemform", {
      state: {
        productId: id,
      },
    });
  }

  return (
    <div id="product-table">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Product Name </b>
              </TableCell>
              <TableCell align="right">
                <b>Quantity</b>
              </TableCell>
              <TableCell align="right">
                <b>Price</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.productName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.rating}</TableCell>
                {props.showEditButton
                  ? false
                  : true && (
                      <TableCell
                        align="right"
                        onClick={() => handleEditItem(row.id)}
                      >
                        <EditSharpIcon />
                      </TableCell>
                    )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductTable;
