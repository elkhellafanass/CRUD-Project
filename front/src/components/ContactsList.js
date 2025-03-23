import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Search, Add, Edit, Delete } from "@mui/icons-material";

const API_URL = "http://localhost:5000/api/items"; // URL du backend

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({ name: "", phone: "", address: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const handleChange = (e) => {
    setCurrentContact({ ...currentContact, [e.target.name]: e.target.value });
  };

  const handleAddContact = async () => {
    try {
      const response = await axios.post(API_URL, currentContact);
      setContacts([...contacts, response.data]);
      handleClose();
    } catch (error) {
      console.error("Error adding contact", error);
    }
  };

  const handleUpdateContact = async () => {
    try {
      const response = await axios.put(`${API_URL}/${currentContact._id}`, currentContact);
      setContacts(contacts.map((c) => (c._id === currentContact._id ? response.data : c)));
      handleClose();
    } catch (error) {
      console.error("Error updating contact", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  const handleOpen = (contact = { name: "", phone: "", address: "" }) => {
    setCurrentContact(contact);
    setIsEditing(!!contact._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentContact({ name: "", phone: "", address: "" });
  };

  // Recherche
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#008080", marginTop: 2 }}>
         Liste des contacts
      </Typography>

      {/* Champ de recherche */}
      <TextField
        fullWidth
        label="Rechercher un contact"
        variant="outlined"
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Bouton pour ajouter un contact */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ marginBottom: 2 , color: "white" , backgroundColor: "#008080" }}
      >
        Ajouter un Contact
      </Button>

      {/* Affichage des contacts sous forme de cartes */}
      <Grid container spacing={2}>
        {filteredContacts.map((contact) => (
          <Grid item xs={8} /*sm={6} md={4}*/ key={contact._id}>
            <Card sx={{ borderRadius: "12px", boxShadow: "0 3px 10px rgba(0,0,0,0.2)" }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>{contact.name}</Typography>
                <Typography>📞 {contact.phone}</Typography>
                <Typography>📍 {contact.address}</Typography>

                {/* Boutons Edit & Delete */}
                <Button
                  onClick={() => handleOpen(contact)}
                  variant="contained"
                  color="secondary"
                  startIcon={<Edit />}
                  sx={{ marginTop: 1, marginRight: 2, color: "white" , backgroundColor: "#008080" }}
                >
                  Modifier
                </Button>
                <Button
                  onClick={() => handleDeleteContact(contact._id)}
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  sx={{ marginTop: 1 }}
                >
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Formulaire Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Modifier le Contact" : "Ajouter un Contact"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            name="name"
            value={currentContact.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Téléphone"
            name="phone"
            value={currentContact.phone}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Adresse"
            name="address"
            value={currentContact.address}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={isEditing ? handleUpdateContact : handleAddContact} color="primary">
            {isEditing ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactsList;
