import * as React from 'react';
import { useEffect,useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
function Home({access11}) {
    const [books,setbooks]=useState([])
    const [booksfil,setbooksfil]=useState()
    const [category,setcategory]=useState('')
    const navigate=useNavigate()
    const currencies = [{label:'all'},{label:'Sci-Fi'},{label:'Fiction'},{label:'Comedy'}]
    const headers = {
        'Authorization': `Bearer ${access11}`, 
        'Content-Type': 'application/json' 
    };
    useEffect(()=>{
        
        
        axios.get('http://127.0.0.1:8000/api/books/',{headers:headers}).then((res)=>{
            console.log(res.data)
            if(res.status==200){
                setbooks([...res.data])
            }
            else{
                alert(res.data.message)
            }
        }).catch((err)=>{
            alert(err.response.data.detail)
        })
    },[access11])
    const handleread=(id)=>{
        navigate(`/${id}`)
    }
    useEffect(()=>{
        if(books){
            if(category=='Sci-Fi'){
                let arr=books.filter((b)=>b.category=='Sci-Fi')
                setbooksfil(arr)
            }
            if(category=='Fiction'){
                let arr=books.filter((b)=>b.category=='Fiction')
                setbooksfil(arr)
            }
            if(category=='Comedy'){
                let arr=books.filter((b)=>b.category=='Comedy')
                setbooksfil(arr)
            }
            if(category=='all'){
                setbooksfil(books)
            }
        }
    },[category])
    const handleorder=(id)=>{
        axios.post('http://127.0.0.1:8000/api/order/',{id:id},{headers:headers}).then((res)=>{
            if(res.status==201){
                console.log(res.data)
                alert('successfully added')
            }
            else{
                alert(res.data.message)
            }
        }).catch((err)=>{
            alert(err.response.data.detail)
        })
    }
    
  return (
    <>
    {books?
    <>
    <div style={{marginTop:'1rem',textAlign:'center'}}>
        <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="all"
            helperText="Please select your book category"
            onChange={(e)=>setcategory(e.target.value)}            
            >
            {currencies.map((option) => (
                
                <MenuItem value={option.label}>
                    {option.label}
                </MenuItem>
                
            ))}
        </TextField>
    </div>
    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
        
        {(booksfil?booksfil:books).map((book)=>(
            <div style={{margin:'2rem'}}>
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
                    <Button variant='contained' size="small" onClick={()=>handleread(book.id)}>Read</Button>
                    <Button variant='contained' onClick={()=>handleorder(book.id)} size="small">order</Button>
                </CardActions>
            </Card>
            </div>
        ))}
        
        
    </div>
    </>
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
export default connect(mapStateToProps)(Home)