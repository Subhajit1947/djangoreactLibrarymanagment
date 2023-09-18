import * as React from 'react';
import { useEffect,useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {connect} from 'react-redux'
import { useParams } from 'react-router-dom';
import { Worker,Viewer} from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css';

function Book({access11}) {
    const [book,setbook]=useState(null)
    const {id}=useParams()
    useEffect(()=>{
        const headers = {
            'Authorization': `Bearer ${access11}`, 
            'Content-Type': 'application/json' 
        };
        
        axios.get(`http://127.0.0.1:8000/api/books/${id}`,{headers:headers}).then((res)=>{
            console.log(res.data)
            if(res.status==200){
                setbook({...res.data})
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
    {book?
    <div >
        
        
        {/* <div style={{margin:'2rem'}}>
        <Card sx={{ maxWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    id:{book.id}
                </Typography>
                <Typography variant="h5" component="div">
                {book.book_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {book.category}
                </Typography>
                <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                
                <Button variant='contained' size="small">order</Button>
            </CardActions>
        </Card>
        </div> */}
        
        <div style={{textAlign:'center'}}>
            <h1>{book.book_name}</h1>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={`http://127.0.0.1:8000${book.content}`} />
            </Worker>
        </div>
        
    </div>
    :
        <h3>no book avaliable</h3>
    }
    </>
  )
}
const mapStateToProps=(state)=>{
    if(state.token){
      return{
        access11:state.token.access
      }
    }
}
export default connect(mapStateToProps)(Book)