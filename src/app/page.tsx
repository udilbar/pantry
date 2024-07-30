"use client";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { fireStore } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [pantry, setPantry] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () =>{
    const snapshot = query(collection(fireStore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList: string[] = [];
    docs.forEach((d) => {
      pantryList.push(d.id);
    })
    setPantry(pantryList);
  }

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (name: string) => {
    const docRef = doc(collection(fireStore, "pantry"), name);
    await setDoc(docRef, {});
    await updatePantry();
  }

  const removeItem = async (name: string) => {
    const docRef = doc(collection(fireStore, "pantry"), name);
    await deleteDoc(docRef);
    await updatePantry();
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100vh" flexDirection="column" maxWidth="75%" marginLeft="auto" marginRight="auto">
      <Typography variant="h1" gutterBottom>
        Pantry
      </Typography>
      <TableContainer component={Paper} sx={{ marginLeft: "auto", marginRight: "auto", marginBottom:"40px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pantry.map((name, id) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => removeItem(name)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleOpen} variant="contained" sx={{alignSelf: "flex-end", maxWidth:"200px", width: "100%"}}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}>
          <Stack width="100%" spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
              Add item
            </Typography>
            <TextField id="outlined-name" label="Name" variant="outlined" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <Button variant="contained" onClick={() => {
              addItem(itemName);
              setItemName('');
              handleClose();
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
