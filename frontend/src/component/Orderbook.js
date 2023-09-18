import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import {connect} from 'react-redux'
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Orderbook({access11}) {
    const [order,setorder]=useState(null)
    useEffect(()=>{
        const headers = {
            'Authorization': `Bearer ${access11}`, 
            'Content-Type': 'application/json' 
        };
        axios.get(`http://127.0.0.1:8000/api/order/`,{headers:headers}).then((res)=>{
            console.log(res.data)
            if(res.status==200){
                setorder([...res.data])
            }
            else{
                alert(res.data.message)
            }
        }).catch((err)=>{
            alert(err)
        })
    },[access11])
  return (
    <>
    {order?
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">order_id</TableCell>
            <TableCell align="right">user Name&nbsp;</TableCell>
            <TableCell align="right">book_name&nbsp;</TableCell>
            <TableCell align="right">book_category&nbsp;</TableCell>
            <TableCell align="right">created_at&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell align="right" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.user_id.name}</TableCell>
              <TableCell align="right">{row.book_id.book_name}</TableCell>
              <TableCell align="right">{row.book_id.category}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    :
    <h3>you not order any book</h3>}
    </>
  );
}
const mapStateToProps=(state)=>{
    if(state.token){
      return{
        access11:state.token.access
      }
    }
}

export default connect(mapStateToProps)(Orderbook)
