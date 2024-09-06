// File: src/components/UserProfileDashboard.js
import React, { useState } from 'react';
import logo from "../logo.png"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { 
  AccountCircle, 
  PowerSettingsNew, 
  Close,
  Edit
} from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'white',
  color: 'black',
});

const Logo = styled('img')({
  height: 30,
  marginRight: 100,
});

const ProfileCard = styled(Card)({
  maxWidth: 700,
  margin: '20px auto',
});

const StyledSnackbar = styled(Snackbar)({
  '& .MuiSnackbarContent-root': {
    backgroundColor: '#758cba',
    color: 'blue',
  },
});

const UserProfileDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: 'Harshini',
    lastName: 'Boopathi',
    email: 'shanmugha.edu.in',
    college: 'Sri Shanmugha College of Engineering and Technology',
    sinNumber: 'E18CS026',
    year: '4th Year',
    batch: '2018 - 2022',
    department: 'Computer Science',
    gender: 'Female'
  });

  const handleEdit = () => {
    if (isEditing) {
      setOpenDialog(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setOpenDialog(false);
    setOpenSnackbar(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (key, value) => {
    if (isEditing) {
      switch (key) {
        case 'gender':
          return (
            <FormControl fullWidth>
              <RadioGroup
                row
                name={key}
                value={value}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          );
        case 'year':
          return (
            <FormControl fullWidth>
              <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
              <Select
                name={key}
                value={value}
                onChange={handleInputChange}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                <MenuItem value="1st Year">1st Year</MenuItem>
                <MenuItem value="2nd Year">2nd Year</MenuItem>
                <MenuItem value="3rd Year">3rd Year</MenuItem>
                <MenuItem value="4th Year">4th Year</MenuItem>
              </Select>
            </FormControl>
          );
        case 'batch':
          return (
            <FormControl fullWidth>
              <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
              <Select
                name={key}
                value={value}
                onChange={handleInputChange}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                <MenuItem value="2018 - 2022">2018 - 2022</MenuItem>
                <MenuItem value="2019 - 2023">2019 - 2023</MenuItem>
                <MenuItem value="2020 - 2024">2020 - 2024</MenuItem>
                <MenuItem value="2021 - 2025">2021 - 2025</MenuItem>
              </Select>
            </FormControl>
          );

        case 'department':
          return (
            <FormControl fullWidth>
              <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
              <Select
                name={key}
                value={value}
                onChange={handleInputChange}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
                <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
                <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
              </Select>
            </FormControl>
          );

        default:
          return (
            <TextField
              fullWidth
              label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              name={key}
              value={value}
              onChange={handleInputChange}
              variant="outlined"
            />
          );
      }
    } else {
      return (
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
          </Typography>
          <Typography variant="body1">{value}</Typography>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <div>
      <img
        src={logo} alt="Logo"
        style={{ width: '180px', height: 'auto' }}
      />
    </div>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton color="inherit">
            <PowerSettingsNew />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit">
            <Close />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        User Profile Details
      </Typography>
      
      <ProfileCard>
        <CardHeader
          avatar={<AccountCircle />}
          action={
            <Button 
              variant="contained" 
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          }
          title={`${userDetails.firstName} ${userDetails.lastName}`}
        />
        <CardContent>
          <Grid container spacing={2}>
            {Object.entries(userDetails).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                {renderField(key, value)}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </ProfileCard>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          Are you sure you want to save these changes?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <StyledSnackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Successfully saved!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default UserProfileDashboard;
