import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const [sin, setSin] = useState('');
  const [period, setPeriod] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    if (sin && period) {
      history.push(`/${period}/${sin}`);

    }
  };
  
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Student Attendance
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Student Identification Number (SIN)"
            variant="outlined"
            value={sin}
            onChange={(e) => setSin(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel>Period</InputLabel>
            <Select
              value={period}
              label="Period"
              onChange={(e) => setPeriod(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!sin || !period}
            fullWidth
            sx={{ mt: 2 }}
          >
            Search
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default SearchPage;
